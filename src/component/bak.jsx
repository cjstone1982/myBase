import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions.js'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete:false,
        };
    }
    componentDidMount(){
        this.props.addTodo('bbb')
        this.props.addTodo('ccc')
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
                <input className="edit box-shadow-01" type="text" onKeyPress={this.props.edit} style={{display:this.state.displayEdit?'block':'none'}}/>
                {list.length>0?list.map((result, index) =>
                    <Li key={index} result={result} index={index} remove={this.remove.bind(this,index)} />
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
    showDelete(){
        this.setState({
            displayDelete:true
        })
    }
    hideDelete(){
        this.setState({
            displayDelete:false
        })
    }
    render(){
        console.log('render');
        return(<li onMouseOver={this.showDelete.bind(this)} onMouseOut={this.hideDelete.bind(this)}>
            {this.props.result}
            <a href="javascript:void(0)" className="delete" onClick={this.props.remove} style={{display:this.state.displayDelete?'block':'none'}}>delete</a>
        </li>)
    }
}

let mapStateToProps = state => ({
    list:state.articleList
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Index)
