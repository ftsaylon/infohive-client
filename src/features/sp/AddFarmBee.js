import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { getUserTag } from '../../sessionhandler';

class AddFarmBee extends Component{
    constructor(props){
		super(props);
		this.state={
            bees:[],
            bee_id:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBeeChange = this.handleBeeChange.bind(this);
	}

    handleChange = event => {
        this.setState({ 
            [event.target.name] : event.target.value }
        );
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.props.farm_id);
        const Bee = {
            farm_id: this.props.farm_id,
            bee_id: this.state.bee_id,
            user_tag: getUserTag()
        };

        axios.post(`/farm/putbee`, Bee )                        //Actual Bee Insert
        .then(res => {
            this.props.updateList("bee", 'added');
            this.setState({         
                bee_id:""
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
            bee_id:"",
            showModal: false
        })
    }

    componentDidMount(){
        axios.get(`/bee`).then(
			(response)=>{
                // console.log(response.data);
                this.setState({ bees:response.data });
			}
        );
    }

    handleBeeChange = (event, data) => {
        this.setState({ bee_id : data.value });
    }

    render(){
        const { showModal } = this.state;

        const beeOptions = this.state.bees.map(
            ({id, name}) => ({ key: id, value: id, text: name })
        )  

        return(
            <div>
                <Modal size="tiny" closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}>Add Bee to Farm</Button>}>
                    <Modal.Header> Add Bee to Farm </Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field width={8} required>
                                <label>Select Bee</label>
                                <Dropdown
                                    name='bee_id'
                                    placeholder="Select Bee"
                                    fluid
                                    search
                                    selection
                                    value = {this.state.bee_id}
                                    options={beeOptions}
                                    onChange={this.handleBeeChange}
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

export default AddFarmBee;