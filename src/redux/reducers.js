import {combineReducers } from 'redux'
import {ADD_OK, REMOVE_OK, GET_OK, EDIT_OK, LOGIN, REGISTER , SEND_MESSAGE} from './actions'
import us from 'underscore'
import '../extend/prototype' //prototype扩展
import method from '../extend/method'

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
    accounts,
    messages
})

export default todoApp