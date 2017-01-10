import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//antd
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
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
    handleSubmit(e){
        const {login, form}=this.props
        e.preventDefault();
        form.validateFields((err, value)=>{
            if (!err) {
                login(value)
            }
        })
    }
    render() {
    const { getFieldDecorator } = this.props.form;
        return (<div style={styles.login}>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                        Or <a>register now!</a>
                </FormItem>
            </Form>
        </div>)
    }
}
Login = Form.create({})(Login)

const styles={
    login:{
        width:'400px',
        margin:'0px auto',
        paddingTop:'250px'
    },
}

let mapStateToProps = state => {
    // const {currentUser}=state
    return {}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Login)
