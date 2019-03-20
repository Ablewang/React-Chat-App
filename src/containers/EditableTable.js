import React, { Component } from 'react'
import moment from 'moment'
import {
  Table, Input, InputNumber, Popconfirm, Form, Button, DatePicker
} from 'antd';
import '../common'
import { getGoal } from '../dataHelper'
const dateFormat = 'YYYY-MM-DD'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  getInput = () => {
    switch (this.props.inputType) {
      case 'number': return <InputNumber />
      case 'date':
        return <DatePicker />
      default: return <Input />
    }
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入 ${title}!`,
                    }],
                    initialValue: inputType === 'date' ? moment(record[dataIndex], dateFormat) : record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: getGoal(), editingKey: '' };
    this.columns = [
      {
        title: '目标',
        dataIndex: 'goal',
        width: '40%',
        editable: true,
      },
      {
        title: '价值',
        dataIndex: 'price',
        width: '15%',
        editable: true,
      },
      {
        title: '截止时间',
        dataIndex: 'endline',
        width: '25%',
        editable: true,
        inputType: 'date'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:void(0);"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="是否确认取消编辑?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                  <span>
                    <a 
                      style={{ marginRight: 8 }}
                      onClick={() => this.edit(record.key)}
                    >
                        编辑
                    </a>
                    <Popconfirm
                      title={`是否确认删除[${record.goal}]`}
                      onConfirm={()=>{this.delete(record.key)}}
                    >
                      <a>删除</a>
                    </Popconfirm>
                  </span>
                )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = (key) => {
    this.setState({ editingKey: '' });
    let index = this.state.data.findIndex(item => item.key === key)
    if (index > -1 && this.state.data[index].isAdd) {
      this.state.data.splice(index, 1)
      this.setState({
        data: this.state.data
      })
    }
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const endline = row['endline'].format('YYYY-MM-DD')
      const values = { ...row, endline: endline }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        item.isAdd = false
        newData.splice(index, 1, {
          ...item,
          ...values,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(values);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  delete = (key) => {
    const index = this.state.data.findIndex(itm => itm.key === key)
    if(index > -1){
      this.state.data.splice(index, 1)
      this.setState({
        data : this.state.data
      })
    }
  }
  edit(key) {
    this.setState({ editingKey: key });
  }
  handleAddColumn = () => {
    let index = this.state.data.length
    this.state.data.unshift({
      key: index.toString(),
      goal: '',
      price: null,
      endline: new Date().Format('yyyy-MM-dd'),
      isAdd: true
    })
    this.setState({
      data: this.state.data,
      editingKey: index.toString()
    })
  }
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: getColumnInputType(col.dataIndex),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        }),
      };
    });

    return (
      <div>
        <div style={{ padding: '10px 0', textAlign: "right" }}>
          <Button onClick={this.handleAddColumn}>新增</Button>
        </div>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </div>
    );
  }
}
const getColumnInputType = (index) => {
  switch (index) {
    case 'goal': return 'text';
    case 'value': return 'number';
    case 'endline': return 'date';
    default: return ''
  }
}
export default EditableTable