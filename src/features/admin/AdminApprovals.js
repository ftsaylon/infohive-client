import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
    Container,
    Divider,
    Table,
    Segment,
    Button,
    Header
} from 'semantic-ui-react';
import { getUserTag } from '../../sessionhandler';

class AdminApprovals extends Component{
    constructor(props){
        super(props);
        this.state = {
            pendingOrders: [],
            search: ''
        }

        this.updateList = this.updateList.bind(this);
    }

    componentDidMount(){
        this.updateList()
    }

    updateList(){
        axios.post(`/cart/forApprovals`, {user_tag: getUserTag()})
        .then(result => {
			console.log(result)
			this.setState({
				pendingOrders: result.data.result,
			})
		})
		.catch(err => {
			if(err.response){
				return console.log(err.response)
			}
			console.log(err)
		})
    }

    handleSubmit = (event, id) => {
        event.preventDefault();

        axios.post(`/cart/approve/${id}`, {user_tag: getUserTag()})
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.updateList();
        })
        .catch(e => {
            console.log(e.response);
        })
    }

    render(){
        return(
            <Container>
            <Divider hidden />
            <Header> Pending Orders </Header>
            <Divider hidden />
            {
                this.state.pendingOrders.map( (item, index) => {
                    if(item.product_id === this.state.search || this.state.search === ''){
                        return(
                            <div key={index}>
                            <Segment>
                            <Table selectable stackable large="true" textAlign="left" celled key={index}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>User: {item.details.user_id} </Table.HeaderCell>
                                    <Table.HeaderCell>Cart ID: {item.details.id} </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Cart Date: 
                                        {moment(new Date(item.details.date)).format('MMMM Do YYYY, h:mm:ss a')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Total: {item.details.total}</Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell width={6}>Name</Table.HeaderCell>
                                    <Table.HeaderCell width={2} align='right'>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                                    <Table.HeaderCell width={6} align='left'>Distributor</Table.HeaderCell>
                                </Table.Row>     
                            </Table.Header>
                            <Table.Body>
                                <Table.Row></Table.Row>    
                                {
                                    item.products.map( (item, index) => {
                                        return(
                                            <Table.Row key={index}>
                                                <Table.Cell textAlign="left">{item.product_name}</Table.Cell>                   
                                                <Table.Cell textAlign="left">{item.quantity}</Table.Cell>                   
                                                <Table.Cell textAlign="right">{item.price}</Table.Cell>                   
                                                <Table.Cell textAlign="right">{item.distributor_name}</Table.Cell>                                                                       
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                            </Table>
                            <Button positive onClick={(e) => {this.handleSubmit(e, item.details.user_id)}}>Approve</Button>
                            </Segment>
                            </div>
                            );
                        }
                        return null;
                    })
                }   
            </Container>
        );
    }
}

export default AdminApprovals;