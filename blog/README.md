<!--
 * @Author: lc
 * @Date: 2019-10-27 14:09:00
 * @Description:
 -->
| 路径      |  方法   | get参数  | post参数                    | 是否需要登录权限  | 备注
|  /        |  GET   |         |                             |                 |  首页
|  /register|  GET   |         |                             |                 |  渲染注册页面
|  /register|  POST  |         | email,nickname,password     |                 |  处理注册请求
|  /login   |  GET   |         |                             |                 |  渲染登录页面
|  /login   |  POST  |         |       email,password        |                 |  处理登录请求
|  /logout  |  GET   |         |                             |                 |  处理退出请求

//在express这个框架中，默认不支持session和cooike
//但是我们可以使用第三方中间件：express-session来解决
//1.npm install express-session
//2.配置（一定要在app.use(router)之前）
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
//  添加session数据          req.session.foo ='bar'
//  访问（获取）session数据   req.session.foo

提示：默认session数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境，会把session持久化存储



当注册成功时，往session加个字段存储用户登录状态，当服务器重启时，就会丢失， 真正的生产环境，会把session持久化存储