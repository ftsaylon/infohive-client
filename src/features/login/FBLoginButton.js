// libraries
import React, { Component } from 'react';
import FacebookProvider, {Login} from 'react-facebook'
import {NotificationManager} from 'react-notifications';
import {Button, Icon} from 'semantic-ui-react'

class FBLoginButton extends Component{
	constructor(props){
		super(props)

		this.state = {
			loading: 'loading'
		}

		this.handleResponse = this.handleResponse.bind(this)
	}

	handleResponse(response){
		// console.log(response)
		this.props.login(response.profile.email, response.profile.name, response.profile.picture.data.url, 'facebook', response.tokenDetail.accessToken)		
	}

	handleError(response){
		NotificationManager.error('Something went wrong while connecting to Facebook')
	}

	render(){
		return(
			<FacebookProvider appId='2212776085617671'>
				<Login
					fields='email,name,picture'
					onResponse={this.handleResponse}
					onError={this.handleError}
					render={({isLoading, isWorking, onClick}) => (
						<Button 
							style={{ width: "100%" }} 
							color='facebook' onClick={onClick} loading={(isLoading || isWorking) ? true : false}>
							<Icon name='facebook' />{this.props.content}
						</Button>
						)}
				/>
			</FacebookProvider>
		)
	}
}
export default FBLoginButton