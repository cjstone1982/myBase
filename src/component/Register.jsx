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

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
           registerCanClick:true
        }
    }
    componentDidMount(){
         // let hide = Alert.loading('注册提交中...', 1000)
        
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
        console.log(this.state);
    }
    handleRegister(){
        this.setState({registerCanClick:false })
        if(this.state.password!=this.state.re_password){
            Alert.add('两次输入的密码不一致...',2500)
            this.setState({registerCanClick:true })
            return false
        }
        Alert.add('注册提交中...',60000)
        setTimeout(()=>{
            Alert.remove()
            Alert.add('注册成功...',2500)
            setTimeout(()=>{
                this.setState({registerCanClick:true })
            },2500)
        },2500)
        this.props.register({
            email:this.state.email,
            password:this.state.password,
            re_password:this.state.re_password,
            nickname:this.state.nickname
        })
    }
    render() {
        // const {register} = this.props
        return (<div className="accounts">
            <div className="register">
                <form>
                    <input type="text" name="email" placeholder="邮箱" onChange={this.handleChange.bind(this)} />
                    <input type="password" name="password" placeholder="密码" onChange={this.handleChange.bind(this)} />
                    <input type="password" name="re_password" placeholder="确认密码" onChange={this.handleChange.bind(this)} />
                    <input type="nickname" name="nickname" placeholder="昵称" onChange={this.handleChange.bind(this)} />
                    <Submit thisClick={this.handleRegister.bind(this)} canClick={this.state.registerCanClick} text="立即注册" />
                </form>
                <div className="link">
                    已有账号？<Link to="/login">立即登录</Link>
                </div>
            </div>
        </div>)
    }
}

let mapStateToProps = state => ({
    // register:state.register,
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Register)