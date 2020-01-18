let Service = require('node-windows').Service

let svc = new Service({
    name: 'components_node',
    description: '组件库网站',
    script: 'E:/github/express-web-fw/bin/web.js'//部署在服务器对应的路径
})

svc.on('install', function() {
    svc.start()
})

svc.install()