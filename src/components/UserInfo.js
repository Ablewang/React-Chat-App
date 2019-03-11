import React,{Component} from 'react'
import { Card, Icon, Avatar } from 'antd';
import photo from '../resource/images/photo.png'
import underlinePhoto from '../resource/images/photo-underline.png'

const { Meta } = Card;
const login = <Icon type="login" title='登录' /> //login
const logout = <Icon type="logout" title='退出' style={{color:'red'}} /> //logout
const add = <Icon type="plus" title='新增联系人' />
const otherAction = <Icon type="ellipsis" title='其他' />

export default class UserInfo extends Component{
	render(){
		const userInfo = this.props.loginInfo||{};
		return(
			 <Card
			 	className='g-user-card'
			    actions={userInfo.online ? [logout, add, otherAction]:[login]}
			  >
			    <Meta
			      avatar={<Avatar src={userInfo.online  ? photo : underlinePhoto} />}
			      title={userInfo.username||'请先登录'}
			    />
			  </Card>
		)
	}
}