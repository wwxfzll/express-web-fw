var express = require('express');
var path = require('path');  
//用户加载图标
var favicon = require('serve-favicon');  
//在控制台中，显示req请求的信息
var logger = require('morgan'); 
//加载cookie模块，用于获取web浏览器发送的cookie中的内容
var cookieParser = require('cookie-parser'); 
//解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理
var bodyParser = require('body-parser'); 
//首先multer模块应用前提是在HTML的form表单中，标签内设置属性enctype=”multipart/form-data”是必须的，这样才可以上传文件，方式为post
//let multer = require('multer')

//生成一个express实例 app
var app = express();

//设置VIEWS文件夹，__dirname是node.js里面的全局变量。取得执行js所在的路径
app.set('views', path.join(__dirname, 'views'));
// 视图引擎设置
app.set('view engine', 'ejs');

// 定义icon图标，参数为图标的路径。如果不指明，则用默认的express图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//加载日志中间件，定义日志和输出级别
app.use(logger('dev'));

//加载解析json的中间件,接受json请求 
app.use(bodyParser.json()); 

//加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false })); 

//加载解析cookie的中间件
app.use(cookieParser());  

//上传文件，dest：目的地，array()内是你要上传的file类型input标签的name名称
//app.use(multer({dest: './tmp/'}).array())

//静态文件目录设置,设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

//路由控制器
var index = require('./routes/index');
app.use('/', index);

// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// 开发环境下的500错误处理器，将错误信息渲染error模版并显示到浏览器中
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//导出app实例供其他模块调用
module.exports = app;