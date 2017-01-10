import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//公共组件
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'

//antd
import { Breadcrumb } from 'antd';

class Main extends Component {
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
        return (<div>
            <Header />
            <div style={styles.main}>
                <div style={styles.nav}>
                    <Nav />
                </div>
                <div style={styles.children}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                    </Breadcrumb>
                    {this.props.children}
                </div>
            </div>
            <Footer />
        </div>)
    }
}

const styles={
    wrap:{
       
    },
    main:{
        display:'flex',
        display:'-webkit-flex',
    },
    nav:{
        flex:'0 0 150px',/* 左右两列固定宽 */
        order:-1,
    },
    children:{
        flex:1,
        padding:'3px',
    }
}

let mapStateToProps = state => {
    // const {currentUser}=state
    return {}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main)
