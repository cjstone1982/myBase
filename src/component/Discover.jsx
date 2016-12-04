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

import Flex      from 'Flex'
import Carousel  from 'Carousel' //60kb


class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
    }
    componentDidMount(){
        const {closeLoading}=this.props
        closeLoading()
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
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
    render() {
        const settings = {
            dots: true,
            autoplay: true,
            infinite: true,
            selectedIndex: this.state.current,
            beforeChange: this.beforeSlide,
            afterChange: this.slideTo,
        };
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
                    发现新大陆
                </NavBar>
                <div style={{height:45}} />

                    <WingBlank>
                        <Carousel {...settings}>
                            <Flex justify="center" className="flex-container-justify">
                                <div style={styles.banner}>
                                    <h3 style={styles.h3}>最终幻想13</h3>
                                    <img style={styles.img} src="../uploads/ff.jpg" />
                                </div>
                            </Flex>
                            <Flex justify="center" className="flex-container-justify">
                                <div style={styles.banner}>
                                    <h3 style={styles.h3}>最终幻想14</h3>
                                    <img style={styles.img} src="../uploads/ff.jpg" />
                                </div>
                            </Flex>
                            <Flex justify="center" className="flex-container-justify">
                                <div style={styles.banner}>
                                    <h3 style={styles.h3}>最终幻想15</h3>
                                    <img style={styles.img} src="../uploads/ff.jpg" />
                                </div>
                            </Flex>
                        </Carousel>
                    </WingBlank>
                    <WhiteSpace size="lg" />
                    <Li blank='10' />
                    <Li ico="message" title="游戏吧" arr="" />
                    <Li ico="smile" title="好友圈" arr="" />
                    <Li blank='10' />
                    <Li ico="exception" title="联机教程" arr="" />
                    <Li ico="video-camera" title="联机视频" arr="" />
                    <Li blank='10' />
                    <Li ico="like" title="联机游戏推荐" arr="" />
                    <Li ico="download" title="联机游戏下载" arr="" />
            </div>
        )
    }
}

const styles={
    banner:{
        positin:'relative',
        height:'100pt',
        overflow:'hidden',
    },
    img:{
        position:'absolute',
        width:'100%',
        left:'0',
        top:'0'
    },
    h3:{
        position:'absolute',
        width:'100%',
        height:'20pt',
        lineHeight:'20pt',
        background:'#000',
        opacity:.7,
        color:'#fff',
        textAlign:'center',
        left:'0',
        bottom:'0',
        zIndex:99,
    },
    
}

let mapStateToProps = state => {
    const {currentUser}=state
    return {currentUser}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Discover)
