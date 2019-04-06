import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axios from 'axios';

//helpers
import { getUserTag } from '../../sessionhandler';

class AddNews extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: '',
            showModal: false,
            contentError:false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }
    
    formValidation(){
        const contentregex = /[±!@£$%^&*_+§¡€#¢§¶•ªº«/<>?:;|=.,]/;
        var flag = true;
        //Comparison to Regex
        if(this.state.content.match(contentregex) || this.state.content.length===0){
            this.setState({contentError: true});
            flag = false;
        }else{
            this.setState({contentError:false});            
        }
        return flag;
    }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const news = {
            news: this.state.content,
            user_id: this.props.user_id,
            writer: "Francis Saylon",
            user_tag: getUserTag() 
        };

        if(this.formValidation()){
            axios.post(`news/insert`, news )
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.updateList("news", 'added');
                this.setState({         
                    content: ''
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
                <Modal size="mini" closeIcon onClose={this.closeModal} open={showModal} trigger={<Button positive onClick={() => this.setState({ showModal: true })}>Add News</Button>}>
                    <Modal.Header>Add News</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required onChange={this.handleChange} error={this.state.contentError}>
                            <label>News content</label>
                            <input name="content" placeholder='News' maxLength={15}/>
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

export default AddNews;