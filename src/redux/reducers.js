import { combineReducers } from 'redux'
import { ADD_OK, REMOVE_OK ,GET_OK} from './actions'

function articleList(state=[], action) {
  switch (action.type) {

    case GET_OK:
        console.log('GET_OK');
        console.log(state);
        console.log(action);
        console.log(2);
      	return action.payload

    case ADD_OK:
        console.log('ADD_OK');
		return [
			...state,
			action.payload
		]

    case REMOVE_OK:
        console.log('REMOVE_OK');
        console.log(articleList);
      	return state.filter((articleList)=>articleList.key!==action.payload)

    default:
      	return state
  	}
}

const todoApp = combineReducers({
  	articleList
})

export default todoApp