import React,{Component} from 'react'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import Login from '../components/Login'
import {userLogin,userRegister,initContact} from '../reducers/reducer'
import {selectUser,createUser,selectContact} from '../dataHelper'

class LoginContiner extends Component{
	static propTypes={
		onLogin:PropTypes.func,
		onCancelLogin:PropTypes.func,
		onRegister:PropTypes.func,
		initContact:PropTypes.func,
	}
	handleLogin=(user)=>{
		const select = selectUser('username',user.username);
		if (select) {
			if (select.password != user.password) {
				return alert('密码错误');
			}
			Object.assign(user,select);
		}else{
			user = createUser(user);
			this.props.onRegister(user);
		}
		this.props.onLogin({...user,online:true})
		this.props.initContact(selectContact(user.id))
		this.__setLocalStorage('userid',user.id)
		this.props.history.push({pathname:'/',state:true})
	}
	__setLocalStorage=(name,value)=>{
		return localStorage.setItem(name,value) 
	}
	handleCancelLogin=()=>{
		this.props.history.push('/')
	}
	render(){
		return(
			<Login 	onLogin={this.handleLogin}
					onCancelLogin={this.handleCancelLogin}/>
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
		},
		onRegister:(user)=>{
			dispatch(userRegister(user))
		},
		initContact:(contactList)=>{
			dispatch(initContact(contactList))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginContiner)