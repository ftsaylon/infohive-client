import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Table, Container } from 'semantic-ui-react';
import moment from 'moment';

// helpers
import {getUserTag} from '../../sessionhandler'

export default class Orders extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders:[]
        };
        this.getUserCart = this.getUserCart.bind(this);
    }

    getUserCart(){
        axios.post('/cart/orders',{user_tag:getUserTag()}).then(
            (response)=>{
                this.setState({orders:response.data.result});
                console.log(response);
            }).then(()=>{
                console.log(this.state)
        }).catch(
            (err)=>{
                console.log(err.response);
            }
        )
    }
    handleChange = (event) =>{
        // console.log(event.target);
        this.setState({[event.target.name]:event.target.value},()=>{
            console.log(this.state.userId)
        });
    }
    componentDidMount(){
        this.getUserCart()
    }




	render(){


		return (
			<div className="AdminLogin">
                <Container>
				<Grid align="center" verticalAlign="middle" style={{height:'100%'}}>
                    <Grid.Row/>
                    {
                        this.state.orders.map(
                            (order,index)=>{

                                return(
                                    <Grid.Row key={index}>
                                        <Table>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell width={4} ></Table.HeaderCell>
                                                    <Table.HeaderCell width={4} ></Table.HeaderCell>
                                                    <Table.HeaderCell width={4}>Order Id: {order.details.id}</Table.HeaderCell>
                                                    <Table.HeaderCell width={4} >
                                                        Order Date: &nbsp; 
                                                        {moment(new Date(order.details.date)).format('MMMM Do YYYY, h:mm:ss a')}
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                                    <Table.HeaderCell>Distributor</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>

                                                {
                                                        order.cart.map( 
                                                        (product,index2)=>{
                                                            return(
                                                                <Table.Row key={index2}>
                                                                    <Table.Cell>{product.product_name}</Table.Cell>
                                                                    <Table.Cell>{product.quantity}</Table.Cell>
                                                                    <Table.Cell>{product.price}</Table.Cell>
                                                                    <Table.Cell>{product.distributor_name}</Table.Cell>
                                                                </Table.Row>               
                                                            )
                                                        }
                                                    )
                                                }
                                            </Table.Body>
                                            <Table.Footer>
                                                <Table.Row>
                                                    <Table.HeaderCell width={4}/>
                                                    <Table.HeaderCell width={4}/>
                                                    <Table.HeaderCell width={4}/>
                                                    <Table.HeaderCell width={4}>
                                                    Total: {order.details.total}
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Footer>
                                        </Table>
                                    </Grid.Row>                
                                )
                            }
                        )
                    }
				</Grid>
                </Container>
			</div>
		);
	}
} 

