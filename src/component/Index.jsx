import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//组件
import TabBarFooter from './TabBarFooter'

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

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color:'red2',
            visible: false,
            sel: '',
            files: data, 
            custom: false
        }
    }
    onChange(files, type, index) {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    onAddImageClick() {
        this.setState({
            files: this.state.files.concat({
                url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
                id: '3',
            }),
        });
    }
    sw() {
        this.setState({
            custom: !this.state.custom,
        });
    }
    showModal() {
        this.setState({
            visible: true,
        })
    }
    onClose() {
        this.setState({
            visible: false,
        })
    }
    onClick() {
        Popup.show(
        <List renderHeader={() => '账户总览 (已绑定3个）'} >
            <List.Item
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              onClick={() => { this.onClose2('cancel'); }}
            >东吴证券 (5728）</List.Item>
            <List.Item
              thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
              onClick={() => { this.onClose2('cancel'); }}
            >东吴证券 (5728）</List.Item>
            <List.Item
              thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
              arrow="horizontal"
              onClick={() => { this.onClose2('opt 1'); }}
            >更多</List.Item>
            </List>
            );
        }
    onClose2(sel) {
        // if (sel === 'opt 1') {
        //   // 演示再弹出内容
        //   this.newInstance();
        //   return;
        // }
        this.setState({ sel });
        Popup.hide();
    }
    componentWillMount(){
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    handleReset(e){
        console.log(e);
        console.log('handleReset');
        this.refs.color.value='12345'
    }
    render() {
        let that=this
        const {list,list2,addTodo,removeTodo} = this.props
        const { files, custom } = this.state;
        return (
            <div>
                <div className="header">
                    <div className="btn">菜单</div>
                    <div className="title">4Pgo</div>
                    <div className="btn">菜单</div>
                </div>

                <img src="/images/pic_maliao.jpg" />
                
                <input type="text" name="color" ref="color" onChange={this.handleChange.bind(this)}/>
                <button onClick={ function(){ that.handleReset.bind(that); addTodo(that.state.color) }}>ADD</button>
                <button onClick={() => removeTodo(1)}>REMOVE</button>
               
                <Button onClick={this.showModal.bind(this)}>Start</Button>
                <WhiteSpace size="lg" />
                <WingBlank>
                <Button type="ghost" onClick={this.showModal.bind(this)}>
                可关闭对话框
                </Button>
                <Modal
                title="这是 title"
                closable
                maskClosable
                transparent
                onClose={this.onClose.bind(this)}
                visible={this.state.visible}
                >
                这是内容...<br />
                这是内容...<br />
                </Modal>
                </WingBlank>
                <WhiteSpace size="lg" />
                <Icon onClick={this.onClick.bind(this)} style={{fontSize:'30px'}} type="play-circle" />
           
                <Button inline style={{ margin: 10 }} onClick={this.sw}>{custom ? '自定义' : '常用的'}选择图片的方法</Button>
                  {custom ? <ImagePicker
                    files={files}
                    onChange={this.onChange.bind(this)}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    onAddImageClick={this.onAddImageClick}
                    selectable={files.length < 5}
                /> : <ImagePicker
                    files={files}
                    onChange={this.onChange.bind(this)}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 5}
                />}

            </div>
        )
    }
}

let mapStateToProps = state => {
    const {currentUser}=state
    return {currentUser}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Index)
