import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import  {Card, Header, Image} from 'semantic-ui-react';

class CategoryProductList extends Component{
	constructor(props){
		super(props)
		/*
		totalProduct, categories
		*/
		this.showCategories = this.showCategories.bind(this)
	}

	render(){
		return(
			<Card.Group stackable itemsPerRow={4}>
				<Card as={Link} to="/all_products/product/">
					<Card.Content>
						<Image size="small" src="https://png.pngtree.com/element_origin_min_pic/16/07/06/09577c5f9cc3c6f.jpg"/>	
					</Card.Content>
					<Card.Header textAlign="center">
						<Header>All Products ({this.props.totalProducts}) </Header>
					</Card.Header>
				</Card>

			{this.showCategories()} 
			</Card.Group>
		)
	}

	showCategories(){
		return(
			this.props.categories.map((items,index)=>{
				return(
					<Card key={index} as={Link} to={"/"+items.category+"/product/"}>
						<Card.Content>
							<Image size="small" src="http://placehold.it/400x250"/>	
						</Card.Content>
						<Card.Header textAlign="center">
							<Header>{items.category} ({items.count}) </Header>
						</Card.Header>
					</Card>
				);
			})
		)
	}
}

export default CategoryProductList;