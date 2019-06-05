import React, { Component } from 'react';
import  {Header , Segment, Grid, Image, Label, Divider, Icon} from 'semantic-ui-react';
import axios from 'axios';
import AddToCartButton from './commerce/AddToCartButton'
import CommentSection from './login/CommentSection'
import CurrencyFormat from 'react-currency-format';

// helpers
import {getUserTag} from '../sessionhandler'

export default class Product extends Component{
    constructor(props){
        super(props);
        this.state={
        //  Product Details
            name:"",
            directory:"/HOME/Products",
            imageUrl:"https://png.pngtree.com/element_origin_min_pic/16/07/06/09577c5f9cc3c6f.jpg",
            description:"",
            distributorName: "",
            distributorPhone : "",
            distributorAddress: "",
            distributorWebUrl: "",
            contactName: "",
            contactPhone: "",
            contactAddress: "",
            contactWebUrl: "",
            price: 0,
            size: "",
            stock:0,
        // Comments
            comments:[],
        //State
            isEmpty:false,
			isUpdated:true,
			eyes:{buyers:0,stocks:0}
        }

		//Bindings
		this.loadValues = this.loadValues.bind(this);
		this.getEyes = this.getEyes.bind(this);
		this.showEyes = this.showEyes.bind(this);
    }

	loadValues(){
		axios.get(`/product/${this.props.match.params.id}`)
        .then((response) => {
            console.log(response);
            this.setState(response.data.result[0])
        })
        .catch((error) => {
            console.log(error.response);
			this.setState({isEmpty:true});
        })
	}

    componentDidMount(){
        // console.log(this);
		this.loadValues();
		this.getEyes(this.props.match.params.id)			//	Comment out if gonna remove sales
       
	}
	
    render(){
		return (
            // Top Part
			<div className="Product">
            <Divider/>
            {/* //Body */}
			{
                this.state.isEmpty ?
                    <div align={'center'}>
                        <Header as="h2" icon align="center">
                        <Icon name='exclamation triangle' />
                            No Products to Show
                        <Header.Subheader>Nothing to see here</Header.Subheader>
                        </Header>
                    </div>
								
                    
            :
		        <div className="Product-Body">
		            <Grid  >
		                <Grid.Row columns={1}>
		                    <Grid.Column >
		                        <div className='Body-Top'>
		                            <Header align={"center"}size='huge'  id="name" >

		                                {this.state.name}
		                            </Header>
		                        
		                        </div>
		                    </Grid.Column>                        
		                </Grid.Row>
		                <Grid.Row align={"center"} columns={2} >
		                    <Grid.Column width={2}>
		                    </Grid.Column>
		                    <Grid.Column width={4} verticalAlign="middle">
		                            <Image src={this.state.imageUrl} circular centered size='medium'/>
		                    </Grid.Column>
		                    <Grid.Column  width={8}>
		                            <Grid celled centered>
		                                <Grid.Row columns={2}>
		                                    <Grid.Column width={13} textAlign="center" verticalAlign="middle">
		                                        <Header size={'large'} textAlign="center">
		                                            {this.state.description}
		                                        </Header>                                        
		                                    </Grid.Column>
		                                    <Grid.Column width={3}>                                            
		                                        <Label style={{width:'100%'}} tag color={"green"} size={"large"}>
		                                            Price:
		                                            <CurrencyFormat 
		                                                value={this.state.price}
		                                                displayType={'text'}
		                                                thousandSeparator={true}
		                                                prefix={'₱'}
		                                            />
		                                        </Label>
		                                        <Label style={{width:'100%'}} tag color={"red"} size={"large"}>Size: {this.state.size}</Label>
		                                        <Label style={{width:'100%'}} tag color={"orange"} size={"large"}>Stocks Left: {this.state.stock}</Label>
		                                        <Divider/>			
		                                        {/* <AddToCartButton price={this.state.price}
		                                                         name={this.state.name}
		                                                         id={this.props.match.params.id}
		                                                         stock={this.state.stock}/>
												{this.showEyes()}				Comment out if gonna remove sales */}
		                                    </Grid.Column>	
		                                </Grid.Row>
		                            </Grid>
		                               
		                                
		                    </Grid.Column>
		                </Grid.Row>
		                <Grid.Row columns={1}>
		                    <Grid.Column width={2}></Grid.Column>
		                    <Grid.Column width={12}>
		                        <Segment.Group horizontal>
		                            <Segment>
		                                <Header as="h2">
		                                    Distributor
		                                </Header>
		                                <div className="dist-content">
		                                    <p>{this.state.distributorName}</p>
		                                    <p>{this.state.distributorPhone}</p>
		                                    <p>{this.state.distributorAddress}</p>
											<a href={this.state.distributorWebUrl} target="_blank">{this.state.distributorWebUrl}</a>
		                                </div>
		                            </Segment>
		                            <Segment>
		                                <Header as="h2">
		                                    Contact Person
		                                </Header>
		                                <div className="dist-content">
		                                    <p>{this.state.contactName}</p>
		                                    <p>{this.state.contactPhone}</p>
		                                    <p>{this.state.contactAddress}</p>
		                                    <a href={this.state.contactWebUrl} target="_blank">{this.state.contactWebUrl}</a>     
		                                </div>
		                            </Segment>
		                        </Segment.Group>
		                    </Grid.Column>
		                </Grid.Row>  
		                <CommentSection productId={this.props.match.params.id} onChange={this.props.onChange}/>      
		            </Grid>
		        </div>
		}
        </div>
		);
	}

	getEyes(id){
		//Comment out if gonna remove sales
		axios.post(`/cart/getEyes/`, {user_tag: getUserTag(), id: id})
		.then(response => {
			// console.log(response)
			var eyes = {id: id, buyers: response.data.potentialBuyers, stocks: response.data.stocksInCarts}
			this.setState({eyes: eyes})
		})
		.catch(err => {
			console.log(err.response);
		})
	}

	showEyes(){
		//Comment out if gonna remove sales
		return(
			<React.Fragment>
				Buyers: {this.state.eyes.buyers} <br />
				Stocks in carts: {this.state.eyes.stocks}
			</React.Fragment>
		)
	}
}