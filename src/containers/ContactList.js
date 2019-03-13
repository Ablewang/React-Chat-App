import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import ContactList from '../components/ContactList'
import {selectContact,initRecord} from '../reducers/reducer'
import {searchUser,searchRecords} from '../dataHelper'

class ContactListContanier extends Component{
	static propTypes={
		loginUser:PropTypes.object,
		strangerList:PropTypes.array,
		contactList:PropTypes.array,
		currentContact:PropTypes.object,
		onSelectContact:PropTypes.func,
		onInitRecord:PropTypes.func,
	}
	constructor(){
		super();
	}
	handleSelectContact=(id)=>{
		const select = searchUser('id',id);
		if (!select) {return alert('用户信息有误');}
		this.props.onSelectContact(select);
		const records = searchRecords(this.props.loginUser.id,select.id)
		console.log(records)
		this.props.onInitRecord(records);
	}
	render(){
		const contactList =this.props.isStranger?this.props.strangerList: this.props.contactList
		const current = this.props.currentContact
		return(
          <ContactList current={this.props.currentContact} 
			           contactList={contactList} 
			           isStranger={this.props.isStranger}
			           onSelect={this.handleSelectContact}/>
		)
	}
}
const mapStateToProps=(state)=>{
  return{
    loginUser:state.loginUser,
    strangerList:state.strangerList,
    contactList:state.contactList,
    currentContact:state.currentContact
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		onSelectContact:(contactid)=>{
			dispatch(selectContact(contactid))
		},
		onInitRecord:(records)=>{
			dispatch(initRecord(records))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactListContanier)