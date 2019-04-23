import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Grid, Header, Table, Button, Icon, Container, Divider, Image } from 'semantic-ui-react';

// defined components
import DataTable from '../admin/DataTable'
import AddBee from './AddBee';
import UpdateBee from './UpdateBee';

export default class AdminBees extends Component{
    constructor(props){
        super(props);
        this.getBees = this.getBees.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
    }

	render(){
		return (
			<div className="AdminBees">
                <Container>
                    <Divider hidden/>
                    <Header as="h1">Bee Details</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6} textAlign="left">
                                <AddBee
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
                                rows={this.getBees} 
                                data={this.props.bee}
                                searchFxn={this.searchFxn}/>
                        </Grid.Row>
                        <Grid.Row>
                        </Grid.Row>
                    </Grid>
                </Container>
			</div>
		);
    }
    
    getBees(activeItems){
        return(
            activeItems.map((item,index)=>{
                return(
                    <Table.Row textAlign="center" key={index}>
                        <Table.Cell><Image circular size="tiny" src={item.imageUrl}/></Table.Cell>                   
                        <Table.Cell textAlign="left">{item.name}</Table.Cell>                  
                        <Table.Cell textAlign="left">{item.description}</Table.Cell>                 
                        <Table.Cell>
                            <UpdateBee
                                currentItem = {item}
                                updateList = {this.props.updateList}
                            />    
                            <Button 
                                onClick={(e) => {this.props.handleDeleteSubmit(e, "bee", item.id);}} 
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