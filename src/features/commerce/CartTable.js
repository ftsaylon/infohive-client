// libraries
import axios from 'axios'
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import {Button, Icon, Label, Table} from 'semantic-ui-react'

// helpers
import {getUserTag} from '../../sessionhandler'

class CartTable extends Component {

	render(){
		return(
			<Table basic='very' celled structured>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Product Name</Table.HeaderCell>
			        <Table.HeaderCell>Quantity</Table.HeaderCell>
			        <Table.HeaderCell>Price/Unt</Table.HeaderCell>
			        <Table.HeaderCell>Amount</Table.HeaderCell>
			        <Table.HeaderCell>Watchers</Table.HeaderCell>
			        <Table.HeaderCell>Remove</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>
			      <CartRow rows={this.props.rows} updater={this.props.updater} forapproval={this.props.forapproval}/>
			    </Table.Body>
			</Table>
		)
	}
}

class CartRow extends Component{
	constructor(props){
		super(props)

		this.state = {
			eyes: [],
			forapproval: ''
		}

		this.removeProduct = this.removeProduct.bind(this)
		this.getEyes = this.getEyes.bind(this);
		this.showEyes = this.showEyes.bind(this);

	}
	
	//for approvals vs for eyes
	componentWillReceiveProps(nextProps){
		this.setState({eyes: []})
		nextProps.rows.forEach((row) => {
			this.getEyes(row.product_id)
		})
		if(this.state.forapproval !== nextProps.forapproval){
			this.setState({
				forapproval: nextProps.forapproval
			})
		}
	}
	
	componentDidMount(){
		console.log(this.props.forapproval)
		this.setState({
			forapproval: this.props.forapproval
		})
	}

	render(){
		const rows = this.props.rows
		return(
				rows.map( (row) => {
					return(
						<Table.Row key={row.product_id}>
							<Table.Cell> {row.name} </Table.Cell>
							<Table.Cell> 
								<Button size='mini' onClick={() => this.setQuantity(row.product_id, -1, row.stock, row.quantity)} icon> 
									<Icon name='minus' />
								</Button>
								<Label basic> {row.quantity} </Label>
								<Button size='mini' onClick={() => this.setQuantity(row.product_id, 1, row.stock, row.quantity)} icon> 
									<Icon name='plus' />
								</Button>
							</Table.Cell>
							<Table.Cell> {row.price} </Table.Cell>
							<Table.Cell> {row.total} </Table.Cell> 
							<Table.Cell>
							{
								this.showEyes(row.product_id)
							}
							</Table.Cell>
							<Table.Cell> 
								{
								(this.state.forapproval===0) ?
								( <Button size='mini' negative icon='delete' onClick={() => this.removeProduct(row.product_id)}/>)
								:
								(null)
							
							}
							</Table.Cell>
						</Table.Row>
					)
				})
		)
	}

	removeProduct(product_id){
		axios.delete(`/cart/remove`, {data: {user_tag: getUserTag(), product_id: product_id}})
		.then(response => {
			// console.log(response)
			this.props.updater()
			NotificationManager.success('Successfully removed product from cart')
		})
		.catch(err => {
			if(err.response){
				return console.log(err.response)
			}
			return console.log(err)
		})
	}

	setQuantity(id, quantity, max, current){
		var min = 1;
		if(current+quantity>max || current+quantity<min){
			return NotificationManager.warning('Limit reached')
		}
		axios.put('/cart/incQuantity', {user_tag: getUserTag(), product_id: id, quantity: quantity})
		.then(response => {
			// console.log(response)
			this.props.updater()
		})
	}

	getEyes(id){
		axios.post(`/cart/getEyes/`, {user_tag: getUserTag(), id: JSON.stringify(id)})
		.then(response => {
			// console.log(response)
			var eyes = this.state.eyes
			eyes.push({id: id, buyers: response.data.potentialBuyers, stocks: response.data.stocksInCarts})
			this.setState({eyes: eyes})
		})
		.catch(err => {
			if(err.response){
				return NotificationManager.error(err.response.data.message)
			}
			return NotificationManager.error(err)
		})
	}

	showEyes(id){
		return(
			this.state.eyes.map(eye => {
				if(eye.id === id){
					if(eye.buyers === 1){
						return(
							<React.Fragment>
								You are only buyer
							</React.Fragment>
						)
					}
					else{
						return(
							<React.Fragment>
								{eye.buyers} watching <br />
								{eye.stocks} stocks in carts
							</React.Fragment>
						)
					}
				}
				else{
					return null
				}
			})
		)
		
	}
}
export default CartTable;