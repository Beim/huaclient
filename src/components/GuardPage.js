import React, { Component } from 'react';
import './GiftPage1.css';
import { config } from '../config.js'
import { httpget } from '../util.js'

class GuardPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            guardList: ['虚位以待', '虚位以待', '虚位以待'],
            guardTimer: null,
        }
    }

    async componentDidMount() {
        await this.setGuardList()
        let guardTimer = setInterval(this.setGuardList.bind(this), 1000 * 60 * 5)
        this.setState({guardTimer})
    }

    componentWillUnmount() {
        clearInterval(this.state.guardTimer)
        this.setState({guardTimer: null})
    }

    async setGuardList() {
        console.log(this.state.guardList)
        let ret = await httpget(`http://${config.host}:${config.port}/api/get/guard/221`)
        if (ret && ret.ok === 1) {
            let guardList = []
            ret.data.top3.forEach((val) => {
                guardList.push(val.username)
            })
            this.setState({guardList})
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
                    <img src={`https://s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/gift-images/image-gif/gift-${iconId}.gif`}  alt={val.gift_name} />
                    <span className={`gift-span`}>{val.count}/{val.goal}</span>    
                    <span className={`gift-span`}>{val.reward}</span>
                </div>
            )
        })
        return giftDivList
    }

    genGuardDivList() {
        let guardList = this.state.guardList
        if (guardList.length !== 3) {
            throw Error('guardList.length !== 3')
        }
        let guardDivList = guardList.map((val, idx) => {
            return (
                <div key={`guard-div-${idx}`}>
                    <img src={`http://ob4a6y748.bkt.clouddn.com/jiandui${idx+1}.png`} alt={`舰队${idx+1}`}/>
                    <span className={`gift-span`}>{val}</span>    
                </div>
            )
        })
        return guardDivList
    }

    render() {
        return (
            <div className="hua-text" id="text-wrapper">
                {this.genGuardDivList()}
            </div>
        )
    }
}

export default GuardPage