import React, { Component } from 'react'

class Record extends Component {
	render() {
		const record = this.props.record;
		return (
			<div className={'chat-record' + (record.maine ? ' maine' : '')}>
				<div className='record-header'>{new Date(record.date).Format('yyyy-MM-dd hh:mm:ss')}</div>
				<div className='record-content'>{record.content}</div>
			</div>
		)
	}
}
const base = {
	isLoading: false,
	scrollTop: true,
	height: 45,
	pageSize: 50,
	pageNumber: 1
}
export default class ChatPanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showRecords: [],
			records: []
		}
	}
	componentDidMount() {
		const baseHeigt = base.height * base.pageSize
		if (this.refs && this.refs.recordBarContiner) {
			this.refs.recordBarContiner.onscroll = (e) => {
				const contentHeight = e.target.scrollHeight - e.target.scrollTop
				const contentPage = parseInt(contentHeight / baseHeigt)
				this.refs.recordContiner.scrollTop -= contentHeight - e.target.offsetHeight
				console.log(this.refs.recordContiner.scrollTop)
				if (contentPage != base.pageNumber) {
					base.pageNumber = contentPage || 1
					this.setState({
						showRecords: this._getRecords()
					})
				}
			}
		}
	}
	componentWillReceiveProps(props) {
		const records = props.records || [];
		this.setState({
			showRecords: records.slice(-base.pageSize),
			records: records
		})
		base.scrollTop = true
	}
	componentDidUpdate() {
		console.log('ChatPanel componentDidUpdate')
		if (this.refs && this.refs.chatPanel) {
			if (this.refs.scrollBar) {
				this.refs.scrollBar.style.height = this.state.records.length * base.height + 'px'
			}
			if (base.scrollTop) {
				base.scrollTop = false
				this.refs.recordBarContiner && (this.refs.recordBarContiner.scrollTop = this.refs.recordBarContiner.scrollHeight)
			}
			this.refs.recordContiner && (this.refs.recordContiner.scrollTop = this.refs.recordContiner.scrollHeight)
		}
	}
	_getRecords = () => {
		let res = []
		if (this.state.records && base) {
			res = base.pageNumber == 1
			?this.state.records.slice(-base.pageSize)
			:this.state.records.slice(-base.pageSize * base.pageNumber, -(base.pageNumber - 1) * base.pageSize)
		}
		return res
	}
	render() {
		const loginUser = this.props.loginUser || {};
		console.log('ChatPanel render')
		return (
			<div className='g-chat-panel' ref='chatPanel'>
				<div className='record-scroll-bar' ref='recordBarContiner'>
					<div ref='scrollBar'></div>
				</div>
				<div className='records-continer' ref='recordContiner'>
					{this.state.showRecords.map((itm, i) => <Record record={{ ...itm, maine: itm.from === loginUser.id }} index={i} key={i} />)}
				</div>
			</div>
		)
	}
}