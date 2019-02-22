import axios from 'axios';
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Table } from 'semantic-ui-react';

// defined components
import TestInputRow from './TestInputRow';

class TestCart extends Component{
    constructor(){
        super()

        this.removeFromCart = this.removeFromCart.bind(this);
        this.changeQty = this.changeQty.bind(this);
        this.getCartRow = this.getCartRow.bind(this);

    }

    render(){
        return(
            <Table>
                <Table.Header>
                    <Table.Row>
                            <Table.HeaderCell width={2}>Product Name</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Total Price</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Option</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.getCartRow()}
                </Table.Body>
            </Table>   
        )
    }

    getCartRow(){
        if(this.props.products.length){
            return(
                this.props.products.map( (item,index) => {
                    return(
                        <Table.Row key={index}>
                            <Table.Cell width={2}>{item.name}</Table.Cell>
                            <Table.Cell width={2}>{item.quantity}</Table.Cell>                   
                            <Table.Cell width={2}>{item.price}</Table.Cell>
                            <Table.Cell width={2}>{item.quantity * item.price}</Table.Cell>
                            <TestInputRow item={item} index={index} changeQty={this.changeQty} removeFromCart={this.removeFromCart}/>
                        </Table.Row>
    
                    )
                })
            )
        }
        else{
            return(
                <Table.Row textAlign='center'>
                    <Table.Cell colSpan='5'>No products to show... </Table.Cell>
                </Table.Row>
            )
        }
        
    }

    removeFromCart(e){
        new Promise((resolve,reject) => {
                return resolve(this.props.products[e]);
        })
        .then( (res) => {
            axios.delete('http://localhost:3001/cart/remove',{data:{product_id:res.product_id,user_tag:this.props.user_tag}})
            .then(()=>{
                this.props.getUserCart();
                NotificationManager.success('Successfully deleted product from cart')
            })
            .catch( (err)=>{
                console.log(err.response);
            })
        })
    }

    changeQty(e,f){
        axios.put('/cart/incQuantity',{user_tag:this.props.user_tag,product_id:this.props.products[f].product_id,quantity:e})
        .then( (response)=>{
            // console.log(response);
            this.props.getUserCart();
            NotificationManager.success('Successfully set quantity')
        })
        .catch(err => {
            if(err.response){
                return console.log(err.response)
            }
            return console.log(err)
        })
    }
}

export default TestCart;