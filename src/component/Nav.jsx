import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//antd

class Nav extends Component {
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
    onMouseOver(e){
        console.log('onMouseOver');
        $(e.currentTarget).css({
            cursor:'pointer',
            background:'#fafafa',
        })
    }
    onMouseOut(e){
        console.log('onMouseOutr');
        $(e.currentTarget).css({
            cursor:'pointer',
            background:'#fff',
        })
    }
    onClick(e){
        browserHistory.push(e.currentTarget.id)
    }
    render() {
        return (<div style={styles.nav}>
            <ul style={styles.ul}>
                <li id="" onClick={this.onClick.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} style={styles.li}>
                    系统总览
                </li>
                <li id="" onClick={this.onClick.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} style={styles.li}>
                    系统配置
                </li>
                <li id="" onClick={this.onClick.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} style={styles.li}>
                    文章管理
                </li>
                <li id="/role" onClick={this.onClick.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} style={styles.li}>
                    角色管理
                </li>
                <li id="" onClick={this.onClick.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} style={styles.li}>
                    留言管理
                </li>
            </ul>    
        </div>)
    }
}

const styles={
    nav:{
        width:'150px',
        position:'absolute',
        height:'100%',
        borderRight:'1px solid #dedede',
        background:'#f5f5f5',
    },
    ul:{
       padding:'3px',
    },
    li:{
       width:'100%',
       height:'35px',
       lineHeight:'35px',
       textIndent:'10px',
       background:'#fff',
       marginBottom:'3px',
    },
}

let mapStateToProps = state => {
    // const {currentUser}=state
    return {}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
