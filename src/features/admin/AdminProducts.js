import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Grid, Header, Table, Button, Icon, Container, Divider, Image } from 'semantic-ui-react';

// defined components
import AddProduct from '../modals/AddProduct';
import AddStock from '../modals/AddStock';
import AdminCategory from './AdminCategory';
import DataTable from './DataTable'
import UpdateProduct from '../modals/UpdateProduct';

export default class AdminProducts extends Component{
    constructor(props){
        super(props);
        this.getProducts = this.getProducts.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
    }

	render(){
		return (
			<div className="AdminProducts">
                <Container>
                    <Divider hidden/>
                    <Header as="h1">Product Details</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6} textAlign="left">
                                <AdminCategory
                                    category={this.props.category}
                                    updateList={this.props.updateList}
                                    handleDeleteSubmit={this.props.handleDeleteSubmit}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6} textAlign="left">
                                <AddProduct
                                    updateList = {this.props.updateList}
                                    contact={this.props.contact}
                                    distributor={this.props.distributor}
                                    category={this.props.category}
                                />
                            </Grid.Column>
                            <Grid.Column width={10} textAlign="center">
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <DataTable 
                                headers={this.getHeaders}
                                rows={this.getProducts} 
                                data={this.props.product}
                                searchFxn={this.searchFxn}/>
                        </Grid.Row>
                        <Grid.Row>
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
                        <Table.Cell><Image circular size="tiny" src={item.imageUrl}/></Table.Cell>                   
                        <Table.Cell textAlign="left">{item.name}</Table.Cell>                  
                        <Table.Cell textAlign="left">{item.description}</Table.Cell>                   
                        <Table.Cell textAlign="right">{item.size}</Table.Cell>                   
                        <Table.Cell textAlign="right">
                            <CurrencyFormat 
                                value={item.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₱'}
                            />
                        </Table.Cell>                   
                        <Table.Cell textAlign="center">
                            <div>
                            {item.stock}
                            <AddStock
                                currentItem = {item}
                                updateList = {this.props.updateList}
                            />
                            </div>
                        </Table.Cell>                   
                        <Table.Cell textAlign="left">{item.contactName}</Table.Cell>                   
                        <Table.Cell textAlign="left">{item.distributorName}</Table.Cell>                   
                        <Table.Cell>
                            <UpdateProduct
                                currentItem = {item}
                                updateList = {this.props.updateList}
                                contact={this.props.contact}
                                distributor={this.props.distributor}
                                category={this.props.category}
                            />    
                            <Button 
                                onClick={(e) => {this.props.handleDeleteSubmit(e, "product", item.id);}} 
                                negative
                                compact 
                                attached="bottom"
                            >
                                <Icon name="delete"/>
                                Delete
                            </Button>
                        </Table.Cell>                                                                  
                    </Table.Row>
                );
            })
        )
    }

    getHeaders(){
        return(
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2}>Image</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('product', 'name')} width={3}>Name</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Description</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('product', 'size')} width={1}>Size</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('product', 'price')} width={1}>Price</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('product', 'stock')} width={2}>Stocks Left</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('product', 'contactName')} width={3}>Contact Person</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('product', 'distributorName')} width={3}>Distributor</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    searchFxn(filter){
        return (product) => {
            return (product.name.toLowerCase().includes(filter)	
                || product.distributorName.toLowerCase().includes(filter) 
                || product.contactName.toLowerCase().includes(filter) 
            )
        }
    }

    
}