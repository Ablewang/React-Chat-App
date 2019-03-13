import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
// import UserInfo from '../components/UserInfo'
import UserInfo from './UserInfo'
import ContactList from './ContactList'
import ChatForm from './ChatForm'
import { Layout, Menu, Icon } from 'antd';
import { userLogin, initContact } from '../reducers/reducer'
import { searchUser, searchContact } from '../dataHelper'

const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;

class HomePage extends Component {
	static propsType = {
		currentContact: PropTypes.object,
		loginUser: PropTypes.object,
		contactList: PropTypes.array,
	}
	constructor() {
		// const temp = JSON.stringify(getInitData());
		// console.log(JSON.stringify(temp))
		super();
		this.state = {
			currentUser: null,
			collapsed: false,
		}
	}
	componentWillMount() {
		this._initInfo();
		console.log('componentWillMount')
	}
	componentDidMount() {
		console.log('componentDidMount')
	}
	componentDidUpdate() {
		console.log('componentDidUpdate')
	}
	_initInfo = () => {
		let userid = this._getLocalStorage('userid');
		if (userid && userid.length) {
			let user = searchUser('id', userid);
			if (user) {
				this.props.onInitContact(searchContact(userid))
				this.props.onLogin(user);
			} else {
				this._removeLocalStorage('usrid')
			}
		}
	}
	_getLocalStorage = (name) => {
		return localStorage.getItem(name)
	}
	_removeLocalStorage = (name) => {
		return localStorage.removeItem(name)
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	render() {
		return (
			<Layout className='g-homepage'>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
					className='g-sider'
					width='280'
				>
					<UserInfo />
					<Menu mode="inline"
						defaultSelectedKeys={['contact']}
						defaultOpenKeys={['contact']}
						className='g-menu'>
						<SubMenu
							className='menu-item'
							key="contact"
							title={<span><Icon type="user" /><span>联系人列表</span></span>}
						>
							<ContactList />
						</SubMenu>
						<SubMenu
							className='menu-item'
							key="stranger"
							title={<span><Icon type="user" /><span>黑名单</span></span>}
						>
							<ContactList isStranger='true' />
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
						<span className='current-select'>{!this.props.currentContact ? '' : this.props.currentContact.username}</span>
					</Header>
					<Content className='c-content'>
						<ChatForm records={null} />
					</Content>
				</Layout>
			</Layout>
		)
	}
}

const getInitData = () => {
	let userRelation = [];
	let userList = [];
	let loginUser = {
		userid: -1,
		username: '超级管理员',
		online: true,
	};
	let records = [];
	const random = parseInt(Math.random() * 50);
	for (let i = 0; i < random; i++) {
		userList.push({
			id: i,
			username: 'user' + i,
			password: 'user' + i,
			online: Math.random() > 0.4,
			lastMessasge: ''
		})
	}
	const content = ['啊哈哈哈哈', '呵呵呵呵呵呵', '内容内容内容内容内容', '啊asdf内容内容内容内容内容哈哈内容内容内容内容内容哈哈', '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵', '内容内容内容内容内容', 'ReactReactReactReact 内容内容内容内容内容']
	let date = +new Date();
	for (let i = 0; i < random * 10; i++) {
		let f = parseInt(Math.random() * random);
		let temp = {
			id: i,
			userId: f,
			contactId: getToId(f, random),
			date: date + random * 1000
		};
		userRelation.push(temp);
		date = temp.date;
	}
	date = +new Date();
	for (let i = 0; i < random * 50; i++) {
		let f = parseInt(Math.random() * random);
		let temp = {
			id: i,
			from: f,
			to: getToId(f, random),
			content: content[parseInt(Math.random() * content.length)],
			date: date + random * 1000
		};
		records.push(temp);
		date = temp.date;
	}
	return { userList, userRelation, loginUser, records }
}

const getToId = (fromId, max) => {
	let t = parseInt(Math.random() * max);
	return t === fromId ? getToId(fromId, max) : t;
}

const mapStateToProps = (state) => {
	return {
		loginUser: state.loginUser,
		contactList: state.contactList,
		currentContact: state.currentContact
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: (user) => {
			dispatch(userLogin(user))
		},
		onInitContact: (contactList) => {
			dispatch(initContact(contactList))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)