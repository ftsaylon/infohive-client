import React, { Component } from 'react';
import { Modal, Form, Button, TextArea, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { getUserTag } from '../../sessionhandler';

class UpdateBee extends Component{
    constructor(props){
		super(props);
		this.state={
            id: '',
            name: '',
            description: '',
            imageUrl: '',
            nameError: false,
            descriptionError: false,
            imageUrlError: false,
            showModal: false,
            bee:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.uploadImageHandler = this.uploadImageHandler.bind(this);
	}

    handleChange = event => {
        this.setState({ 
            [event.target.name] : event.target.value }
        );
    }

    componentDidMount(){
        this.setState({
            id: this.props.currentItem.id,
            name: this.props.currentItem.name,
            description: this.props.currentItem.description,
            imageUrl: this.props.currentItem.imageUrl
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.currentItem.id,
            name: nextProps.currentItem.name,
            description: nextProps.currentItem.description,
            imageUrl: nextProps.currentItem.imageUrl
        })
    }


    formValidation(){
        const {
            name,
            description,
        } = this.state

        const nameregex = /[±!@£$%^&*_§¡€#¢§¶•ªº«/<>?:;|=,]/;
        var flag = true;

        if(name.match(nameregex) || name.length ===0){
            this.setState({nameError:true})
            flag = false;
        }else{
            this.setState({nameError:false})
        }
        if(description.length>0){
            this.setState({descriptionError:false});
        }else{
            this.setState({descriptionError:true});
            flag = false;
        }
        return flag;
    }

    uploadImageHandler = event =>{
        console.log(event.target.files[0]);
        this.setState({file: event.target.files[0]},()=>{
            console.log(this.state.file);
        });
    }

    handleSubmit = (event, id) => {
        event.preventDefault();

        const {
            name,
            description,
            imageUrl
        } = this.state

        const bee = {
            name: name,
            description: description,
            imageUrl: imageUrl,
            user_tag: getUserTag()
        };

        if(this.formValidation()){
            console.log(this.state);
                //Image Insert
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                var fd = new FormData();
                fd.append('image',this.state.file);
                axios.post('http://localhost:5000/upload', fd, config)      //Image Insert
                
                .then(                  //Generated File name
                    (res)=>{
                        // console.log(res.data);    
                        bee.imageUrl = 'http://localhost:5000/images/'+res.data;            //Update URL
                        // console.log("UPDATED Bee");
                        // console.log(Bee);
                        axios.put(`/bee/${id}`, bee )                        //Actual Bee Insert
                        .then(res => {
                            this.props.updateList("bee", 'edited');
                            this.setState({         
                                name: '',
                                description: '',
                                imageUrl: ''
                            });
                            this.closeModal();
                        })
                        .catch(e => {
                            console.log(e.response);
                        })
                    }
                )
        }
        // console.log(this.state);
    }

    closeModal = () => {
        this.setState({ showModal:false })
    }    

    clearFields(){
        this.setState({
            name: '',
            description: '',
            imageUrl: '',
            nameError: false,
            descriptionError: false,
            imageUrlError: false,
            showModal: false
        })
    }

    render(){
        // const { showModal } = this.state;

        const {
            nameError,
            descriptionError,
            // imageUrl,
            showModal,
            name,
            description
        } = this.state
        
        return(
            <div>
                <Modal size='tiny' closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })} compact attached="top"> <Icon name="settings"/> Edit</Button>}>
                    <Modal.Header> Update Bee </Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e) => this.handleSubmit(e, this.props.currentItem.id)}> 
                        <Form.Group>
                            <Form.Field width={8} required onChange={this.handleChange} error={nameError}>
                                <label>Bee Name</label>
                                <input required value={name} name='name' placeholder='Bee Name' />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field required onChange={this.handleChange} error={descriptionError}>
                            <label>Description</label>
                            <TextArea value={description} name='description' placeholder='Bee Description' />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field onChange={this.handleChange}>
                                <label>Image URL</label>
                                {/* <input name='imageUrl' defaultValue={this.state.imageUrl} placeholder="ex. http://google.com" maxLength={100}/> */}
                                <input name="image" type="file" onChange={this.uploadImageHandler}   />
                            </Form.Field>
                        </Form.Group>
                        <Button positive type="submit">Submit</Button>
                        <Button negative onClick={(e) => {this.closeModal(e); this.clearFields(e)}}>Cancel</Button>
                    </Form>                        
                    </Modal.Content>
                </Modal>                            
            </div>
        )
    }
}

export default UpdateBee;