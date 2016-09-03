import {combineReducers } from 'redux'
import {ADD_OK, REMOVE_OK, GET_OK, EDIT_OK } from './actions'
import us from 'underscore'

Array.prototype.arrRemove = function (n) {     
    if (n < 0)
        return this;
    else
        return this.slice(0, n).concat(this.slice(n + 1, this.length));
}
Array.prototype.arrEdit = function (n,value) {     
    if (n < 0)
        return this;
    else
        this.splice(n,1,value)
        return this
}

function articleList(state = [], action) {
    switch (action.type) {
        case GET_OK:
            console.log('GET_OK');
            return action.payload
        case ADD_OK:
            console.log('ADD_OK');
            return [
                ...state,
                action.payload
            ]
        case EDIT_OK:
            console.log('GET_OK');
            return state.arrEdit(action.index, action.value)
        case REMOVE_OK:
            console.log('REMOVE_OK');
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