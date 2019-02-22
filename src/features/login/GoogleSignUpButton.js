import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';
import GoogleLogin from 'react-google-login'
import axios from 'axios'

class GoogleLoginButton extends Component{
	constructor(props){
		super(props)

		this.state = {

		}

		this.successHandler = this.successHandler.bind(this)

	}

	render(){
		return(
			<GoogleLogin
				className="ui red button"
                clientId='508874158886-c93pac6m7gt56gakfqjn5ppprjdodo7b.apps.googleusercontent.com'
				buttonText='Sign Up with Google'
				scope='email'
                onSuccess={this.successHandler}
				onFailure={this.errorHandler}
				style={{
					width: "100%"
				}}
			/>
		)
    }
    
    successHandler(response){
		// console.log(response.profileObj)
		var email = response.profileObj.email
		var name = response.profileObj.name
		var picture = response.profileObj.imageUrl
		axios.post(`/customer`, {email: email})
		.then(res => {
			// console.log(response)
			NotificationManager.success("Successfully signed up with Google")
			this.props.login(email, name, picture, 'google plus', response.accessToken)
		})
		.catch(err => {
			if(err.response && err.response.data.message === 'Email already has an account'){
				return NotificationManager.error("Email already has an account")
			}
			else{
				return console.log(err)
			}
		})
	}
	
	errorHandler(response){
		NotificationManager.error('Something went wrong while connecting to Google')
	}
}
export default GoogleLoginButton