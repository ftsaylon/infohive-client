import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { getUserTag } from '../../sessionhandler';
import axios from 'axios';
import  { Grid, Header, Segment, Card, Image, Divider, Label, Container, Feed } from 'semantic-ui-react';


export default class UserFarmInfo extends Component{
    constructor(props){
        super(props);
        this.state={
        
        }

        this.loadValues = this.loadValues.bind(this);
    }

    loadValues(){

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
            <div className="ForumPage">
        
            </div>
        );
    }
}