import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown, Icon } from 'semantic-ui-react';
import axios from 'axios';
import philippines from 'philippines';

// helpers
import {getUserTag} from '../../sessionhandler'

const getCities = (gprovince) => {
    var key = 0;
    var provKey = philippines.provinces.find( (province) => {
        return province.name === gprovince
    }).key
    return philippines.cities.filter( (city) => {
        if(city.province === provKey){
            city.text = city.name;
            city.key = key++;
            city.value = city.name;
            if(city.city) city.city = city.city.toString();
            return city;
        }
        return null;
    })
}

const getProvince = () => {
    return philippines.provinces.map( (province) => {
        province.text = province.name;
        province.value = province.name;
        return province;
    })
}

class UpdateContact extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            address: '',
            cities: [{text: "Select a province first", value: null}],
            provinces: getProvince(),
            city: '',
            province: '',
            zipcode: '',
            phone: '',
            webUrl: '',
            showModal: false,
            nameError:false,
            addressError:false,
            cityError:false,
            provinceError:false,
            zipcodeError:false,
            phoneError:false, 
            webUrlError:false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            id: this.props.toBeUpdated.id,
            name: this.props.toBeUpdated.name,
            address: this.props.toBeUpdated.address,
            province: this.props.toBeUpdated.province,
            city: this.props.toBeUpdated.city,
            zipcode: this.props.toBeUpdated.zipcode,
            phone: this.props.toBeUpdated.phone,
            webUrl: this.props.toBeUpdated.webUrl,
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.toBeUpdated.id,
            name: nextProps.toBeUpdated.name,
            address: nextProps.toBeUpdated.address,
            province: nextProps.toBeUpdated.province,
            city: nextProps.toBeUpdated.city,
            zipcode: nextProps.toBeUpdated.zipcode,
            phone: nextProps.toBeUpdated.phone,
            webUrl: nextProps.toBeUpdated.webUrl
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleProvinceChange = (event, data) => {
        this.setState({province: data.value, cities: getCities(data.value)})
    }

    handleCityChange = (event, data) => {
        this.setState({city: data.value})
    }

    formValidation(){
        const { 
            name,
            address,
            zipcode,
        } = this.state;

        const zipregex = /^[0-9]{4}$/;
        const nameregex = /[±!@£$%^&*_+§¡€#¢§¶•ªº«/<>?:;|=.,]/;
        var flag = true;
        
        //Comparison to Regex
        if(name.match(nameregex) || name.length===0){
            this.setState({nameError: true});
            flag = false;
        }else{
            this.setState({nameError:false});            
        }
        if(String(zipcode).match(zipregex)){
            this.setState({zipcodeError:false});
        }else{
            this.setState({zipcodeError:true});            
            flag = false;
        }
        // W/o Regex
        if(address.length>0){
            this.setState({addressError:false});
        }else{
            this.setState({addressError:true});            
            flag = false;
        }
        return flag;
    }
    
    handleSubmit = (event, id) => {
        event.preventDefault();

        const { 
            name,
            address,
            city,
            province,
            zipcode,
            phone,
            webUrl
        } = this.state;

        const contact = {
            name: name,
            address: address,
            city: city,
            province: province,
            zipcode: zipcode,
            phone: phone,
            webUrl: webUrl,
            user_tag: getUserTag()
        };

        if(this.formValidation()){
            axios.put(`/contact/${id}`, contact )
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.updateList("contact", 'edited');
                this.closeModal();
            })
            .catch(e => {
                console.log(e.response);
            })       
        }
    }

    closeModal = () => {
        this.setState({ showModal:false })
    }

    render(){
        const {
            id, 
            showModal,
            name,
            address,
            provinces,
            cities,
            city,
            province,
            zipcode,
            phone,
            webUrl,
            nameError,
            addressError,
            cityError,
            provinceError,
            zipcodeError,
            phoneError, 
            webUrlError
        } = this.state;

        return(
            <div>
                <Modal size="small" closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })} compact attached="top"> <Icon name="settings"/> Edit</Button>}>
                    <Modal.Header>Update Contact</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e) => {this.handleSubmit(e, id)}}>
                        <Form.Field required onChange={this.handleChange} error={nameError}>
                            <label>Contact Name</label>
                            <input required defaultValue={name} name="name" placeholder='Contact' maxLength={50}/>
                        </Form.Field>
                        <Form.Field required onChange={this.handleChange} error={addressError}>
                            <label>Address</label>
                            <input required defaultValue={address} name="address" placeholder='Address' maxLength={100} />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field width={6} required onChange={this.handleProvinceChange} error={provinceError}>
                                <label>Province</label>
                                <Dropdown value={province} name='province' placeholder='Select Province' search selection options={provinces} onChange={this.handleProvinceChange}/>
                            </Form.Field>
                            <Form.Field width={6} required onChange={this.handleCityChange} error={cityError}>
                                <label>City</label>
                                <Dropdown value={city} name="city" placeholder='Select City' search selection options={cities} onChange={this.handleCityChange}/>
                            </Form.Field>
                            <Form.Field width={4} required onChange={this.handleChange} error={zipcodeError}>
                                <label>Zip Code</label>
                                <input required name="zipcode" type="number" defaultValue={zipcode} min="0" max="99999"/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={4} required onChange={this.handleChange} error={phoneError}>
                                <label>Phone Number</label>
                                <input type='number' required defaultValue={phone} name="phone" placeholder='ex.  09123456789' maxLength={20}/>
                            </Form.Field>
                            <Form.Field width={12} onChange={this.handleChange} error={webUrlError}>
                                <label>Web URL</label>
                                <input defaultValue={webUrl} name="webUrl" placeholder="ex. https://google.com" maxLength={30} />
                            </Form.Field>
                        </Form.Group>
                        <Button type="submit" positive>Submit</Button>
                        <Button negative onClick={this.closeModal}>Cancel</Button>
                    </Form>                           
                    </Modal.Content>
                </Modal>                            
            </div>
        )
    }
}

export default UpdateContact;