import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//按钮组件
import Submit from './Submit'
//公用组件
import Alert from './Alert'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
           canClick:true,
        }
    }
    
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
        console.log(this.state);
    }
    rules(){
        if(!this.state.username){
           Alert.add('用户名不能为空',2500) 
           this.setState({canClick:true})
           return false
        }
        if(!this.state.password){
           Alert.add('密码不能为空',2500)
           this.setState({canClick:true})
           return false
        }
        return true
    }
    handleLogin(){
        console.log('handleLogin');
        this.setState({canClick:false })
        if(!this.rules()){return false}
        Alert.add('登录提交中...',3000)
        this.props.login({
            username:this.state.username,
            password:this.state.password,
        })
    }
    render() {
        const {stateLogin}=this.props
        if(stateLogin.state=='error'){
            this.state.canClick=true
        }
        return (<div className="accounts">
            <div className="login">
                <form>
                    <input type="text" name="username" onChange={this.handleChange.bind(this)} placeholder="用户名" />
                    <input type="password" name="password" onChange={this.handleChange.bind(this)} placeholder="密码" />
                    <Submit thisClick={this.handleLogin.bind(this)} canClick={this.state.canClick} text="立即登录" />
                </form>
                <div className="link">
                    没有账号？<Link to="/register">立即注册</Link>
                </div>
            </div>
        </div>)
    }
}

let mapStateToProps = state => ({
    stateLogin:state.login
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Login)