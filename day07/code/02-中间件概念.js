var http = require('http')
var url = require('url')


//这些东西相当于中间件，请求来的数据经过这些处理后得到处理后的数据
var cookie = require('./middleware/cookie')
var postBody = require('./middleware/post-body')
var query = require('./middleware/query')
var session = require('./middleware/session')

var server = http.createServer(function (req, res) {
  //解析表单 get 请求体
  //解析表单 post 请求体
  //解析 cookie
  //处理 session
  //使用模板引擎

  // console.log(req.query)
  // console.log(req.body)
  // console.log(req.cookies)
  // console.log(req.session)

  //解析请求地址中的 get 参数
  // var urlObj = url.parse(req.url, true)
  // req.query = urlObj.query
  query(req, res)

  //解析请求地址中的post参数
  req.body = {
    foo: 'bar'
  }
  postBody(req, res)

  //解析 cookie
  // req.cookies = {
  //   isLogin: true
  // }
  cookie(req, res)

  //配置session
  // req.session = {}
  session(req, res)

  //配置模板引擎
  res.render = function () {

  }


  if (req.url === 'xxx') {
    //处理
    //query,cookies,body,session,render API成员
  } else if (url === 'xx') {
    //处理

  }


  //上面的过程都是了为了在后面做具体业务操作处理的时候更方便
  //原生模板不支持这些，我们那就手动添加， 上面也可以用各种插件
})

server.listen(3000, function () {
  console.log('3000.running....')
})