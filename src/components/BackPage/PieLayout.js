import React, { Component } from 'react'
import './PieLayout.css'
import { config } from '../../config.js'
import { httpget } from '../../util.js'
import { Button, Menu, Breadcrumb, Icon } from 'antd'
import { DatePicker } from 'antd'
import { Radio } from 'antd'
import { message } from 'antd'
import moment from 'moment'
import DateChooser from './DateChooser.js'
import GiftParser from './GiftParser.js'
import PieChart from './PieChart.js'
import BarChart from './BarChart.js'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
const SubMenu = Menu.SubMenu;


class PieLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chartArgs: {
                '0': {
                    'title': '数量统计',
                    'subtitle': '',
                    'name': '单位/个',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
                '1': {
                    'title': '价值统计',
                    'subtitle': '',
                    'name': '单位/瓜子',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
                '2': {
                    'title': '数量统计',
                    'subtitle': '',
                    'name': '单位/个',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
                '3': {
                    'title': '价值统计',
                    'subtitle': '',
                    'name': '单位/瓜子',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
            },
            chartArgsShow: {
                '0': {
                    'title': '数量统计',
                    'subtitle': '',
                    'name': '单位/个',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
                '1': {
                    'title': '价值统计',
                    'subtitle': '',
                    'name': '单位/瓜子',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
                '2': {
                    'title': '数量统计',
                    'subtitle': '',
                    'name': '单位/个',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
                '3': {
                    'title': '价值统计',
                    'subtitle': '',
                    'name': '单位/瓜子',
                    'data': [
                        // {name: '辣条', value: 100},
                    ]
                },
            },
            checkListGift: [],
        }
        this.onDateChange = this.onDateChange.bind(this)
        this.onGiftCheckChange = this.onGiftCheckChange.bind(this)
    }

    updateChartArgsByCharge(chartArgs, giftDateByCharge) {
        chartArgs['0']['data'] = []
        chartArgs['1']['data'] = []
        chartArgs['2']['data'] = []
        chartArgs['3']['data'] = []
        for (let name in giftDateByCharge) {
            let {count, price} = giftDateByCharge[name]
            chartArgs['0']['data'].push({ name, value: count })
            chartArgs['1']['data'].push({ name, value: price })
            chartArgs['2']['data'].push({ name, value: count })
            chartArgs['3']['data'].push({ name, value: price })
        }
        this.updateChartArgsSubtitle(chartArgs)
    }

    updateChartArgsSubtitle(chartArgs) {
        let totalCount = 0
        let totalValue = 0
        for (let val of chartArgs['2']['data']) {
            totalCount += val.value
        }
        for (let val of chartArgs['3']['data']) {
            totalValue += val.value
        }
        chartArgs['2'].subtitle = `总计 ${totalCount}（单位/个）`
        chartArgs['3'].subtitle = `总计 ${totalValue}（单位/瓜子）`
    }

    updateCheckListGift(checkListGift, data) {
        checkListGift.length = 0 // 清空数组
        for (let name in data)
            checkListGift.push(name)
    }

    // DateChooser 组件中选择的时间改变时触发
    async onDateChange(dateRange) {
        const ret = await httpget(`http://${config.host}:${config.port}/api/get/giftdata?ts0=${dateRange.start}&&ts1=${dateRange.end}`)
        if (!ret || !ret.ok) return
        const data = ret.data
        const chartArgs = this.state.chartArgs
        this.updateChartArgsByCharge(chartArgs, data)
        const checkListGift = this.state.checkListGift
        this.updateCheckListGift(checkListGift, data)
        const chartArgsShow = JSON.parse(JSON.stringify(chartArgs))
        this.setState({chartArgs, chartArgsShow, checkListGift})
        message.success('更新视图')
    }

    // GfitParser 多选框组中选中的礼物改变时触发
    onGiftCheckChange(checkedGift) {
        const chartArgs = this.state.chartArgs
        const chartArgsShow = this.state.chartArgsShow
        chartArgsShow['0']['data'] = chartArgs['0']['data'].filter(val => checkedGift.includes(val.name))
        chartArgsShow['1']['data'] = chartArgs['1']['data'].filter(val => checkedGift.includes(val.name))
        chartArgsShow['2']['data'] = chartArgs['2']['data'].filter(val => checkedGift.includes(val.name))
        chartArgsShow['3']['data'] = chartArgs['3']['data'].filter(val => checkedGift.includes(val.name))
        this.setState({chartArgsShow})
    }

    render() {
        return (
            <div className="ant-layout-main">
                <div className="ant-layout-header"></div>
                <div className="ant-layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>统计</Breadcrumb.Item>
                        <Breadcrumb.Item>礼物占比</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ant-layout-container">
                    <div className="ant-layout-content">
                        <div style={{ 'minHeight': '100vh' }}>
                            {/* 内容区域 */}
                            <div className="b-content-header">
                                <div className="b-header-content">
                                    <DateChooser onChange={this.onDateChange}></DateChooser>
                                </div>
                                <div className="b-header-content">
                                    <GiftParser onChange={this.onGiftCheckChange} options={this.state.checkListGift}></GiftParser>
                                </div>
                            </div>
                            <div className="b-content-body">
                                <div style={{display: 'flex', flexDirection: 'center'}}>
                                    <PieChart refArg="countPieChart" style={{width: 350, height: 350, margin: 20, display: this.state.chartArgsShow['0'].data.length > 0 ? '' : 'none'}}
                                        args={this.state.chartArgsShow['0']}>
                                    </PieChart>
                                    <PieChart refArg="pricePieChart" style={{width: 350, height: 350, margin: 20, display: this.state.chartArgsShow['1'].data.length > 0 ? '' : 'none'}}
                                        args={this.state.chartArgsShow['1']}>
                                    </PieChart>
                                </div>
                                <div style={{display: this.state.chartArgsShow['2'].data.length > 0 ? '' : 'none'}}>
                                    <BarChart refArg="priceBarChart" style={{width: 700, height: Math.floor(Math.pow(this.state.chartArgsShow['2'].data.length, 1.1) * 40) + 120, margin: 20}}
                                        args={this.state.chartArgsShow['2']}>
                                    </BarChart>
                                </div>
                                <div style={{display: this.state.chartArgsShow['3'].data.length > 0 ? '' : 'none'}}>
                                    <BarChart refArg="priceBarChart" style={{width: 700, height: Math.floor(Math.pow(this.state.chartArgsShow['3'].data.length, 1.1) * 40) + 120, margin: 20}}
                                        args={this.state.chartArgsShow['3']}>
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ant-layout-footer">
                    巫春天的花 版权所有 © 2017 由beiming提供技术支持
                </div>
            </div>
        )
    }

}

export default PieLayout