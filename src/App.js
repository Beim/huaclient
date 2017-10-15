import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
import ManagePage from './components/ManagePage.js'
import GiftPage from './components/GiftPage.js'
import BackPage from './components/BackPage.js'

moment.locale('zh-cn')

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/index" component={ManagePage}></Route>
          <Route path="/gift" component={GiftPage}></Route>
          <Route path="/back" component={BackPage}></Route>
        </div>
      </Router>
      
    )
  }
}


export default App;
