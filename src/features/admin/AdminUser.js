import React, { Component } from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import { Header, Container, Divider, Table, Button, Icon } from 'semantic-ui-react';
import GeneralConfirm from './../modals/GeneralConfirm';


// helpers
import { getUserTag } from '../../sessionhandler'

class AdminUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            search: '',
            openConfirm: false
        }

        this.updateList = this.updateList.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
        this.closeConfirm = this.closeConfirm.bind(this);
        this.handleSetAdmin = this.handleSetAdmin.bind(this);
    }

    componentDidMount(){
        axios.post('/users', {user_tag: getUserTag()})
        .then(response => {
            this.setState({ users: response.data })
        })
        .catch(err => {
            if(err.response){
                return console.log(err.response)
            }
            return console.log(err)
        })
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    updateList = (action) => {
        axios.post(`/users`, {user_tag: getUserTag()}).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ users: response.data });
                NotificationManager.success(`Successfully ${action} user/s`);
            }
        )
    }

    handleDeleteSubmit = (event, id) => {
        event.preventDefault();
        this.setState({data: {path: "users", id: id}})
        this.openConfirm()
    }

    handleDeleteSubmitConfirmed = (path, id) => {
        axios.delete(`/${path}/${id}`, { data: { user_tag: getUserTag() }})
        .then(res => {
            this.updateList('deleted');
        })
        .catch(err => {
            console.log(err.response)
            NotificationManager.error(`Something went wrong while deleting user`)
        })
    }

    handleSetAdmin = (event, id, path, privileges) => {
        event.preventDefault();

        const data = {
            privileges: privileges,
            user_tag: getUserTag()
        }

        console.log(id, privileges);

        axios.put(`/${path}/${id}`, data)
        .then(res => {
            this.updateList('updated');
        })
        .catch(err => {
            console.log(err.response)
            NotificationManager.error(`Something went wrong while updating user`)
        })
    }

    openConfirm(){
        this.setState({openConfirm: true})
    }

    closeConfirm(){
        this.setState({openConfirm: false})
    }

    render(){
        return(
            <div>
                <GeneralConfirm 
                    open={this.state.openConfirm} 
                    onResult={this.closeConfirm} 
                    onConfirm={this.handleDeleteSubmitConfirmed}
                    data={this.state.data}
                />
                <Divider hidden/>
                <Container>
                <Header as="h1">Users</Header>
                <Divider hidden/>
                    <Table stackable large="true" textAlign="left" celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>User Name</Table.HeaderCell>
                                <Table.HeaderCell>Email Address</Table.HeaderCell>
                                <Table.HeaderCell>Admin</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>     
                        </Table.Header>
                        <Table.Body >
                        {
                            this.state.users.map( (item, index) => {
                                if(item.product_id === this.state.search || this.state.search === ''){
                                    return(
                                        <Table.Row key={index}>
                                            <Table.Cell textAlign="left">{item.name}</Table.Cell>                   
                                            <Table.Cell textAlign="left">{item.email}</Table.Cell>                   
                                            <Table.Cell textAlign="right">
                                                {
                                                    (item.is_admin === 1) ?
                                                    (
                                                       <p>Yes</p> 
                                                    ):
                                                    (
                                                        <p>No</p>
                                                    )

                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                            {
                                                (item.is_admin === 1) ?
                                                (
                                                    <Button 
                                                        onClick={(e) => {this.handleSetAdmin(e, item.id, "users", 0);}} 
                                                        compact
                                                        attached="top"
                                                    >
                                                        Remove as Admin
                                                    </Button>
                                                ):(
                                                    <Button 
                                                        onClick={(e) => {this.handleSetAdmin(e, item.id, "users", 1);}} 
                                                        compact
                                                        attached="top"
                                                    >
                                                        Set as Admin
                                                    </Button>
                                                )
                                            }
                                            <Button 
                                                onClick={(e) => {this.handleDeleteSubmit(e, item.id);}} 
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
                                }
                                return null;
                            })
                        }   
                        </Table.Body>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AdminUser;