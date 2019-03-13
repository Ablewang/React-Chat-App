import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { List, message, Avatar, Icon } from 'antd';
import photo from '../resource/images/photo.png'
import underlinePhoto from '../resource/images/photo-underline.png'

export default class ContactList extends Component {
  handleSelectContact = (id) => {
    this.props.onSelect && this.props.onSelect(id);
  }
  handleAdd = (e, contact) => {
    e.stopPropagation()
    this.props.onAddContact && this.props.onAddContact(contact)
  }
  handleDelete = (e, contact) => {
    e.stopPropagation()
    this.props.onDeleteContact && this.props.onDeleteContact(contact)
  }

  render() {
    const current = this.props.current || {}
    const list = this.props.contactList || []
    return (
      <List
        ref='list'
        className='g-contact-list'
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}
            className={'contact-item' + (item.id === current.id ? ' selected' : '')}
            onClick={this.handleSelectContact.bind(this, item.id)}>
            <List.Item.Meta
              avatar={<Avatar src={item.online ? photo : underlinePhoto} />}
              title={item.username}
              description={item.lastMessasge}
            />
            <div className='c-status'>
              <span>{item.online ? '在线' : '离线'}</span>
              <div className='c-action'>
                {this.props.isStranger ? <Icon className='add' type="user-add" title='添加好友' onClick={(e) => { this.handleAdd(e, item) }} /> : null}
                <Icon className='delete' type="user-delete" title='删除' onClick={(e) => { this.handleDelete(e, item) }} />
              </div>
            </div>
          </List.Item>
        )}
      >
      </List>
    )
  }
}
