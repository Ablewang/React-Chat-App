import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import {Layout,Form, Icon, Input, Button} from 'antd';
const {
  Header, Content,
} = Layout;

class Login extends Component{
	static propTypes={
		onLogin:PropTypes.func,
		onCancelLogin:PropTypes.func
	}
	handleLogin=(e)=>{
		e.preventDefault()
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
			this.props.onLogin && this.props.onLogin(values);
	      }
	    })
	}
	handleCancelLogint=()=>{
		this.props.onCancelLogin && this.props.onCancelLogin();
	}
	render(){
    	const { getFieldDecorator } = this.props.form;
		return(
			<div className='g-login'>
				<div className="login-wrapper">
					<Header>登录/注册</Header>
					<Content>
						<Form className='login-form' onSubmit={this.handleLogin}>
							<Form.Item>
							{getFieldDecorator('username', 
								{rules: [{ required: true, message: '请填写用户名' }]})(
									<Input prefix={<Icon type='user' />} placeholder='用户名'/>
								)
							}
							</Form.Item>
					        <Form.Item>
							{getFieldDecorator('password', 
								{rules: [{ required: true, message: '请填写密码' }]})(
				            		<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />
								)
							}
					        </Form.Item>
					       	<Form.Item>
					       		<Button type='primary' htmlType='submit' className='login-form-button'>
					       		登录 / 注册
					       		</Button>
					       		<Button className='login-form-button' onClick={this.handleCancelLogint}>
					       		取消
					       		</Button>
					       	</Form.Item>
						</Form>
					</Content>
				</div>
			</div>
		)
	}
}
export default Form.create({ name: 'dynamic_rule' })(Login)