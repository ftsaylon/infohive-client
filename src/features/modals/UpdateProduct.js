import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown, TextArea, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { getUserTag } from '../../sessionhandler';

class UpdateProduct extends Component{
    constructor(props){
		super(props);
		this.state={
            id:'',
            name: '',
            category_id: '',
            description: '',
            size: '',
            price: '',
            imageUrl: '',
            siteUrl: '',
            distributorId: '',
            contactId: '',
            nameError: false,
            categoryError: false,
            descriptionError: false,
            quantityError: false,
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

    componentDidMount(){
        this.setState({
            id: this.props.currentItem.id,
            name: this.props.currentItem.name,
            category_id: this.props.currentItem.category_id,
            description: this.props.currentItem.description,
            size: this.props.currentItem.size,
            price: this.props.currentItem.price,
            imageUrl: this.props.currentItem.imageUrl,
            siteUrl: this.props.currentItem.siteUrl,
            distributorId: this.props.currentItem.distributorId,
            contactId: this.props.currentItem.contactId,
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: this.props.currentItem.id,
            name: nextProps.currentItem.name,
            category_id: nextProps.currentItem.category_id,
            description: nextProps.currentItem.description,
            size: nextProps.currentItem.size,
            price: nextProps.currentItem.price,
            imageUrl: nextProps.currentItem.imageUrl,
            siteUrl: nextProps.currentItem.siteUrl,
            distributorId: nextProps.currentItem.distributorId,
            contactId: nextProps.currentItem.contactId,
        })
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
    handleSubmit = (event, id) => {
        event.preventDefault();
        
        const {
            name,
            category_id,
            description,
            size,
            price,
            imageUrl,
            siteUrl,
            distributorId,
            contactId
        } = this.state

        const product = {
            name: name,
            category_id: category_id,
            description: description,
            size: size,
            price: price,
            imageUrl: imageUrl,
            siteUrl: siteUrl,
            distributorId: distributorId,
            contactId: contactId,
            user_tag: getUserTag()
        };

        if(this.formValidation()){
            
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            var fd = new FormData();
            fd.append('image',this.state.file);

            axios.post('http://localhost:5000/upload', fd, config)      //Image Insert
                
            .then(
                (res)=>{            //Actual Update
                    product.imageUrl = 'http://localhost:5000/images/' + res.data;
                    axios.put(`/product/${id}`, product )
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        this.props.updateList("product", 'edited');
                        this.closeModal();
                    }).catch(
                        (err)=>{
                            console.log(err.response);
                        }
                    );                    
                }
            );
            
            // axios.put(`/product/${id}`, product )
            // .then(res => {
            //     console.log(res);
            //     console.log(res.data);
            //     this.props.updateList("product", 'edited');
            //     this.closeModal();
            // }).catch(
            //     (err)=>{
            //         console.log(err.response);
            //     }
            // );
        }
    }

    closeModal = () => {
        this.setState({ showModal:false })
    }    

    render(){
        const {
            distributorId,
            contactId,
            sizeError,
            priceError,
            siteUrlError,
            distributorIdError,
            contactIdError,
            showModal
        } = this.state

        const distributorOptions = this.props.distributor.map(
            ({id, name}) => ({ key: id, value: id, text: name })
        )

        const contactOptions = this.props.contact.map(
            ({id, name}) => ({ key: id, value: id, text: name })
        )

        const categoryOptions = this.props.category.map(
            ({id, category}) => ({ key: id, value: id, text: category })
        )

        return(
            <div>
                <Modal size='tiny' closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })} compact attached="top"> <Icon name="settings"/> Edit</Button>}>
                    <Modal.Header>Update Product</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e) => this.handleSubmit(e, this.props.currentItem.id)}> 
                        <Form.Group>
                            <Form.Field width={8} required onChange={this.handleChange} error={this.state.nameError}>
                                <label>Product Name</label>
                                <input required name='name' defaultValue={this.state.name} placeholder='Product Name' />
                            </Form.Field>
                            <Form.Field width={8} required onChange={this.handleChange} error={this.state.categoryError}>
                                <label>Category</label>
                                <Dropdown
                                    name='category_id' 
                                    placeholder='Select a Category'
                                    fluid
                                    search
                                    selection
                                    value = {this.state.category_id}
                                    options={categoryOptions}
                                    onChange={this.handleCategoryChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field required onChange={this.handleChange} error={this.state.descriptionError}>
                            <label>Description</label>
                            <TextArea name='description' defaultValue={this.state.description} placeholder='Product Description' />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field width={8} required onChange={this.handleChange} error={sizeError}>
                                <label>Size</label>
                                <input required name='size' defaultValue={this.state.size} placeholder='Size (ex. 10 ml, 1 ft, 1 m)' maxLength={20}/>
                            </Form.Field>
                            <Form.Field width={8} required onChange={this.handleChange} error={priceError}>
                                <label>Price</label>
                                <input required name='price' defaultValue={this.state.price} type="number" placeholder='Set Price' min="0" max="99999" step={.01}/> 
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field onChange={this.handleChange} error={siteUrlError}>
                                <label>Site URL</label>
                                <input name='siteUrl' defaultValue={this.state.siteUrl} placeholder="ex. http://google.com" maxLength={100}/>
                            </Form.Field>
                            <Form.Field onChange={this.handleChange}>
                                <label>Image URL</label>
                                {/* <input name='imageUrl' defaultValue={this.state.imageUrl} placeholder="ex. http://google.com" maxLength={100}/> */}
                                <input name="image" type="file" onChange={this.uploadImageHandler}  />
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
                        <Button negative onClick={this.closeModal}>Cancel</Button>
                    </Form>                        
                    </Modal.Content>
                </Modal>                            
            </div>
        )
    }
}

export default UpdateProduct;