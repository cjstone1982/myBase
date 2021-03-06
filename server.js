var compression  = require('compression'); //gzip静态页面压缩
var express      = require('express')
var path         = require('path')
// var favicon      = require('serve-favicon')
var logger       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var session      = require('express-session')
var multer       = require('multer')
var fs           = require('fs')
var exphbs       = require('express-handlebars')
var routes       = require('./server/router')
var http         = require('http');
var settings     = require('./settings')
// var mongoose  = require('mongoose')
// mongoose.connect("mongodb://localhost:27017/myTestDB")
//连接数据库
// db = require('./server/db')
// db.connect()

var AV = require('leanengine')
AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'runfy7Ex7StSP3swPQq2igxt-gzGzoHsz',
    appKey: process.env.LEANCLOUD_APP_KEY || 'AFfbrWOvkK52eF09BoItE4iB',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '8YE4G6C8jr5odzYBhEgxJC31'
})

var app = express();
app.use(AV.express());
app.use(AV.Cloud.CookieSession({ secret: 'my secret', maxAge: 3600000, fetchUser: true }));

// app.listen(process.env.LEANCLOUD_APP_PORT || settings.hostPort);

//使用react就不需要模板引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression()) 
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm','html','css','png','gif','jpg','js','tpl'],
    index: false,
    maxAge: '604801000', //24小时*7
    redirect: true,
    expires:'604801000',
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}
app.use(express.static(path.join(__dirname, 'app'),options))
// app.use(favicon(path.join(__dirname, 'app', 'favicon.ico')))
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
app.use('/', routes)

app.use(logErrors);
function logErrors(err, req, res, next) {
    console.log('前端服务器发生了错误，错误内容为');
    console.error(err.stack);
    next();
}

http.createServer(app).listen(settings.hostPort,function(){
	console.log('server start at '+settings.hostPort+'')
})











