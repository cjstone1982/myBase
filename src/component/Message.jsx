import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//组件
import TabBarFooter from './TabBarFooter'

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    omponentWillMount(){
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    render() {
        let that=this
        return (
            <div>
                <div className="header">
                    <div className="btn">菜单</div>
                    <div className="title">4Pgo</div>
                    <div className="btn">菜单</div>
                </div>
                <ul className="message-list">
                    <li>消息列表111</li>
                    <li>消息列表222</li>
                    <li>消息列表333</li>
                </ul>
            </div>
        )
    }
}

let mapStateToProps = state => {
    const {currentUser}=state
    return {currentUser}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Message)
