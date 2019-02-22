import React, { Component } from 'react';
import { Grid, Header, Table, Button, Icon, Container, Divider } from 'semantic-ui-react';

// define components
import AddContact from '../modals/AddContact';
import DataTable from './DataTable'
import UpdateContact from '../modals/UpdateContact';


export default class AdminContacts extends Component{
    constructor(props){
        super(props);
        this.state = {
			filter:''
        };

        this.getContacts = this.getContacts.bind(this)
        this.getHeaders = this.getHeaders.bind(this)
    }

	render(){
		return (
			<div className="AdminContacts">
                <Container>
                    <Divider hidden/>
                    <Header as="h1">Contacts</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10} textAlign="left">
                            <AddContact
                                updateList = {this.props.updateList}
                            />
                            </Grid.Column>
                        </Grid.Row>                        
                        <Grid.Row>
                            <DataTable 
                                headers={this.getHeaders}
                                rows={this.getContacts} 
                                data={this.props.contact}
                                searchFxn={this.searchFxn}/>
                        </Grid.Row>
                    </Grid>
                </Container>
			</div>
		);
    }
    
    getContacts(activeItems){
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
                            <UpdateContact 
                                toBeUpdated={item}
                                updateList={this.props.updateList}
                            />
                            <Button 
                                onClick={(e) => {this.props.handleDeleteSubmit(e, "contact", item.id)}} 
                                negative
                                compact 
                                attached="bottom"
                                name="contacts"
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
                    <Table.HeaderCell onClick={() => this.props.sorter('contact', 'name')} width={2}>Name</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('contact', 'address')} width={2}>Address</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('contact', 'city')} width={2}>City</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('contact', 'province')} width={1}>Province</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('contact', 'zipcode')} width={1}>ZipCode</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('contact', 'phone')} width={2}>Phone#</Table.HeaderCell>
                    <Table.HeaderCell onClick={() => this.props.sorter('contact', 'webUrl')} width={2}>Web Url</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                </Table.Row>     
            </Table.Header>
        )
    }

    searchFxn(filter){
        return (contact) => {
            return (contact.name.toLowerCase().includes(filter)	
                || contact.address.toLowerCase().includes(filter) 
                || contact.city.toLowerCase().includes(filter) 
                || contact.province.toLowerCase().includes(filter) 
                || contact.zipcode.toString().includes(filter) 
                || contact.phone.toLowerCase().includes(filter) 
                || contact.webUrl.toLowerCase().includes(filter) 
            )
        }
    }
}