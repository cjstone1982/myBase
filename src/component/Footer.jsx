import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//antd

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
    }
    componentDidMount(){
      
    }
    componentWillUnmount(){
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    render() {
        return (<div style={styles.footer}>
            footer
        </div>)
    }
}

const styles={
    footer:{
        position:'fixed',
        left:0,
        bottom:0,
        borderTop:'1px solid #dedede',
        width:'100%',
        height:'25px',
        lineHeight:'25px',
        background:'#fff',
    },
}

let mapStateToProps = state => {
    // const {currentUser}=state
    return {}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Footer)
