var express = require('express');
var User = require('./models/user'); //这个首字母大写
var md5 = require('blueimp-md5')


var router = express.Router();

router.get('/', function (req, res, next) {
  // console.log(req.session)
  res.render('index.html', {
    user: req.session.user
  });
});
//登录页面
router.get('/login', function (req, res, next) {
  res.render('login.html');
});
//登录请求
router.post('/login', function (req, res, next) {
  //1.获取表单数据
  //2.查询数据库，用户名密码是否正确
  //3.发送响应数据
  // console.log(req.body)
  var body = req.body
  User.findOne({
    email: body.email,
    password: md5(md5(body.password)) //验证密码是否和数据库的一样的，也需要加密对比，因为存入的时候加密是没法反向解密的
  }, function (err, user) {
    if (err) {
      // return res.status(500).json({
      //   err_code: 500,
      //   message: err.message // err对象有个属性叫message
      // })
      return next(err)
    }
    //优先处理错误，正确的放最后
    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!user) {
      console.log(user)
      return res.status(200).json({
        err_code: 1,
        message: 'email or password is invalid'
      })
    }

    //用户存在，登录成功，通过session记录登录状态
    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })

  })
});
//注册页面
router.get('/register', function (req, res, next) {
  res.render('register.html');
});
//注册请求
router.post('/register', async function (req, res, next) {
  //1.获取表单提交的数据
  //  console.log(req.body);
  //2.操作数据库
  //  判断该用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  //3.发送响应


  //使用回调
  var body = req.body;
  console.log(req.body.email, req.body.password)
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
        //不能用throw 因为如果保错程序就会整个崩溃全部退出
        // return res.status(500).send('server error');

        // return res.status(500).json({
        //   // success: false,//这个只能ture和false没意义
        //   err_code: 500, //正常都是0，
        //   message: '服务器错误',
        // }); //都发json数据

        return next(err)
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


        // //github就是这样做的，后台执行重新渲染该页面，填的数据也传过去
        ////但这样就没前端啥事了，而且交互也不是很好，不能直接操作html的dom
        // return res.render('register.html', {
        //   err_message: '邮箱或昵称已存在',
        //   form: body
        // })

      }

      //******对密码进行md5重复加密******
      //只能正向加密，不能反向解密
      // 前面配置了app.js里面配置得secret: 'ahh'：相当于body.password = md5(md5(body.password) + 'ahh')//加密俩次//express-session: app.js里面配置得secret: 'ahh'字符串，再拼个ahh 安全性更高
      body.password = md5(md5(body.password))//加密俩次
      new User(body).save(function (err, user) {
        //插入一个用户对象（body就是获取到的form表单用户输入的信息）并保存
        if (err) {
          // console.log(err)
          // return res.status(500).json({
          //   // success: false,
          //   err_code: 500, //正常都是0
          //   message: 'Internal error',
          // });
          return next(err)
        }


        //注册成功，使用session 记录用户得登录状态
        req.session.user = user //当前登录的用户


        //Express 提供了一个响应方法：json
        //就不需要用 JSON.stringify了
        //该方法接受一个对象作为参数，他会自动帮你把对象转为json格式字符串再发送给浏览器
        res.status(200).json({
          // success: true,
          err_code: 0, //正常都是0
          message: 'ok',
        });

        //服务端重定向只针对同步请求，对前台异步请求无效
        // res.redirect('/')
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



  /*

    //使用async await
    var body = req.body;
    try {
      if (await User.findOne({ email: body.email })) {
        return res.status(200).json({
          err_code: 1,
          message: '邮箱已存在'
        })
      }
      if (await User.findOne({ nickname: body.nickname })) {
        return res.status(200).json({
          err_code: 2,
          message: '昵称已存在'
        })
      }
      //对密码加密
      body.password = md5(md5(body.password))
      //创建用户
      await new User(body).save()
      res.status(200).json({
        err_code: 0,
        message: 'ok'
      })
    } catch (err) {
      res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }


    */
});
//退出
router.get('/logout', function (req, res) {
  //1.清除登录状态
  req.session.user = null
  //2.重定向到登录页
  res.redirect('/login')
})
module.exports = router;
