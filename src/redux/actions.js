import Alert from '../component/Alert'

//action 类型
export const  ADD_OK           = 'ADD_OK';
export const  REMOVE_OK        = 'REMOVE_OK';
export const  GET_OK           = 'GET_OK';
export const  EDIT_OK          = 'EDIT_OK';

//获取登录用户信息
export const  CURRENT_USER     = 'CURRENT_USER';

//账户
export const  LOGIN            = 'LOGIN';         //登录
export const  REGISTER         = 'REGISTER';      //注册

//文章
export const  GET_ARTICLE      = 'GET_ARTICLE'    //获取文章
export const  ADD_ARTICLE      = 'ADD_ARTICLE'    //添加文章
export const  PUT_ARTICLE      = 'PUT_ARTICLE'    //修改文章
export const  DELETE_ARTICLE   = 'DELETE_ARTICLE' //删除文章

export const  OPEN_LOADING     = 'OPEN_LOADING'     //打开加载页面
export const  CLOSE_LOADING    = 'CLOSE_LOADING'    //关闭加载页面

export const  SHOW_MATCH    = 'SHOW_MATCH'    //打开加载发布页面
export const  HIDE_MATCH    = 'HIDE_MATCH'    //打开加载发布页面

// console.log('actions actions actions actions actions actions');

export function showMatch () {
    return (dispatch,getState)=>{
        dispatch({
            type:'SHOW_MATCH',
            payload:{show:true}
        })
    }
}
export function hideMatch () {
    return (dispatch,getState)=>{
        dispatch({
            type:'HIDE_MATCH',
            payload:{show:false}
        })
    }
}

export function openLoading () {
    return (dispatch,getState)=>{
        dispatch({
            type:'OPEN_LOADING',
            payload:{open:1}
        })
    }
}
export function closeLoading () {
    return (dispatch,getState)=>{
        dispatch({
            type:'CLOSE_LOADING',
            payload:{open:0}
        })
    }
}

//获取文章
export function getArticle (value) {
    return (dispatch,getState) => {
        fetch('/article', {
            method: "GET",
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            dispatch({
                type: 'GET_ARTICLE',
                payload: data
            })
            dispatch({
                type:'CLOSE_LOADING',
                payload:{open:0}
            })
        }).catch(function (err) {
            console.log("服务器连接失败");
        });  
    } 
}

//添加文章
export function addArticle (value) {
    return (dispatch,getState) => {
        fetch('/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('token')
            },
            body: $.param(value)
        })
        .then(response => {
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

//登录
export function login(value){
    return (dispatch,getState) => {
        fetch('/user/login', {
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
                type: 'LOGIN',
                payload: data
            })
        }).catch(function (err) {
            console.log("后端服务器连接失败");
            dispatch({
                type: 'LOGIN',
                payload: {
                    state:'error',
                    message:'后端服务器连接失败',
                }
            })
        });  
    } 
}

//注册
export function register(value){
    return (dispatch,getState) => {
        fetch('/user/register', {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: $.param(value)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            dispatch({
                type: 'REGISTER',
                payload: data
            })
        }).catch(function (err) {
            console.log("服务器连接失败");
        });  
    } 

    // console.log('前端提交注册');
    // $.post('/user/register', value,(result)=>{
    //     console.log(result);
    //     if(result.state=='success'){
    //         console.log('注册成功')
    //     }else{
    //         console.log('注册失败')
    //     }
    // })
    // return {
    //     type: REGISTER,
    //     payload: value
    // }
    
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


