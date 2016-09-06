import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    render() {
        return (<div className="accounts">
            <div className="login">
                <form>
                    <input type="text" name="email" placeholder="用户名" />
                    <input type="password" name="password" placeholder="密码" />
                    <button type="submit">立即登录</button>
                </form>
                <div className="link">
                    没有账号？<Link to="/register">立即注册</Link>
                </div>
            </div>
        </div>)
    }
}

export default Login