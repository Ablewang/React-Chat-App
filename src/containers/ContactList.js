import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import ContactList from '../components/ContactList'
import reqwest from 'reqwest';

class ContactListContanier extends Component{
  static propTypes={
    contactList:PropTypes.array
  }
	constructor(){
		super();
		this.state={
			currentSelectId:-1
		}
	}
	handleSelectContact=(id)=>{
		console.log(id);
	}
	render(){
		return(
          <ContactList contactList={this.props.contactList} onSelect={this.handleSelectContact}/>
		)
	}
}
const mapStateToProps=(state)=>{
  return{
    contactList:state.contactList
  }
}

export default connect(mapStateToProps)(ContactListContanier)