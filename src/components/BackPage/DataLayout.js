import React, { Component } from 'react';
import './DataLayout.css';
import { config } from '../../config.js'
import { httpget } from '../../util.js'
import { Button, Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class DataLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
        
    }

    render() {
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
                    <div style={{ height: 590, width: '100%' }}>
                        {/* 内容区域 */}
                        <div>
                            123
                        </div>
                    </div>
                </div>
                </div>
                <div className="ant-layout-footer">
                    Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
                </div>
            </div>
        )
    }
}

export default DataLayout