var express = require('express');
var path = require('path');
var router = require('./router');
var bodyParser = require('body-parser');
var session = require('express-session')


var app = express();


//会把相对路径改为据对路径
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use(
  '/node_modules/',
  express.static(path.join(__dirname, './node_modules/'))
);

//在node中,有很多第三方模板引擎都可以使用,不是只有art-template
//ejs,jade(pug),hanlebars,nunjucks...
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/')); //默认就是views目录,想改就在这里改

//配置body-parser表单POST请求体插件(一定要在挂载前)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//在express这个框架中，默认不支持session和cooike
//但是我们可以使用第三方中间件：express-session来解决
//1.npm install express-session
//2.配置（一定要在app.use(router)之前）
app.use(session({
  secret: 'ahh',//配置加密字符串，会在原有加密基础之上和这个字符串拼起来去加密
  //目的为了增加安全性，防止客户端恶意伪造
  resave: false,
  saveUninitialized: false //true:无论你是否使用session，我都默认直接给你分配一把钥匙session
  //false ：当你真正往session存数据得时候，才给你钥匙
}))
//3.使用
//  当把这个插件配置好之后，就可以通过req.session来访问和设置session成员了
//  添加session数据  req.session.foo ='bar'
//  访问session数据  req.session.foo


//把路由挂载到app中
app.use(router);

app.listen(3000, function () {
  console.log('running3000...');
});
