// libraries
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import GoogleLogin from 'react-google-login'

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
				buttonText={this.props.content}
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
		// console.log(response)
		this.props.login(response.profileObj.email, response.profileObj.name, response.profileObj.imageUrl, 'google plus', response.accessToken)
	}
	
	errorHandler(response){
		NotificationManager.error('Something went wrong while connecting to Google')
	}
}
export default GoogleLoginButton;