import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'antd';
import ContactList from '../components/ContactList'
import { selectContact, initRecord, addContact, deleteContact, addStranger } from '../reducers/reducer'
import { searchUser, searchRecords, createRelation, deleteRelation, getRelation } from '../dataHelper'

class ContactListContanier extends Component {
	static propTypes = {
		loginUser: PropTypes.object,
		strangerList: PropTypes.array,
		contactList: PropTypes.array,
		currentContact: PropTypes.object,
		onSelectContact: PropTypes.func,
		onInitRecord: PropTypes.func,
		onAddContact: PropTypes.func,
		onDeleteContact: PropTypes.func,
		onAddStranger: PropTypes.func,
	}
	constructor() {
		super();
		this.state = { modalVisible: false, onDeleteContact: null }
	}
	handleSelectContact = (id) => {
		const select = searchUser('id', id);
		if (!select) { return alert('用户信息有误'); }
		this.props.onSelectContact(select);
		const records = searchRecords(this.props.loginUser.id, select.id)
		console.log(records)
		this.props.onInitRecord(records);
	}
	handleOnAddContact = (contact) => {
		createRelation(this.props.loginUser.id, contact.id)
		this.props.onAddContact(contact)
	}
	handleOnDeleteContact = (contact) => {
		this.setState({ modalVisible: true, onDeleteContact: contact })
	}
	handleOk = () => {
		deleteRelation(this.props.loginUser.id, this.state.onDeleteContact.id, this.props.isStranger)
		this.props.onDeleteContact({...this.state.onDeleteContact,isStranger:this.props.isStranger})
		if(!this.props.isStranger){
			const rel = getRelation(this.state.onDeleteContact.id, this.props.loginUser.id)
			rel && this.props.onAddStranger(this.state.onDeleteContact)
		}
		console.log(this)
		if(this.props.currentContact && this.state.onDeleteContact.id === this.props.currentContact.id){
			this.props.onSelectContact(null)
			this.props.onInitRecord([])
		}
		this.setState({ modalVisible: false, onDeleteContact: null })
	}
	handleCancel = () => {
		this.setState({ modalVisible: false })
	}
	render() {
		const contactList = this.props.isStranger ? this.props.strangerList : this.props.contactList
		return (
			<div>
				<ContactList current={this.props.currentContact}
					contactList={contactList}
					isStranger={this.props.isStranger}
					onSelect={this.handleSelectContact}
					onAddContact={this.handleOnAddContact}
					onDeleteContact={this.handleOnDeleteContact} />
				<Modal title={`${this.props.isStranger ? '黑名单' : '联系人'}删除确认`}
					mask={false}
					centered
					visible={this.state.modalVisible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					是否确认删除{!this.state.onDeleteContact ? '' : this.state.onDeleteContact.username}?
				</Modal>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		loginUser: state.loginUser,
		strangerList: state.strangerList,
		contactList: state.contactList,
		currentContact: state.currentContact
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onSelectContact: (contactid) => {
			dispatch(selectContact(contactid))
		},
		onInitRecord: (records) => {
			dispatch(initRecord(records))
		},
		onAddContact: (contact) => {
			dispatch(addContact(contact))
		},
		onDeleteContact: (contact) => {
			dispatch(deleteContact(contact))
		},
		onAddStranger: (contact) => {
			dispatch(addStranger(contact))
		},
		
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactListContanier)