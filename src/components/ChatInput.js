import React,{Component} from 'react'
import { Input } from 'antd';
const { TextArea } = Input;

export default class ChatInput extends Component{
	render(){
		return(
			<div className='g-chat-input'>
				<TextArea/>
				<div className='btn-submit'>发送</div>
			</div>
		)
	}
}