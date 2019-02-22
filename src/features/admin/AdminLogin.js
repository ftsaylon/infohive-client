import React, { Component } from 'react';
// import axios from 'axios';
import { Grid, Segment, Form, Button, Divider } from 'semantic-ui-react';
import Footer from './Footer';

export default class AdminLogin extends Component{
	render(){
		return (
			<div className="AdminLogin">
				<Divider hidden/>
				<Grid align="center" verticalAlign="middle" style={{height:'100%'}}>
					<Grid.Row>
						<Grid.Column width={6}></Grid.Column>
						<Grid.Column width={4} color="orange">
							<Form size="large">
								<Segment stacked>
									<Form.Input fluid icon="user" placeholder="Username"/>
									<Form.Input fluid icon="lock" placeholder="Password" type="password"/>
									<Button size='large'>
										Login
									</Button>
								</Segment>
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Footer/>
			</div>
		);
	}
}