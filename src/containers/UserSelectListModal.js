import React, { Component } from 'react'
import {Modal} from 'antd'
import UserSelectList from '../components/UserSelectList'
import {searchUserList} from '../dataHelper'
class UserSelectListModal extends Component{
    constructor(){
        super()
        this.state={
            userSearchResult:[],
            userSelected:[]}
    }
    handleSearch=(value)=>{
        console.log(value)
        let list = searchUserList('username',value,true)
        this.setState({
            userSearchResult:list
        })
    }
    render(){
        const {visible,onCancel,onOk} = this.props
        return(
            <Modal
                visible={visible}
                title="用户选择"
                okText="确定"
                cancelText="关闭"
                onCancel={onCancel}
                onOk={onOk}
                width="80%"
                className="modal-wrapper"
                bodyStyle={{width:'80',height:'calc(100% - 108px)',padding:0,overflow:'auto'}}
            >
                <UserSelectList list={this.state.userSearchResult} onSearch={this.handleSearch} />
            </Modal>
        )
    }
}

export default UserSelectListModal