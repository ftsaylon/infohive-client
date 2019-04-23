import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Menu} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import Profile from './Profile.js';
import CartModal from './modals/CartModal';
import { getUserTag } from '../sessionhandler.js';

class Navbar extends Component{
	constructor(props){
		super(props);
		this.state={
			value:"",
			opencart:false
		}
		this.valueHandler = this.valueHandler.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
		this.searchTrigger = this.searchTrigger.bind(this);
		this.handleOpenCart = this.handleOpenCart.bind(this);
	}
	handleOpenCart(){
		if(this.state.opencart===true){
			this.setState({opencart:false})
		}else{
			this.setState({opencart:true})
		}
	}
	valueHandler(e){
		this.setState({value:e.target.value});
	}
	searchTrigger(){
		this.props.history.push(`/search/searchKey=${this.state.value}`);
	}

	clearSearch(){
		this.setState({value:''});
	}
	componentDidMount(){
		// console.log(this);
	}
	render(){
		return (
			<Fragment>
				<Menu attached="top" borderless stackable fluid size="huge">
					<Menu.Item 
						as={Link}
						name="Home"
						to="/" 
					/>
					<Menu.Item 
						as={Link}
						name="About"
						to="/about" 
					/>
					<Menu.Item 
						as={Link}
						name="FAQ"
						to="/faq" 
					/>
					<Menu.Item
						as={Link}
						name="Farm Maps"
						to="/farm-maps"
					/>
					<Menu.Item
						as={Link}
						name="Bee Forum"
						to="/forum"
					/>
					<Menu.Item position="right">
						<Form onSubmit={this.searchTrigger}>
							<Form.Field>
								<Input 
								action={<Button as={Link} id="searchbutton"  color='teal' icon='search' content='Search' to={`/search/searchKey=${this.state.value}`} onClick={this.clearSearch}/>}
								placeholder='Search...'
								onChange={this.valueHandler} 	 
								value={this.state.value}
								focus={true}
								onSubmit = {this.searchTrigger}
								id="searchbar" />						
							</Form.Field>
						</Form>
					</Menu.Item>															{/*Comment out if gonna remove sales*/}
					{			/*Comment out if gonna remove sales*/
						getUserTag() &&
						<Menu.Item icon='shopping cart' name='My Cart' onClick={() => {this.setState({opencart: true})}}/>
					}
					<Profile onChange={this.props.onChange}/>
				</Menu>
				{/* Others */}
				<CartModal opencart={this.state.opencart} handleOpenCart={this.handleOpenCart}/>    {/*Comment out if gonna remove sales*/}
			</Fragment>
		);
	}
}

export default withRouter(Navbar);
