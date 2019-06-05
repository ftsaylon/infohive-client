import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { getUserTag, getProfile } from '../../sessionhandler';
import axios from 'axios';
import  { Grid, Segment, Container, Feed, Button, Icon, Header } from 'semantic-ui-react';

import FBLoginButton from '../login/FBLoginButton';
import GoogleLoginButton from '../login/GoogleLoginButton';

import AddNews from './AddNews';

export default class ForumPage extends Component{
    constructor(props){
        super(props);
        this.state={
            news:[],
            _news: '',
            openConfirm: false,
            isAdmin: false
        }

        this.loadValues = this.loadValues.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

    loadValues(){
        axios.get(`/news`)
        .then(response => {
            console.log(response)
            this.setState({news: response.data})

        })
        .catch(err => {
            if(err.response){
                return console.log(err.response)
            }
            console.log(err)
        })
    }

    componentDidMount(){
        this.loadValues();
        this.isAdmin();
    }
    
    updateList = (path, action) => {
        this.loadValues();
        NotificationManager.success(`Successfully ${action} ${path}`)
    }
    
    checkUser(item){
		if(item.writer === getProfile().name) return true;
    }
    
    handleDeleteSubmit = (event, path, id, user) => {
		event.preventDefault();

		axios.delete(`/${path}/${id}`, { data: { user_tag: getUserTag() }})
		.then(res => {
			// console.log(res);
			// console.log(res.data);
			NotificationManager.success(res.data.message)
			this.updateList();
		})
		.catch(err => {
			console.log(err.response)
			NotificationManager.error(`Something went wrong while deleting ${path}`)
		})
    }

    logIn(){
        return(
            <Grid style={{ width: "50%" }}>
				<Grid.Column width={8}>
					<FBLoginButton content='Comment with Facebook' onChange={this.props.onChange} login={this.login}/>
				</Grid.Column>
				<Grid.Column width={8}>
					<GoogleLoginButton content='Comment with Google' onChange={this.props.onChange} login={this.login}/>
				</Grid.Column>
            </Grid>
        )
    }

    details(){
        return(
            <Button color={getProfile().mode} type='submit'>
                <Icon name='check' /> Comment as {getProfile().name}
            </Button>
        )
    }

    timeSplitter(string){
		var temp = string.split("T");
        return temp[0];
    }

    isAdmin(){
        axios.post(`/admin`, {user_tag: getUserTag()})
        .then(response => {
          this.setState({isAdmin: true})
          return true
        }) 
        .catch(err => {
          // console.log(err.response)
          if(err.response){
            this.setState({isAdmin: false})
          }
        })
    }

    render(){
        return(
            <Container className="ForumPage">
            <br/><br/>
                <AddNews
                    updateList = {this.updateList}
                    user_id = {getProfile().id}
                />
                {
                    this.state.news.map((item, index) =>{
                        return(
                        <Segment >
                        <Feed key={index} as={Link} to={"/news/"+item.id}>
                            <Feed.Event>
                            <Feed.Content>
                            <Feed.Label> <Header as="h1">{item.title}</Header></Feed.Label>
                            <Feed.Label as="h2">By: {item.writer}</Feed.Label>
                            <Feed.Date as="h2">Written on: {this.timeSplitter(item.date)}</Feed.Date>
                            </Feed.Content>
                                {				
                                    (this.checkUser(item) || this.state.isAdmin === true) ?
                                    (
                                        <Button
                                            size="mini"
                                            color="red" 
                                            compact
                                            inverted
                                            onClick={(e) => {
                                                this.handleDeleteSubmit(e, "news", item.id)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        
                                    ):(
                                        <div></div>
                                    )
                                }
                                
                            </Feed.Event>
                        </Feed>
                
                        </Segment>
                        );
                    })
                }
            </Container>
        );
    }
}