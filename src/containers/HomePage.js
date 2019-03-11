import React,{Component} from 'react'
import UserInfo from '../components/UserInfo'
import ContactList from '../components/ContactList'
import ChatForm from './ChatForm'
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;

class HomePage extends Component{
	constructor(){
		super();
		this.state={
			data:getInitData(),
    		collapsed: false,
		}
	}
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
	render(){
		return(
	      <Layout className='g-homepage'>
	        <Sider
	          trigger={null}
	          collapsible
	          collapsed={this.state.collapsed}
	          className='g-sider'
	          width='280'
	        >
	          <UserInfo loginInfo={this.state.loginInfo}/>
	          <Menu mode="inline" 
	          		defaultSelectedKeys={['contact']} 
			        defaultOpenKeys={['contact']}
			        className='g-menu'>
	           <SubMenu
	              className='menu-item'
	              key="contact"
	              title={<span><Icon type="user" /><span>联系人列表</span></span>}
	            >
	            <ContactList list={this.state.data.contactList}/>
	            </SubMenu>
	          </Menu>
	        </Sider>
	        <Layout className='c-content-form'>
	          <Header className='g-header'>
	            <Icon
	              className="trigger"
	              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
	              onClick={this.toggle}
	            />
	            <span className='current-select'>用户1</span>
	          </Header>
	          <Content className='c-content'>
	            <ChatForm records={this.state.data.records}/>
	          </Content>
	        </Layout>
	      </Layout>
		)
	}
}

const getInitData=()=>{
	let contactList = [];
	let loginInfo = {
		userid:-1,
		username:'超级管理员',
		online:true,
	};
	let records = [];
	const random = Math.random()*50;
	for (var i = 0; i < random; i++) {
		contactList.push({
			id:i,
			username:'user' + i,
			online:Math.random() > 0.4,
			lastMessasge:Math.random() > 0.2 ? '最后的轻语' : ''
		})
	}
	const content = ['啊哈哈哈哈','呵呵呵呵呵呵','内容内容内容内容内容','啊asdf内容内容内容内容内容哈哈内容内容内容内容内容哈哈','呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵','内容内容内容内容内容','ReactReactReactReact 内容内容内容内容内容']
	var date = +new Date();
	for (var i = 0; i < random; i++) {
		let temp = {
			maine:Math.random() > 0.4,
			content:content[parseInt(Math.random()*content.length)],
			date:date + random* 1000
		};
		records.push(temp);
		date = temp.date;
	}
	return {contactList,loginInfo,records}
}
export default HomePage