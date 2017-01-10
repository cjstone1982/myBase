var express = require('express')
var crypto  = require('crypto')
var http    = require('http')
var qs      = require('querystring')
var fs      = require('fs')
var multer  = require('multer')
var upload  = multer({dest: './app/uploads/',})
var needle  = require('needle')
// var storage  = multer.memoryStorage()
// var upload   = multer({ storage: storage })

var jwt = require("jsonwebtoken");
var settings=require('../settings')
var host=settings.serverHost
var port=settings.serverPort
var serverPath=host+':'+port

var app = express.Router()
var constant=express()
//jwt读取密匙并写入到常量
var pem = fs.readFileSync('cert.pem').toString()
constant.set('jwt',pem)
var cert=constant.get('jwt')

var AV = require('leanengine')
//设置数据库对象

//开启跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next()
});

// AV注册
app.post('/register', function(req, res) {
	// 新建 AVUser 对象实例
	console.log(req.body);
	var user = new AV.User();
	if(!req.body.username) res.send({state:'error',message:'用户名不能为空'})
	if(!req.body.password) res.send({state:'error',message:'密码不能为空'}) 
	// 设置用户名
	user.setUsername(req.body.username);
	// 设置密码
	user.setPassword(req.body.password);
	//设置头像
	var base64Img="data:image/jpg;base64,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"
	var data = { base64: base64Img };
    var avatar = new AV.File('avatar.png', data);
    user.set('avatar',avatar);
    user.set('nickname',req.body.nickname)
	// 设置邮箱
	// user.setEmail(req.body.email);
	user.signUp().then(function (result) {
		console.log('注册成功');
	  	var expires=3600*14 //一天3600秒  //过期时间
	  	var profile=result
		var authToken = jwt.sign(profile, cert, { expiresIn: expires });
	  	res.send({state:'success',message:'注册成功',token:authToken,data:result})
	}, function (err) {
		switch(err.code){
			case 202:
				res.send({state:'error',message:'该用户名已经注册'})
			break;
			case 203:
				res.send({state:'error',message:'该邮箱已经注册'})
			break;
			case 214:
				res.send({state:'error',message:'该手机号已经注册'})
			break;
			default:
				res.send({state:'error',message:'注册失败'})
		}
	});
})

// AV登录请求（可能来自登录界面中的表单）
app.post('/login', function(req, res) {
	console.log(req.body);
	AV.User.logIn(req.body.userName, req.body.password).then(function(result) {
		let expires=3600*7 //一天3600秒  //过期时间
		let profile=result
		let authToken = jwt.sign(profile, cert, { expiresIn: expires });
		console.log('登录成功');
		res.send({state:'success',message:'登陆成功',token:authToken,data:result})
	}, function(err) {
		console.log('登录失败');
		switch(err.code){
			case 211:
				res.send({state:'error',message:'没有这个用户'})
			break;
			default:
				res.send({state:'error',message:'登录失败，请检查用户名及密码'})
		}
	});
})

//创建角色
app.post('/role/add',function(req,res){
	let token=req.headers['x-access-token']
	let user=jwt.verify(token, cert)
	let currentUserId = user.id
	// 新建一个角色，并把为当前用户赋予该角色
	var roleAcl = new AV.ACL();
	roleAcl.setPublicReadAccess(true);
	roleAcl.setPublicWriteAccess(false);
	// 当前用户是该角色的创建者，因此具备对该角色的写权限
	roleAcl.setWriteAccess(currentUserId, true);
	//新建角色
	var administratorRole = new AV.Role(req.body.roleName, roleAcl);
	administratorRole.set('description',req.body.description);
	administratorRole.save().then(function(role) {
		res.send({state:'success',message:'创建角色成功',data:role})
		console.log('创建角色成功');
		console.log(role);
		// 创建成功
	}).catch(function(err) {
		console.log(err);
		switch(err.code){
			case 137:
				res.send({state:'error',message:'角色已经存在，不能重复创建'})
			break;
			default:
				res.send({state:'error',message:'创建角色失败'})
		}
		console.log('创建角色失败');
		console.log(error);
	})
	
})

//查询角色
app.get('/role/query',function (req,res) {
	var query = new AV.Query('_Role');
    query.find().then(function (result) {
    	res.send({state:'success',message:'查询角色成功',data:result})
    }, function (err) {
        res.send({state:'error',message:'角色查询失败',data:[]})
    });
})



// 登出账号
app.get('/logout', function(req, res) {
	req.currentUser.logOut();
	res.clearCurrentUser(); // 从 Cookie 中删除用户
	res.redirect('/profile');
});

//渲染页面及登录验证
app.get('*', authLogin, function(req, res, next) {
    res.render("index", {layout: false})
})

//操作权限校验
function auth(req,res,next) {
	console.log('操作权限校验');
	let token=req.headers['x-access-token']
	if(token){
		jwt.verify(token, cert,function(err,decoded){
			if(decoded){
				console.log('权限验证通过');
				next()
			}else{
				console.log('权限验证失败');
				res.json({
					'code':3002,
					'state':'error',
					'message':'权限验证未通过',
				})
			}
		})
	}else{
		res.json({
			'code':3001,
			'state':'error',
			'message':'当前未登录',
		})
	}
}

//登录状态校验
function authLogin(req,res,next) { 
	//console.log('登录状态校验');
	let token=req.headers['x-access-token']
	if(token){
		jwt.verify(token, cert, function(err, user) {
			if(user){
				let nowDate=parseInt(Date.now()/1000)
				if(nowDate>user.exp){
					localStorage.removeItem('token')
				}
				res.send({
					token:true,
					now:nowDate,
					message:nowDate>user.exp?'已过期，请重新登录':'当前在线',
					user
				})
			}else{
				res.send({token:false,message:'当前未登录'})
			}
		})
	}else{
		next()
	}
}

module.exports = app