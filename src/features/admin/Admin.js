import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';

import AdminContacts from './AdminContacts';
import AdminDistributors from './AdminDistributors';
import AdminProducts from './AdminProducts';
import AdminSales from './AdminSales';
import AdminCategory from './AdminCategory';
import AdminLogs from './AdminLogs';
import AdminUser from './AdminUser';
import AdminApprovals from './AdminApprovals';
import Tester from './../test/TestInput';
import GeneralConfirm from './../modals/GeneralConfirm';
import AdminBees from '../sp/AdminBees';
import UserFarmInfo from '../sp/UserFarmInfo';

// helpers
import {getUserTag} from '../../sessionhandler'

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            product:[],
            bee:[],
            contact:[],
            distributor:[],
            allProducts: [],
            category: [],
            isAdmin: false,
            openConfirm: false
        };

        this.updateList = this.updateList.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
        this.closeConfirm = this.closeConfirm.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
    }

    sortColumn(table, attribute){
        var list = [].concat(this.state[table])

        if(typeof(list[0][attribute]) === 'string'){
            list.sort((a, b) => {return a[attribute].toLowerCase().localeCompare(b[attribute].toLowerCase())})
        }
        else{
            list.sort((a,b) => {if(a[attribute] > b[attribute]) return 1; if (a[attribute] < b[attribute]) return -1; return 0})
        }
        this.setState({[table]: list})
    }

    componentDidMount(){
        axios.get(`/product`).then(
            (response)=>{
                // console.log(response.data);
                this.setState({ product:response.data });
            }
        )
        .catch(err => {
            if(err.response){
                console.log(err.response)
            }
            else console.log(err)
        })
        ;
        
        axios.get(`/contact`).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ contact:response.data });
			}
        );

        axios.get(`/distributor`).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ distributor:response.data });
			}
        );
        
        axios.get(`/category`).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ category:response.data });
			}
        );

        axios.get(`/bee`).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ bee:response.data });
			}
        );
        
        axios.post('/product/records', {user_tag: getUserTag()})
        .then(response => {
            this.setState({allProducts: response.data})
        })
        .catch(err => {
            if(err.response){
                return console.log(err.response)
            }
            return console.log(err)
        })
    }

    updateList = (path, action) => {
        axios.get(`/${path}`).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ [path]: response.data });
                NotificationManager.success(`Successfully ${action} ${path}`)
            }
        )
    }

    handleDeleteSubmit = (event, path, id) => {
        event.preventDefault();
        this.setState({data: {path: path, id: id}})
        this.openConfirm()
    }

    handleDeleteSubmitConfirmed = (path, id) => {
        axios.delete(`/${path}/${id}`, { data: { user_tag: getUserTag() }})
        .then(res => {
            // console.log(res);
            // console.log(res.data);
            this.updateList(path, 'deleted');
            if(path === 'distributor'){
                this.updateList('product', 'updated')
            }
        })
        .catch(err => {
            console.log(err.response)
            NotificationManager.error(`Something went wrong while deleting ${path}`)
        })
    }

    render(){
        return(
                <React.Fragment>
                    <GeneralConfirm 
                        open={this.state.openConfirm} 
                        onResult={this.closeConfirm} 
                        onConfirm={this.handleDeleteSubmitConfirmed}
                        data={this.state.data}/>
                        <Route
                            path="/admin/contacts"
                            exact={true}
                            render={
                                () => 
                                <AdminContacts 
                                    contact={this.state.contact}
                                    updateList={this.updateList}
                                    handleDeleteSubmit={this.handleDeleteSubmit}             
                                    sorter={this.sortColumn}
                                />
                            }
                        />    
                        <Route 
                            path="/admin/distributors"
                            exact={true}
                            render={
                                () => 
                                <AdminDistributors
                                    distributor={this.state.distributor}
                                    updateList={this.updateList}
                                    handleDeleteSubmit={this.handleDeleteSubmit}
                                    sorter={this.sortColumn}
                                />
                            }
                        />    
                        <Route 
                            path="/admin/products"
                            exact={true}
                            render={
                                (props) => 
                                <AdminProducts
                                    product={this.state.product}
                                    distributor={this.state.distributor}
                                    contact={this.state.contact}
                                    category={this.state.category}
                                    updateList={this.updateList}
                                    handleDeleteSubmit={this.handleDeleteSubmit}
                                    sorter={this.sortColumn}
                                />
                            }
                        />    
                        <Route 
                            path="/admin/sales"
                            exact={true}
                            render={
                                (props) => 
                                <AdminSales
                                    product={this.state.allProducts}
                                    handleSalesSubmit={this.handleSalesSubmit}
                                    salesSearch={this.state.salesSearch}
                                />
                            }
                        />
                        <Route 
                            path="/admin/categories"
                            exact={true}
                            render={
                                (props) => 
                                <AdminCategory
                                    category={this.state.category}
                                    updateList={this.updateList}
                                    handleDeleteSubmit={this.handleDeleteSubmit}
                                    {...props}
                                />
                            }
                        />
                        <Route 
                            path="/admin/users"
                            exact={true}
                            render={
                                (props) => 
                                <AdminUser
                                    {...props}
                                />
                            }
                        />   
                        <Route 
                            path="/admin/logs"
                            exact={true}
                            render={
                                (props) => 
                                <AdminLogs
                                    product={this.state.product}
                                    {...props}
                                />
                            }
                        />
                        <Route 
                            path="/admin/approvals"
                            exact={true}
                            render={
                                (props) => 
                                <AdminApprovals
                                    {...props}
                                />
                            }
                        />             
                        <Route  path="/admin/test"
                                exact={true}
                                // component={Tester}/>
                                render={
                                    (props) =>
                                <Tester {
                                    ...props}
                                />
                                } 
                        />
                        <Route 
                            path="/admin/bees"
                            exact={true}
                            render={
                                (props) => 
                                <AdminBees
                                    bee={this.state.bee}
                                    updateList={this.updateList}
                                    handleDeleteSubmit={this.handleDeleteSubmit}
                                    sorter={this.sortColumn}
                                />
                            }
                        />           
                        <Route path="/admin/farm/:id"
                            exact={true}
                            component={UserFarmInfo}
                        />
                </React.Fragment>
        )
    }

    openConfirm(){
        this.setState({openConfirm: true})
    }

    closeConfirm(){
        this.setState({openConfirm: false})
    }

}

export default Admin;