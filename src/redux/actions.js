import {message} from 'antd'

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

//角色
export const  ROLE_ADD      = 'ROLE_ADD'    //添加角色
export const  ROLE_QUERY    = 'ROLE_QUERY'  //查询角色

//设置请求头
let JSONpost=()=>{
    return({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    })
}

export function roleAdd (value) {
    return (dispatch,getState)=>{
        const hide=message.loading('添加角色中...',2)
        fetch('/role/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(value)
        })
        .then(response=>{return response.json()})
        .then(data=>{
            setTimeout(hide,0)
            if(data.state=='success'){
                message.success(data.message,2)
                dispatch({
                    type:ROLE_ADD,
                    payload:data.data
                })
            }else{
                message.warning(data.message,2)
            }
        })
        .catch(err=>{
            message.error(err,2)
        })
    }
}
export function roleQuery(value){
    return(dispatch,getState)=>{
        console.log('roleQuery start');
        fetch('/role/query', {
            method: "GET",
        })
        .then(response=>{return response.json()})
        .then(data=>{
            console.log(data);
            if(data.state=='success'){
                message.success(data.message,2)
                dispatch({
                    type: 'ROLE_QUERY',
                    payload: data.data
                })
            }else{
                message.warning(data.message,2)
            }
        })
        .catch(err=>{
            message.error(err,2)
        })
    }
}

//文章
//获取文章
export function getArticle(value){

}
//添加文章
export function addArticle(value){
    Alert.add('发布中...',2500)
    return (dispatch,getState)=>{
        fetch('/article/add', {
            method: 'POST',
            headers: JSONpost(),
            body: JSON.stringify(value)
        })
        .then(response => {return response.json()})
        .then(data => {
            Alert.remove()
            Alert.add('发布成功',2500)
            let authorName=getState().currentUser.attributes.username
            let authorAvatar=getState().currentUser.attributes.avatar.url
            dispatch({
                type:'ADD_ARTICLE',
                payload:Object.assign({},data.data,{authorName:authorName,authorAvatar:authorAvatar})
            })
        }).catch(function (err) {
            Alert.add('服务器连接失败，请稍后再试',2500)
            console.log(err);
        });  
    }
}
//删除文章
export function deleteArticle(value){
    
} 
//修改文章
export function putArticle(value){

} 
//查询文章
export function queryArticle(value){

}

//发布匹配
export function publishMatch (value) {
    Alert.add('发布中...',2500)
    return (dispatch,getState)=>{
        fetch('/match/publish', {
            method: 'POST',
            headers: JSONpost(),
            body: JSON.stringify(value)
        })
        .then(response => {return response.json()})
        .then(data => {
            Alert.remove()
            Alert.add('发布成功',2500)
            let authorName=getState().currentUser.attributes.username
            let authorAvatar=getState().currentUser.attributes.avatar.url
            dispatch({
                type:'PUBLISH_MATCH',
                payload:Object.assign({},data.data,{authorName:authorName,authorAvatar:authorAvatar})
            })
        }).catch(function (err) {
            Alert.add('服务器连接失败，请稍后再试',2500)
            console.log(err);
        });  
    }
}

//查询匹配
export function queryMatchList (value) {
    Alert.add('开始加载比赛列表',60000)
    return (dispatch,getState)=>{

        fetch('/match/queryAll', {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            Alert.add('加载比赛列表成功',2500)
            dispatch({
                type:'QUERY_MATCH_LIST',
                payload:data.data
            })
            
        }).catch(function (err) {
            Alert.add('加载比赛列表失败',2500)
            console.log(err);
        });  
    }
}

//登录
export function login(value){
    return (dispatch,getState) => {
        const hide = message.loading('登录中..', 0);
        fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(value)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTimeout(hide, 0);
            if(data.state=='success'){
                message.success(data.message, 2)
                localStorage.setItem('token',data.token)
                dispatch({
                    type: 'LOGIN',
                    payload: data
                })
            }else{
                message.warning(data.message, 2)
            }
        }).catch(function (err) {
            setTimeout(hide, 0);
            message.warning(data.message, 2)
            console.log(err);
        });  
    } 
}

//注册
export function register(value){
    Alert.add('注册提交中...稍等',60000)
    return (dispatch,getState) => {
        fetch('/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(value)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            Alert.remove()
            Alert.add(data.message,2500)
            if(data.token){
                localStorage.setItem('token',data.token)
            }
            dispatch({
                type: 'REGISTER',
                payload: data
            })
        }).catch(function (err) {
            Alert('后端服务器连接失败',2500)
            console.log(err);
        });  
    } 
}



