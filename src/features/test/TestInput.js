// libraries
import axios from 'axios';
import crypto from 'crypto';
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Form, Grid, Button, Dropdown, Input } from 'semantic-ui-react';

// defined components
import TestCart from './TestCart'

export default class TestInput extends Component{
    // lifecycles
    constructor(props){
        super(props);
        this.state = {
            contacts:[],
            distributors:[],
            products:[],
            contactId:'',
            distributorId:'',
            productId:'',
            userId:0,
            qty:1,
            user_tag:'',
            productsInCart: []
        };
        this.getUserCart = this.getUserCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.setUser = this.setUser.bind(this);
        this.encrypt = this.encrypt.bind(this);
    }
   
    componentDidMount(){
        axios.get(`/product`).then(
			(response)=>{
                console.log(response.data);
				this.setState({products:response.data});
            }
		).catch((e)=>{
            console.log(e.response);
        })
    }

	render(){
        const productOptions = this.state.products.map(
            ({id, name,price}) => ({ key: id, value: id, text: name + ' P' + price })
        )

		return (
			<div className="AdminLogin">
				<Grid align="center">
                    <Grid.Row/>
					<Grid.Row>
						<Grid.Column width={2}></Grid.Column>
                        <Grid.Row>
						<Grid.Column width={4} >
                            <Form size="large" onSubmit={this.addToCart}>
                            <Form.Field>
                                    <label>UserID</label>
                                <Input fluid placeholder="1 - 100" name="userId" onChange={this.handleChange}/>
                                <Button type='button' fluid onClick={this.setUser}>
                                    Set User
                                </Button>
                            </Form.Field>                            
                            <Form.Field>
                                <label>Select Product</label>
                                <Dropdown
                                    placeholder="Select Product"
                                    fluid
                                    selection
                                    value={this.state.productId}
                                    options={productOptions}
                                    onChange={this.handleProductChange}
                                    search
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Input Qty</label>
                                <Input min='1' type='number' fluid name="qty" value={this.state.qty} onChange={this.handleChange}/>
                            </Form.Field>
                                <Button size='large' type='submit'>
                                                Add to Cart
                                </Button>
                                <Button type='button' size='large' onClick={this.checkout.bind(this)}>
                                                Checkout
                                </Button>
							</Form>
						</Grid.Column>
                        </Grid.Row>
                        <Grid.Column width={8} stretched>
                            <TestCart products={this.state.productsInCart} user_tag={this.state.user_tag} getUserCart={this.getUserCart}/>
                        </Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
    }
    
    // handlers
    handleProductChange = (event, data) => {
        this.setState({ productId : data.value });
    }

    handleChange = (event) =>{
        // console.log(event.target);
        this.setState({[event.target.name]:event.target.value});
    }

    // methods
    checkout(){

		const data = {
			user_tag: this.state.user_tag, 
			forapproval: 1
		}
        axios.post('/cart/setForApproval/',data)
        .then( (response) => {
            // console.log(response);
            this.getUserCart();
            NotificationManager.success(response.data.message)
        }).catch( (err)=> {
            // console.log(err.response);
            if(err.response){
                return NotificationManager.warning(err.response.data.message)
            }
            return NotificationManager.error(err)
        })
    }
    encrypt(){
        var algorithm = 'aes-256-gcm';
        var password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
        var iv = '60iP0h6vJoEa';

        try{
            var cipher = crypto.createCipheriv(algorithm, password, iv)
            var encrypted = cipher.update(this.state.userId, 'utf8', 'hex')
            encrypted += cipher.final('hex');
            var tag = cipher.getAuthTag();
            this.setState({user_tag:JSON.stringify({content:encrypted,tag:tag})});
        }
          catch(err){
            throw err;
        }

    }

    setUser(){
        new Promise( (resolve,reject) => {
            this.encrypt();
            resolve();
        })
        .then( () => {
            this.getUserCart()
        })
        .then( () => {
            NotificationManager.success('Successfull got user\'s cart')
        })
    }

    addToCart(){
        axios.put('/cart/putproduct',{product_id:this.state.productId,quantity:this.state.qty,user_tag:this.state.user_tag})
       .then( (response) => {
            // console.log(response);
            this.getUserCart();
            NotificationManager.success('Successfully added to cart')
        })
        .catch((err) => {
            if(err.response && err.response.status === 400){
                return NotificationManager.warning('Set a user first')
            }
            if(err.response && err.response.status === 401){
                return NotificationManager.warning(err.response.data.message)
            }
            if(err.response){
                return NotificationManager.warning(err.response.data.message)
            }
            return NotificationManager.error(err)
        })
        
    }

    getUserCart(){
        axios.post('/cart/', {user_tag: this.state.user_tag})
        .then((response) => {
            // console.log(response);
            this.setState({productsInCart: response.data.result});
        })
        .catch(err => {
            if(err.response){
                return console.log(err.response)
            }
            return console.log(err)
        })            
    }
} 