import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './containers/Login'
import Register from './containers/Register'
import HomePage from './containers/HomePage'
import 'antd/dist/antd.css'
import './App.css'

const pagePath = {
  homePage: '/',
  login: '/Login',
  register: '/Register'
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path={pagePath.login} component={Login} />
          <Route path={pagePath.register} component={Register} />
          <Route path={pagePath.homePage} component={HomePage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
