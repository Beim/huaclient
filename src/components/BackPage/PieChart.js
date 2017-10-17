import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'


const genOption = (title, subtitle, name, data) => {
    let dataName = data.map(val => {
        return val.name
    })
    return {
        title : {
            text: title,
            subtext: subtitle ? subtitle : undefined,
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
        const {title, subtitle, name, data} = this.props.args
        const option = genOption(title, subtitle, name, data)
        this.myChart = echarts.init(this.refs[this.props.refArg])
        this.myChart.setOption(option)
    }

    componentDidUpdate() {
        const {title, subtitle, name, data} = this.props.args
        const option = genOption(title, subtitle, name, data)
        this.myChart.setOption(option)
        this.myChart.resize({
            height: 'auto',
        })
    }

    render() {
        return (
            <div ref={this.props.refArg} style={this.props.style}></div>
        )
    }

}

export default PieChart