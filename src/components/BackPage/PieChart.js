import React, { Component } from 'react'
import { config } from '../../config.js'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'


const genOption = (title, name, data) => {
    let dataName = data.map(val => {
        return val.name
    })
    return {
        title : {
            text: title,
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: dataName
        },
        series : [
            {
                name: name,
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
}

class PieChart extends Component {

    /*
    props: {
        refArg: 'countPieChart',
        title: '数量统计',
        name: '根据礼物数量统计',
        data: [
            {value: 355, name: '直接'},
            {value: 355, name: '直接'},
            {value: 355, name: '直接'},
        ]
    }
    */

    componentDidMount() {
        this.initChart()
    }

    componentWillUpdate() {
        this.initChart()
    }

    initChart() {
        const {title, name, data} = this.props.args
        const option = genOption(title, name, data)
        const myChart = echarts.init(this.refs[this.props.refArg])
        myChart.setOption(option)
    }

    render() {
        return (
            <div ref={this.props.refArg} style={this.props.style}></div>
        )
    }

}

export default PieChart