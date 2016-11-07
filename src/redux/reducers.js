import {combineReducers } from 'redux'
import {ADD_OK, REMOVE_OK, GET_OK, EDIT_OK, LOGIN, REGISTER , SEND_MESSAGE} from './actions'
import {GET_ARTICLE, ADD_ARTICLE, PUT_ARTICLE, DELETE_ARTICLE} from './actions'
import us from 'underscore'
import '../extend/prototype' //prototype扩展
import method from '../extend/method'

function articleList2(state = [], action) {
    switch (action.type) {
        case GET_ARTICLE:
            return action.payload
        case ADD_ARTICLE:
            console.log('之前状态');
            console.log(...state);  //之前的状态
            console.log('之后状态');
            console.log(action.payload); //之后的状态
            return [...state, action.payload]
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

function accounts (state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case REGISTER:
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


const todoApp = combineReducers({
    articleList,
    articleList2,
    accounts,
    messages
})

export default todoApp