var express = require('express')
var crypto  = require('crypto')
var http    = require('http')
var qs      = require('querystring')
var fs      = require('fs')
var multer  = require('multer')
var upload  = multer({dest: './app/uploads/',})
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

app.get('*' , function(req, res, next) {
    res.render("index", {layout: false,})
})

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
		console.log(111);
		console.log(result)
		console.log(222);
		// res.end({state:'success',text:'发送消息成功'})
		console.log('发送消息成功')
	})
})

module.exports = app