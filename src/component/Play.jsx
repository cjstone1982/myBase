import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//组件
import TabBarFooter from './TabBarFooter'
import SendMessage from './SendMessage'

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
        const {getArticle} = this.props
        getArticle()
    }
    omponentWillMount(){
    }
    componentWillUnmount(){
        console.info('componentWillUnmount');
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
            id:currentUser.id,
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
    render() {
        let that=this
        const {currentUser, articleList, articleList2} = this.props
        return (
            <div>
                <div className="header">
                    <div className="btn">菜单</div>
                    <div className="title">4Pgo</div>
                    <div className="btn">菜单</div>
                </div>
                <div className="play">
                    当前用户:{currentUser.username}{currentUser.nickname}
                    <SendMessage />
                  
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
    list:{
       marginLeft:'5%',
       marginRight:'5%', 
    },
    li:{
        display:'flex',
        display:'-webkit-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom:'1px solid #dedede',
        padding:'10px 0'
    },
    title:{

    },
    createAt:{
        fontSize:'12px',
        color:'#999',
    }
}

let mapStateToProps = state => {
    const {currentUser,articleList,articleList2}=state
    return {currentUser,articleList,articleList2}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Play)
