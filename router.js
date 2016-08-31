var express = require('express')
var http    = require('http')
var qs      = require('querystring')
var fs      = require('fs')
var multer  = require('multer')
var upload  = multer({dest: './app/uploads/',})
// var needle  = require('needle')
// var storage  = multer.memoryStorage()
// var upload   = multer({ storage: storage })
var app = express.Router()

//如果使用handlebars就开启
// app.get('*' , function(req, res, next) {
//     res.render("index", { 
//     	title: "点石成晶",
//     	session:req.session,
//     })
// })

module.exports = app