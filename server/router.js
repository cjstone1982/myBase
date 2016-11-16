var express = require('express')
var crypto  = require('crypto')
var http    = require('http')
var qs      = require('querystring')
var fs      = require('fs')
var multer  = require('multer')
var upload  = multer({dest: './app/uploads/',})
var needle  =  require('needle')
// var needle  = require('needle')
// var storage  = multer.memoryStorage()
// var upload   = multer({ storage: storage })
// var jwt = require('jwt-simple');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

var settings=require('../settings')
var host=settings.serverHost
var port=settings.serverPort
var serverPath=host+':'+port

var app = express.Router()

// var db      = require("./db")
// var Concern = db.model("Concern")
// var Remind  = db.model("Remind")
// var Post    = db.model("Post")
// var User    = db.model("User")

//开启跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next()
});

app.route('/user/register')
	.post(function(req, res, next) {
		needle.post(serverPath+'/user/register', req.body, function(err, resp, result) {
			console.log(result);
		 	res.send(result)
		});
	})

app.route('/user/login')
	.post(function(req, res, next) {
		console.log('登录请求');
		console.log(req.body);
		needle.post(serverPath+'/user/login', req.body, function(err, resp, result) {
		 	res.send(result)
		});
	})

//*************************************************//
app.route('/article')
	.all(function(req, res, next) {
	  	console.log('前端请求中间件');
		next();
	})
	.get(function(req, res, next) {
		needle.get(serverPath+'/article', function(err, resp, body) {
		  	console.log(body);
		  	res.send(body)
		});
	})
	.post(function(req, res, next) {
		console.log('发布文章请求值');
		console.log(req.body);
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


app.get('*', auth, function(req, res, next) {
    res.render("index", {layout: false})
})

function auth(req,res,next) {
	let token=req.headers['x-access-token']
	if(token){
		jwt.verify(token, 'secret', function(err, decoded) {
			if(decoded){
				let user=decoded
				res.send({
					token:true,
					user
				})
			}else{
				res.send({token:false})
			}
		})
	}else{
		next()
	}
}

module.exports = app