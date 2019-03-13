import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ChatPanel from '../components/ChatPanel'
import ChatInput from '../components/ChatInput'
import { addRecord } from '../reducers/reducer'
import { createRecord } from '../dataHelper'
class ChatForm extends Component {
	static propTypes = {
		loginUser: PropTypes.object,
		currentContact: PropTypes.object,
		records: PropTypes.array,
		onAddRecord: PropTypes.func
	}
	handleSubmitRecord = (content) => {
		if (this.props.loginUser && this.props.currentContact) {
			const record = createRecord(this.props.loginUser.id, this.props.currentContact.id, content)
			console.log(record)
			this.props.onAddRecord(record)
		}
	}
	render() {
		const records = this.props.records;
		return (
			<div className='g-chat-form'>
				<ChatPanel loginUser={this.props.loginUser} records={records} />
				<ChatInput onSubmit={this.handleSubmitRecord} />
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		loginUser: state.loginUser,
		currentContact: state.currentContact,
		records: state.records,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onAddRecord: (record) => {
			dispatch(addRecord(record))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatForm)