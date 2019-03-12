import React,{Component} from 'react'

class Record extends Component{
	render(){
		const record = this.props.record;
		return(
			<div className={'chat-record' + (record.maine?' maine' : '')}>
				<div className='record-header'>{new Date(record.date).Format('yyyy-MM-dd hh:mm:ss')}</div>
				<div className='record-content'>{record.content}</div>
			</div>
		)
	}
}

export default class ChatPanel extends Component{
	componentDidUpdate(){
		this.refs && this.refs.chatPanel && (this.refs.chatPanel.scrollTop = this.refs.chatPanel.scrollHeight)
	}
	render(){
		const records = this.props.records || [];
		const loginUser = this.props.loginUser || {};
		return(
			<div className='g-chat-panel' ref='chatPanel'>
				{records.map((itm,i)=><Record record={{...itm,maine:itm.from==loginUser.id}} index={i} key={i}/>)}
			</div>
		)
	}
}