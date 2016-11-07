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
var app = express.Router()

var db      = require("./db")
var Concern = db.model("Concern")
var Remind  = db.model("Remind")
var Post    = db.model("Post")
var User    = db.model("User")

//开启跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next()
});

app.post('/register',function(req,res){
	var user=new User({
		email:        req.body.email,
		password:     req.body.password,
		nickname:     req.body.nickname,
	})
	user.save(function(err,result){
		console.log(result)
		console.log('注册成功')
	})
})

app.post('/send_message',function(req,res){
	var post=new Post({
		title:        '标题',
        content:      '正文',
        stats:{
            votes:    0,
            favs:     0,
        },
        createAt:     new Date(),
	})
	post.save(function(err,result){
		res.send('发送消息成功')
	})
})
/////////////////////
app.get('/needle',function(req,res){
	needle.get('127.0.0.1:7777/api/article?foo=bar', function(err, resp,body) {
	  	console.log(body);
	  	res.send(body)
	});
})

app.post('/needle',function(req,res){
	console.log(req.body);
	needle.post('127.0.0.1:7777/api/article', 'foo=bar', function(err, resp, body) {
	 	res.send(body)
	});
})

app.put('/needle',function(req,res){
	needle.put('127.0.0.1:7777/api/article', 'foo=bar', function(err, resp, body) {
	 	res.send(body)
	});
})

app.delete('/needle',function(req,res){
	needle.delete('127.0.0.1:7777/api/article', 'foo=bar', function(err, resp, body) {
	 	res.send(body)
	});
})
//*************************************************//

app.get('/article',function(req,res){
	needle.get('127.0.0.1:7777/api/article?page=1', function(err, resp,body) {
	  	console.log(body);
	  	res.send(body)
	});
})

app.post('/article',function(req,res){
	needle.post('127.0.0.1:7777/api/article', req.body, function(err, resp, body) {
		console.log(body);
	 	res.send(body)
	});
})

app.put('/article',function(req,res){
	needle.put('127.0.0.1:7777/api/article', 'foo=bar', function(err, resp, body) {
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

app.delete('/article',function(req,res){
	needle.delete('127.0.0.1:7777/api/article', 'foo=bar', function(err, resp, body) {
	 	res.send(body)
	});
})

app.get('*' , function(req, res, next) {
    res.render("index", {layout: false})
})

module.exports = app