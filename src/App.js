import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
// import { config } from './config.js'
import ManagePage from './components/ManagePage.js'
import GiftPage from './components/GiftPage.js'

// const hostprefix = `http://${config.host}:${config.port}`

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <h1>HuaClient</h1>
          <ul>
            <li><Link to="/c1">C1</Link></li>
            <li><Link to="/c2">C2</Link></li>
          </ul> */}
          <Route path="/index" component={ManagePage}></Route>
          <Route path="/gift" component={GiftPage}></Route>
        </div>
      </Router>
    )
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started{config.port}, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
