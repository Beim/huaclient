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
import PieChart from './PieChart.js'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
const SubMenu = Menu.SubMenu;


class PieLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            giftDataByType: {
                '0': { count: 0, price: 0, }, // 免费礼物
                '1': { count: 0, price: 0, }, // 收费礼物
                '2': { count: 0, price: 0, }, // 收费活动
                '3': { count: 0, price: 0, }, // 免费活动
            },
            chartArgs: {
                '0': {
                    'title': '数量统计',
                    'name': '单位/个',
                    'data': []
                },
                '1': {
                    'title': '价值统计',
                    'name': '单位/瓜子',
                    'data': []
                }
            }
        }
        this.onDateChange = this.onDateChange.bind(this)
    }

    getChartArgs(giftData) {
        let chartArgs = this.state.chartArgs
        chartArgs['0']['data'] = [
            {name: '免费礼物', value: giftData['0']['count']},
            {name: '收费礼物', value: giftData['1']['count']},
            {name: '收费活动', value: giftData['2']['count']},
            {name: '免费活动', value: giftData['3']['count']},
        ]
        chartArgs['1']['data'] = [
            {name: '免费礼物', value: giftData['0']['price']},
            {name: '收费礼物', value: giftData['1']['price']},
            {name: '收费活动', value: giftData['2']['price']},
            {name: '免费活动', value: giftData['3']['price']},
        ]
        return chartArgs
    }

    getGiftData(data) {
        const giftDataByType = {
            '0': { count: 0, price: 0, },
            '1': { count: 0, price: 0, },
            '2': { count: 0, price: 0, },
            '3': { count: 0, price: 0, },
        }
        data.map((val) => {
            const gift = val.gift
            giftDataByType[gift.type]['count'] += gift.count
            giftDataByType[gift.type]['price'] += gift.price * gift.count
        })
        return giftDataByType
    }

    async onDateChange(dateRange) {
        const ret = await httpget(`http://${config.host}:${config.port}/api/get/giftdata?ts0=${dateRange.start}&&ts1=${dateRange.end}`)
        if (!ret || !ret.ok) return
        const giftDataByType = this.getGiftData(ret.data)
        const chartArgs = this.getChartArgs(giftDataByType)
        this.setState({giftDataByType, chartArgs})
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
                        <div style={{ height: 590 }}>
                            {/* 内容区域 */}
                            <div className="b-content-header">
                                <DateChooser onDateChange={this.onDateChange}></DateChooser>
                            </div>
                            <div className="b-content-body">
                                <div className="b-chart-container">
                                    <PieChart refArg="countPieChart" style={{width: 350, height: 350, margin: 20}}
                                        args={this.state.chartArgs['0']}>
                                    </PieChart>
                                </div>
                                <div className="b-chart-container">
                                    <PieChart refArg="pricePieChart" style={{width: 350, height: 350, margin: 20}}
                                        args={this.state.chartArgs['1']}>
                                    </PieChart>
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