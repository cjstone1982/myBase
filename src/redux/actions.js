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
export function addTodo(value){
    console.log(value);
    return function(dispatch,getState){
        dispatch({
            type: ADD_OK,
            payload: value
        })
    }
}


export function removeTodo(e){
    console.log('removeTodo');
    console.log(e);
    return ({
            type: REMOVE_OK,
            payload: e
    })
    
}
export function editTodo(index,value){
    return (dispatch,getState)=>{
        dispatch({
            type: EDIT_OK,
            index: index,
            value: value
        })
    }
}
export function getTodo(e){return (dispatch,getState)=>{
        let array=[7,8,9];
        dispatch({
            type: GET_OK,
            payload: array.map(x=>x*x)
        })
    }
}


