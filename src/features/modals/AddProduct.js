import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { getUserTag } from '../../sessionhandler';
class AddProduct extends Component{
    constructor(props){
		super(props);
		this.state={
            name: '',
            category_id: -1,
            description: '',
            size: '',
            price: '',
            stock: '',
            file:null,
            imageUrl: '',
            siteUrl: '',
            distributorId: '',
            contactId: '',
            nameError: false,
            categoryError: false,
            descriptionError: false,
            stockError: false,
            sizeError: false,
            priceError: false,
            imageUrlError: false,
            siteUrlError: false,
            distributorIdError: false,
            contactIdError: false,
            showModal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleContactChange = this.handleContactChange.bind(this);
        this.handleDistributorChange = this.handleDistributorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.uploadImageHandler = this.uploadImageHandler.bind(this);
	}

    handleChange = event => {
        this.setState({ 
            [event.target.name] : event.target.value }
        );
    }

    formValidation(){
        const {
            name,
            category_id,
            description,
            size,
            price,
            stock,
            distributorId,
            contactId
        } = this.state

        const nameregex = /[±!@£$%^&*_§¡€#¢§¶•ªº«/<>?:;|=,]/;
        const sizeregex = /[±!@£$%^&*_+§¡€#¢§¶•ªº«/<>?:;|=.,]/;
        var flag = true;

        if(name.match(nameregex) || name.length ===0){
            this.setState({nameError:true})
            flag = false;
        }else{
            this.setState({nameError:false})
        }
        if(isNaN(category_id) || category_id<=0){
            this.setState({categoryError:true});
            flag=false;
        }else{
            this.setState({categoryError:false});
        }
        if(size.match(sizeregex) || size.length === 0){
            this.setState({sizeError:true});
            flag=false;
        }else{
            this.setState({sizeError:false});
        }
        if(price>0){
            this.setState({priceError:false});
        }else{
            this.setState({priceError:true});
            flag=false;
        }
        if(stock>0){
            this.setState({stockError:false});
        }else{
            this.setState({stockError:true});
            flag=false;
        }
        if(isNaN(distributorId) || distributorId.length === 0){
            this.setState({distributorIdError:true});
            flag=false;
        }else{
            this.setState({distributorIdError:false});
        }
        if(isNaN(contactId) || contactId.length === 0){
            this.setState({contactIdError:true});
            flag=false;
        }else{
            this.setState({contactIdError:false});
        }
        if(description.length>0){
            this.setState({descriptionError:false});
        }else{
            this.setState({descriptionError:true});
            flag = false;
        }
        return flag;
    }

    handleDistributorChange = (event, data) => {
        this.setState({ distributorId : data.value });
    }

    handleContactChange = (event, data) => {
        this.setState({ contactId : data.value });
    }

    handleCategoryChange = (event, data) => {
        this.setState({ category_id : data.value });
    }
    uploadImageHandler = event =>{
        console.log(event.target.files[0]);
        this.setState({file: event.target.files[0]},()=>{
            console.log(this.state.file);
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        const {
            name,
            category_id,
            description,
            size,
            price,
            stock,
            imageUrl,
            siteUrl,
            distributorId,
            contactId,
        } = this.state

        var product = {
            name: name,
            category_id: category_id,
            description: description,
            size: size,
            price: price,
            stock: stock,
            imageUrl: imageUrl,
            siteUrl: siteUrl,
            distributorId: distributorId,
            contactId: contactId,
            user_tag: getUserTag()
        };

        if(this.formValidation()){
            console.log(this.state);


                //Image Insert
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                var fd = new FormData();
                fd.append('image',this.state.file);
                axios.post('http://localhost:5000/upload', fd, config)      //Image Insert
                
                .then(                  //Generated File name
                    (res)=>{
                        console.log(res.data);    
                        product.imageUrl = 'http://localhost:5000/images/'+res.data;            //Update URL
                        // console.log("UPDATED PRODUCT");
                        // console.log(product);
                        axios.post(`/product`, product )                        //Actual Product Insert
                        .then(res => {
                            this.props.updateList("product", 'added');
                            this.setState({         
                                name: '',
                                category_id: '',
                                description: '',
                                size: '',
                                price: '',
                                quantity: '',
                                imageUrl: '',
                                siteUrl: '',
                                distributorId: '',
                                contactId: ''
                            });
                            this.closeModal();
                        })
                        .catch(e => {
                            console.log(e.response);
                        })
                    }
                )
                    
                



        }
        // console.log(this.state);
    }

    closeModal = () => {
        this.setState({ showModal:false })
    }    

    clearFields(){
        this.setState({
            name: '',
            category_id: -1,
            description: '',
            size: '',
            price: '',
            stock: '',
            imageUrl: '',
            siteUrl: '',
            distributorId: '',
            contactId: '',
            nameError: false,
            categoryError: false,
            descriptionError: false,
            stockError: false,
            sizeError: false,
            priceError: false,
            imageUrlError: false,
            siteUrlError: false,
            distributorIdError: false,
            contactIdError: false,
            showModal: false
        })
    }

    render(){
        // const { showModal } = this.state;
        
        const distributorOptions = this.props.distributor.map(
            ({id, name}) => ({ key: id, value: id, text: name })
        )

        const contactOptions = this.props.contact.map(
            ({id, name}) => ({ key: id, value: id, text: name })
        )

        const categoryOptions = this.props.category.map(
            ({id, category}) => ({ key: id, value: id, text: category })
        )

        const {
            nameError,
            categoryError,
            descriptionError,
            // imageUrl,
            stockError,
            sizeError,
            priceError,
            distributorIdError,
            contactIdError,
            showModal,
            name,
            category_id,
            description,
            size,
            price,
            stock,
            siteUrl,
            distributorId,
            contactId,
        } = this.state
        
        return(
            <div>
                <Modal size="tiny" closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}>Add Product</Button>}>
                    <Modal.Header>Add Product</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Field width={8} required onChange={this.handleChange} error={nameError}>
                                <label>Product Name</label>
                                <input required value={name} name='name' placeholder='Product Name' />
                            </Form.Field>
                            <Form.Field width={8} required onChange={this.handleChange} error={categoryError}>
                                <label>Category</label>
                                <Dropdown
                                    name='category' 
                                    placeholder='Select a Category'
                                    fluid
                                    search
                                    selection
                                    value = {category_id}
                                    options={categoryOptions}
                                    onChange={this.handleCategoryChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field required onChange={this.handleChange} error={descriptionError}>
                            <label>Description</label>
                            <TextArea value={description} name='description' placeholder='Product Description' />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field required onChange={this.handleChange} error={sizeError}>
                                <label>Size</label>
                                 <input required value={size} name='size' placeholder='Size (ex. 10 ml, 1 ft, 1 m)' maxLength={20}/>
                            </Form.Field>
                            <Form.Field required onChange={this.handleChange} error={priceError}>
                                <label>Price</label>
                                <input required value={price} name='price' type="number" min={0} placeholder='Set Price' max="99999" step={.01}/>
                        </Form.Field>
                            <Form.Field onChange={this.handleChange} error={stockError}>
                                <label>Stocks</label>
                                <input required value={stock} name='stock' type="number" min={0} placeholder='Set Stock' max="99999"/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={10} onChange={this.handleChange}>
                                <label>Site URL</label>
                                <input value={siteUrl} name='siteUrl' placeholder="ex. http://google.com" maxLength={30}/>
                            </Form.Field>
                            <Form.Field onChange={this.handleChange}>
                                <label>Image URL</label>
                                {/* <input name='imageUrl' defaultValue={this.state.imageUrl} placeholder="ex. http://google.com" maxLength={100}/> */}
                                <input name="image" type="file" onChange={this.uploadImageHandler}   />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={8} required error={distributorIdError}>
                                <label>Select Distributor</label>
                                <Dropdown
                                    name='distributorId'
                                    placeholder="Select Distributor"
                                    fluid
                                    search
                                    selection
                                    value = {distributorId}
                                    options={distributorOptions}
                                    onChange={this.handleDistributorChange}
                                />
                            </Form.Field>
                            <Form.Field width={8} required error={contactIdError}>
                                <label>Select Contact Person</label>
                                <Dropdown
                                    name='contactId'
                                    placeholder="Select Contact Person"
                                    fluid
                                    search
                                    selection
                                    value = {contactId}
                                    options={contactOptions}
                                    onChange={this.handleContactChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Button positive type="submit">Submit</Button>
                        <Button negative onClick={(e) => {this.closeModal(e); this.clearFields(e)}}>Cancel</Button>
                    </Form>                        
                    </Modal.Content>
                </Modal>                            
            </div>
        )
    }
}

export default AddProduct;