import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';
import {Button, Icon} from 'semantic-ui-react'
import FacebookProvider, {Login} from 'react-facebook'
import axios from 'axios'

class FBSignUpButton extends Component{
	constructor(props){
		super(props)

		this.handleResponse = this.handleResponse.bind(this)
	}

	handleResponse(response){
		// console.log(response)
		var email = response.profile.email
		var name = response.profile.name
		var picture = response.profile.picture.data.url
		axios.post(`/customer`, {email: response.profile.email})
		.then(res => {
			// console.log(response)
			NotificationManager.success("Successfully signed up with Facebook")
			this.props.login(email, name, picture, 'facebook', response.tokenDetail.accessToken)
		})
		.catch(err => {
			// console.log(err.response)
			if(err.response && err.response.data.message === 'Email already has an account'){
				return NotificationManager.error("Email already has an account")
			}
			else{
				return console.log(err)
			}
				
		})
	}

	render(){
		return(
			<FacebookProvider appId='2212776085617671'>
				<Login
					fields='email,name,picture'
					onResponse={this.handleResponse}
					onError={this.handleError}
					render={({isLoading, isWorking, onClick}) => (
						<Button style={{ width: "100%" }} color='facebook' onClick={onClick}  loading={(isLoading || isWorking) ? true : false}>
							<Icon name='facebook' />Sign Up with Facebook
						</Button>
						)}
				/>
			</FacebookProvider>
		)
	}

	signup(){

	}
}

export default FBSignUpButton;
