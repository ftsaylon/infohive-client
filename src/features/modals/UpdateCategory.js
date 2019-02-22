import React, { Component } from 'react';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { getUserTag } from '../../sessionhandler';

class UpdateCategory extends Component{
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

    handleSubmit = (event, id) => {
        event.preventDefault();

        const category = {
            title: this.state.title,
            user_tag: getUserTag() 
        };

        if(this.formValidation()){
            axios.put(`/category/${id}`, category )
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.updateList("category", "updated");
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
                <Modal size="mini" closeIcon onClose={this.closeModal} open={showModal} trigger={
                    <Button onClick={() => this.setState({ showModal: true })}
                        attached="top" 
                    > 
                        <Icon name="settings"/> 
                        Edit
                    </Button>
                }>
                    <Modal.Header>Update Category</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e) => this.handleSubmit(e, this.props.currentItem.id)}>
                        <Form.Field required onChange={this.handleChange} error={this.state.titleError}>
                            <label>Category Title</label>
                            <input name="title" defaultValue={this.props.currentItem.category} maxLength={15}/>
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

export default UpdateCategory;