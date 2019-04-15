#!/usr/bin/env node  //表明是 node 可执行文件

//解决7.8以下低版本nodejs无法使用async/await问题
require('babel-core/register');
require("babel-core").transform("code", {
    plugins: ["transform-runtime"]
});

//引入app实例
var app = require('../app');

//引入debug模块，打印调试日志
var debug = require('debug')('web:server');
var http = require('http');

//定义启动端口
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


var server = http.createServer(app);
//启动监听端口
server.listen(port, function(){
    let address = server.address()
    var host = address.address !== '::' ? address.address : 'localhost'
    var port = address.port
    console.log("启动web应用实例，访问地址为 http://%s:%s", host, port)
});
//HTTP异常事件处理函数
server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});


//端口标准化函数
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}



