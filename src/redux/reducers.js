import { browserHistory } from 'react-router'
import {combineReducers } from 'redux'
import {getUUID} from '../extend/method'
import Alert from '../component/Alert'
import '../extend/prototype' //prototype扩展
import {ADD_OK, REMOVE_OK, GET_OK, EDIT_OK, SEND_MESSAGE} from './actions'
//文章
import {GET_ARTICLE, ADD_ARTICLE, PUT_ARTICLE, DELETE_ARTICLE} from './actions'
//账户
import {LOGIN, REGISTER} from './actions'
//获取登录用户信息
import {CURRENT_USER} from './actions'

function currentUser (state={}, action) {
    switch(action.type){
        case CURRENT_USER:
            return action.payload
        break;
        default:
            return state
    }
}

function articleList2(state = [], action) {
    switch (action.type) {
        case GET_ARTICLE:
            return action.payload
        case ADD_ARTICLE:
            console.log('之前状态');
            console.log(...state);  //之前的状态
            console.log('之后状态');
            console.log(action.payload); //之后的状态
            return [action.payload, ...state]
        case PUT_ARTICLE:
            return state.arrEdit(action.index, action.value)
        case DELETE_ARTICLE:
            console.log(state);
            return state.arrRemove(action.payload)
        default:
            return state
    }
}

function articleList(state = [], action) {
    switch (action.type) {
        case GET_OK:
            return action.payload
        case ADD_OK:
            return [...state, action.payload]
        case EDIT_OK:
            return state.arrEdit(action.index, action.value)
        case REMOVE_OK:
            console.log(state);
            return state.arrRemove(action.payload)
        default:
            return state
    }
}

function registerState(state = {}, action) {
    switch (action.type) {
        case REGISTER:
            Alert.remove()
            if(action.payload.token){
                localStorage.setItem('token',action.payload.token)
            }
            Alert.add(action.payload.message,2500)
            setTimeout(function() {
                browserHistory.push(sessionStorage.getItem('nextPath'))
            }, 2500);
            return action.payload
        default:
            return state
    }
}
function loginState(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            Alert.remove()
            if(action.payload.token){
                localStorage.setItem('token',action.payload.token)
            }
            Alert.add(action.payload.message,2500)
            //登录成功后跳转
            if(action.payload.state=='success'){
                setTimeout(function() {
                    browserHistory.push(sessionStorage.getItem('nextPath'))
                }, 2500)
            }
            return action.payload
        default:
            return state
    }
}

function messages (state = [], action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return state
        default:
            return state
    }
}

const thisApp = combineReducers({
    currentUser,
    articleList,
    articleList2,
    registerState,
    loginState,
    messages,
})

export default thisApp