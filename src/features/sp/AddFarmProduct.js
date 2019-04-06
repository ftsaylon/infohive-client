import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { getUserTag } from '../../sessionhandler';
class AddFarmProduct extends Component{
    constructor(props){
		super(props);
		this.state={
            products:[],
            product_id:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
	}

    handleChange = event => {
        this.setState({ 
            [event.target.name] : event.target.value }
        );
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.props.farm_id);
        const Product = {
            farm_id: this.props.farm_id,
            product_id: this.state.product_id,
            user_tag: getUserTag()
        };

        axios.post(`/farm/putproduct`, Product )                        //Actual Product Insert
        .then(res => {
            // this.props.updateList("Product", 'added');
            this.setState({         
                product_id:""
            });
            this.closeModal();
        })
        .catch(e => {
            console.log(e.response);
        })
    }

    closeModal = () => {
        this.setState({ showModal:false })
    }    

    clearFields(){
        this.setState({
            product_id:"",
            showModal: false
        })
    }

    componentDidMount(){
        axios.get(`/product`).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ products:response.data });
			}
        );
    }

    handleProductChange = (event, data) => {
        this.setState({ product_id : data.value });
    }

    render(){
        const { showModal } = this.state;

        const productOptions = this.state.products.map(
            ({id, name}) => ({ key: id, value: id, text: name })
        )  

        return(
            <div>
                <Modal size="tiny" closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}>Add Product to Farm</Button>}>
                    <Modal.Header> Add Product to Farm </Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field width={8} required>
                                <label>Select Product</label>
                                <Dropdown
                                    name='product_id'
                                    placeholder="Select Product"
                                    fluid
                                    search
                                    selection
                                    value = {this.state.product_id}
                                    options={productOptions}
                                    onChange={this.handleProductChange}
                                />
                        </Form.Field>
                        <Button positive type="submit">Submit</Button>
                        <Button negative onClick={(e) => {this.closeModal(e); this.clearFields(e)}}>Cancel</Button>
                    </Form>                        
                    </Modal.Content>
                </Modal>                            
            </div>
        )
    }
}

export default AddFarmProduct;