import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { getUserTag } from '../../sessionhandler';

class AddStock extends Component{
    constructor(props){
		super(props);
		this.state={
            stockError: false,
            stock: 0,
            showModal: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
	}

    componentDidMount(){
        this.setState({
            stock:this.props.currentItem.stock
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            stock:nextProps.currentItem.stock
        })
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name] : event.target.value }, ()=>{

                // console.log(this.state);
            }
        );

        console.log(event.target.value);
    }
    formValidation(){
        var flag = true;
        if(this.state.stock<0 || this.props.currentItem.stock === this.state.stock){
            flag=false;
            this.setState({stockError:true});
        }
        if(flag === true){
            this.setState({stockError:false});
        }
        return flag;
    }


    handleSubmit = (event, id) => {
        event.preventDefault();

        const product = {
            product_id:this.props.currentItem.id,
            newstocks: this.state.stock,
            user_tag: getUserTag()
        };
        // console.log(this.state);
        // console.log(product);
        // console.log(this);
        if(this.formValidation()){
            axios.put(`/product/changestocks`, product )
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.updateList('product', 'updated stocks to a');
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
        const { showModal } = this.state;

    

        return(
            <div>
                <Modal size="mini" closeIcon onClose={this.closeModal} open={showModal} trigger={
                    <Button 
                        compact
                        onClick={() => this.setState({ showModal: true })} 
                    > 
                        Edit
                    </Button>}>
                    <Modal.Header>Update Stocks</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={(e) => this.handleSubmit(e, this.props.currentItem.id)}> 
                        <Form.Field onChange={this.handleChange} error={this.state.stockError}>
                            <label>Stocks</label>
                            <input name='stock' type="number" min="0" max="2147483647" defaultValue={this.state.stock} placeholder='Stock' />
                        </Form.Field>
                        <Button type="submit" positive>Submit</Button>
                        <Button negative onClick={this.closeModal}>Cancel</Button>
                    </Form>                        
                    </Modal.Content>
                </Modal>                            
            </div>
        )
    }
}

export default AddStock;