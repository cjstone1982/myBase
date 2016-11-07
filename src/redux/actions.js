// action 类型
export const ADD_OK = 'ADD_OK';
export const REMOVE_OK = 'REMOVE_OK';
export const GET_OK = 'GET_OK';
export const EDIT_OK = 'EDIT_OK';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const GET_ARTICLE = 'GET_ARTICLE'
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const PUT_ARTICLE = 'PUT_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'

export function getArticle (value) {
    return (dispatch) => {
        fetch('/article', {
            method: "GET",
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            dispatch({
                type: 'GET_ARTICLE',
                payload: data
            })
        }).catch(function (err) {
            console.log("服务器连接失败");
        });  
    } 
}

export function addArticle (value) {
    return (dispatch) => {
        fetch('/article', {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: $.param(value)
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            dispatch({
                type: 'ADD_ARTICLE',
                payload: value
            })
        }).catch(function (err) {
            console.log("服务器连接失败");
        });  
    } 
}
















export function sendMessage(value){
    $.post('/send_message', value, function(result){
        alert(result)
    })
    return {
        type: SEND_MESSAGE,
        payload: value
    }
}

export function register(value){
    $.post('/register', value,(result)=>{
        console.log(result);
        result.state=='success'?console.log('注册成功'):console.log('注册失败')
    })
    return {
        type: REGISTER,
        payload: value
    }
    
    // return (dispatch,getState)=>{
    //     $.post('/register', value,(result)=>{
    //         console.log(result);
    //         result.state=='success'?console.log('注册成功'):console.log('注册失败')
    //     })

        // function f1 () {
        //     return new Promise((resolve, reject)=>{
        //         $.post('/register', value,(result)=>{
        //             result.state=='success'?resolve('登录成功'):reject('登录失败')
        //         })
        //     })
        // }
        // function f2 () {
        //     return new Promise((resolve, reject)=>{
        //         $.post('/register', value,(result)=>{
        //             setTimeout(function() {
        //                 resolve(result)
        //             }, 1000);
        //         })
        //     })
        // }
        // function f3 () {
        //     console.log('ccc');
        //     return 'ccc'
        // }
        // function f4 () {
        //     return new Promise((resolve, reject)=>{
        //         $.post('/register', value,(result)=>{
        //             result.state=='success'?resolve('登录成功'):reject('登录失败')
        //         })
        //     })
        // }
        // function f5 () {
        //     return new Promise((resolve,reject)=>{
        //         setTimeout(function() {
        //             resolve('我是f5')
        //         }, 1000);
        //     })
        // }
        // Promise.all([f1(), f2(), f3()]).then(results=>{
        //     console.log(results);
        //     return f4()
        // }).then(result=>{
        //     console.log(result);
        //     return f5()
        // }).then(result=>{
        //     console.log(result);
        // }).catch(console.log('promise error 出错啦'))

    // }
}
export function login(value){
    return  {
        type: LOGIN,
        payload: value
    }
}
// action 创建函数
export function addTodo(value){
    console.log(value);
    return (dispatch,getState)=>{
        dispatch({
            type: ADD_OK,
            payload: value
        })
    }
}
export function removeTodo(value){
    return {
        type: REMOVE_OK,
        payload: value
    }
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


