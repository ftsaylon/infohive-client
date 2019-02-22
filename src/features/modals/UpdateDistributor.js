import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown } from 'semantic-ui-react';
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

class UpdateDistributor extends Component{
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
    }

    componentDidMount(){
        this.setState({
            id: this.props.toBeUpdated.id,
            name: this.props.toBeUpdated.name,
            address: this.props.toBeUpdated.address,
            city: this.props.toBeUpdated.city,
            province: this.props.toBeUpdated.province,
            zipcode: this.props.toBeUpdated.zipcode,
            phone: this.props.toBeUpdated.phone,
            webUrl: this.props.toBeUpdated.webUrl
        })
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
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
        this.setState({province: data.value, cities: getCities(data.value), city: ''})
    }

    handleCityChange = (event, data) => {
        this.setState({city: data.value})
    }

    formValidation(){
        const zipregex = /^[0-9]{4}$/;
        const nameregex = /[±!@£$%^&*_+§¡€#¢§¶•ªº«/<>?:;|=.,]/;
        var flag = true;
        //Comparison to Regex
        if(this.state.name.match(nameregex) || this.state.name.length===0){
            this.setState({nameError: true});         
            flag = false;
        }else{
            this.setState({nameError:false});   
        }
        if(String(this.state.zipcode).match(zipregex)){
            this.setState({zipcodeError:false});
        }else{
            this.setState({zipcodeError:true});            
            flag = false;
        }
        // W/o Regex
        if(this.state.address.length>0){
            this.setState({addressError:false});
        }else{
            this.setState({addressError:true});            
            flag = false;
        }
        if(this.state.city.length>0){
            this.setState({cityError:false});
        }else{
            this.setState({cityError:true});            
            flag = false;
        }
        if(this.state.province.length>0){
            this.setState({provinceError:false});
        }else{
            this.setState({provinceError:true});            
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

        const distributor = {
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
            axios.put(`/distributor/${id}`, distributor )
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                this.props.updateList("distributor", 'edited');
                this.closeModal();
            })
            .catch(e => {
                console.log(e.response);
            })
        }
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    render(){
        const { 
            id,
            showModal,
            provinces,
            cities,
            city,
            province,
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
                <Modal size="small" closeIcon onClose={this.closeModal} open={showModal} trigger={<Button attached="top" onClick={() => this.setState({ showModal: true })}>Edit</Button>}>
                    <Modal.Header>Update Distributor</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e) => {this.handleSubmit(e, id)}}>
                        <Form.Field required onChange={this.handleChange} error={nameError}>
                            <label>Distributor Name</label>
                            <input required name="name" defaultValue={this.props.toBeUpdated.name} maxLength={50}/>
                        </Form.Field>
                        <Form.Field required onChange={this.handleChange} error={addressError}>
                            <label>Address</label>
                            <input required name="address" defaultValue={this.props.toBeUpdated.address} maxLength={100}/>
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
                                <input required name="zipcode" type="number" defaultValue={this.props.toBeUpdated.zipcode} min="0" max="99999"/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={4} required onChange={this.handleChange} error={phoneError}>
                                <label>Phone Number</label>
                                <input type='number'  required name="phone" defaultValue={this.props.toBeUpdated.phone} placeholder='ex.  09123456789' maxLength={20}/>
                            </Form.Field>
                            <Form.Field width={12} onChange={this.handleChange} error={webUrlError}>
                                <label>Web URL</label>
                                <input name="webUrl" defaultValue={this.props.toBeUpdated.webUrl} placeholder="ex. https://google.com" maxLength={30}/>
                            </Form.Field>
                        </Form.Group>
                        <Button type="submit" positive>Submit</Button>
                        <Button negative onClick={(e) => {this.closeModal(e)}}>Cancel</Button>
                    </Form>                         
                    </Modal.Content>
                </Modal>                                 
            </div>
        )
    }
}

export default UpdateDistributor;