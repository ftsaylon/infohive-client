import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { getUserTag } from '../../sessionhandler';
import axios from 'axios';
import  { Grid, Header, Segment, Card, Image, Divider, Label, Container, Feed } from 'semantic-ui-react';


export default class ForumPage extends Component{
    constructor(props){
        super(props);
        this.state={
            news:[]
        }

        this.loadValues = this.loadValues.bind(this);
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
    }
    
    updateList = (path, action) => {
        this.loadValues();
        NotificationManager.success(`Successfully ${action} ${path}`)
    }
    
    render(){
        return(
            <Container className="ForumPage">
                {
                    this.state.news.map((item, index) =>{
                        return(
                        <Segment>

                        <Feed>
                            <Feed.Event>
                            <Feed.Label>
                                {/* <img src='/images/avatar/small/elliot.jpg' /> */}
                            </Feed.Label>
                            <Feed.Content>
                            <Feed.Label>{item.title}</Feed.Label>
                                <Feed.Summary>
                                <Feed.User>{item.writer}</Feed.User>
                                <br/>
                                {item.news}
                                <br/>
                                <Feed.Date>{item.date}</Feed.Date>
                                </Feed.Summary>
                            </Feed.Content>
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