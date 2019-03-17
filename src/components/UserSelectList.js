import React, { Component } from 'react'
import {  List, Card, Input } from 'antd';
const Search = Input.Search
class UserSelectList extends Component {
  constructor(){
    super()
    this.state={selected:new Set()}
  }
  handleSearch=(value)=>{
    if(!value || !value.length) return
    this.props.onSearch && this.props.onSearch(value)
  }
  handleClickCard=(id)=>{
    const selected = this.state.selected.has(id)
    selected ? this.state.selected.delete(id) : this.state.selected.add(id)
    this.setState({
      selected:this.state.selected
    })
    this.props.onClickItem && this.props.onClickItem(id, !selected)
  }
  render() {
    const list = this.props.list || []
    const currentSelected = this.props.currentSelected || []
    const curSelectedSet = new Set(currentSelected.map((itm)=> itm.id))
    return (
      <div className="user-list-continer">
          <Search className="list-search" onSearch={value=>this.handleSearch(value)} style={{ margin: '10px 0', width: '280px' }} />
          <List
            className="user-list"
            grid={{ gutter: 16, column: 4 }}
            dataSource={list}
            renderItem={(item,i) => (
              <List.Item>
                <Card title={item.online ? "在线" : "离线"} 
                      hoverable 
                      className={this.state.selected.has(item.id) || curSelectedSet.has(item.id) ? 'selected' : ''}
                      onClick={()=>{this.handleClickCard(item.id)}}
                >
                  {item.username}
                </Card>
              </List.Item>
            )}
          />
      </div>
    )
  }
}

export default UserSelectList