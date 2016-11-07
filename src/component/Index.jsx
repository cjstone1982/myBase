import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//组件
import TabBarFooter from './TabBarFooter'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color:'red2'
        }
    }
    componentWillMount(){

    }
    componentDidMount(){

    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    handleReset(e){
        console.log(e);
        console.log('handleReset');
        this.refs.color.value='12345'
    }
    render() {
        let that=this
        const {list,list2,addTodo,removeTodo} = this.props
        return (
            <div>
                <div className="header">
                    <div className="btn">菜单</div>
                    <div className="title">4Pgo</div>
                    <div className="btn">菜单</div>
                </div>

                <img src="/images/pic_maliao.jpg" />
                
                <input type="text" name="color" ref="color" onChange={this.handleChange.bind(this)}/>
                <button onClick={ function(){ that.handleReset.bind(that); addTodo(that.state.color) }}>ADD</button>
                <button onClick={() => removeTodo(1)}>REMOVE</button>
                111
                {list.map(function(result,index){
                    return(<div key={index}>
                        {result}
                    </div>)
                })}
                222
                {list2.map(function(result,index){
                    console.log('aaaaa');
                    console.log(result.title);
                    console.log('bbbbb');
                    return(<div key={index}>
                        {result.title}
                    </div>)
                })}
                333
            </div>
        )
    }
}

let mapStateToProps = state => ({
    list:state.articleList,
    list2:state.articleList2,
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Index)
