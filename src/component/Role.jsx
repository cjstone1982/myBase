import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//antd
import { Table, Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
        <Modal visible={visible} title="Create a new collection" okText="Create" onCancel={onCancel} onOk={onCreate} >
            <Form vertical>
              <FormItem label="Title">
                {getFieldDecorator('roleName', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="Description">
                {getFieldDecorator('description')(<Input type="textarea" />)}
              </FormItem>
               {/*
              <FormItem className="collection-create-form_last-form-item">
                {getFieldDecorator('modifier', {
                  initialValue: 'public',
                })(
                  <Radio.Group>
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                  </Radio.Group>
                )}

              </FormItem>
              */}
            </Form>
        </Modal>
    );
  }
);

const columns = [
    { title : 'id',        dataIndex: 'objectId',  key: 'id'        },
    { title : 'roleName',  dataIndex: 'name',      key: 'roleName'  },
    { title : 'roles',     dataIndex: 'roles',     key: 'roles'     },
    { title : 'users',     dataIndex: 'users',     key: 'users'     },
    { title : 'createdAt', dataIndex: 'createdAt', key: 'createdAt' },
    { title : 'Action',    dataIndex: '',          key: 'delete',   render: () => <a href="#">Delete</a> },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
        console.log('加载当前角色');
        this.props.roleQuery()
    }
    componentWillUnmount(){
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    showModal() {
        this.setState({
            visible: true
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    handleCreate() {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.props.roleAdd(values)
            form.resetFields();
            this.setState({
                visible: false
            });
        });
    }
    saveFormRef(form) {
        this.form = form;
    }
    render() {
        const {roleList}=this.props
        return (<div style={styles.index}>
            <Button type="primary" onClick={this.showModal.bind(this)}>添加角色</Button>
            <CollectionCreateForm ref={this.saveFormRef.bind(this)} visible={this.state.visible} onCancel={this.handleCancel.bind(this)} onCreate={this.handleCreate.bind(this)} />
            <Table 
                columns={columns} 
                rowSelection={rowSelection} 
                expandedRowRender={record => <p>{record.description}</p>}
                dataSource={roleList} 
                className="table" 
                size="middle"
            />
        </div>)
    }
}

const styles={
    index:{
       // width:'100%',
    },
}

let mapStateToProps = state => {
    const {roleList}=state
    return {roleList}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Role)
