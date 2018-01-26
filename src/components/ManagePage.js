import React, { Component } from 'react';
import './ManagePage.css';
import { httpget, move_front } from '../util.js'
import { config } from '../config.js'

class NewGiftModel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            giftList: [],
            step_num: '',
            reward: '',
            displayAlert: false,
        }
    }

    componentDidMount() {
        this.setGiftListState()
        
    }

    async setGiftListState() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get/giftconfig`)
        if (ret && ret.ok === 1) {
            let giftList = ret.data.map((val) => {
                return val.name
            })
            this.setState({giftList})
        }
        else {
            console.log('err: ', ret)
        }
    }

    chooseGiftHandler(giftName) {
        let giftList = this.state.giftList
        move_front(giftList, giftName)
        this.setState({giftList})
    }

    inputChangeHandler(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
          [name]: value
        })
    }

    async submitHandler() {
        const { step_num, reward } = this.state
        const giftName = this.genGiftListShow()[0]
        if (step_num === '' || reward === '') return
        let ret = await httpget(`http://${config.host}:${config.port}/api/new/goal/${giftName}/${config.room_id}?step_num=${step_num}&&reward=${reward}`)
        if (ret && ret.ok === 1) {
            this.setState({step_num: '', reward: '', displayAlert: true})
            setTimeout(() => {
                this.setState({displayAlert: false})
            }, 3000)
        }
        else {
            console.log('err: ', ret)
        }
        // window.location.href = window.location.href 
    }

    genGiftListShow() {
        return this.state.giftList.filter(val => !(this.props.giftExisted.includes(val)))
    }

    genGiftLi(giftList) {
        return giftList.slice(1).map((val, idx) => {
            return (
                <li role="presentation" key={`giftLi${idx}`}>
                    <a role="menuitem" tabIndex="-1" href='#' onClick={this.chooseGiftHandler.bind(this, val)}>{val}</a>
                </li>
            )
        })
    }

    render() {
        const giftListShow = this.genGiftListShow()
        const giftLi = this.genGiftLi(giftListShow)
        return (
            <div className="modal fade" id="new-gift-model" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header flex-center">
                            <h4 className="modal-title" id="myModalLabel">新增礼物目标</h4>
                        </div>
                        <div className="modal-body new-gift-model-body">
                            <div className="flex-center">
                            {/* <!-- 新增礼物的下拉菜单  --> */}
                                <div className="dropdown">
                                    <button type="button" className="btn dropdown-toggle" id="new-gift-dropdown-menu-btn" data-toggle="dropdown">
                                        {giftListShow[0]}
                                        <span className="caret"></span>   
                                    </button>
                                    <ul id="new-gift-dropdown-menu-ul" className="dropdown-menu" role="menu" aria-labelledby="new-gift-dropdown-menu-btn">
                                        {giftLi}
                                    </ul>
                                </div>
                                <input value={this.state.step_num} onChange={this.inputChangeHandler.bind(this)} name="step_num" type="number" placeholder="请输入目标数量"></input>
                                <input value={this.state.reward} onChange={this.inputChangeHandler.bind(this)} name="reward" type="text" placeholder="请输入达成奖励"></input>
                            </div>
                            <div className={`alert alert-success ${this.state.displayAlert ? '' : 'display-none'}`}>成功！可继续添加。</div>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button onClick={this.submitHandler.bind(this)} type="button" className="btn btn-primary">提交更改</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class DelAlertModel extends Component {

    async delGiftHandler() {
        const giftName = this.props.delGiftName
        let ret = await httpget(`http://${config.host}:${config.port}/api/del/goal/${giftName}/${config.room_id}`)
        if (ret && ret.ok === 1) {
            // 需要提示删除成功?
        }
        else {
            console.log('err: ', ret)
        }
    }

    render() {
        return (
            <div className="modal fade" id="del-alert-model" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header flex-center">
                            <h4 className="modal-title" id="myModalLabel">确认删除【{this.props.delGiftName}】？</h4>
                        </div>
                        
                        <div className="modal-body del-alert-model-body">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button onClick={this.delGiftHandler.bind(this)} style={{marginLeft: '2%'}} type="button" className="btn btn-danger" data-dismiss="modal" >删除</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class AlterRewardModel extends Component {


    constructor(props) {
        super(props)
        this.state = {
            reward: '',
        }
    }

    inputChangeHandler(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
          [name]: value
        })
    }
    
    async alterRewardHandler() {
        const newReward = this.state.reward.trim()
        if (!newReward) return
        this.setState({reward: ''})
        const giftName = this.props.alterReward.giftName
        let ret = await httpget(`http://${config.host}:${config.port}/api/set/reward/${giftName}/221?reward=${newReward}`)
        if (ret && ret.ok === 1) {
            // 需要提示删除成功?
        }
        else {
            console.log('err: ', ret)
        }
    }

    render() {
        return (
            <div className="modal fade" id="alter-reward-model" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header flex-center">
                            <h4 className="modal-title" id="myModalLabel">修改【{this.props.alterReward.giftName}】的奖励</h4>
                        </div>
                        <div className="modal-body alter-reward-body">                            
                            <input value={this.state.reward} onChange={this.inputChangeHandler.bind(this)} name="reward" type="text" placeholder="请输入达成奖励"></input>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button onClick={this.alterRewardHandler.bind(this)} type="button" className="btn btn-primary" data-dismiss="modal">提交更改</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class AlterDisplayConfigModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fontColor: '',
            textShadowColor: '',
        }
    }

    inputChangeHandler(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
          [name]: value
        })
    }

    async alterDisplayConfigHandler() {
        let fontColor = this.state.fontColor.trim()
        if (fontColor[0] === '#') fontColor = fontColor.slice(1)
        let textShadowColor = this.state.textShadowColor.trim()
        if (textShadowColor[0] === '#') textShadowColor = textShadowColor.slice(1)
        if (fontColor === '' || textShadowColor === '') {
            console.log('err: fontColor or textShadowColor can not be null')
        }
        else {
            let ret = await httpget(`http://${config.host}:${config.port}/api/set/displaygiftconfig?fontColor=${fontColor}&&textShadowColor=${textShadowColor}`)
            if (ret && ret.ok === 1) {
                // 需要提示更改成功？
            }
            else {
                console.log('err: ', ret)
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id="alter-display-config-model" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header flex-center">
                            <h4 className="modal-title" id="myModalLabel">修改展示页面字体颜色</h4>
                        </div>
                        <div className="modal-body alter-display-config-body">    
                            <span>字体颜色：</span>                        
                            <input value={this.state.fontColor} onChange={this.inputChangeHandler.bind(this)} name="fontColor" type="text" placeholder="默认 4db8ff"></input>
                            <br/>
                            <br/>
                            <span>阴影颜色：</span>
                            <input value={this.state.textShadowColor} onChange={this.inputChangeHandler.bind(this)} name="textShadowColor" type="text" placeholder="默认 0000ff"></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-default" onClick={window.open.bind(window, 'https://www.w3cschool.cn/tools/index?name=cpicker', '_blank')}>拾色器</button>
                            <button onClick={this.alterDisplayConfigHandler.bind(this)} type="button" className="btn btn-primary" data-dismiss="modal">提交更改</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ManagePage extends Component {

    constructor(props) {
        super(props)
        httpget(`http://${config.host}:${config.port}/api/initroom/${config.room_id}`)
        this.state = {
            dataTimer: null,
            runningStateTimer: null,
            data: [],
            delGiftName: '',
            runningState: false,
            alterReward: {
                giftName: '',
                rewardName: '',
            },
        }
    }

    componentDidMount() {
        this.setDataState()
        this.setRunningState()
        let dataTimer = setInterval(this.setDataState.bind(this), 2000)
        let runningStateTimer = setInterval(this.setRunningState.bind(this), 2000)
        this.setState({dataTimer, runningStateTimer})
    }

    async componentWillUnmount() {
        clearInterval(this.state.dataTimer)
        clearInterval(this.state.runningStateTimer)
        this.setState({dataTimer: null, runningStateTimer: null})
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

    async setRunningState() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get/state`)
        if (ret && ret.ok) {
            this.setState({runningState: ret.data})
        }
        else {
            console.log('err: ', ret)
        }
    }

    async delGiftHandler(giftName) {
        this.setState({delGiftName: giftName})
    }

    async alterRewardHandler(giftName, rewardName) {
        this.setState({
            alterReward: {giftName, rewardName},
        })
    }

    async achieveGiftHandler(giftName) {
        let ret = await httpget(`http://${config.host}:${config.port}/api/achieve/goal/${giftName}/${config.room_id}`)
        if (ret && ret.ok === 1) {
            window.location.href = window.location.pathname
        }
        else {
            console.log('err: ', ret)
        }
    }

    async startHandler() {
        if (this.state.runningState === true) {
            await httpget(`http://${config.host}:${config.port}/api/stop`)
        }
        else {
            await httpget(`http://${config.host}:${config.port}/api/start`)
        }
    }

    async resetGiftHandler(giftName, stepNum, reward) {
        const ret = await httpget(`http://${config.host}:${config.port}/api/new/goal/${giftName}/${config.room_id}?step_num=${stepNum}&&reward=${reward}`)
        if (ret && ret.ok === 1) {
            window.location.href = window.location.pathname
        }
        else {
            console.log('err: ', ret)
        }
    }


    genTr() {
        const data = this.state.data
        let trs = data.map((val, idx) => {
            return (
                <tr key={`genTr${idx}`}>
                    <td>{val.gift_name}</td>
                    <td>{val.count}/{val.goal}</td>
                    <td>{val.step}</td>
                    <td>
                        {val.reward}
                        <span onClick={this.alterRewardHandler.bind(this, val.gift_name, val.reward)} className="glyphicon glyphicon-edit reward-edit-icon" data-toggle="modal" data-target="#alter-reward-model"></span>
                    </td>
                    <td>{Math.floor(val.goal / val.step) - 1}</td>
                    <td>
                        <button onClick={this.achieveGiftHandler.bind(this, val.gift_name)} type="button" className="btn btn-primary btn-xs">达成</button>
                        <button onClick={this.delGiftHandler.bind(this, val.gift_name)} data-toggle="modal" data-target="#del-alert-model" type="button" className="btn btn-primary btn-xs">删除</button>
                        <button onClick={this.resetGiftHandler.bind(this, val.gift_name, val.step, val.reward)} type="button" className="btn btn-primary btn-xs">清空</button>
                    </td>
                </tr>
            )
        })
        return trs
    }

    render() {
        return (
            <div className="out-wrapper">
                <div className="div-container tools">
                    <button data-toggle="modal" data-target="#new-gift-model" type="button" className="btn btn-success">新增</button>
                    <button onClick={this.startHandler.bind(this)} type="button" className={`btn ${this.state.runningState ? 'btn-warning' : 'btn-success'}`}>{this.state.runningState ? '停止' : '运行'}</button>
                    <button onClick={window.open.bind(window, `http://${config.host}:5001/gift`)} type="button" className="btn btn-success">展示1</button>
                    {/* <button onClick={window.open.bind(window, '/gift1')} type="button" className="btn btn-success">展示2</button> */}
                    <button onClick={window.open.bind(window, `http://${config.host}:5001/guard`)} type="button" className="btn btn-success">舰队</button>
                    <button data-toggle="modal" data-target="#alter-display-config-model" type="button" className="btn btn-success">颜色</button>
                </div>
                <div className="div-container">
                    <div className="table-responsive">  
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>礼物</th>
                                    <th>目标进度</th>
                                    <th>单次目标</th>
                                    <th>达成奖励</th>
                                    <th>达成次数</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="gift-tbody">
                                {this.genTr()}
                            </tbody>
                        </table>
                    </div>
                
                </div>
                <NewGiftModel giftExisted={this.state.data.map(val => val.gift_name)}></NewGiftModel>
                <DelAlertModel delGiftName={this.state.delGiftName}></DelAlertModel>
                <AlterRewardModel alterReward={this.state.alterReward}></AlterRewardModel>
                <AlterDisplayConfigModel></AlterDisplayConfigModel>
            </div>
        )
    }
}

export default ManagePage