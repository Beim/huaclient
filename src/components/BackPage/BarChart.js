import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/tooltip'



const genOption = (title, subtitle, name, data) => {
    data.sort((v1, v2) => {
        return v1.value - v2.value
    })
    let yAxisData = data.map(v => v.name)
    let seriesData = data.map(v => v.value)
    return {
        title: {
            text: title,
            subtext: subtitle ? subtitle : undefined,

            // x: 'center',
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis : [
            {
                type : 'category',
                data : yAxisData,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        xAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name,
                type:'bar',
                barWidth: '60%',
                data: seriesData
            }
        ]
    }

}


class BarChart extends Component {

    /*
    props: {
        refArg: 'countBarChart',
        title: '数量统计',
        name: '根据礼物数量统计',
        data: {
            '辣条': 100,
            '节奏风暴': 3,
        }
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

export default BarChart