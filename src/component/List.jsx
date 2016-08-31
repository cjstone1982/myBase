import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions.js'

class List extends Component {
    render() {
        return (<div>
        	我是列表页
        	<Link to="/">首页</Link>
        	<Link to="/list">列表页</Link>
        </div>)
    }
}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
    console.log(state)
    //这个state就是store里的总state
    return {
      	
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  	return bindActionCreators(action, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(List)