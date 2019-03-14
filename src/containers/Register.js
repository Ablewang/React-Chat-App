import React, { Component } from 'react'
import UserSelectListModal from './UserSelectListModal'
import EditableTable from './EditableTable'
import {
  Form, Select, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col, Tabs, Card
} from 'antd';

const { Option } = Select;
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}
class Demo extends React.Component {
  constructor() {
    super()
    this.state = { selectedUser: [],visibleUserSelectModal:false }
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate')
    return true
  }
  componentDidUpdate(){
    console.log('componentDidUpdate')
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  validateToNextPassword = () => {

  }
  handleConfirmBlur = () => {

  }
  compareToFirstPassword = () => {

  }
  handleModalCancel = () => {
    this.setState={
      visibleUserSelectModal:false
    }
  }
  handleModalOK = () => {

  }
  handleShowUserSelectModal(){
    console.log(this)
    this.setState={
      visibleUserSelectModal:true
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const selectedUser = this.state.selectedUser || []
    return (
      <div className="register-continer">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='form-register'>
        <Tabs defaultActiveKey="1"
          onChange={callback}
          tabBarExtraContent={<Button type="primary" htmlType="submit">Submit</Button>}
          className='tab-register'
        >
          <TabPane tab="基础信息" className='tab-info info' key="1">
            <Form.Item label="账号ID">
              <span className="ant-form-text">China</span>
            </Form.Item>
            <Form.Item label="用户名">
              {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名' }] })
                (<Input placeholder="用户名" />)
              }
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码'
                }, {
                  validator: this.validateToNextPassword
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
                  validator: this.compareToFirstPassword
                }]
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('sex')(
                <Radio.Group>
                  <Radio.Button value="man">男</Radio.Button>
                  <Radio.Button value="female">女</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="好友预添加">
              <Button type="primary" onClick={this.handleShowUserSelectModal.bind(this)}>选择</Button>
              <div>
                {selectedUser.map((item, i) => {
                  return <Card title={item.username}>他什么都没留下</Card>
                })}
              </div>
            </Form.Item>
            <Form.Item
              label="Select"
              hasFeedback
            >
              {getFieldDecorator('select', {
                rules: [
                  { required: true, message: 'Please select your country!' },
                ],
              })(
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item
              label="Select[multiple]"
            >
              {getFieldDecorator('select-multiple', {
                rules: [
                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Please select favourite colors">
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item
              label="InputNumber"
            >
              {getFieldDecorator('input-number', { initialValue: 3 })(
                <InputNumber min={1} max={10} />
              )}
              <span className="ant-form-text"> machines</span>
            </Form.Item>

            <Form.Item
              label="Switch"
            >
              {getFieldDecorator('switch', { valuePropName: 'checked' })(
                <Switch />
              )}
            </Form.Item>

            <Form.Item
              label="Slider"
            >
              {getFieldDecorator('slider')(
                <Slider marks={{
                  0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F',
                }}
                />
              )}
            </Form.Item>

            <Form.Item
              label="Radio.Group"
            >
              {getFieldDecorator('radio-group')(
                <Radio.Group>
                  <Radio value="a">item 1</Radio>
                  <Radio value="b">item 2</Radio>
                  <Radio value="c">item 3</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item
              label="Radio.Button"
            >
              {getFieldDecorator('radio-button')(
                <Radio.Group>
                  <Radio.Button value="a">item 1</Radio.Button>
                  <Radio.Button value="b">item 2</Radio.Button>
                  <Radio.Button value="c">item 3</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item
              label="Checkbox.Group"
            >
              {getFieldDecorator("checkbox-group", {
                initialValue: ["A", "B"],
              })(
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                    <Col span={8}><Checkbox disabled value="B">B</Checkbox></Col>
                    <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                    <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                    <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>

            <Form.Item
              label="Rate"
            >
              {getFieldDecorator('rate', {
                initialValue: 3.5,
              })(
                <Rate />
              )}
            </Form.Item>

            <Form.Item
              label="Upload"
              extra="longgggggggggggggggggggggggggggggggggg"
            >
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
              </Button>
                </Upload>
              )}
            </Form.Item>

            <Form.Item
              label="Dragger"
            >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                )}
              </div>
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 12, offset: 6 }}
            >
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </TabPane>
          <TabPane tab="兴趣爱好" className='tab-info target' key="2">
            <Row>
              <Col span={4}></Col>
              <Col span={16}>
                <UserSelectListModal />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="兴趣爱好" className='tab-info target' key="3">
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
          visible={this.state.visibleUserSelectModal}
          onCancel={this.handleModalCancel}
          onOk={this.handleModalOK}
        />
      </div>
    );
  }
}


const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);

class Register extends Component {
  render() {
    return (
      <div>this is register</div>
    )
  }
}

export default WrappedDemo