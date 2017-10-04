import React, { Component } from 'react';
import './GiftPage.css';
import { config } from '../config.js'
import { httpget } from '../util.js'

class GiftPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            giftConfig: {},
            data: [],
            dataTimer: null,
        }
    }

    async componentDidMount() {
        await this.setGiftConfig()
        await this.setDataState()
        let dataTimer = setInterval(this.setDataState.bind(this), 2000)
        this.setState({dataTimer})
        // setTimeout(() => {
        //     console.log(this.state.data)
        // }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.state.dataTimer)
        this.setState({dataTimer: null})
    }

    async setGiftConfig() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get/giftconfig`)
        if (ret && ret.ok === 1) {
            let giftConfig = {}
            ret.data.forEach((val) => {
                giftConfig[val.name] = val.icon_id
            })
            this.setState({giftConfig})
        }
        else {
            console.log('err: ', ret)
        }
    }

    async setDataState() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get`)
        if (ret && ret.ok === 1) {
            let data = ret.data
            this.setState({data})
        }
        else {
            console.log('err: ', ret)
        }
    }

    genGiftDivList() {
        let giftData = this.state.data
        let giftConfig = this.state.giftConfig
        let giftDivList = giftData.map((val, idx) => {
            let iconId = giftConfig[val.gift_name]
            return (
                <div key={`span-div-${idx}`}>
                    <img src={`https://static.hdslb.com/live-static/live-room/images/gift-section/gift-${iconId}.png`}  alt={val.gift_name} />
                    <span className={`gift-span ${val.count >= val.goal ? 'heartbeat' : ''}`}>{val.count}/{val.goal}</span>    
                    <span className={`gift-span ${val.count >= val.goal ? 'heartbeat' : ''}`}>{val.reward}</span>
                </div>
            )
        })
        return giftDivList
    }

    render() {
        return (
            <div className="hua-text" id="text-wrapper">
                {this.genGiftDivList()}
            </div>
        )
    }
}

export default GiftPage