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
        this.refs.color.value=''
    }
    render() {
        let that=this
        const {list,addTodo,removeTodo} = this.props
        return (
            <div>
                <div className="header">
                    <div className="btn">菜单</div>
                    <div className="title">4Pgo</div>
                    <div className="btn">菜单</div>
                </div>
                <input type="text" name="color" ref="color" onChange={this.handleChange.bind(this)}/>
                <button onClick={ function(){ that.handleReset.bind(that); addTodo(that.state.color) }}>ADD</button>
                <button onClick={() => removeTodo(1)}>REMOVE</button>
                {list.map(function(result,index){
                    return(<div key={index}>
                        {result}
                    </div>)
                })}
            </div>
        )
    }
}

let mapStateToProps = state => ({
    list:state.articleList,
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Index)
