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

书写步骤
  创建目录结构
  整合静态页-模板页
    include
    block
    extend
  设计用户、登录、退出、注册路由
    用户注册
      先处理好客户端页面内容（表单的name、收集表单数据、发送请求）
      服务端
        获取客户端表单的数据
        操作数据库
          如果有错，发送500告诉客户端服务器错了
          其他根据你的业务发送不同的响应数据
    用户登录
    用户退出



- path 模块
- __dirname 和 __filename
  + **动态的** 获取当前文件或者文件所处目录的绝对路径
  + 用来解决文件操作路劲的相对路径问题
  + 因为在文件操作中，相对路径相对于执行 `node` 命令所处的目录
  + 所以为了尽量避免这个问题，都建议文件操作的相对路劲都转为：**动态的绝对路径**
  + 方式：`path.join(__dirname, '文件名')`
- art-template 模板引擎(include、block、extend)
  + include
  + extend
  + block
  + 动手写一写
- 表单同步提交和异步提交区别
  + 字符串交互
  + 请求（报文、具有一定格式的字符串）
  + HTTP 就是 Web 中的沟通语言
  + 服务器响应（字符串）
  + 01
  + 服务器端重定向针对异步请求无效
- Express 中配置使用 express-session 插件
  + 插件也是工具
  + 你只需要明确你的目标就可以了
  + 我们最终的目标就是使用 Session 来帮我们管理一些敏感信息数据状态，例如保存登陆状态
  + 写 Session
    * req.session.xxx = xx
  + 读 Session
    * req.session.xxx
  + 删除 Session
    * req.session.xxx = null
    * 更严谨的做法是 `delete` 语法
    * delete req.session.xxx
- 概述案例中注册-登陆-退出的前后端交互实现流程
