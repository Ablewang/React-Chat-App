import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {List, message, Avatar, Spin,} from 'antd';
import photo from '../resource/images/photo.png'
import underlinePhoto from '../resource/images/photo-underline.png'

import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class InfiniteListExample extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  }

  componentDidMount() {
    this.fetchData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="demo-infinite-container" 
          style={{ width: '100%' }}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default class ContactList extends Component{
	constructor(){
		super();
	}
	handleSelectContact=(id)=>{
    this.props.onSelect && this.props.onSelect(id);
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
                <div>{item.online?'在线':'离线'}</div>
              </List.Item>
            )}
          >
          </List>
		)
	}
}
