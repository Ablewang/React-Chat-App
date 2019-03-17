import React, { Component } from 'react'
import {Modal} from 'antd'
import UserSelectList from '../components/UserSelectList'
import {searchUserList} from '../dataHelper'
class UserSelectListModal extends Component{
    constructor(){
        super()
        this.state={
            userSearchResult:[],
            selectedList:new Set()}
    }
    handleSearch=(value)=>{
        console.log(value)
        let list = searchUserList('username',value,true)
        this.setState({
            userSearchResult:list
        })
    }
    handleClickItem=(id, select)=>{
        select ? this.state.selectedList.add(id) : this.state.selectedList.delete(id)
    }
    render(){
        const {visible,onCancel,onOk,currentSelected} = this.props
        return(
            <Modal
                visible={visible}
                title="用户选择"
                okText="确定"
                cancelText="关闭"
                onCancel={onCancel}
                onOk={()=>{onOk && onOk(this.state.selectedList)}}
                width="80%"
                className="modal-wrapper"
                bodyStyle={{width:'80',height:'calc(100% - 108px)',padding:0,overflow:'auto'}}
            >
                <UserSelectList
                    currentSelected={currentSelected} 
                    list={this.state.userSearchResult} 
                    onClickItem={this.handleClickItem} 
                    onSearch={this.handleSearch} />
            </Modal>
        )
    }
}

export default UserSelectListModal