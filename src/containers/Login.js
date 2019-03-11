import React,{Component} from 'react'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import Login from '../components/Login'
import {userLogin} from '../reducers/reducer'

class LoginContiner extends Component{
	static propTypes={
		onLogin:PropTypes.func,
		onCancelLogin:PropTypes.func
	}
	handleLogin=(user)=>{
		this.props.onLogin({...user,online:true})
		this.props.history.push('/')
	}
	handleCancelLogout=()=>{
		this.props.onCancelLogin && this.props.onCancelLogin();
	}
	render(){
		return(
			<Login 	onLogin={this.handleLogin}
					onCancelLogin={this.handleCancelLogout}/>
		)
	}
}
const mapStateToProps = (state)=>{
	return{
		loginUser:state.loginUsere
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		onLogin:(user)=>{
			dispatch(userLogin(user))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginContiner)