import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//组件
import TabBarFooter from './TabBarFooter'

//公用组件
import Alert from './Alert'

//antd-mobile
import Modal       from 'Modal'
import Button      from 'Button'
import WhiteSpace  from 'WhiteSpace'
import WingBlank   from 'WingBlank'
import Toast       from 'Toast'
import Icon        from 'Icon'
import Popup       from 'Popup'
import List        from 'List'
import ImagePicker from 'ImagePicker'
import NavBar      from 'NavBar'
import Popover     from 'Popover'
const Item = Popover.Item;

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	delay:300
        }
    }
    componentWillReceiveProps(){
    	$('#box').css({width:'86%',left:'7%', height:'70%', top:'20%', opacity:'1'},this.state.delay)
    	$('#box').animate({width:'86%',left:'7%', height:'74%', top:'12%', opacity:'1'},this.state.delay)
    	$('#mask').animate({opacity:'.8'},this.state.delay)
    }
    hideMatch(){
    	const {hideMatch}=this.props
    	setTimeout(function() {
    		hideMatch()
    		$('#box').css({width:'86%',left:'7%', height:'70%', top:'20%', opacity:'1'})
    	}, this.state.delay);
    	$('#box').animate({width:'86%',left:'7%', height:'70%', top:'12%', opacity:'0',},this.state.delay)
    	$('#mask').animate({opacity:'0',},this.state.delay)
    	
    }
    render() {
    	console.log('我开始渲染了');
        return (<div>
        	<div id="mask" style={this.props.show?styles.maskShow:styles.maskHide} />
        	<div id="box" style={this.props.show?styles.boxShow:styles.boxHide}>
        		<div style={styles.title}>发起约战</div>
        		<ul style={styles.ul}>
        			<li style={styles.li}>
        				<label style={styles.label}>游戏平台</label>
        				<input style={styles.input} placeholder="请选择" type="text" />
        			</li>
        			<li style={styles.li}>
        				<label style={styles.label}>游戏名称</label>
        				<input style={styles.input} placeholder="请输入" type="text" />
        			</li>
        			<li style={styles.li}>
        				<label style={styles.label}>游戏版本</label>
        				<input style={styles.input} placeholder="请输入" type="text" />
        			</li>
        			<li style={styles.li}>
        				<label style={styles.label}>是否语音</label>
        				<input style={styles.input} placeholder="请选择" type="text" />
        			</li>
        			<li style={styles.li}>
        				<label style={styles.label}>合作模式</label>
        				<input style={styles.input} placeholder="请选择" type="text" />
        			</li>
        		</ul>
        		<button style={styles.button}>确认提交</button>
        		<div onClick={this.hideMatch.bind(this)} style={styles.close}>关闭</div>
        	</div>
        </div>)
    }
}

const styles={
	title:{
		width:'100%',
		background:'#c8000a',
		color:"#fff",
		textAlign:'center',
		padding:'7pt 0',
		fontSize:'11pt',
	},
	close:{
		position:'absolute',
		bottom:0,
		left:0,
		width:'100%',
		background:'#999',
		color:"#fff",
		textAlign:'center',
		padding:'5pt 0',
		fontSize:'10pt',
	},
	ul:{
		width:'90%',
		margin:'0 auto',
	},
	li:{
		height:'34pt',
        lineHeight:'34pt',
        borderBottom:'1pt solid #eee',
        display: 'flex',
        display: '-webkit-flex',
        justifyContent: 'flex-start',
	},
	label:{
		fontSize:'11pt',
		textIndent:'1pt',
	},
	input:{
		margin:'3pt 0 0 10pt',
		height:'25pt',
		lineHeight:'25pt',
		fontSize:'11pt',
	},
	maskShow:{
		width:'100%',
		position:'fixed',
		left:0,
		top:'45px',
		height:'90%',
		background:'#fff',
		opacity:.8,
		zIndex:97,
		display:'block',
	},
	maskHide:{
		width:'100%',
		position:'fixed',
		left:0,
		top:'45px',
		height:'90%',
		background:'#000',
		opacity:.8,
		zIndex:97,
		display:'none',
	},
    boxShow:{
    	opacity:'0',
    	display:'block',
        width:'86%',
        height:'70%',
        position:'fixed',
        top:'20%',
        left:'7%',
        background:'#fff',
        border:'0pt solid #dedede',
        borderRadius:'3pt',
        zIndex:98,
        overflow:'hidden',
    },
    boxHide:{
    	opacity:'0',
    	display:'none',
        width:'86%',
        height:'70%',
        position:'fixed',
        top:'20%',
        left:'7%',
        background:'#fff',
        border:'0pt solid #dedede',
        borderRadius:'3pt',
        zIndex:98,
        overflow:'hidden',
    },
    button:{
    	width:'86%',
    	margin:'10pt auto 0',
    	padding:'8pt 0',
    	textAlign:'center',
    	color:'#fff',
    	fontSize:'11pt',
    	background:'#ff8000',
    	borderRadius:'3pt',
    }
}

let mapStateToProps = state => ({
    
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Match)
