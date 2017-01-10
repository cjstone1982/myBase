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
import './css/base'         //加载公共样式
import './css/style'        //加载项目样式
import './css/antd.min'  //antd-mobile主样式

//页面组件
import Main from './component/Main'
import Register  from './component/Register'
import Login from './component/Login'
import Index from './component/Index'
import Role from './component/Role'

//初始设置
let store = createStore()
store.subscribe(function () { //每次状态机改变的时候执行
    // console.log('当前state');
    // console.log(store.getState())
})

import config from './config' 
AV.init({
    appId: config.APP_ID,
    appKey: config.APP_KEY
});

//主模板
class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (<div style={styles.wrap}>
            {this.props.children}
        </div>)
    }
}

const styles={
    wrap:{
       
    },
    main:{
        display:'flex',
        display:'-webkit-flex',
    },
    nav:{
        flex:'0 0 150px',/* 左右两列固定宽 */
        order:-1,
    },
    children:{
        flex:1,
        padding:'3px',
    }
}

//路由
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
	        <Route path="/" component={Root}>
	            <IndexRoute component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route onEnter={token} component={Main}>
                    <Route path="/index" component={Index} />
                    <Route path="/role" component={Role} />
                </Route>
	            {/*<Route onEnter={token} path="/admin" component={Index} />*/}
                <Route path="*" component={Main} />
	        </Route>
	    </Router>
    </Provider>
    ,document.body.appendChild(document.createElement('div'))
);

function token (nextState, replace, next) {
    //登录后的路径
    sessionStorage.setItem('nextPath',nextState.location.pathname)
    //查看本地是否有token
    if(token){
        fetch('*', {
            method: 'GET', 
            headers: {'x-access-token': localStorage.getItem('token')}
        }).then(function(response) {
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
            next() 
            
        }).catch(function(e) {
            console.log("未登录");
        })
    }else{
        replace('/login')
        next()
    }
}




