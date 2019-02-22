import React, { Component } from 'react';
import  { Grid, Divider } from 'semantic-ui-react';
import axios from 'axios';
import CategoryProductList from './CategoryProductList';

class Home extends Component {
	constructor(props){
		super(props);
		this.state={
			categories:[],
			totalProducts: 0
		};
		this.countProducts = this.countProducts.bind(this);
	}
	
	countProducts(){
		var total = 0;
		var catArray = this.state.categories;
		catArray.forEach((item)=>{
			total += item.count;
		})
		this.setState({totalProducts:total});
	}

	componentDidMount(){
		axios.get(`/category/count`).then(
			(response)=>{
				this.setState({categories:response.data});
			}
		).then(()=>{
			this.countProducts();
		})
	}
	
	render() {
		return (
			<div className="Home">
				<Divider hidden/>
				<Grid divided="vertically">
					<Grid.Row align="center">
						<Grid.Column width={2}></Grid.Column>
						<Grid.Column width={12}>
							<CategoryProductList 
								totalProducts={this.state.totalProducts}
								categories={this.state.categories}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>			
			</div>
		);
	}
}   


export default Home;
