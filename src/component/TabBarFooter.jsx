import React, {Component, PropTypes} from 'react';
import {Link,IndexLink} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

class TabBarFooter extends Component {
	constructor(props) {
        super(props)
        this.state = {
            faqi:false,
        }
    }
	openLoading(e){
		const {openLoading,loading} = this.props
        if(e.currentTarget.getAttribute('href')!=window.location.pathname){
            openLoading()
            $(e.currentTarget).siblings().removeAttr('style').css(styles.link)
            $(e.currentTarget).animate({height:"40pt"});
            $(e.currentTarget).css(styles.active)
        }
        console.log('openLoading');
        console.log(e.currentTarget.getAttribute('href'));
        if(e.currentTarget.getAttribute('href')=='/play'){
            this.setState({
                faqi:true
            })
            $(e.currentTarget).css(styles.active2)
        }else{
           this.setState({
                faqi:false,
            })
        }
	}
    handleMatch(){
        const {showMatch,match}=this.props
        if(!match.show){
            showMatch()
        }
    }
    render() {
        console.log('render');
        return (<div style={styles.footer}>
        	<IndexLink style={styles.link} onClick={this.openLoading.bind(this)} to="/">
                <i style={styles.i} className="iconfont icon-asmkticon0142"></i>
                <b style={styles.b}>首页</b>
            </IndexLink>
            <Link style={styles.link} onClick={this.openLoading.bind(this)} to="/message">
                <i style={styles.i} className="iconfont icon-xiaoxi"></i>
                <b style={styles.b}>消息</b>
            </Link>
            {
                this.state.faqi?
                <Link style={styles.link} onClick={this.handleMatch.bind(this)} to="/play">
                    <i style={styles.i} className="iconfont icon-faqifaqiactive"></i>
                    <b style={styles.b}>发起</b>
                </Link>:
                <Link style={styles.link} onClick={this.openLoading.bind(this)} to="/play">
                    <i style={styles.i} className="iconfont icon-faqifaqiactive"></i>
                    <b style={styles.b}>约起</b>
                </Link>
            }
            <Link style={styles.link} onClick={this.openLoading.bind(this)} to="/discover">
                <i style={styles.i} className="iconfont icon-faxian"></i>
                <b style={styles.b}>发现</b>
            </Link>
        	<Link style={styles.link} onClick={this.openLoading.bind(this)} to="/mine">
                <i style={styles.i} className="iconfont icon-wode"></i>
                <b style={styles.b}>我的</b>
            </Link>
        </div>)
    }
}

const styles={
    footer:{
        display: '-webkit-flex', 
        display: 'flex',
        justifyContent: 'space-around',
        background: '#f9f9f9', 
        position: 'fixed', 
        zIndex: 100,
        bottom: 0,
        width: '100%', 
        height: '45px', 
        padding: '5px 0',
    },
    link:{
        padding:'0 10pt 0 10pt',
        textAlign: 'center', 
        borderRadius:'5px', 
    },
    active:{
        padding:'0 10pt 0 10pt',
        textAlign: 'center', 
        borderRadius:'5px', 
        background:'#000',
        color: '#fff',
    },
    active2:{
        padding:'0 10pt 0 10pt',
        textAlign: 'center', 
        borderRadius:'5px', 
        background:'#dd001a',
        color: '#fff',
    },
    i:{
        fontSize:'18pt',
        clear:'both',
    },
    b:{
        display: 'block', 
        fontWeight: 'normal',
        paddingTop:'1pt',
    },
}

let mapStateToProps = state => {
    const {match}=state
    return{
        match
    }
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TabBarFooter)