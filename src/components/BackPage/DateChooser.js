import React, { Component } from 'react'
import './DateChooser.css'
import { config } from '../../config.js'
import { httpget } from '../../util.js'
import { Button, Menu, Breadcrumb, Icon } from 'antd'
import { DatePicker } from 'antd'
import { Radio } from 'antd'
import { message } from 'antd'
import moment from 'moment'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
const SubMenu = Menu.SubMenu;

const genDate = (len) => {
    let ret = {
        start: 0,
        end: 0,
    }
    let now = moment().format('YYYY-MM-DD')
    ret.end = new Date(`${now} 12:00`).getTime()
    let xDaysBefore = moment().subtract(len, 'days').format('YYYY-MM-DD')
    ret.start = new Date(`${xDaysBefore} 12:00`).getTime()
    return ret
}

class DateChooser extends Component {

    /*
    API
    onDateChange = (dateRange)
    */
    constructor(props) {
        super(props)
        this.state = {
            currMode: '',
            dateRange: {},
            rangeValue: [],
        }
        this.onDateChange = this.props.onChange
        this.chooseModeHandler = this.chooseModeHandler.bind(this)
        this.rangePickerChangeHandler = this.rangePickerChangeHandler.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.dateRange.start !== nextState.dateRange.start 
            || this.state.dateRange.end !== nextState.dateRange.end
            || this.state.currMode !== nextState.currMode) {
                this.onDateChange(nextState.dateRange)
        }
        return true
    }

    chooseModeHandler(e) {
        const value = e.target.value
        let nState = { currMode: value }
        if (value === '7day') {
            nState.dateRange = genDate(7)
        }
        else if (value === '1month') {
            nState.dateRange = genDate(30)
        }
        else if (value === '3month') {
            nState.dateRange = genDate(90)
        }
        else if (value === 'manual'){
            if (this.state.rangeValue.length > 0) {
                let rangeValue = this.state.rangeValue
                nState.dateRange = {
                    start: new Date(`${rangeValue[0].format('YYYY-MM-DD')} 12:00`).getTime(),
                    end: new Date(`${rangeValue[1].format('YYYY-MM-DD')} 12:00`).getTime(),
                }
            }
        }
        if (nState.dateRange) {
            this.infoDates(nState.dateRange)    
        }
        this.setState(nState)
    }

    rangePickerChangeHandler(dates, dateStrings) {
        // dateStrings:  ["2017-10-13", "2017-11-17"]
        const dateRange = {
            'start': new Date(`${dateStrings[0]} 12:00`).getTime(),
            'end': new Date(`${dateStrings[1]} 12:00`).getTime(),
        }
        this.infoDates(dateRange)
        this.setState({
            dateRange,
            rangeValue: dates,
        })
    }

    infoDates(dateRange) {
        const startTs = dateRange.start
        const endTs = dateRange.end
        message.info(`选择 ${new Date(startTs).toLocaleDateString()} ~ ${new Date(endTs).toLocaleDateString()}`)
    }

    render() {
        return (
            <div className="b-date-chooser-wrapper">
                <span>选择时间：</span>
                <span>
                    {/* <RadioGroup onChange={this.chooseModeHandler} defaultValue={this.state.currMode}> */}
                    <RadioGroup onChange={this.chooseModeHandler}>
                        <RadioButton value="7day">7天内</RadioButton>
                        <RadioButton value="1month">1个月内</RadioButton>
                        <RadioButton value="3month">3个月内</RadioButton>
                        <RadioButton value="manual">手动选择</RadioButton>
                    </RadioGroup>
                </span>
                <span>
                    <RangePicker value={this.state.rangeValue} onChange={this.rangePickerChangeHandler} disabled={this.state.currMode !== 'manual'}></RangePicker>
                </span>
            </div>
        )
    }
}


export default DateChooser