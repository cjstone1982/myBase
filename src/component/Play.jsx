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
import Match from './Match'

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

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMatch:false
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
        console.log('加载文章哟');
        const {getArticle,closeLoading} = this.props
        getArticle()
    }
    componentWillMount(){
    }
    componentWillUnmount(){
        const {hideMatch}=this.props
        hideMatch()
    }
    componentDidUpdate(){
        console.log('play 更新完毕');
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    addArticle(e){
        const {currentUser, addArticle} = this.props
        let data={
            title:this.state.title,
            content:this.state.content,
        }
        addArticle(data)
        //在发表以后，输入框内容清空，状态内容清空
        this.setState({
            title:'',
            content:'',
        })
        this.refs.title.value=""
        this.refs.content.value=""
    }
    showId(e){
        alert(e.target.id)
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
    render() {
        let that=this
        const {currentUser, articleList, articleList2,match} = this.props
        return (
            <div>
                <Loading />
                <Match show={match.show} />
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
                    游戏约战
                </NavBar>
                <div style={{height:45}} />

                <div className="play">
                    {/*
                    当前用户:{currentUser.username}{currentUser.nickname}
                    */}

                    <div style={styles.title}>
                        <p>热门约战</p>
                        <Link style={styles.more} to="">更多</Link>
                    </div>
                    <ul style={styles.hot}>
                        <li style={styles.hotLi}>
                            <div style={styles.hotLiType}>PC</div>
                            <div style={styles.hotLiTitle}>最终幻想13</div>
                            <img style={styles.hotLiImg} src="../uploads/ff.jpg" />
                        </li>
                        <li style={styles.hotLi}>
                            <div style={styles.hotLiType}>PC</div>
                            <div style={styles.hotLiTitle}>最终幻想14</div>
                            <img style={styles.hotLiImg} src="../uploads/ff.jpg" />
                        </li>
                        <li style={styles.hotLi}>
                            <div style={styles.hotLiType}>PC</div>
                            <div style={styles.hotLiTitle}>最终幻想15</div>
                            <img style={styles.hotLiImg} src="../uploads/ff.jpg" />
                        </li>
                    </ul>
                    <div style={styles.title}>游戏平台</div>
                    <ul style={styles.type}>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-pc"></i>
                            <br/>PC
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-ios"></i>
                            <br/>IOS
                        </li>
                        <li style={styles.typeLi}>
                           <i className="icon iconfont icon-special-2"></i>
                            <br/>Android
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-youxi1"></i>
                            <br/>街机
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-vr"></i>
                            <br/>VR
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-ar"></i>
                            <br/>AR
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-icon"></i>
                            <br/>PS4
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-xbox"></i>
                            <br/>XBOXONE
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-youxiji2xian"></i>
                            <br/>PSV
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-youxiji1xian"></i>
                            <br/>3DS
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-youxiji1xian"></i>
                            <br/>SWITCH
                        </li>
                        <li style={styles.typeLi}>
                            <i className="icon iconfont icon-psp"></i>
                            <br/>...
                        </li>
                    </ul>
                    <div style={styles.title}>正在约</div>
                    <ul style={styles.match}>
                        <li style={styles.matchLi}>
                            <div style={styles.playerInfo}>
                                <img style={styles.playerFace} src="../uploads/ff.jpg" />
                                <div style={styles.playerName}>万华虫中一点汗</div>
                                <div style={styles.addTime}>发表于：2小时前</div>
                            </div>
                            <div style={styles.gameInfo}>
                                <img style={styles.gameFace} src="../uploads/ff.jpg"/>
                                <div style={styles.gameType}>Android</div>
                                <div style={styles.gamePlayers}>3/4</div>
                                <div style={styles.gameStyle}>人齐就开始</div>
                            </div>
                            <div style={styles.gameTitle}>
                                地狱难度，4人合作，马上开始
                            </div>
                            <div style={styles.matchInfo}>
                                <div style={styles.playerNumber}>留言数：125</div>
                                <div style={styles.viewNumber}>浏览数：398</div>
                            </div>
                        </li>
                        <li style={styles.matchLi}>
                            <div style={styles.playerInfo}>
                                <img style={styles.playerFace} src="../uploads/ff.jpg" />
                                <div style={styles.playerName}>万华虫中一点汗</div>
                                <div style={styles.addTime}>发表于：2小时前</div>
                            </div>
                            <div style={styles.gameInfo}>
                                <img style={styles.gameFace} src="../uploads/ff.jpg"/>
                                <div style={styles.gameType}>Android</div>
                                <div style={styles.gamePlayers}>3/4</div>
                                <div style={styles.gameStyle}>人齐就开始</div>
                            </div>
                            <div style={styles.gameTitle}>
                                地狱难度，4人合作，马上开始
                            </div>
                            <div style={styles.matchInfo}>
                                <div style={styles.playerNumber}>留言数：125</div>
                                <div style={styles.viewNumber}>浏览数：398</div>
                            </div>
                        </li>
                        <li style={styles.matchLi}>
                            <div style={styles.playerInfo}>
                                <img style={styles.playerFace} src="../uploads/ff.jpg" />
                                <div style={styles.playerName}>万华虫中一点汗</div>
                                <div style={styles.addTime}>发表于：2小时前</div>
                            </div>
                            <div style={styles.gameInfo}>
                                <img style={styles.gameFace} src="../uploads/ff.jpg"/>
                                <div style={styles.gameType}>Android</div>
                                <div style={styles.gamePlayers}>3/4</div>
                                <div style={styles.gameStyle}>人齐就开始</div>
                            </div>
                            <div style={styles.gameTitle}>
                                地狱难度，4人合作，马上开始
                            </div>
                            <div style={styles.matchInfo}>
                                <div style={styles.playerNumber}>留言数：125</div>
                                <div style={styles.viewNumber}>浏览数：398</div>
                            </div>
                        </li>
                    </ul>

                    <input name="title" ref="title" onChange={this.handleChange.bind(this)} type="text" placeholder="标题" />
                    <input name="content" ref="content" onChange={this.handleChange.bind(this)} type="text" placeholder="内容" />
                    <button onClick={this.addArticle.bind(this)}>添加新闻</button>
                   
                    {articleList.map(function(result,index){
                        return(<div key={index}>
                            {result}
                        </div>)
                    })}
                    <ul style={styles.list}>
                        {articleList2.map((result,index)=>{
                            return(<li style={styles.li} onClick={this.showId.bind(this)} key={index} id={result._id}>
                                <div style={styles.title}>{result.title}</div>
                                <div style={styles.createAt}>{moment(result.createAt).format("LL")}</div>
                            </li>)
                        })}
                    </ul>
                    
                </div>
            </div>
        )
    }
}

let styles={
    title:{
        padding:'10pt 0 10pt 0pt',
        fontSize:'11pt',
        textIndent:'10pt',
        display:'flex',
        display:'-webkit-flex',
        justifyContent: 'space-between',
    },
    more:{
        padding:'12pt 10pt 0 0',
        fontSize:'9pt',
        color:'#888',
    },
    hot:{
        display:'flex',
        display:'-webkit-flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    hotLi:{
        textAlign:'center',
        position:'relative',
    },
    hotLiType:{
        position:'absolute',
        left:'8%',
        top:'2pt',
        padding:'1pt 4pt',
        fontSize:'9pt',
        borderRadius:'3pt',
        color:'#fff',
        background:'#ff6600',
    },
    hotLiTitle:{
        position:'absolute',
        right:'8%',
        bottom:'3pt',
        fontSize:'9pt',
        color:'#fff',
    },
    hotLiImg:{
       width:'90%',
    },
    type:{
        display:'flex',
        display:'-webkit-flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        
    },
    typeLi:{
        background:'#eee',
        marginBottom:'2pt',
        width:'24%',
        padding:'5pt 0 0 0',
        fontSize:'10pt',
        textAlign:'center',
        lineHeight:'150%',
    },
    match:{
        
    },
    matchLi:{
        width:'95%',
        overflow:'hidden',
        margin:'0 auto 15pt',
        borderBottom:'1pt solid #eee',
        display:'flex',
        display:'-webkit-flex',
        flexDirection: 'column',
    },
    playerInfo:{
        display:'flex',
        display:'-webkit-flex',
        padding:'5pt',
    },
    playerFace:{
        width:'15pt',
        height:'15pt',
        borderRadius:'100%',
    },
    playerName:{
        fontSize:'10pt',
        padding:'3pt'
    },
    addTime:{
        fontSize:'9pt',
        padding:'3pt',
        color:'#ccc',
    },
    gameInfo:{
        display:'flex',
        display:'-webkit-flex',
        alignItems:'center',
        background:'#efefef',
        padding:'2pt',
        position:'relative',
        zIndex:1,
    },
    gameFace:{
        padding:'2pt',
        background:'#fff',
        width:'80pt',
        height:'45pt',
    },
    gameText:{
        width:'160pt',
        height:'20pt',
    },
    gamePlayers:{
        padding:'5pt 15pt',
        fontSize:'15pt',
    },
    gameTitle:{
        width:'100%',
        padding:'5pt',
        fontSize:'12pt',
        color:'#666',
    },
    gameType:{
        position:'absolute',
        right:0,
        top:0,
        width:'70pt',
        height:'10pt',
        padding:'4pt 4pt 0 0',
        textAlign:'right',
        fontWeight:'bold',
        fontSize:'9pt',
        color:'#fff',
        background: 'linear-gradient(45deg,rgba(0,0,0,0) 22pt,#999 0pt)',
    },
    gameStyle:{
        padding:'5pt',
    },
    matchInfo:{
        display:'flex',
        display:'-webkit-flex',
        padding:'5pt',
    },
    playerNumber:{
        fontSize:'10pt',
        color:'#ccc',
    },
    viewNumber:{
        fontSize:'10pt',
        color:'#ccc',
        marginLeft:'1rem',
    },
}

let mapStateToProps = state => {
    const {currentUser,articleList,articleList2,match}=state
    return {currentUser,articleList,articleList2,match}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Play)
