import {combineReducers } from 'redux'
import {ADD_OK, REMOVE_OK, GET_OK, EDIT_OK } from './actions'
import us from 'underscore'
import '../js/prototype' //prototype扩展
import method from '../js/method'

function articleList(state = [], action) {
    switch (action.type) {
        case GET_OK:
            return action.payload
        case ADD_OK:
        console.log('add ok')
            console.log(state);
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

const todoApp = combineReducers({
    articleList
})

export default todoApp