import React, { Component } from 'react'
import EditableTable from '../components/EditableTable'

class UserSelectListContiner extends Component{
    handleSearch=(value)=>{
        console.log(value)
    }
    render(){
        return(
            <EditableTable />
        )
    }
}

export default EditableTable