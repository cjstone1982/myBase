
/*
 * action 类型
 */
export const ADD_OK = 'ADD_OK';
export const REMOVE_OK = 'REMOVE_OK';
export const GET_OK = 'GET_OK';
export const EDIT_OK = 'EDIT_OK';
/*
 * action 创建函数
 */
export function addTodo(e) {
  return (dispatch,getState)=>{
      console.log(e);
      dispatch({
            type: ADD_OK,
            payload: e
      })
    }
}

export function removeTodo(e) {
  return (dispatch,getState)=>{
      console.log(e);
      dispatch({
            type: REMOVE_OK,
            payload: e
      })
    }
}

export function editTodo(index,value) {
  return (dispatch,getState)=>{
      console.log(index,value);
      dispatch({
            type: EDIT_OK,
            index: index,
            value: value
      })
    }
}

export function getTodo(e) {
  return (dispatch,getState)=>{
      let array=[7,8,9];
      console.log(array)
      console.log(e);
      dispatch({
            type: GET_OK,
            payload: array
      })
    }
}


