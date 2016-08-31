
/*
 * action 类型
 */
export const ADD_OK = 'ADD_OK';
export const REMOVE_OK = 'REMOVE_OK';
export const GET_OK = 'GET_OK';
/*
 * action 创建函数
 */
export function addTodo(e) {
  return (dispatch,getState)=>{
      let array=[1,2,3]
      console.log(array)
      console.log(e);
      dispatch({
            type: ADD_OK,
            payload: array
      })
    }
}

export function removeTodo(e) {
  return (dispatch,getState)=>{
      let array=[1,2,3]
      console.log(array)
      dispatch({
            type: REMOVE_OK,
            payload: array
      })
    }
}

export function getTodo() {
  return (dispatch,getState)=>{
      let array=[7,8,9];
      console.log(array)
      dispatch({
            type: GET_OK,
            payload: array
      })
    }
}


