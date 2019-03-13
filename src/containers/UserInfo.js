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
	handleLoginClick() {
		this.props.history.push({ pathname: '/login', state: '/' })
	}
	handleLogoutClick() {
		this.props.onLogout();
	}
	handleAddContactClick() {
		console.log('AddContact')
	}

	render() {
		return (
			<UserInfo
				loginUser={this.props.loginUser}
				onLogin={this.handleLoginClick.bind(this)}
				onLogout={this.handleLogoutClick.bind(this)}
				AddContact={this.handleAddContactClick.bind(this)}
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