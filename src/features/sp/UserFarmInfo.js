import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { getUserTag } from '../../sessionhandler';
import axios from 'axios';
import  { Grid, Header, Segment, Card, Image, Divider, Label, Container, Button, Icon } from 'semantic-ui-react';

import AddFarmBee from './AddFarmBee';
import AddFarmProduct from './AddFarmProduct';

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
        axios.get(`/farm/${this.props.match.params.id}`)
        .then(response => {
			console.log(response)
            this.setState({farm: response.data.result})

            axios.get(`/farm/${this.state.farm.id}/bees`)
            .then(response => {
                console.log(response)
                this.setState({ bees: response.data.result })
                
                axios.get(`/farm/${this.state.farm.id}/products`)
                .then(response => {
                    console.log(response)
                    this.setState({ products: response.data.result })
                    
                    axios.get(`/users/${this.state.farm.id}/news`)
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
                <Grid columns={3}>
                    <Grid.Column>
                        <Segment>
                            <Header as="h1"> {this.state.farm.name} </Header>
                            <Divider/>
                            {/* <Label size="big" color="green"> Location: {this.state.address}</Label> */}
                            {/* <Label size="big" color="blue"> Population: {this.state.farm.population} </Label> */}
                            <Divider/>
                            <Container>
                                <Header> Description </Header>
                                <Container>{this.state.farm.description}</Container>
                            </Container>
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
                            <Segment>
                                {
                                    this.state.bees.map((item, index)=>{
                                        return(
                                            <div>
                                            <Card key={index} as={Link} to={"/bee/"+item.id}>
                                                <Header>{item.name}</Header>
                                                <Image size="small" src={item.imageUrl}/>  
                                                <Button 
                                                    onClick={(e) => {this.props.handleDeleteSubmit(e, "farm-bee", item.id);}} 
                                                    negative
                                                    compact
                                                    attached="bottom"
                                                    >
                                                <Icon name="delete"/>
                                                    Delete
                                                </Button>
                                            </Card>
                                            </div>
                                            
                                        );
                                    })
                                }
                            </Segment>
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
                            <Segment>
                            {
                                    this.state.products.map((item, index)=>{
                                        return(
                                            <div>
                                            <Card key={index} as={Link} to={"/all_products/product/"+item.id}>
                                                <Header>{item.name}</Header>
                                                <Image size="small" src={item.imageUrl}/> 
                                                <Button 
                                                    onClick={(e) => {this.props.handleDeleteSubmit(e, "farm-product", item.id);}} 
                                                    negative
                                                    compact
                                                    attached="bottom"
                                                    >
                                                <Icon name="delete"/>
                                                    Delete
                                                </Button>
                                            </Card>
                                            </div>
                                        );
                                    })
                                }
                            </Segment>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}




