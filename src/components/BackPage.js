import React, { Component } from 'react';
import './BackPage.css';
import { config } from '../config.js'
import { httpget } from '../util.js'
import { Button, Menu, Breadcrumb, Icon } from 'antd';
import DataLayout from './BackPage/DataLayout'
import PieLayout from './BackPage/PieLayout'


const SubMenu = Menu.SubMenu;

class BackPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currTabKey: 'sub2.pie'
        }
        this.sub1Arr = [
            ['sub1.index', '配置'],
            ['sub1.gift', '展示'],
        ]
        this.sub2Arr = [
            ['sub2.pie', '礼物占比'],
            ['sub2.data', 'sample']
        ]
        this.tab = {
            'sub1.index': this.genIndexTab,
            'sub1.gift': this.genGiftTab,
            'sub2.pie': () => <PieLayout></PieLayout>,
            'sub2.data': () => <DataLayout></DataLayout>
        }
    }

    clickMenuHandler({item, key, keyPath}) {
        this.setState({ currTabKey: key })
    }

    genIndexTab() {
        return (
            <div className="ant-layout-main">
                <div className="ant-layout-header"></div>
                <div className="ant-layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ant-layout-container">
                <div className="ant-layout-content">
                    <div style={{ height: '100%', width: '100%' }}>
                        {/* 内容区域 */}
                        <iframe src="http://wuchuntian.cool:5000/index" frameBorder="0" scrolling="no" style={{ height: 500, width: 900 }}></iframe>
                    </div>
                </div>
                </div>
                <div className="ant-layout-footer">
                    Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
                </div>
            </div>
        )
    }

    genGiftTab() {
        return (
            <div className="ant-layout-main">
                <div className="ant-layout-header"></div>
                <div className="ant-layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ant-layout-container">
                <div className="ant-layout-content">
                    <div style={{ height: '100%', width: '100%' }}>
                        {/* 内容区域 */}
                        <iframe src="http://wuchuntian.cool:5000/gift" frameBorder="0" scrolling="no" style={{ height: 500, width: 900 }}></iframe>
                    </div>
                </div>
                </div>
                <div className="ant-layout-footer">
                    Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="ant-layout-aside">
                    <aside className="ant-layout-sider">
                        <div className="ant-layout-logo"></div>
                        <Menu mode="inline" theme="dark"
                            onClick={this.clickMenuHandler.bind(this)}
                            defaultSelectedKeys={[this.state.currTabKey]} defaultOpenKeys={['sub2']}>
                            <SubMenu key="sub1" title={<span><Icon type="user" />管理</span>}>
                                {this.sub1Arr.map(([key, value]) => {
                                    return <Menu.Item key={key}>{value}</Menu.Item>
                                })}
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />统计</span>}>
                                {this.sub2Arr.map(([key, value]) => {
                                    return <Menu.Item key={key}>{value}</Menu.Item>
                                })}
                            </SubMenu>
                        </Menu>
                    </aside>
                    {this.tab[this.state.currTabKey]()}
                </div>
            </div>
        )
    }
}

export default BackPage