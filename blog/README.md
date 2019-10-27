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
