//Polyfills
import 'whatwg-fetch'
//资源加载
import React, {Component, PropTypes} from 'react'
import ReactDOM, {render} from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

//Redux
import {Provider} from 'react-redux'
import createStore from './redux/stores'

//样式加载
import 'flex.css'                //flex布局兼容性
import './css/base'         //加载公共样式
import './css/style'        //加载项目样式
import './css/antd-mobile'  //antd-mobile主样式


//组件加载
import Index from './component/Index'
import List  from './component/List'
import Message from './component/Message'
import Play from './component/Play'
import Discover from './component/Discover'
import Mine from './component/Mine'

//公共组件
import TabBarFooter from './component/TabBarFooter'
import Register from './component/Register'
import Login from './component/Login'
import {addTodo} from './redux/actions'

//初始设置
let store = createStore()
store.subscribe(function () { //每次状态机改变的时候执行
    // console.log('当前state');
    // console.log(store.getState())
})


//主模板
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="main">
                {this.props.children}
                <TabBarFooter />
            </div>
        )
    }
}

//路由
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
	        <Route path="/" component={Main}>
	            <IndexRoute onEnter={delay} component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
	            <Route onEnter={token} path="/list" component={List} />
                <Route onEnter={token} path="/message" component={Message} />
                <Route onEnter={token} path="/play" component={Play} />
                <Route onEnter={token} path="/discover" component={Discover} />
                <Route onEnter={token} path="/mine" component={Mine} />
                <Route path="*" component={Index} />
	        </Route>
	    </Router>
    </Provider>
    ,document.body.appendChild(document.createElement('div'))
);

function delay (nextState, replace, next) {
    const redirectDelay=300
    setTimeout(function() {
        next()
    }, redirectDelay);
}

function token (nextState, replace, next) {
    //登录后的路径
    const redirectDelay=300
    sessionStorage.setItem('nextPath',nextState.location.pathname)
    //查看本地是否有token
    if(token){
        fetch('*', {
            method: 'GET', 
            headers: {'x-access-token': localStorage.getItem('token')}
        }).then(function(response) {
            // console.log(response)
            return response.json()
        }).then(function(data) {
            if(!data.token){
                browserHistory.push('/login')
            }
            store.dispatch({
                type: 'CURRENT_USER',
                payload: data.user
            })
            console.log("已登录");
            setTimeout(function() {
               next() 
            }, redirectDelay);
            
        }).catch(function(e) {
            console.log("未登录");
        })
    }else{
        replace('/login')
        setTimeout(function() {
              next()
        }, redirectDelay);
    }
}

//权限控制的中间
function auth(nextState, replace, next) {
    $.ajax({
        type: "GET",
        url: "/getSession",
        success: function(result){
            if(result.accountsId){
                next()
            }else{
                browserHistory.push('/login')
            }
        }
    })
}



