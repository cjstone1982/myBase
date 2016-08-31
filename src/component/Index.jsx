import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions.js'
import { addTodo, removeTodo, getTodo } from '../redux/actions.js'

class Index extends Component {
    actionA(){
        console.log('actionA');
        this.props.addTodo('aaa')
    }
    actionB(){
        console.log('actionB');
        this.props.removeTodo('bbb')
    }
    actionC(){
        console.log('actionC');
        this.props.getTodo('ccc')
    }
    showKey(e){
       this.props.removeTodo(e.index)
    }
    render() {
        const {list} = this.props
        
        return (<div>
        	我是首页
        	<Link to="/">首页</Link><br/>
        	<Link to="/list">列表页</Link><br/>
            <a href='javascript:void(0)' onClick={this.actionA.bind(this)}>actionA</a><br/>
            <a href='javascript:void(0)' onClick={this.actionB.bind(this)}>actionB</a><br/>
            <a href='javascript:void(0)' onClick={this.actionC.bind(this)}>actionC</a><br/>
            <ul>
                {list.length>0?list.map((result, index) =>
                    <li key={index} onClick={this.showKey.bind(this,{index})}>{result}</li>
                ):''}
            </ul>
        </div>)
    }
}


//将state.counter绑定到props的counter
function mapStateToProps(state) {
    console.log(state)
    //这个state就是store里的总state
    return {
      	list:state.articleList
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  	return bindActionCreators(action, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Index)