import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions.js'
import { addTodo, removeTodo, getTodo } from '../redux/actions.js'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete:false,
            displayEdit:false
        };
    }
    actionA(){
        this.props.addTodo('aaa')
    }
    actionB(){
        this.props.removeTodo('bbb')
    }
    actionC(){
        this.props.getTodo('ccc')
    }
    showKey(e){
       this.props.removeTodo(e.index)
    }
    handleSubmit(e){
        if(e.charCode=='13'){
            this.props.addTodo(e.target.value)
            e.target.value=''
        }
    }
    remove(index){
        this.props.removeTodo(index)
    }
    edit(index,e){
        console.log('edit');
        if(e.charCode=='13'){
            this.props.editTodo(index ,e.target.value)
            e.target.value=''
            this.setState({
                displayEdit:false
            })
        }
    }
    showDelete(e){
        console.log(e.target.index);
        this.setState({
            showDelete:!this.state.showDelete
        })
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

            <ul className="todo">
                <div className="todo-input">
                    <input type="text" onKeyPress={this.handleSubmit.bind(this)} />
                </div>
                {list.length>0?list.map((result, index) =>
                    <Li key={index} result={result} index={index} displayEdit={this.state.displayEdit} edit={this.edit.bind(this,index)} remove={this.remove.bind(this,index)} />
                ):''}
            </ul>
        </div>)
    }
}
class Li extends Component{
    constructor(props) {
        super(props);
        this.state = {
            displayDelete:false,
            displayEdit:this.props.displayEdit
        };
    }
    displayDelete(){
        this.setState({
            displayDelete:!this.state.displayDelete
        })
    }
    render(){
        return(<li onDoubleClick={this.displayEdit.bind(this)} onMouseOver={this.displayDelete.bind(this)} onMouseOut={this.displayDelete.bind(this)}>
            <input className="edit box-shadow-01" type="text" onKeyPress={this.props.edit} style={{display:this.state.displayEdit?'block':'none'}}/>
            {this.props.result}
            <a className="delete" onClick={this.props.remove} style={{display:this.state.displayDelete?'block':'none'}}>delete</a>
        </li>)
    }
}


//将state.counter绑定到props的counter
function mapStateToProps(state) {
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