import React, { Component } from 'react';
import axios from 'axios';
import { Header, Container, Form, Divider, Table, Button } from 'semantic-ui-react';
import moment from 'moment';

// helpers
import {getUserTag} from '../../sessionhandler'

class AdminSales extends Component{
    constructor(props){
        super(props);
        this.state = {
            start_date: '',
            end_date: '',
            search:'',
            sales:[],
            productOptions: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleTotalSalesDate = this.handleTotalSalesDate.bind(this);
        this.sortColumn = this.sortColumn.bind(this)
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSearchChange = (event, data) => {
        event.preventDefault();
        this.setState({ search : data.value });
    }

    handleSalesSubmit = event => {
        event.preventDefault();

        // console.log("Handle Sales");
        const data = {
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            user_tag: getUserTag()
        };

        axios.post(`/sales`, data)
        .then(
			(response)=>{
                this.setState({sales:response.data.result[0]});
            }
        );

        this.setState({ 
            search: this.state.search, 
            start_date: this.state.start_date,
            end_date: this.state.end_date,
        })
    }

    componentDidMount(){
        this.handleTotalSalesDate();
    }

    handleTotalSalesDate = event => {
        const data = {
            user_tag: getUserTag()
        };

        axios.post(`/sales/first`, data)
        .then(
			(response)=>{
                if(response.data.result[0].length === 0){
                    this.setState({ start_date: '' });
                }
                else{
                    const first_date = moment(new Date(response.data.result[0][0].date)).format("YYYY-MM-DD");
                    this.setState({ start_date: first_date });
                }
            }
        )

        axios.post(`/sales/latest`, data)
        .then(
            (response)=>{
                if(response.data.result[0].length === 0){
                    this.setState({ end_date: '' });
                }
                else{
                    const latest_date = moment(new Date(response.data.result[0][0].date)).add(1,'days').format("YYYY-MM-DD");
                    this.setState({ end_date: latest_date });
                }
            }
        )
    }

    sortColumn(attribute){
        console.log('sorting sale column')
        var list = [].concat(this.state.sales)

        if(typeof(list[attribute]) === 'string'){
            list.sort((a, b) => a[attribute].toString().localeCompare(b[attribute].toString()))
        }
        else{
            list.sort((a,b) => {if(a[attribute] > b[attribute]) return 1; if (a[attribute] < b[attribute]) return -1; return 0})
        }
        this.setState({sales: list})
    }

    render(){
        const productOptions = this.props.product.map(
            (item) => ({ key: item.id, value: item.id, text: item.name })
        )

        return(
            <div className="AdminSales">
                <Container>
                    <Divider hidden/>
                    <Header as="h1">Sales</Header>
                    <Form> 
                        <Form.Group>
                            <Form.Input
                                label="Enter Start Date" 
                                type="date"
                                name="start_date"
                                value={this.state.start_date}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label="Enter End Date" 
                                type="date"
                                name="end_date"
                                value={this.state.end_date}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button name="totalSales" onClick={this.handleTotalSalesDate}> Total Sales Date </Button>    
                        <Divider hidden/>
                        <Form.Group>
                            <Form.Dropdown
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
                        </Form.Group>
                        <Button type="submit" onClick={this.handleSalesSubmit}> Submit </Button>
                        <Button name="search" value='' onClick={this.handleSearchChange}> See All Products </Button>
                    </Form>

                    <Table sortable selectable stackable large="true" textAlign="left" celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell onClick={() => this.sortColumn('productName')}>Product Name</Table.HeaderCell>
                                <Table.HeaderCell onClick={() => this.sortColumn('distributorName')}>Distributor</Table.HeaderCell>
                                <Table.HeaderCell onClick={() => this.sortColumn('totalQuantity')}>Items Sold</Table.HeaderCell>
                                <Table.HeaderCell onClick={() => this.sortColumn('totalSales')}>Total Sales</Table.HeaderCell>
                            </Table.Row>     
                        </Table.Header>
                        <Table.Body >
                        {
                            this.state.sales.map( (item, index) => {
                                if(item.product_id === this.state.search || this.state.search === ''){
                                    return(
                                        <Table.Row key={index}>
                                            <Table.Cell textAlign="left">{item.productName}</Table.Cell>                   
                                            <Table.Cell textAlign="left">{item.distributorName}</Table.Cell>                   
                                            <Table.Cell textAlign="right">{item.totalQuantity}</Table.Cell>                   
                                            <Table.Cell textAlign="right">{item.totalSales}</Table.Cell>                                                                       
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
        )
    }
}

export default AdminSales;