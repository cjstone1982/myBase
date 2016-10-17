import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

class SendMessage extends Component {
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
    handleSendMessage(){
        this.props.sendMessage()
    }
    render() {
        let that=this
        return (
            <div>
                <textarea name="message" id="message" onChange={this.handleChange.bind(this)} />
                <button onClick={this.handleSendMessage.bind(this)}>发送消息</button>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    // messageList:state.messageList,
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SendMessage)
