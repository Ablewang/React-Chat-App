import React, { Component } from 'react'
import {Modal} from 'antd'
import UserSelectList from '../components/UserSelectList'

class UserSelectListModal extends Component{
    handleSearch=(value)=>{
        console.log(value)
    }
    render(){
        const {visible,onCancel,onOk} = this.props
        return(
            <Modal
                className="user-select-modal"
                visible={visible}
                title="用户选择"
                okText="确定"
                onCancel={onCancel}
                onOk={onOk}
            >
                123123123
                <UserSelectList onSearch={this.handleSearch} />
            </Modal>
        )
    }
}

export default UserSelectListModal