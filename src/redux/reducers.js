import { browserHistory } from 'react-router'
import {combineReducers } from 'redux'
import {getUUID} from '../extend/method'

import '../extend/prototype' //prototype扩展

//文章
import {GET_ARTICLE, ADD_ARTICLE, PUT_ARTICLE, DELETE_ARTICLE} from './actions'
//账户
import {LOGIN, REGISTER} from './actions'
//获取登录用户信息
import {CURRENT_USER} from './actions'
//权限角色
import {ROLE_ADD, ROLE_QUERY} from './actions'


function currentUser (state={}, action) {
    switch(action.type){
        case CURRENT_USER:
            return action.payload
        break;
        default:
            return state
    }
}

function loginState(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            //登录成功后跳转
            if(action.payload.state=='success'){
                browserHistory.push('/index')
            }
            return action.payload
        default:
            return state
    }
}

function roleList(state = [], action) {
    switch (action.type) {
        case ROLE_ADD:
            return action.payload
        case ROLE_QUERY:
            for (var i = 0; i < action.payload.length; i++) {
                action.payload[i].key=i
            }
            return action.payload
        default:
            return state
    }
}

const thisApp = combineReducers({
    currentUser,
    loginState,
    roleList,
})

export default thisApp