import React, {Component} from 'react'
import { Grid, Feed, Segment, Icon, Button, Form } from 'semantic-ui-react'
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import FBLoginButton from '../login/FBLoginButton';
import GoogleLoginButton from '../login/GoogleLoginButton';
// import GeneralConfirm from './../modals/GeneralConfirm'

// helpers
import {getUserTag, getProfile, setProfile} from '../../sessionhandler'

class NewsCommentSection extends Component{
	constructor(props){
		super(props)
		/*
			newsId
		*/

		this.state = {
			comments: [],
			comment: '',
			openConfirm: false
		}

		this.logIn = this.logIn.bind(this);
		this.login = this.login.bind(this);
        this.timeSplitter = this.timeSplitter.bind(this);
		this.comments = this.comments.bind(this);
		this.sendComment = this.sendComment.bind(this);
		this.commentHandler = this.commentHandler.bind(this);
		this.updateList = this.updateList.bind(this);
		this.checkUser = this.checkUser.bind(this);
    }

	componentDidMount(){
		this.updateList();
	}

	updateList(){
		axios.get(`/news/${this.props.newsId}/comment`)
		.then((response) => {
            this.setState({
                comments: response.data
            })
        })
        .catch(err => {
        	console.log(err.response)
        })
	}

	handleDeleteSubmit = (event, path, id, user) => {
		event.preventDefault();

		axios.delete(`/${path}/${id}`, { data: { user_tag: getUserTag() }})
		.then(res => {
			// console.log(res);
			// console.log(res.data);
			NotificationManager.success(res.data.message)
			this.updateList();
		})
		.catch(err => {
			console.log(err.response)
			NotificationManager.error(`Something went wrong while deleting ${path}`)
		})
    }
	
	render(){
		return(
			<Grid.Row columns={1}>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={12} textAlign="right">
                    <Segment attached="top" color='light blue'>
						<Form onSubmit={this.sendComment} >
                        	<Form.Field  onChange={this.commentHandler}>
							<label style={{textAlign:"left"}}> Comment: </label>
							<input required name='comment' size="massive" value={this.state.comment} placeholder='Enter comment here...'/>
							</Form.Field>
							{getUserTag() ? 
							(
								this.details()
							) :
							(
								this.logIn()
							)}
						</Form>
                        
                    </Segment>
                    <Segment attached>
                        <Feed size={"large"}>
                        	{this.comments()}
                        </Feed>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
		)
	}

	logIn(){
        return(
            <Grid style={{ width: "50%" }}>
				<Grid.Column width={8}>
					<FBLoginButton content='Comment with Facebook' onChange={this.props.onChange} login={this.login}/>
				</Grid.Column>
				<Grid.Column width={8}>
					<GoogleLoginButton content='Comment with Google' onChange={this.props.onChange} login={this.login}/>
				</Grid.Column>
            </Grid>
        )
    }

    details(){
        return(
            <Button color={getProfile().mode} type='submit'>
                <Icon name='check' /> Comment as {getProfile().name}
            </Button>
        )
    }
	
    timeSplitter(string){
		var temp = string.split("T");
        return temp[0];
    }

	checkUser(item){
		if(item.commenter === getProfile().name) return true;
	}
	
    comments(){
    	return(
	        this.state.comments.map((item,index) => {
	            return(
	                <Feed.Event key={index}>
	                    <Feed.Label>
	                        { /*<img src='/assets/images/avatar/small/elliot.jpg' alt="TEXT"/>*/ }
	                    </Feed.Label>
	                    <Feed.Content>
	                        <Feed.Summary>
	                        <Feed.User>{item.commenter}</Feed.User>
	                        <Feed.Date>{this.timeSplitter(item.date)}</Feed.Date>
							{				
								this.checkUser(item) ?
								(
									<Button
										size="mini"
										color="red" 
										compact
										inverted
										onClick={(e) => {
											this.handleDeleteSubmit(e, "newscomment", item.id)
										}}
									>
										Delete
									</Button>
									
								):(
									<div></div>
								)
							}
	                        </Feed.Summary>
	                        <Feed.Extra text>
								{item.comment}
	                        </Feed.Extra>          
	                    </Feed.Content>
	                </Feed.Event>                                            
				);
	        })
        )
    }

    sendComment(){
    	axios.post(`/news/${this.props.newsId}/newscomment/`, {
    		user_tag: getUserTag(),
    		comment: this.state.comment,
    		commenter: getProfile().name
    	})
    	.then(response => {
    		// console.log(response)
			this.componentDidMount();
			this.setState({ comment: ''});
    	})
    	.catch(err => {
    		console.log(err.response)
    	})
    }

    commentHandler(e){
    	this.setState({ comment: e.target.value })
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

export default NewsCommentSection;