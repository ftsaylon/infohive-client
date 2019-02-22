import React, { Component } from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import { Button, Header, Icon, Input, Modal, Form } from 'semantic-ui-react'
import CurrencyFormat from 'react-currency-format';

// helpers
import {getUserTag} from '../../sessionhandler'

class AddToCartButton extends Component{
	constructor(props){
		super(props)
		/*
			price - of product
			name - of product
			id - of product
			stock - of product
		*/

		this.state = {
			open: false,
			quantity: 1,
			user_tag: getUserTag,
			test: true
		}

		this.addToCart = this.addToCart.bind(this)

		// input handlers binding
		this.quantityHandler = this.quantityHandler.bind(this)
		this.open = this.open.bind(this)
		this.close = this.close.bind(this)
	}

	clearFields = () => {
		
	}

	render(){
		return(
			<Modal
				trigger={
					<Button size="huge" color='black' disabled={this.state.user_tag() && this.props.stock>0 ? false : true} onClick={this.open}>
		        		<Icon name='shop' /> Add to cart
					</Button>
				}
				size='mini'
				open={this.state.open}
				onClose={this.close}
			>
				<Modal.Header> Adding {this.props.name} to cart... </Modal.Header>
				<Modal.Content>
				<Form onSubmit={this.addToCart}>
					<Form.Field>
						<label>Quantity</label>
						<Input focus value={this.state.quantity} placeholder='Enter amount...' type='number' min="1" max={this.props.stock} onChange={this.quantityHandler}/>
						<Header as="h1"> 
							<CurrencyFormat 
								value={this.state.quantity * this.props.price}
								displayType={'text'}
								thousandSeparator={true}
								prefix={'₱'}
							/>
						</Header>
					</Form.Field>
					<Button positive type="submit" icon='check'/>
				</Form>
				</Modal.Content>
			</Modal>
		)
	}

	// server requests

	addToCart(){
		console.log("Adding to cart...")
		axios.put(`/cart/putproduct`, {
			product_id: this.props.id,
			quantity: this.state.quantity,
			user_tag: getUserTag()})
		.then((response) => {
			// console.log("Finished adding to cart")
			// console.log(result)
			this.setState({ quantity: 1 });
			NotificationManager.success(response.data.message);
			this.close()
		})
		.catch(err => {
			if(err.response){
				this.close()
				return NotificationManager.warning(err.response.data.message)
			}
			this.close()
			return console.log(err)
		})
	}

	// input handlers

	quantityHandler(e){
		this.setState({quantity: e.target.value})
	}

	close(){
		this.setState({open: false})
	}

	open(){
		this.setState({open: true})
	}


}

export default AddToCartButton;
