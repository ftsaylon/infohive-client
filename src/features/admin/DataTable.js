import React, { Component } from 'react'
import { Grid, Input, Table, Pagination } from 'semantic-ui-react';

class DataTable extends Component{
    constructor(props){
        super(props)

        this.state = {
            activePage: 1,
            activeItems: [],
            searchPool: [],
            filter: ''
        }

        this.changePage = this.changePage.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.changeDisplayedProducts = this.changeDisplayedProducts.bind(this);
    }

    componentDidMount(){
        this.setState({activeItems: this.props.data.slice(0, 10), searchPool: this.props.data})
    }

    componentWillReceiveProps(nextProps){
        this.setState({searchPool: nextProps.data})
        this.setState({activeItems: nextProps.data.slice(this.state.activePage*10-10, this.state.activePage*10)})
    }

    render(){
        return(
            <Grid.Column width={16} align='center'>
                <Grid.Row>
                <Pagination 
                    siblingRange={10}
                    activePage={this.state.activePage}
                    totalPages={Math.ceil(this.state.searchPool.length/10)}
                    onPageChange={this.changePage}/> <br />
                </Grid.Row>
                <Grid.Row align='right'>
                <Input name="filter" onChange={this.handleChange} placeholder="Search"/> 
                </Grid.Row>
                <Table fixed celled selectable sortable unstackable large="true" textAlign="center">
                    {this.props.headers()}
                    <Table.Body>  
                        {this.props.rows(this.state.activeItems)}
                    </Table.Body>
                </Table>
            </Grid.Column>
        )
    }

    changePage(e, { activePage }){
        this.setState({ activePage })
        this.setState({activeItems: this.state.searchPool.slice(activePage*10 - 10, activePage*10)})
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value }, this.changeDisplayedProducts);
        // callback = dynamic search
    }

    changeDisplayedProducts(){
        var filter = this.state.filter.toLowerCase();
        // this.componentWillReceiveProps({data: this.props.data.filter(this.props.searchFxn(filter))})
        this.setState({searchPool: this.props.data.filter(this.props.searchFxn(filter))}, () => {
            if(this.state.searchPool.length !== 0 && Math.ceil(this.state.searchPool.length/10) < this.state.activePage){
                this.setState({activePage: Math.ceil(this.state.searchPool.length/10)}, () => {
                    this.setState({activeItems: this.state.searchPool.slice(this.state.activePage*10-10, this.state.activePage*10)})
                })
            }
            else{
                this.setState({activeItems: this.state.searchPool.slice(this.state.activePage*10-10, this.state.activePage*10)})
            }
        })
    }
}

export default DataTable;