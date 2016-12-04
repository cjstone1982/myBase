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


class Message extends Component {
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
                    消息
                </NavBar>
                <div style={{height:45}} />
                <Li ico="mail" title="@我" arr="" />
                <Li ico="message" title="评论" arr="" />
                <Li ico="like" title="赞" arr="" />
                <Li blank='10' />
                <Li ico="heart-o" title="我的关注" arr="" />
                <Li ico="team" title="我的队友" arr="" />
                <Li blank='10' />
            </div>
        )
    }
}

const styles={
    
}

let mapStateToProps = state => {
    const {currentUser}=state
    return {currentUser}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Message)
