import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//antd

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false,
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
       
    }
    componentWillUnmount(){
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    handleSubmit(e) {
        console.log(this.props.form);
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }
    handlePasswordBlur(e) {
        const value = e.target.value;
        this.setState({
            passwordDirty: this.state.passwordDirty || !! value
        });
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], {
                force: true
            });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6,
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );
    return (<div style={styles.register}>
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormItem {...formItemLayout} label="E-mail" hasFeedback >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Password" hasFeedback >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.checkConfirm.bind(this),
                }],
              })(
                <Input type="password" onBlur={this.handlePasswordBlur.bind(this)} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Confirm Password" hasFeedback >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.checkPassword.bind(this),
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={(
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want other to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
              hasFeedback
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Habitual Residence">
              {getFieldDecorator('residence', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
              })(
                <Cascader options={residences} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(
                <Input addonBefore={prefixSelector} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Captcha" extra="We must make sure that your are a human.">
              <Row gutter={8}>
                <Col span={12}>
                    {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                    })(
                        <Input size="large" />
                    )}
                </Col>
                <Col span={12}>
                    <Button size="large">Get captcha</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                })(
                <Checkbox>I had read the <a>agreement</a></Checkbox>
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" size="large">Register</Button>
            </FormItem>
        </Form>
    </div>)
}}
Register = Form.create({})(Register)

const styles={
    register:{
        width:'500px',
        margin:'0 auto',
        paddingTop:'50px',
    },
}

let mapStateToProps = state => {
    // const {currentUser}=state
    return {}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Register)
