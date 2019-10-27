var express = require('express')

var router = express.Router()

router.get('/', function (req, res) {
  res.render('index.html')
})
//登录页面
router.get('/login', function (req, res) {
  res.render('login.html')
})
//登录请求
router.post('/login', function (req, res) {
})
//注册页面
router.get('/register', function (req, res) {
  res.render('register.html')
})
//注册请求
router.post('/register', function (req, res) {
  //1.获取表单提交的数据
  console.log(req.body)
  //2.操作数据库
  //3.发送响应
})



module.exports = router