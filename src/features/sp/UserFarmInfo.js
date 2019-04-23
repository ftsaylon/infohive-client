import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { getUserTag } from '../../sessionhandler';
import axios from 'axios';
import  { Grid, Header, Segment, Card, Image, Divider, Label, Container, Feed } from 'semantic-ui-react';

import AddFarmBee from './AddFarmBee';
import AddFarmProduct from './AddFarmProduct';
import AddNews from './AddNews';

export default class UserFarmInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            farm:{
                id:"",
                user_id:"",
                name:"",
                population:"",
                description:"",
                lat:"",
                lng:""
            },
            address:"",
            bees:[],
            products:[],
            news:[],
            contact:[],
            distributor:[],
            category:[]
        }

        this.loadValues = this.loadValues.bind(this);
    }

    loadValues(){
        axios.post(`/farm/`, {user_tag: getUserTag()})
        .then(response => {
			console.log(response)
            this.setState({farm: response.data.result})

            axios.get(`/farm/${this.state.farm.user_id}/bees`)
            .then(response => {
                console.log(response)
                this.setState({ bees: response.data.result })
                
                axios.get(`/farm/${this.state.farm.user_id}/products`)
                .then(response => {
                    console.log(response)
                    this.setState({ products: response.data.result })
                    
                    axios.get(`/users/${this.state.farm.user_id}/news`)
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
                })
                .catch(err => {
                    if(err.response){
                        return console.log(err.response)
                    }
                    console.log(err)
                })
            })
            .catch(err => {
                if(err.response){
                    return console.log(err.response)
                }
                console.log(err)
            })
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
        // this.loadValuesForProduct();
    }
    
    updateList = (path, action) => {
        this.loadValues();
        NotificationManager.success(`Successfully ${action} ${path}`)
    }
    
    render(){

        return(
            <div className="UserFarmInfo">
            <Divider/>
                <Grid columns={4}>
                    <Grid.Column>
                        <Segment>
                            <Header> {this.state.farm.name} </Header>
                            <Divider/>
                            <Label size="big" color="green"> Location: {this.state.address}</Label>
                            <Label size="big" color="blue"> Population: {this.state.farm.population} </Label>
                            <Divider/>
                            <Container>
                                <Header> Description </Header>
                                <Container>{this.state.farm.description}</Container>
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column scrollable>
                        <Segment>
                            <Header> Feed </Header>
                            <Divider/>
                            <AddNews
                                updateList = {this.updateList}
                                user_id = {this.state.farm.user_id}
                            />
                            <Feed>
                                {
                                    this.state.news.map((item, index) =>{
                                        return(
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

                                        );
                                    })
                                }
                            </Feed>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Header> Bees in the Farm </Header>
                            <AddFarmBee
                                updateList = {this.updateList}
                                farm_id = {this.state.farm.id}
                            />
                            <Divider/>
                            <Card.Group>
                                {
                                    this.state.bees.map((item, index)=>{
                                        return(
                                            <Card key={index} as={Link} to={"/bee/"+item.id}>
                                                <Card.Content>
                                                    {item.name}
                                                    <Image/>    
                                                </Card.Content>
                                            </Card>
                                        );
                                    })
                                }
                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Header> Products Available </Header>
                            <AddFarmProduct
                                updateList = {this.updateList}
                                farm_id = {this.state.farm.id}
                            />
                            <Divider/>
                            <Card.Group>
                            {
                                    this.state.products.map((item, index)=>{
                                        return(
                                            <Card key={index} as={Link} to={"/all_products/product/"+item.id}>
                                                <Card.Content>
                                                    {item.name}
                                                    <Image/>    
                                                </Card.Content>
                                            </Card>
                                        );
                                    })
                                }
                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}