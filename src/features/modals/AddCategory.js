import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axios from 'axios';

//helpers
import { getUserTag } from '../../sessionhandler';

class AddCategory extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            showModal: false,
            titleError:false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }
    
    formValidation(){
        const titleregex = /[±!@£$%^&*_+§¡€#¢§¶•ªº«/<>?:;|=.,]/;
        var flag = true;
        //Comparison to Regex
        if(this.state.title.match(titleregex) || this.state.title.length===0){
            this.setState({titleError: true});
            flag = false;
        }else{
            this.setState({titleError:false});            
        }
        return flag;
    }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const category = {
            title: this.state.title,
            user_tag: getUserTag() 
        };

        if(this.formValidation()){
            axios.post(`/category`, category )
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.updateList("category", 'added');
                this.setState({         
                    title: ''
                });
                this.closeModal();
            })
            .catch(e => {
                console.log(e.response);
            })
        }
    }

    closeModal = () => {
        this.setState({ showModal:false })
    }

    render(){
        const { showModal } = this.state;

        return(
            <div>
                <Modal size="mini" closeIcon onClose={this.closeModal} open={showModal} trigger={<Button positive onClick={() => this.setState({ showModal: true })}>Add Category</Button>}>
                    <Modal.Header>Add Category</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required onChange={this.handleChange} error={this.state.titleError}>
                            <label>Category title</label>
                            <input name="title" placeholder='Category' maxLength={15}/>
                        </Form.Field>
                        <Button type="submit" positive>Submit</Button>
                        <Button negative onClick={this.closeModal}>Cancel</Button>
                    </Form>                        
                    </Modal.Content>
                </Modal>                            
            </div>
        )
    }
}

export default AddCategory;