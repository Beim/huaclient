import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import ManagePage from './components/ManagePage.js'
import GiftPage from './components/GiftPage.js'
import GiftPage1 from './components/GiftPage1.js'
// import BackPage from './components/BackPage.js'

moment.locale('zh-cn')

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/index" component={ManagePage}></Route>
          <Route path="/gift" component={GiftPage}></Route>
          <Route path="/gift1" component={GiftPage1}></Route>
          {/* <Route path="/back" component={BackPage}></Route> */}
        </div>
      </Router>
      
    )
  }
}


export default App;
