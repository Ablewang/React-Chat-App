import React,{Component} from 'react'
import ChatPanel from '../components/ChatPanel'
import ChatInput from '../components/ChatInput'

export default class ChatForm extends Component{
	render(){
		const records = this.props.records;
		return(
			<div className='g-chat-form'>
				<ChatPanel records={records}/>
				<ChatInput />
			</div>
		)
	}
}