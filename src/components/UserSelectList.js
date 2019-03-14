import React, { Component } from 'react'
import { Row, Col, List, Card, Input } from 'antd';
const Search = Input.Search
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];

class UserSelectList extends Component {
  constructor(){
    super()
    this.state={selected:new Set()}
  }
  handleSearch=(value)=>{
    if(!value || !value.length) return
    this.props.onSearch && this.props.onSearch(value)
  }
  handleClickCard=(index)=>{
    this.state.selected.has(index) ? this.state.selected.delete(index) : this.state.selected.add(index)
    this.setState({
      selected:this.state.selected
    })
  }
  render() {
    const list = data
    return (
      <div>
          <Search onSearch={value=>this.handleSearch(value)} style={{ margin: '10px 0', width: '280px' }} />
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={list}
            renderItem={(item,i) => (
              <List.Item>
                <Card title={item.title} 
                      hoverable 
                      className={this.state.selected.has(i) ? 'selected' : ''}
                      onClick={()=>{this.handleClickCard(i)}}>Card content</Card>
              </List.Item>
            )}
          />
      </div>
    )
  }
}

export default UserSelectList