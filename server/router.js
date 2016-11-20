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

//开启跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next()
});

//注册
app.route('/user/register')
	.all(function(req, res, next) {
	  	console.log('注册请求中间件');
		next();
	})
	.post(function(req, res, next) {
		console.log('注册请求');
		console.log(req.body);
		needle.post(serverPath+'/user/register', req.body, function(err, resp, result) {
			if(err){ sendServerError(req,res)}
		 	res.send(result)
		});
	})

//登录
app.route('/user/login')
	.all(function(req, res, next) {
	  	console.log('登录请求中间件');
		next();
	})
	.post(function(req, res, next) {
		console.log('登录请求');
		needle.post(serverPath+'/user/login', req.body, function(err, resp, result) {
			if(err){ sendServerError(req,res)}
		 	res.send(result)
		});
	})

//文章
app.route('/article')
	.all(function(req, res, next) {
		next()
	})
	.get(function(req, res, next) {
		needle.get(serverPath+'/article', function(err, resp, body) {
		  	console.log(body);
		  	res.send(body)
		});
	})
	.post(auth, function(req, res, next) {
		let decoded = jwt.verify(req.headers['x-access-token'], cert)
		Object.assign(req.body, {id:decoded.id})
		needle.post(serverPath+'/article', req.body, function(err, resp, body) {
			console.log(body);
		 	res.send(body)
		});
	})
	.put(function(req, res, next) {
		needle.put(serverPath+'/article', req.body, function(err, resp, body) {
			console.log(body);
			switch(body.code){
				case 0:
					res.send(body.message)
				break;
				default:
					res.send(body.message)
			}
		});
	})
	.delete(function(req, res, next) {
		needle.delete(serverPath+'/article', req.body, function(err, resp, body) {
		 	res.send(body)
		});
	})


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

//返回标准错误
function sendServerError (req,res) { //通用的服务器错误返回
	res.json({
		'code':5001,
		'state':'error',
		'message':'后端服务器响应失败',
		'data':{},
	})
}

module.exports = app