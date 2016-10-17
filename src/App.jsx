//资源加载
import React, {Component, PropTypes} from 'react'
import ReactDOM, {render} from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

//Redux
import {Provider} from 'react-redux'
import createStore from './redux/stores'

//样式加载
import 'flex.css'            //flex布局兼容性
import './css/base.less'     //加载公共样式
import './css/style.less'    //加载项目样式


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
    console.log(store.getState())
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
	            <IndexRoute component={Index} />
	            <Route path="/list" component={List} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/message" component={Message} />
                <Route path="/play" component={Play} />
                <Route path="/discover" component={Discover} />
                <Route path="/mine" component={Mine} />
	        </Route>
	    </Router>
    </Provider>
    ,document.body.appendChild(document.createElement('div'))
);

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



