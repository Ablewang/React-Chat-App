import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {List, message, Avatar, Spin,Icon} from 'antd';
import photo from '../resource/images/photo.png'
import underlinePhoto from '../resource/images/photo-underline.png'

export default class ContactList extends Component{
	constructor(){
		super();
	}
	handleSelectContact=(id)=>{
    this.props.onSelect && this.props.onSelect(id);
	}
  handleAdd=(e,id)=>{
    console.log(id)
    e.stopPropagation()
  }
  handleDelete=(e,id)=>{
    console.log(id)
    e.stopPropagation()
  }
	render(){
    const current = this.props.current || {}
		const list = this.props.contactList || []
		return(
          <List
          	ref='list'
          	className='g-contact-list'
            dataSource={list}
            renderItem={item => (
              <List.Item  key={item.id} 
                          className={'contact-item' + (item.id === current.id ? ' selected' : '')}
                          onClick={this.handleSelectContact.bind(this,item.id)}>
                <List.Item.Meta
                  avatar={<Avatar src={item.online?photo:underlinePhoto}/>}
                  title={item.username}
                  description={item.lastMessasge}
                />
                <div>
                  <span>{item.online?'在线':'离线'}</span>
                  <div className='c-action'>
                    {this.props.isStranger ? <Icon className='add' type="plus" title='添加好友' onClick={(e)=>{this.handleAdd(e,item.id)}}/> : null}
                    <Icon className='delete' type="close" title='删除'  onClick={(e)=>{this.handleDelete(e,item.id)}}/>
                  </div>
                </div>
              </List.Item>
            )}
          >
          </List>
		)
	}
}
