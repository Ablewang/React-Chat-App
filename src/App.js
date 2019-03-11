import React, { Component } from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Login from './components/Login'
import HomePage from './containers/HomePage'
import common from './common'
import 'antd/dist/antd.css'
import './App.css'

const pagePath = {
	homePage:'/',
	login:'/Login'
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      	<div className="App">
      		<Route path={pagePath.login} component={Login}/>
      		<Route path={pagePath.homePage} component={HomePage}/>
      	</div>
      </BrowserRouter>
    );
  }
}

export default App;
