import React,{Component} from 'react'
import { Input } from 'antd';
const { TextArea } = Input;

export default class ChatInput extends Component{
	constructor(){
		super()
		this.state={
			content:''
		}
	}
	handleInputChange=(e)=>{
		this.setState({
			content:e.target.value
		})
	}
	handleSubmitRecord=()=>{
		const content = this.state.content;
		if(!content || !content.length) return;
		this.props.onSubmit && this.props.onSubmit(content)
		this.setState({
			content:''
		})
	}
	handleInputKeyDown=(e)=>{
		if (e.keyCode === 13 && e.ctrlKey) { 
            this.handleSubmitRecord();  
        } 
	}
	render(){
		return(
			<div className='g-chat-input'>
				<TextArea value={this.state.content} 
						  onChange={this.handleInputChange}
						  onKeyDown={this.handleInputKeyDown}/>
				<button className='btn-submit' onClick={this.handleSubmitRecord}>发送 Alt + Enter</button>
			</div>
		)
	}
}