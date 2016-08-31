var compression  = require('compression'); //gzip静态页面压缩
var express      = require('express')
var path         = require('path')
var favicon      = require('serve-favicon')
var logger       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var session      = require('express-session')
var multer       = require('multer')
var fs           = require('fs')
var exphbs       = require('express-handlebars')
var routes       = require('./router')
var http         = require('http');
// var mongoose  = require('mongoose')
// mongoose.connect("mongodb://localhost:27017/myTestDB")
var app = express()

//使用react就不需要模板引擎
// app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// app.set('view engine', 'handlebars')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'app')))
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(session({
    secret: 'stone-secret',
    // key: 'stone-dogs', //cookie的名称 不设置就是id随机
    cookie: {
        path: '/', 
        httpOnly: true, 
        secure: false, //https-enabled   必须要启用https
        maxAge: 2*604800000, //14天
        expires:new Date(Date.now() + 2*604800000)
    },
    // store: new MongoStore({ //把session保存到数据库里 db:数据库名称
    //     host:settings.host, 
    //     port:settings.dbport, 
    //     db:settings.db
    // }),
    resave: false, //使每次请求都重写cookie
    saveUninitialized: false, //必须关闭才能使用缓存
}))
var upload = multer({ dest: 'uploads/' })
app.use('/', routes)

http.createServer(app).listen(8888,function(){
	console.log('server start at 8888')
})











