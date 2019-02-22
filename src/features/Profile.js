import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import axios from 'axios'
import FBLoginButton from './login/FBLoginButton'
import GoogleLoginButton from './login/GoogleLoginButton'
import FBSignUpButton from './login/FBSignUpButton'
import CartModal from './modals/CartModal'
import GoogleSignUpButton from './login/GoogleSignUpButton'

// helpers
import {logout, getUserTag, getProfile, setProfile} from '../sessionhandler'

class Profile extends Component{
	constructor(props){
		super(props)

		this.state = {
			changed: 0,
			opencart: false
		}

		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	render(){
		if(getUserTag()){
			return(this.loggedIn())
		}
		else{
			return(this.loggedOut())
		}
	}
	openModal(){
		this.setState({opencart:true});
	}
	loggedIn(){
		return(
			<Menu.Item>
				<Dropdown floating icon="user" className="link item" fluid>
					<Dropdown.Menu style={{right:0,left:'auto'}}>
						<Dropdown.Header>
							<Image size='mini' circular src={getProfile().picture} /> {getProfile().name}
						</Dropdown.Header>
						
						<Dropdown.Divider/>
							{/* <Dropdown.Item icon='shopping cart' text='My Cart' onClick={this.openModal}/> */}
							<CartModal opencart={this.state.opencart}/>
						<Dropdown.Item icon="clipboard" text="My Orders" as={Link} to="/orders"/>
						
						<Dropdown.Divider/>
						
						<Dropdown.Item textalign="center" icon="log out" text="Log out" onClick={this.logout}/>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
		)
	}

	loggedOut(){
		return(
			<Menu.Item>
				<Dropdown floating icon="user" className="link item" fluid>
					<Dropdown.Menu style={{right:0,left:'auto'}}>
						<Dropdown.Header>Log in</Dropdown.Header>
						<Dropdown.Divider/>
						<Dropdown.Item>
							<GoogleLoginButton onChange={this.props.onChange} login={this.login}/>
						</Dropdown.Item>
						<Dropdown.Item>
							<GoogleSignUpButton onChange={this.props.onChange} login={this.login}/>
						</Dropdown.Item>
						<Dropdown.Divider/>
						<Dropdown.Item>
							<FBLoginButton onChange={this.props.onChange} content='Login with Facebook' login={this.login}/>
						</Dropdown.Item>
						<Dropdown.Item>
							<FBSignUpButton onChange={this.changeHandler} content='Sign Up with Facebook' login={this.login}/>
						</Dropdown.Item>
						<Dropdown.Divider/>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
		)
	}

	logout(){
		logout()
		this.props.onChange()
		NotificationManager.success('Successfully Logged out','')
	}

	login(email, name, picture, mode, token){
		axios.get(`/customer/login/${mode.replace(/\s/g, '')}/${email}/${token}`)
		.then(response => {
			setProfile(name, picture, mode, JSON.stringify(response.data.result))
			this.props.onChange()
			NotificationManager.success(response.data.message)
		})
		.catch(err => {
			if(err.response){
				if(err.response.status === 404){
					return NotificationManager.warning(err.response.data.message)
				}
				return NotificationManager.error(err.response.data.message)

			}
			else{
				console.log(err)
				NotificationManager.error(`Something went wrong while logging in Bee with ${mode}`)
			}
		})
	}
}


export default Profile;