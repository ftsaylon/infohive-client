import React, { Component } from 'react';
import { Grid, Header, Table, Container, Divider, Label, Input} from 'semantic-ui-react';

import AddStock from '../modals/AddStock';
import PaginatedRows from '../PaginatedRows'
import CurrencyFormat from 'react-currency-format';

export default class AdminStocks extends Component{
    constructor(props){
        super(props);
        this.state = {
			filter:''
        };

        this.getProducts = this.getProducts.bind(this);
    }

	handleChange = event => {
        this.setState({ [event.target.name]: event.target.value },
        ()=>{
            this.changeDisplayedProducts();
            console.log(this.state.filter);
        });
    }
    changeDisplayedProducts(){
        new Promise(
            (resolve,reject)=>{
                var filter = this.state.filter.toLowerCase();
                var temparray = this.props.product.filter(product=>{
                    return (product.name.toLowerCase().includes(filter)	
                            || product.distributorName.toLowerCase().includes(filter) )
                        })
                resolve(temparray);        
            }
        ).then(
            temparray=>{
                this.props.updateActiveList('product', temparray);
                return;
            }
        )
    }
    componentDidMount(){

        this.changeDisplayedProducts();
    }

	render(){
		return (
			<div className="AdminStocks">
                <Container>
                    <Divider hidden/>
                    <Header as="h1">Product Stocks</Header>

                    <Divider hidden/>
                    <Grid>
                        <Grid.Row textAlign="center">
                            <Grid.Column width={10} textAlign="left">
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Input name="filter" onChange={this.handleChange} value={this.state.filter} placeholder="Search" fluid/>
                            </Grid.Column>
                        </Grid.Row>    
                        <Grid.Row>
                            <Grid.Column>
                                <Table celled textAlign="center">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width={3}>Tags</Table.HeaderCell>
                                            <Table.HeaderCell width={3}>Name</Table.HeaderCell>
                                            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                                            <Table.HeaderCell width={2}>Stocks Left</Table.HeaderCell>
                                            <Table.HeaderCell width={2}>Distributor</Table.HeaderCell>
                                            <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
                                        </Table.Row>     
                                    </Table.Header>
                                    <PaginatedRows 
                                        rows={this.getProducts}
                                        pool={this.props.activeproduct}/>  
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
			</div>
		);
    }
    
    getProducts(activeItems){
        return(
            activeItems.map((item,index)=>{
                return(
                    <Table.Row textAlign="center" key={index}>
                            <Table.Cell>

                        {
                            item.stock < 20 &&
                            <Label as='a' color='red'>
                            Low Stock
                            </Label>

                        }
                            </Table.Cell>

                        <Table.Cell textAlign="left">{item.name}</Table.Cell>                    
                        <Table.Cell textAlign="right">
                            <CurrencyFormat 
                                value={item.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₱'}
                            />
                        </Table.Cell>                   
                        <Table.Cell textAlign="right">{item.stock}</Table.Cell>                         
                        <Table.Cell textAlign="left">{item.distributorName}</Table.Cell>                   
                        <Table.Cell>
                            <p> {item.stock} </p>
                            <AddStock
                                currentItem = {item}
                                updateList = {this.props.updateList}                                                            
                            />
                        </Table.Cell>                                                                  
                    </Table.Row>
                );
            })
        )
    }
}