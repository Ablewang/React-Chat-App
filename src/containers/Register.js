import React, { Component } from 'react'
import UserSelectListModal from './UserSelectListModal'
import EditableTable from './EditableTable'
import {
  Form, Select, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col, Tabs, Card, Collapse, Cascader
} from 'antd';
import { searchUserByFunc} from '../dataHelper'

const { Option } = Select;
const TabPane = Tabs.TabPane;

const cityOption = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
const workOption=['前端攻城狮','全栈','PHP','Pyton','.Net','设计小姐姐','视觉小哥哥']
const instertingOption=['吃饭','睡觉','打豆豆','蹦迪','工作','搞技术']
function callback(key) {
  console.log(key);
}
function onChange(value) {
  console.log(value);
}
class Demo extends React.Component {
  constructor() {
    super()
    this.state = { 
      sex:'',
      selectedUser: [{"id":1,"username":"user1","password":"user1","online":false,"lastMessasge":""},{"id":10,"username":"user10","password":"user10","online":true,"lastMessasge":""},{"id":11,"username":"user11","password":"user11","online":true,"lastMessasge":""},{"id":12,"username":"user12","password":"user12","online":true,"lastMessasge":""},{"id":13,"username":"user13","password":"user13","online":true,"lastMessasge":""},{"id":14,"username":"user14","password":"user14","online":true,"lastMessasge":""},{"id":15,"username":"user15","password":"user15","online":false,"lastMessasge":""},{"id":16,"username":"user16","password":"user16","online":true,"lastMessasge":""},{"id":18,"username":"user18","password":"user18","online":true,"lastMessasge":""},{"id":19,"username":"user19","password":"user19","online":false,"lastMessasge":""},{"id":21,"username":"user21","password":"user21","online":true,"lastMessasge":""}], 
      visibleUserSelectModal: false }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.form)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSexChange=(e)=>{
    this.setState({
      sex:e.target.value
    })
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  validateToNextPassword = () => {
    return false
  }
  handleConfirmBlur = () => {

  }
  compareToFirstPassword = () => {

  }
  handleModalCancel = () => {
    this.setState({
      visibleUserSelectModal: false
    })
  }
  handleModalOK = (selectList) => {
    if(selectList && selectList.size){
      this.state.selectedUser.forEach((itm)=>{
        selectList.has(itm.id) && selectList.delete(itm.id) 
      })
      if(selectList && selectList.size){
        const list = searchUserByFunc((user)=>selectList.has(user.id))
        console.log([...this.state.selectedUser,...list])
        this.setState({
          selectedUser:[...this.state.selectedUser,...list]
        })
      }
    }
    this.setState({
      visibleUserSelectModal: false
    })
  }
  handleShowUserSelectModal=(event)=>{
    this.setState({
      visibleUserSelectModal: true
    })
    event.stopPropagation()
  }
  handleDeleteBeforehandContact=(id)=>{
    const index = this.state.selectedUser.findIndex(itm=>itm.id === id)
    if(index > -1){
      this.state.selectedUser.splice(index, 1)
      this.setState({
        selectedUser:this.state.selectedUser
      })
    }
  }
  render() {
    const spouse=['帅气','型男','车','房','黏人','小鲜肉']
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const selectedUser = this.state.selectedUser || []
    return (
      <div className="register-continer">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='form-register'>
          <Tabs defaultActiveKey="baseinfo"
            onChange={callback}
            tabBarExtraContent={<Button type="primary" htmlType="submit">注册</Button>}
            className='tab-register'
          >
            <TabPane tab="基础信息" className='tab-info info' key="baseinfo">
              <Form.Item label="账号ID">
                <span className="ant-form-text">China</span>
              </Form.Item>
              <Form.Item label="用户名">
                {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名' }] })(
                    <Input placeholder="用户名" />
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入密码'
                  }, {
                    // validator: this.validateToNextPassword
                  }]
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur} />
                )
                }
              </Form.Item>
              <Form.Item label="密码确认">
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: "请再次输入密码"
                  }, {
                    // validator: this.compareToFirstPassword
                  }]
                })(
                  <Input type="confirm" />
                )}
              </Form.Item>
              <Form.Item label="性别">
                {getFieldDecorator('sex')(
                  <Radio.Group onChange={this.handleSexChange}>
                    <Radio.Button value="man">男</Radio.Button>
                    <Radio.Button value="female">女</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="收入水平" style={{display:(this.state.sex==='man' ? 'block' : 'none')}}>
                {getFieldDecorator('income',{rules:[
                  {
                    required:this.state.sex==='man',message:'别怕我难过，不要不好意思写哦'
                  }
                ]})(
                  <InputNumber min={0} />
                )}
                <span className="ant-form-text"> 万元</span>
              </Form.Item>
              <Form.Item label="梦想中的他" style={{display:(this.state.sex==='female' ? 'block' : 'none')}}>
                {getFieldDecorator('spouse',{rules:[{
                  required:this.state.sex ==='female', message:'请留下您白马王子的特点哦', type: 'array'
                }]})(
                  <Select mode="multiple" placeholder="请留选出您心目中的白马王子">
                    {spouse.map((sp, i)=><Option key={i} value={sp}>{sp}</Option>)}
                  </Select>
                )}
              </Form.Item> 
              <Form.Item label="年龄">
                {getFieldDecorator('age')(
                  <Slider max={70} marks={{
                    0: '襁褓', 10: '孩提', 20: '弱冠', 30: '而立', 
                    40: '不惑', 50: '知非',60: '花甲', 70: '稀'
                  }} />
                )}
              </Form.Item>
              <Form.Item label="所在城市">
                {getFieldDecorator('city')(
                  <Cascader options={cityOption} onChange={onChange} placeholder="请选择" />,
                )}
              </Form.Item>
              <Form.Item label="职业" hasFeedback >
                {getFieldDecorator('work')(
                  <Select placeholder="请选择职业">
                    {workOption.map(itm=><Option key={itm} value={itm}>{itm}</Option>)}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="宅度">
                {getFieldDecorator('homerate')(
                  <Rate />
                )}
              </Form.Item>
              <Form.Item label="兴趣爱好">
                {getFieldDecorator('interesting')(
                  <Checkbox.Group style={{width:'100%'}}>
                    <Row>
                      {instertingOption.map(itm=>
                        <Col key={itm} span={6}><Checkbox value={itm}>{itm}</Checkbox></Col>
                      )}
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
              <Form.Item label="好友预添加" >
                <Collapse>
                  <Collapse.Panel header={<Button type="primary" onClick={(e)=>this.handleShowUserSelectModal(e)}>选择</Button>}>
                      {getFieldDecorator('beforehand',{normalize:()=>{
                        return this.state.selectedUser
                      }})(
                        <Row style={{width:'100%'}}>
                          {selectedUser.map((item, i) => {
                            return <Col key={item.id} span={4}>
                                    <Card
                                      size="small"
                                      title={item.online ? '在线' : '离线'}
                                      extra={<a title="删除" onClick={()=>this.handleDeleteBeforehandContact(item.id)}><Icon type="delete" /></a>}
                                      style={{margin:'0 10px 10px 0'}}
                                    >
                                      {item.username}
                                    </Card>
                                  </Col>
                          })}
                        </Row>
                      )}
                  </Collapse.Panel>
                </Collapse>
              </Form.Item>
              <Form.Item label="头像">
                <div className="dropbox">
                  {getFieldDecorator('photo', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
                    </Upload.Dragger>
                  )}
                </div>
              </Form.Item>
              <Form.Item label="是否接受系统推送信息">
                  {getFieldDecorator('iAcceptMessage')(
                    <Switch />
                  )}
              </Form.Item>
            </TabPane>
            <TabPane tab="目标" className='tab-info target' key="goals">
              <Row>
                <Col span={4}></Col>
                <Col span={16}>
                  <EditableTable />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
        <UserSelectListModal
          currentSelected={this.state.selectedUser}
          visible={this.state.visibleUserSelectModal}
          onCancel={this.handleModalCancel}
          onOk={this.handleModalOK}
          width='700px'
        />
      </div>
    );
  }
}


const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);

class Register extends Component {
  render() {
    return (
      <WrappedDemo />
    )
  }
}

export default Register