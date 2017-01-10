import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//antd

class Header extends Component {
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
        return (<div style={styles.header}>
            <div style={styles.logo}>LOGO</div>
            <div style={styles.user}>user</div>
        </div>)
    }
}

const styles={
    header:{
       height:'50px',
       borderBottom:'1px solid #dedede',
       display:'flex',
       display:'-webkit-flex',
       justifyContent:'space-between'
    },
    logo:{
       margin:'10px 20px',
       fontSize:'20px',
       fontWeight:'bold',
    },
    user:{
       margin:'5px 10px',
    },
}

let mapStateToProps = state => {
    // const {currentUser}=state
    return {}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Header)
