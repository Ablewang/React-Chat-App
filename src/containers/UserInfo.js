import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import UserInfo from '../components/UserInfo'
import { userLogout } from '../reducers/reducer'

class UserInfoContainer extends Component {
	static propTypes = {
		router: PropTypes.object
	}
	handleLogin() {
		this.props.history.push({ pathname: '/login', state: '/' })
	}
	handleRegister() {
		this.props.history.push({ pathname: '/register', state: '/' })
	}
	handleLogout() {
		this.props.onLogout();
	}
	handleAddContact() {
		console.log('AddContact')
	}

	render() {
		return (
			<UserInfo
				loginUser={this.props.loginUser}
				onLogin={this.handleLogin.bind(this)}
				onRegister={this.handleRegister.bind(this)}
				onLogout={this.handleLogout.bind(this)}
				AddContact={this.handleAddContact.bind(this)}
			/>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		loginUser: state.loginUser
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => {
			dispatch(userLogout())
		}
	}
}
UserInfoContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer)
export default withRouter(UserInfoContainer)