import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

class AdminNavbar extends Component{
	constructor(props){
		super(props)

		this.state = {
			activeItem: null
		}

		this.changeActive = this.changeActive.bind(this)
	}

	changeActive(e, { name }){
		this.setState({ activeItem: name})
	}

	componentWillReceiveProps(nextProps){
		if(!nextProps.location.pathname.includes('admin')){
			this.setState({activeItem: null})
		}
	}

	render(){
		return (
			<div>
				<Menu attached="bottom" color="orange" borderless stackable fluid size="huge">
				<Menu.Item>
					<Dropdown text="Product Management" pointing>
					<Dropdown.Menu>
						<Dropdown.Item
							as={Link}
							name="Products"
							active={ this.state.activeItem === 'Products' }
							onClick={this.changeActive}
							to="/admin/products"
						>Products</Dropdown.Item>
						<Dropdown.Item 
							as={Link}
							name="Distributors"
							active={ this.state.activeItem === 'Distributors' }
							onClick={this.changeActive}
							to="/admin/distributors" 
						>Distributors</Dropdown.Item>
						<Dropdown.Item
							as={Link} 
							name="Contact Persons"
							active={ this.state.activeItem === 'Contact Persons' }
							onClick={this.changeActive}
							to="/admin/contacts" 
						>Contact Persons</Dropdown.Item>
					</Dropdown.Menu>
					</Dropdown>
					</Menu.Item>

					<Menu.Item>
					<Dropdown text="Sales Management" pointing>
					<Dropdown.Menu>
						<Dropdown.Item 
							as={Link}
							name="Sales"
							active={ this.state.activeItem === 'Sales' }
							onClick={this.changeActive}
							to="/admin/sales" 
						>Sales</Dropdown.Item>
						<Dropdown.Item 
							as={Link}
							name="Logs"
							active={ this.state.activeItem === 'Logs'}
							onClick={this.changeActive}
							to="/admin/logs" 
						>Logs</Dropdown.Item>
						<Dropdown.Item 
							as={Link}
							name="Pending Orders"
							active={ this.state.activeItem === 'Approvals'}
							onClick={this.changeActive}
							to="/admin/approvals" 
						>Pending Orders</Dropdown.Item>
					</Dropdown.Menu>
					</Dropdown>
					</Menu.Item>
					<Menu.Item 
						name="User Management"
						active={ this.state.activeItem === 'Users'}
						onClick={this.changeActive}
						as={Link}
						to="/admin/users"
					/>
				</Menu>
			</div>
		);
	}
}

export default withRouter(AdminNavbar);