import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//组件
import TabBarFooter from './TabBarFooter'

class Mine extends Component {
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
    render() {
        let that=this
        return (
            <div>
                <div className="header">
                    <div className="btn">菜单</div>
                    <div className="title">4Pgo</div>
                    <div className="btn">菜单</div>
                </div>
                <div className="mine">
                    我的
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    // messageList:state.messageList,
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Mine)
