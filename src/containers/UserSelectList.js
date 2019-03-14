import React, { Component } from 'react'
import UserSelectList from '../components/UserSelectList'

class UserSelectListContiner extends Component{
    handleSearch=(value)=>{
        console.log(value)
    }
    render(){
        return(
            <UserSelectList onSearch={this.handleSearch} />
        )
    }
}

export default UserSelectListContiner