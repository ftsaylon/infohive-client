import React, { Component } from 'react';
import  {  Card, Grid , Image,Header,Icon} from 'semantic-ui-react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

export default class ProductList extends Component {
	constructor(props){
		super(props);
		this.state={
			products:[],
			categories:[],
			totalProducts: 0,
			isProductEmpty: false,
			isCategoryEmpty:false,
			products_view:[],
			categories_view:[],
			key:'',
			category:''

		};
		this.loadPage = this.loadPage.bind(this);
		this.setFilter = this.setFilter.bind(this);
		this.viewProduct = this.viewProduct.bind(this);
	}
	viewProduct(id){
		this.props.history.push({pathname:`/${this.props.match.params.category}/product/${id}`,state:{searchKey:this.state.key}})
	}
	static getDerivedStateFromProps(props, current_state) {
		if (current_state.key !== props.match.params.key) {
		  	return {
				key: props.match.params.key
			}
		}else{
			return null
		}
	}
	componentDidUpdate(prevProps, prevState){
		// console.log(this.state);
		if(this.state.products.length!==0){
			if(prevState.key!==this.state.key){
				this.setFilter();
			}			
		}
	}

	componentDidMount(){
		axios.all([
			axios.get('/product'),
			axios.get('/category/count')
		  ])
		  .then(axios.spread((productRes, categoryRes) => {
			// do something with both responses
			this.setState({ products:productRes.data,
							categories:categoryRes.data})
			return
		})).then(
			()=>{
				this.setFilter();
				return;
			}
		);
	}
	loadPage(){
		// console.log('load');
		// console.log(this.state);
		//Product Filter
		new Promise(
			(resolve,reject)=>{
				var temparray = [];
				var filter;
				if(this.state.key!==undefined){
					filter=this.state.key.toLowerCase();
				};
				if(this.state.category==='search'){
					if(this.state.key===undefined){
						temparray = this.state.products;
					}else{
						temparray = this.state.products.filter(product=>{
							return product.name.toLowerCase().includes(filter)	
						})	
					}
					resolve(temparray);
				}else if(this.state.category==='all_products'){
					resolve(this.state.products);
				}else{
					temparray = this.state.products.filter(product=>{
						return product.category === this.state.category	
					})
					resolve(temparray);
				}
			}
		).then(
			(value)=>{
				this.setState({products_view:value},
					()=>{
						if(this.state.products_view.length===0){
							this.setState({isProductEmpty:true})
						}else{
							this.setState({isProductEmpty:false})
						}
					});
				return;
			}
		)
		//Category Filter
		new Promise(
			(resolve,reject)=>{
				var temparray = [];
				var filter;
				if(this.state.key!==undefined){
					filter=this.state.key.toLowerCase();
				};
				if(this.state.category==='search'){
					if(this.state.key===undefined){
						temparray = this.state.categories;
					}else{
						temparray = this.state.categories.filter(category=>{
							return category.category.toLowerCase().includes(filter)	
						})	
					}
					resolve(temparray);
				}
			}
		).then(
			value=>{
				this.setState({categories_view:value},
					()=>{
						if(this.state.categories_view.length===0){
							this.setState({isCategoryEmpty:true})
						}else{
							this.setState({isCategoryEmpty:false})
						}
					});
				return;
			}
		)
	}
	setFilter(){
		if(this.props.match.params.category==='search'){
			this.setState({key:this.props.match.params.key,
							category:this.props.match.params.category},()=>{
								this.loadPage();
							});
		}else{
			this.setState({key:'',
				category:this.props.match.params.category,
				isCategoryEmpty:true
			},()=>{
					this.loadPage();
				});
		}
	}

	render() {
		return (
			<div className="Home">
        <br/><br/>

				<Grid divided="vertically">
					<Grid.Row align="center">
						<Grid.Column width={4}>
							{
								this.state.category==='all_products'?(
									<Header style={{marginLeft:'20vh'}}>All Products</Header>
								):(this.state.category==='search'?(
									<Header style={{marginLeft:'20vh'}}>You searched for: '{this.state.key}'</Header>
								):(
									<Header style={{marginLeft:'20vh'}}>Category: {this.state.category}</Header>
								)
							)
									
							}
						</Grid.Column>
					</Grid.Row>
					{
						this.state.category==='search' &&

						<Grid.Row>
							<Grid.Column width={4}>
								<Header style={{marginLeft:'30vh'}}>Categories</Header>
							</Grid.Column>
						</Grid.Row>
					}
					{
						this.state.isCategoryEmpty?(
							
								this.state.category==='search' &&
								<Grid.Row>
									<Grid.Column width={6}/>
									<Grid.Column align='center' width={4}>
										<Header as="h2" icon align="center">
											<Icon name='exclamation triangle' />
												No Categories to Show
											<Header.Subheader>Nothing to see here</Header.Subheader>
										</Header>
									</Grid.Column>
									<Grid.Column width={6}/>
								</Grid.Row>		

							
							):(
							<Grid.Row align="center">
								<Grid.Column width={2}></Grid.Column>
								<Grid.Column width={12}>
									<Card.Group stackable itemsPerRow={4}>
									{
										this.state.categories_view.map((item,index)=>{
											return(
											<Card key={index} onClick={()=>{this.viewProduct(item.id)}}>
												<Card.Content>
													<Image size="small" src="http://placehold.it/400x250"/>	
												</Card.Content>
												<Card.Header textAlign="center">
													{item.category} ({item.count})
												</Card.Header>
											</Card>
											);
										})
									} 
									</Card.Group>
								</Grid.Column>
							</Grid.Row>							
						)
					}

					<Grid.Row>
						<Grid.Column width={4}>
							<Header style={{marginLeft:'30vh'}}>Products</Header>
						</Grid.Column>
					</Grid.Row>
					{ this.state.isProductEmpty?(
							<Grid.Row>
							<Grid.Column width={6}/>
							<Grid.Column align='center' width={4}>
								<Header as="h2" icon align="center">
									<Icon name='exclamation triangle' />
										No Products to Show
									<Header.Subheader>Nothing to see here</Header.Subheader>
								</Header>
							</Grid.Column>
							<Grid.Column width={6}/>
						</Grid.Row>	
						):(
						<Grid.Row align="center">
							<Grid.Column width={2}></Grid.Column>
							<Grid.Column width={12}>
								<Card.Group stackable itemsPerRow={4}>
								{
										this.state.products_view.map((item,index)=>{
											return(
											<Card key={index} onClick={()=>{this.viewProduct(item.id)}}>
												<Card.Content>
													<Image circular size="small" src={item.imageUrl}/>	
												</Card.Content>
												<Card.Header textAlign="center">
													{item.name}
												</Card.Header>
												<Card.Content>
													<CurrencyFormat 
														value={item.price}
														displayType={'text'}
														thousandSeparator={true}
														prefix={'₱'}
													/>
												</Card.Content>
											</Card>
											);
										})
								} 
								</Card.Group>

							</Grid.Column>
						</Grid.Row>
						)
					}
				</Grid>
			</div>
		);
	}
}   

