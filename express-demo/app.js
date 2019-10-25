//0.安装
//1.引包
var express = require("express")

//2.创建你的服务器应用程序
//  也就是原来的http.createServer
var app = express();


//在express中开放资源就是一个api的事
//公开指定目录 开放你指定的目录
//只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
//http://127.0.0.1:3000/public/img/middle.jpg
//http://127.0.0.1:3000/public/js/main.js
//http://127.0.0.1:3000/static/js/main.js
//http://127.0.0.1:3000/static/1.html
app.use('/public/',express.static('./public/'))
app.use('/static/',express.static('./static/'))

//模板引擎，在express中也是一个api的事


//得到的路径
//一个一个的判断
//不用考虑先后顺序


//当服务器收到给get请求 / 的时候，执行回调处理函数
app.get('/',function (req,res) {
    res.send("hello")
})


//当服务器收到给get请求 /about 的时候，执行回调处理函数
//这个框架会根据send("about关于") 引号里面的内容自动加content-type
app.get('/about',function (req,res) {
    //在express中可以直接通过req.query来获取查询字符串参数
    console.log(req.query)
    res.send("about关于")
})

app.get('/pinglun',function(req,res){
    //req.query
    //在express中使用模板殷勤有更好的方式：res.render('文件名',{模板对象})
    //可以自己尝试去看art-template官方文档，如何让art-template结合express来使用
})

//相当于server.listen
app.listen(3000,function(){
    console.log('app is running at port 3000')
})