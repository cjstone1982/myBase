import 'whatwg-fetch'
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
import NoticeBar   from 'NoticeBar'
const Item = Popover.Item;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    onClose() {
        this.setState({
            visible: false,
        })
    }
    onSelect(opt) {
        if(opt.props.value=='logout'){
            localStorage.removeItem('token')
            Alert.add('用户登出成功',2000) 
            setTimeout(function() {
                location.replace(document.referrer)
            }, 2000);
        }
        console.log(opt.props.value);
        this.setState({
            visiblePopover: false,
            selected: opt.props.value,
        });
    }
    handleVisibleChange(visiblePopover) {
        this.setState({
            visiblePopover,
        });
    }
    componentWillMount(){
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
    render() {
        let that=this
        const {list,list2,addTodo,removeTodo} = this.props
        const { files, custom } = this.state;
        return (
            <div>
                <Loading />
                <NavBar leftContent="返回" mode="light" onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[<Icon key="0" type="search" />,
                        <Popover key="1" visible={this.state.visiblePopover}
                          overlay={[
                                (<Item key="4" value="scan" iconName="scan" data-seed="logId">扫一扫</Item>),
                                (<Item key="5" value="special" iconName="qrcode" style={{ whiteSpace: 'nowrap' }}>我的二维码</Item>),
                                (<Item key="6" value="button ct" iconName="question-circle-o">帮助</Item>),
                                (<Item key="7" value="logout" iconName="question-circle-o">登出</Item>),
                            ]}
                            popupAlign={{offset: [12, 10]}}
                            onVisibleChange={this.handleVisibleChange.bind(this)} onSelect={this.onSelect.bind(this)} >
                            <div style={{height: '100%', display: 'flex', alignItems: 'center', }} >
                                <Icon type="ellipsis" />
                            </div>
                        </Popover>
                      ]}>
                    4PGO社
                </NavBar>
                <div style={{height:45}} />

                <NoticeBar type="info" mode="link" onClick={this.onClick}>
                    当前与312名战友正在约
                </NoticeBar>
                <ul style={styles.ul}>
                    <li style={styles.li}>最新</li>
                    <li style={styles.li}>推荐</li>
                    <li style={styles.li}>热门</li>
                </ul>
                <div style={styles.card}>
                    <img style={styles.face} src="../uploads/ff.jpg" />
                    <div style={styles.content}>
                        <div style={styles.user}>点石成金250</div>
                        <div style={styles.info}>
                            <div style={styles.baTitle}>战争机器4</div>
                            <div style={styles.platform}>PC</div>
                            <div style={styles.date}>3天前</div>
                        </div>
                        <div style={styles.title}>我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦</div>
                        <div style={styles.content}>我是内容哦</div>
                        <div style={styles.imgFirst}>
                            <img style={styles.img} src="../uploads/ff.jpg" />
                        </div>
                    </div>
                </div>
                <div style={styles.card}>
                    <img style={styles.face} src="../uploads/ff.jpg" />
                    <div style={styles.content}>
                        <div style={styles.user}>点石成金250</div>
                        <div style={styles.info}>
                            <div style={styles.baTitle}>战争机器4</div>
                            <div style={styles.platform}>PC</div>
                            <div style={styles.date}>3天前</div>
                        </div>
                        <div style={styles.title}>我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦</div>
                        <div style={styles.content}>我是内容哦</div>
                        <div style={styles.imgFirst}>
                            <img style={styles.img} src="../uploads/ff.jpg" />
                        </div>
                    </div>
                </div>
                <div style={styles.card}>
                    <img style={styles.face} src="../uploads/ff.jpg" />
                    <div style={styles.content}>
                        <div style={styles.user}>点石成金250</div>
                        <div style={styles.info}>
                            <div style={styles.baTitle}>战争机器4</div>
                            <div style={styles.platform}>PC</div>
                            <div style={styles.date}>3天前</div>
                        </div>
                        <div style={styles.title}>我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦</div>
                        <div style={styles.content}>我是内容哦</div>
                        <div style={styles.imgFirst}>
                            <img style={styles.img} src="../uploads/ff.jpg" />
                        </div>
                    </div>
                </div>
                <div style={styles.card}>
                    <img style={styles.face} src="../uploads/ff.jpg" />
                    <div style={styles.content}>
                        <div style={styles.user}>点石成金250</div>
                        <div style={styles.info}>
                            <div style={styles.baTitle}>战争机器4</div>
                            <div style={styles.platform}>PC</div>
                            <div style={styles.date}>3天前</div>
                        </div>
                        <div style={styles.title}>我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦我是标题哦</div>
                        <div style={styles.content}>我是内容哦</div>
                        <div style={styles.imgFirst}>
                            <img style={styles.img} src="../uploads/ff.jpg" />
                        </div>
                    </div>
                </div>
                <div style={{height:55}} />
            </div>
        )
    }
}

const styles={
    ul:{
        display:'flex',
        display:'-webkit-flex',
        justifyContent: 'space-around',
        borderBottom:'1pt solid #eee'
    },
    li:{
        padding:'10pt 0',
        fontSize:'13pt',
    },
    face:{
        width:'20pt',
        height:'20pt',
        borderRadius:'100%',
        margin:'0 3%'
    },
    card:{
        display:'flex',
        display:'-webkit-flex',
        padding:'10pt 0',
        borderBottom:'1pt solid #eee',
    },
    info:{
        display:'flex',
        display:'-webkit-flex', 
        padding:'0pt 0',
    },
    baTitle:{
        fontSize:'12pt',
        padding:'2pt 0 0 0'
    },
    platform:{
        fontSize:'9pt',
        color:'#666',
        marginLeft:'10pt',
        padding:'3pt',
    },
    date:{
        fontSize:'9pt',
        color:'#888',
        marginLeft:'10pt',
        padding:'3pt',
    },
    title:{
        width:'92%',
        padding:'0pt 0',
        lineHeight:'130%',
        fontSize:'14pt',
        color:'#000',
    },
    content:{
        padding:'5pt 0 5pt 0',
        color:'#666',
        lineHeight:'130%',
        fontSize:'11pt',
    },
    img:{
        width:'90%',
    },
}

let mapStateToProps = state => {
    const {currentUser}=state
    return {currentUser}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Index)
