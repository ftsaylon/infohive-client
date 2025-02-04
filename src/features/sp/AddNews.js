import React, { Component } from 'react';
import { TextArea, Form, Button, Segment, Header } from 'semantic-ui-react';
import axios from 'axios';

//helpers
import {getUserTag, getProfile} from '../../sessionhandler';

class AddNews extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '', 
            content: '',
            showModal: false,
            contentError:false,
            titleError:false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }
    
    formValidation(){
        // const contentregex = /[±!@£$%^&*_+§¡€#¢§¶•ªº«/<>?:;|=.,]/;
        const titleregex = /[±!@£$%^&*_+§¡€#¢§¶•ªº«/<>?:;|=.,]/;
        var flag = true;
        //Comparison to Regex
        // if(this.state.content.match(contentregex) || this.state.content.length===0){
        //     this.setState({contentError: true});
        //     flag = false;
        // }else{
        //     this.setState({contentError:false});            
        // }
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

        const news = {
            title: this.state.title,
            news: this.state.content,
            user_id: 1,
            writer: getProfile().name,
            user_tag: getUserTag() 
        };

        if(this.formValidation()){
            axios.post(`/news/insert`, news )
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.updateList("news", 'added');
                this.setState({
                    title:'',         
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

        return(
            <Segment>
                <Header as="h1">Create Post Here</Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required onChange={this.handleChange} error={this.state.titleError}>
                            <label>Title</label>
                            <input name="title" placeholder='Title'/>
                        </Form.Field>
                        <Form.Field required onChange={this.handleChange} error={this.state.contentError} type="textArea">
                            <label>Content</label>
                            <TextArea name='content' placeholder='Type your post here...' />
                        </Form.Field>
                        <Button type="submit" positive>Submit</Button>
                        <Button negative onClick={this.closeModal}>Cancel</Button>
                    </Form>                                
            </Segment>
        )
    }
}

export default AddNews;