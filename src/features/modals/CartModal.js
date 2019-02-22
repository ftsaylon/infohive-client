import React, { Component } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import {  Button, Confirm, Form, Header, Modal } from 'semantic-ui-react'
import CartTable from '../commerce/CartTable'
import { getUserTag } from '../../sessionhandler';
import CurrencyFormat from 'react-currency-format';
import {withRouter} from 'react-router-dom';
class CartModal extends Component {
	constructor(props){
		super(props)

		this.state = {
			products: [],
			processing: false,
			opencart: false,
			openconfirm: false,
			updated:false,
			forapproval: ''
		}


		this.openConfirm = this.openConfirm.bind(this)
		this.closeConfirm = this.closeConfirm.bind(this)
		
		this.retrieveCart = this.retrieveCart.bind(this)
		this.checkout = this.checkout.bind(this)

	}

	componentDidMount(){
		console.log("Retrieving cart...")
		axios.post(`/cart`, {user_tag: getUserTag()})
		.then(result => {
			//console.log(result)
			this.setState({
				products: result.data.result
			})

		})
		.catch(err => {
			if(err.response){
				return console.log(err.response)
			}
			console.log(err)
		})
	}

	static getDerivedStateFromProps(props, current_state) {
		if (current_state.opencart !== props.opencart) {
			if(props.opencart === true){
				return {
					opencart: true,
					updated:false
				}	
			}else{
				return{
					opencart: false
				}
			}
		}else{
			return null
		}
	}

	componentDidUpdate(){
		if(this.state.updated===false){
			this.retrieveCart();
			this.setState({
				updated:true
			});
		}
	}

	render(){
		return(
			<div>
				<Modal 
					centered={false}
					open={this.state.opencart}
					onOpen={this.retrieveCart}
					size='small'
					onClose={this.props.handleOpenCart}
					closeIcon>
						<Modal.Header> Shopping Cart </Modal.Header>
				    	<Modal.Content>
					    	<CartTable 
								rows={this.state.products}
								sumCart={this.sumCart}
								updater={() => this.componentDidMount()}
								forapproval={this.state.forapproval}
							/>
							<Form onSubmit={this.openConfirm} align='right'>
								<Form.Field>
									<Header>
										<label>Total: &nbsp; </label>
										<CurrencyFormat 
											value={this.sumCart(this.state.products)}
											displayType={'text'}
											thousandSeparator={true}
											prefix={'₱'}
										/>
									</Header>
								</Form.Field>
								{
									(this.state.forapproval === 0 || this.state.products.length === 0) ?
									(
										<Button 
											positive
											icon="cart"
											content="Submit Order"
											type="submit"
										/>

									):(
										<div>
											<p>Your order is being processed.</p>
											<Button 
												negative
												icon="cart"
												content="Cancel Order"
												type="submit"
											/>
										</div>
									)
								} 
							</Form>

				    	</Modal.Content>
				</Modal>
				<Confirm
					open={this.state.openconfirm}
					size='mini'
					content={'Tendered Amount: ' + this.sumCart(this.state.products)}
					onConfirm={this.checkout} 
					onCancel={this.closeConfirm}/>       
			</div>
		)
	}

	openConfirm(){
		if(this.state.forapproval === 0){
			for(var i in this.state.products){
				if(this.state.products[i].quantity > this.state.products[i].stock){
					return NotificationManager.error(`No more stocks for ${this.state.products[i].name}!`)
				}
			}
			this.setState({openconfirm: true})
		}
		else{
			this.setState({openconfirm: true})
		}
	}
	closeConfirm(){
		this.setState({openconfirm: false})
	}

	retrieveCart(){
		axios.post(`/cart`, {user_tag: getUserTag()})
		.then(result => {
			// console.log(result)
			this.setState({
				products: result.data.result,
				forapproval: result.data.forapproval
			})

		})
		.catch(err => {
			if(err.response){
				return console.log(err.response)
			}
			console.log(err)
		})
	}

	sumCart(products){
		var sum = 0;
		for(var i in products){
			sum += products[i].total
		}
		return sum;
	}

	checkout(){
		console.log("Checkouting...")
		if(this.state.products.length === 0){
			this.closeConfirm()
			return NotificationManager.error('Cart empty')
		}
		this.setState({processing: true})

		const data = {
			user_tag: getUserTag(), 
			forapproval: (this.state.forapproval === 0)? 1:0
		}

		axios.post(`/cart/setForApproval/`, data)
		.then(response => {
			// console.log(response.data.message)
			NotificationManager.success('Order made')
			this.setState({processing: false, openconfirm: false, opencart: false, submitted: true},
			()=>{
				// console.log(this.props);
				this.props.history.push({pathname:this.props.location.pathname,state:{updated:false}})
			})
		})
		.catch(err => {
			console.log(err.response)
			console.log(err)
			NotificationManager.error('Something went wrong')
			this.setState({processing: false, openconfirm: false, opencart: false})
		})
	}
}

export default withRouter(CartModal);
