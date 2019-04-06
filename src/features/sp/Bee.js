import React, { Component } from 'react';
import axios from 'axios';
import { Divider, Grid, Container, Header, Image, Card } from 'semantic-ui-react';

export default class Product extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            description:"",
            imageUrl:""
        }

        this.loadValues = this.loadValues.bind(this);
    }

    loadValues(){
        axios.get(`/bee/${this.props.match.params.id}`)
        .then((response) => {
            console.log(response);
            this.setState(response.data.result[0]);
        })
        .catch((error) => {
            console.log(error.response);
            this.setState({isEmpty:true});
        })
    }

    componentDidMount(){
        this.loadValues();
    }

    render(){
        return(
            <div className="Bee">
            <Divider/>
                <Container>
                <Header as="h1"> {this.state.name} </Header>
                <Image size="small" src="https://png.pngtree.com/element_origin_min_pic/16/07/06/09577c5f9cc3c6f.jpg"/>
                
                <Header>
                    {this.state.description}
                </Header>
                </Container>
            </div>
        )
    }
}

