/**
 * app模块
 * 职责：
 *      启动服务
 *      做一些服务相关的配置
 *          模板引擎
 *          body-parser 解析表单post请求体
 *          提供静态资源服务
 *      挂载路由
 *      监听端口服务
 * */

//1.引入express框架
var  express = require('express')
var router =require('./router')
var bodyParser = require('body-parser')

//2.创建app
var app = express()

//3.开放静态资源
app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))


//配置模板引擎
app.engine('html', require('express-art-template'));

//配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//4.挂载路由
app.use(router)

//5.监听端口
app.listen(3000,function(){
    console.log('port in 3000,running......')
})
