import React, {Component} from 'react';

import { Confirm } from 'semantic-ui-react';

class GeneralConfirm extends Component{
    constructor(props){
        super(props)

        this.state = {
            open: this.props.open
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    render(){
        return(
            <Confirm 
                open={this.props.open}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}/>
        )
    }

    handleCancel(){
        this.props.onResult()
    }

    handleConfirm(){
        this.props.onConfirm(this.props.data.path, this.props.data.id)
        this.props.onResult()
    }
}

export default GeneralConfirm;