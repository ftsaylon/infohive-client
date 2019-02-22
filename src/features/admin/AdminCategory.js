import React, { Component } from 'react';
import { Grid, Segment, Table, Button, Icon, Divider, Modal } from 'semantic-ui-react';

import AddCategory from '../modals/AddCategory';
import UpdateCategory from '../modals/UpdateCategory';


export default class AdminProducts extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: false
        };
    }

    closeModal = () => {
        this.setState({ showModal:false })
    }

	render(){
        const { showModal } = this.state;
        
        return (
			<div className="AdminProducts">
                <Modal size="tiny" closeIcon onClose={this.closeModal} open={showModal} trigger={
                    <Button
                        inverted
                        color="orange" 
                        onClick={() => this.setState({ showModal: true })}
                    >
                        Categories
                    </Button>
                }>
                    <Modal.Header as="h1">Product Categories</Modal.Header>
                    <Segment>
                    <Divider hidden/>
                    <AddCategory
                        updateList = {this.props.updateList}
                    />
                    <Divider hidden/>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Table compact celled padded textAlign="center">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width={12}>Name</Table.HeaderCell>
                                            <Table.HeaderCell width={4}>Actions</Table.HeaderCell>
                                        </Table.Row>     
                                    </Table.Header>
                                    <Table.Body>
                                    {
                                        this.props.category.map((item,index)=>{
                                            return(
                                                <Table.Row key={index}>            
                                                    <Table.Cell textAlign="left">{item.category}</Table.Cell>                          
                                                    <Table.Cell>
                                                        <UpdateCategory
                                                            updateList = {this.props.updateList}
                                                            currentItem = {item}
                                                        />
                                                        <Button 
                                                            onClick={(e) => {this.props.handleDeleteSubmit(e, "category", item.id);}} 
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
                                    }   
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Segment>
                </Modal>
			</div>
		);
	}
}