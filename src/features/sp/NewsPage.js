import React, { Component } from 'react';
import axios from 'axios';
import { Divider, Container, Header } from 'semantic-ui-react';
import NewsCommentSection from './NewsCommentSection';


export default class NewsPage extends Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            news:"",
            writer:""
        }

        this.loadValues = this.loadValues.bind(this);
    }

    loadValues(){
        axios.get(`/news/${this.props.match.params.id}`)
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
                <Header as="h1"> {this.state.title} </Header>
                <Header>{this.state.writer}</Header>
                <Header>
                    {this.state.news}
                </Header>
                </Container>
                <br/><br/>
                <NewsCommentSection newsId={this.props.match.params.id} onChange={this.props.onChange}/>
            </div>
        )
    }
}

