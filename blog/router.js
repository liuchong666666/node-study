var express = require('express');
var User = require('./models/user'); //这个首字母大写
var md5 = require('blueimp-md5')


var router = express.Router();

router.get('/', function (req, res) {
  res.render('index.html');
});
//登录页面
router.get('/login', function (req, res) {
  res.render('login.html');
});
//登录请求
router.post('/login', function (req, res) { });
//注册页面
router.get('/register', function (req, res) {
  res.render('register.html');
});
//注册请求
router.post('/register', function (req, res) {
  //1.获取表单提交的数据
  //  console.log(req.body);
  //2.操作数据库
  //  判断该用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  //3.发送响应

  var body = req.body;
  User.findOne(
    {
      //或条件查询 满足eamil或者nickname ，其一存在
      $or: [
        {
          email: body.email,
        },
        {
          nickname: body.nickname,
        },
      ],
    },
    function (err, data) {
      if (err) {
        console.log('43', err)
        //不能用throw 因为如果保错程序就会整个崩溃全部退出
        // return res.status(500).send('server error');
        return res.status(500).json({
          // success: false,//这个只能ture和false没意义
          err_code: 500, //正常都是0，
          message: '服务器错误',
        }); //都发json数据
      }
      //如果有数据,就说明邮箱已存在
      // console.log(data);
      //如果邮箱已存在
      //判断昵称
      if (data) {
        //邮箱或者昵称已存在
        // return res.status(200).send('email or nickname aleary exists');
        return res.status(200).json({
          // success: true,
          err_code: 1, //1表示邮箱或者密码已存在
          message: 'email or nickname aleady exist',
        }); //都发json数据
      }

      //******对密码进行md5重复加密******
      //只能正向加密，不能反向解密
      body.password = md5(md5(body.password))//加密俩次
      new User(body).save(function (err, user) {
        //插入一个用户对象（body就是获取到的form表单用户输入的信息）并保存
        if (err) {
          console.log('67', err)
          return res.status(500).json({
            // success: false,
            err_code: 500, //正常都是0
            message: 'Internal error',
          });
        }
        //Express 提供了一个响应方法：json
        //就不需要用 JSON.stringify了
        //该方法接受一个对象作为参数，他会自动帮你把对象转为json格式字符串再发送给浏览器
        res.status(200).json({
          // success: true,
          err_code: 0, //正常都是0
          message: 'ok',
        });
      });

      //不存在，可以注冊
      // return res.status(200).send('ok'); //这是字符串不行，必须发json格式字符串
      // return res.status(200).send('{"success":true}'); //发json格式字符串
      // return res.status(200).send(
      //   JSON.stringify({
      //     success: true,
      //     foo: 'bar',
      //   })
      // ); //发json格式字符串
    }
  );
});

module.exports = router;
