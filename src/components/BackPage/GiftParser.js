import React, { Component } from 'react'
import './GiftParser.css'
import { Checkbox } from 'antd';


const CheckboxGroup = Checkbox.Group;


class GiftParser extends Component {

    /*
    API
    onGiftCheckChange = (checkedValue)
    */

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         options: props.options,
    //     }
    //     this.onChange = this.onChange.bind(this)
    // }

    // onChange(checkedValue) {
    //     // console.log(checkedValue)
    //     this.props.onChange(checkedValue.slice())
        
    // }

    render() {
        return (
            <div className="b-gift-parser-wrapper" style={{display: this.props.options.length > 0 ? '' : 'none'}}>
                <div>选择礼物: </div>
                <div>
                    <CheckboxGroup key={JSON.stringify(this.props.options)} onChange={this.props.onChange} options={this.props.options} defaultValue={this.props.options}></CheckboxGroup>
                </div>
            </div>
        )
    }
}


export default GiftParser