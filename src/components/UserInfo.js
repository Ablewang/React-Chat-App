import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Card, Icon, Avatar } from 'antd';
import photo from '../resource/images/photo.png'
import underlinePhoto from '../resource/images/photo-underline.png'

const { Meta } = Card;
export default class UserInfo extends Component {
	static propTypes = {
		onShowLogin: PropTypes.func,
		onLogin: PropTypes.func,
		onLogout: PropTypes.func,
		onAddContact: PropTypes.func,
	}

	handleShowLogin = () => {
		this.props.onShowLogin && this.props.onShowLogin();
	}
	handleLogin = (user) => {
		this.props.onLogin && this.props.onLogin(user);
	}
	handleRegister = (user) => {
		this.props.onRegister && this.props.onRegister();
	}
	handleLogout = () => {
		this.props.onLogout && this.props.onLogout();
	}
	handleAddContact = () => {
		this.props.onAddContact && this.props.onAddContac();
	}
	render() {
		const login = <Icon type="login" onClick={this.handleLogin} title='登录' /> //login
		const singup = <Icon type="solution" onClick={this.handleRegister} title='注册' /> //login
		const logout = <Icon type="logout" onClick={this.handleLogout} title='退出' style={{ color: 'red' }} /> //logout
		const add = <Icon type="user-add" onClick={this.handleAddContact} title='新增联系人' />
		const otherAction = <Icon type="ellipsis" title='其他' />
		const userInfo = this.props.loginUser || {};
		return (
			<Card
				className='g-user-card'
				actions={userInfo.online ? [logout, add, otherAction] : [login,singup]}
			>
				<Meta
					avatar={<Avatar src={userInfo.online ? photo : underlinePhoto} />}
					title={userInfo.username || '请先登录'}
				/>
			</Card>
		)
	}
}