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
import Loading from './Loading'
import Li from './Li'

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

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    omponentWillMount(){
    }
    componentDidMount(){
        const {closeLoading}=this.props
        closeLoading()
    }
    componentWillUnmount(){
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    shouldcomponentupdate(state, nextState){
        console.log(111);
        console.log(state);
        console.log(nextState);
        console.log(222);
    }
    render() {
        let that=this
        return (<div>
            <Loading />
            <div className="header">
                <div className="btn">添加好友</div>
                <div className="title">我</div>
                <div className="btn">设置</div>
            </div>
            <div style={{height:45}} />
            <div style={styles.bg}>
                <img style={styles.face} src="../uploads/ff.jpg" />
            </div>
            <div style={styles.social}>
                <div style={styles.count}>
                    156<br/><span style={styles.text}>队友</span>
                </div>
                <div style={styles.count}>
                    40<br/><span style={styles.text}>关注</span>
                </div>
                <div style={styles.count}>
                    36<br/><span style={styles.text}>粉丝</span>
                </div>
            </div>
            <Li blank='10' />
            <Li ico="team" title="新的队友" arr="" />
            <Li ico="calculator" title="我的游戏" arr="" />
            <Li ico="save" title="我的约战" arr="" />
            <Li blank='10' />
            <Li ico="star-o" title="我的收藏" arr="" />
            <Li ico="share-alt" title="我的分享" arr="" />
            <Li ico="pay-circle-o" title="我的币" arr="" />
            <div style={{height:55}} />
        </div>)
    }
}

const styles={
    bg:{
        height:'100pt',
        background:'url(../images/ff2.jpg)',
        backgroundSize:'cover',
        display:'flex',
        display:'-webkit-flex',
        justifyContent: 'center',
    },
    face:{
        width:'50pt',
        height:'50pt',
        borderRadius:'100%',
        alignSelf: 'flex-end',
        border:'3pt solid #fff',
        marginBottom:'-8pt',
    },
    social:{
        display:'flex',
        display:'-webkit-flex',
        justifyContent: 'space-around',
        alignItems:'center',
        height:'40pt',
    },
    count:{
        fontSize:'11pt',
        textAlign:'center',
    },
    text:{
        fontSize:'10pt',
        color:'#888',
    }
}


let mapStateToProps = state => {
    const {currentUser}=state
    return {currentUser}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Mine)
