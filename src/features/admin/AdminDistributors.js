import React, { Component } from 'react';
import { Grid, Header, Table, Button, Icon, Container, Divider } from 'semantic-ui-react';

// defined components
import AddDistributor from '../modals/AddDistributor';
import DataTable from './DataTable'
import UpdateDistributor from '../modals/UpdateDistributor';

export default class AdminDistributors extends Component{
    constructor(props){
        super(props);
        this.state = {
			filter:''
        };

        this.getDistributors = this.getDistributors.bind(this);
        this.getHeaders = this.getHeaders.bind(this)
    }

	render(){
		return (
			<div className="AdminDistributors">
                <Container>
                    <Divider hidden/>
                    <Header as="h1">Distributors</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10} textAlign="left">
                                <AddDistributor
                                    updateList = {this.props.updateList}
                                />
                           </Grid.Column>
                        </Grid.Row>  
                        <Grid.Row>
                            <DataTable 
                                headers={this.getHeaders}
                                rows={this.getDistributors} 
                                data={this.props.distributor}
                                searchFxn={this.searchFxn}/>
                        </Grid.Row>
                    </Grid>
                </Container>
			</div>
		);
    }
    
    getDistributors(activeItems){
        return(
            activeItems.map((item,index)=>{
                return(
                    <Table.Row key={index}>
                        <Table.Cell textAlign="left">{item.name}</Table.Cell>                   
                        <Table.Cell textAlign="left">{item.address}</Table.Cell>                   
                        <Table.Cell textAlign="left">{item.city}</Table.Cell>                   
                        <Table.Cell textAlign="left">{item.province}</Table.Cell>                   
                        <Table.Cell textAlign="right">{item.zipcode}</Table.Cell>                   
                        <Table.Cell textAlign="right">{item.phone}</Table.Cell>                   
                        <Table.Cell textAlign="left">{item.webUrl}</Table.Cell>                   
                        <Table.Cell>
                            <UpdateDistributor
                                toBeUpdated={item}
                                updateList={this.props.updateList}
                            />
                            <Button 
                                onClick={(e) => this.props.handleDeleteSubmit(e, "distributor", item.id)} 
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
                    <Table.HeaderCell onClick={() => this.props.sorter('distributor', 'name')} width={2}>Name</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('distributor', 'address')} width={2}>Address</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('distributor', 'city')} width={2}>City</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('distributor', 'province')} width={1}>Province</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('distributor', 'zipcode')} width={1}>ZipCode</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('distributor', 'phone')} width={2}>Phone#</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('distributor', 'webUrl')} width={2}>Web Url</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                </Table.Row>     
            </Table.Header>
        )
    }

    searchFxn(filter){
        return (distributor) => {
            return (distributor.name.toLowerCase().includes(filter)	
                || distributor.address.toLowerCase().includes(filter) 
                || distributor.city.toLowerCase().includes(filter) 
                || distributor.province.toLowerCase().includes(filter) 
                || distributor.zipcode.toString().includes(filter) 
                || distributor.phone.toLowerCase().includes(filter) 
                || distributor.webUrl.toLowerCase().includes(filter) 
            )
        }
    }
}