import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    render() {
        return (<div className="accounts">
            <div className="register">
                <form>
                    <input type="text" name="email" placeholder="用户名" />
                    <input type="password" name="password" placeholder="密码" />
                    <button type="submit">立即注册</button>
                </form>
                <div className="link">
                    已有账号？<Link to="/login">立即登录</Link>
                </div>
            </div>
        </div>)
    }
}

export default Register