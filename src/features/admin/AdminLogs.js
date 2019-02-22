import React, { Component } from 'react';
import axios from 'axios';
import { Header, Container, Form, Divider, Table, Button, Grid } from 'semantic-ui-react';
import moment from 'moment';

// helpers
import { getUserTag } from '../../sessionhandler';

class AdminLogs extends Component{
    constructor(props){
        super(props);
        this.state = {
            stocklog:[],
            pricelog:[],
            search:''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.post('/logs/pricechange', {user_tag: getUserTag()})
        .then(response => {
            this.setState({ pricelog: response.data })
        })
        .catch(err => {
            if(err.response){
                return console.log(err.response)
            }
            return console.log(err)
        })

        axios.post('/logs/stockchange', {user_tag: getUserTag()})
        .then(response => {
            this.setState({ stocklog: response.data })
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

    handleSearchChange = (event, data) => {
        event.preventDefault();
        this.setState({ search : data.value });
    }

    render(){
        const productOptions = this.props.product.map(
            (item) => ({ key: item.id, value: item.id, text: item.name })
        )

        return(
            <div className="AdminLogs">
                <Divider hidden/>
                <Container>
                <Header as="h1">Logs</Header>
                <Form onSubmit={this.handleSearchChange}> 
                    <Form.Dropdown
                        width={5}
                        label="Select Product"
                        search
                        fluid
                        selection
                        scrolling
                        name="search"
                        value={this.state.search}
                        options={productOptions}
                        placeholder="Product Name"
                        onChange={this.handleSearchChange}
                    />
                    <Button name="search" value=''> See All Products </Button>
                </Form>
                <Divider hidden/>
                <Grid columns={2}>
                    <Grid.Column>
                        <Header>Stock Change Logs</Header>
                        <Table stackable large="true" textAlign="left" celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                                    <Table.HeaderCell>Stocks Left</Table.HeaderCell>
                                    <Table.HeaderCell>Change in Stocks</Table.HeaderCell>
                                    <Table.HeaderCell>Date (YYYY-MM-DD)</Table.HeaderCell>
                                </Table.Row>     
                            </Table.Header>
                            <Table.Body >
                            {
                                this.state.stocklog.map( (item, index) => {
                                    if(item.product_id === this.state.search || this.state.search === ''){
                                        return(
                                            <Table.Row key={index}>
                                                <Table.Cell textAlign="left">{item.name}</Table.Cell>                   
                                                <Table.Cell textAlign="left">{item.stocks_left}</Table.Cell>                   
                                                <Table.Cell textAlign="right">{item.stocks_changed}</Table.Cell>                   
                                                <Table.Cell textAlign="right">
                                                    {moment(new Date(item.date)).format("YYYY-MM-DD")}
                                                </Table.Cell>                   
                                            </Table.Row>
                                        );
                                    }
                                    return null;
                                })
                            }   
                            </Table.Body>
                        </Table>

                    </Grid.Column>
                    <Grid.Column>
                        <Header> Price Change Logs</Header>
                        <Table stackable large="true" textAlign="left" celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Date (YYYY-MM-DD)</Table.HeaderCell>
                                </Table.Row>     
                            </Table.Header>
                            <Table.Body >
                            {
                                this.state.pricelog.map( (item, index) => {
                                    if(item.product_id === this.state.search || this.state.search === ''){
                                        return(
                                            <Table.Row key={index}>
                                                <Table.Cell textAlign="left">{item.name}</Table.Cell>                   
                                                <Table.Cell textAlign="left">{item.price}</Table.Cell>                   
                                                <Table.Cell textAlign="right">
                                                    {moment(new Date(item.date)).format("YYYY-MM-DD")}
                                                </Table.Cell>                        
                                            </Table.Row>
                                        );
                                    }
                                    return null;
                                })
                            }   
                            </Table.Body>
                        </Table>

                    </Grid.Column>

                </Grid>
                </Container>
            </div>
        )
    }
}

export default AdminLogs;