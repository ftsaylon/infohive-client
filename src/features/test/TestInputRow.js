import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications'
import {Button,Table,Input} from 'semantic-ui-react';


export default class TestInputRow extends Component{
    constructor(props){
        super(props);
        this.state={
            qty: ''
        };
        this.removeFromCart = this.removeFromCart.bind(this);
        this.changeQty = this.changeQty.bind(this);
    }
    changeHandler(e){
        this.setState({qty:e.target.value});
    }
    removeFromCart(){
        // console.log(this.props.index);
        this.props.removeFromCart(this.props.index);
    }
    changeQty(quantity){
        if(this.state.qty < 0){
            NotificationManager.error('Negative quantity not allowed')
        }
        else{
            this.props.changeQty(this.state.qty-quantity,this.props.index);
            this.setState({qty: ""})
        }
    }
    render(){
        return(
            <Table.Cell width={5}>
                <Input value={this.state.qty} fluid onChange={this.changeHandler.bind(this)} placeholder='Put new quantity here...' type='number'/>
                <Button fluid attached="top" value={this.state.qty} onClick={() => {this.changeQty(this.props.item.quantity)}}>
                    Set Quantity
                </Button>    
                <Button fluid attached value={this.props.index} onClick={this.removeFromCart}>
                    Delete
                </Button>                            
            </Table.Cell>     
    )
    }
}