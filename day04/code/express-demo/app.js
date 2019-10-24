var express = require('express')

//1.创建app
var app = express()

//方法一、当以 /public/ 开头的时候，去 ./public/ 目录中查找对应的资源
//      网址输入http://localhost:3000/public/login.html
// app.use('/public/',express.static('./public/'))


//方法二、当省略第一个参数的时候，则可以通过省略 /public的方式来访问
//网址输入http://localhost:3000/login.html
//        http://localhost:3000/js/a.js
//        好处：少写/public
//         最好用第一个，直观一些
// app.use(express.static('./public/'))

//方法三、必须是/a/public目录中的资源具体路径
//      http://localhost:3000/a/login.html
//      http://localhost:3000/a/js/a.js
//    相当于a是public的别名
//      最好用第一个，直观一些
app.use('/a/',express.static('./public/'))


app.get('/', function (req, res) {
    // res.write('hello')
    // res.write('world')
    //res.end()

    // res.end('hello world')

    //推荐不要使用上面的，尽量使用express框架的

    res.send('hello world')
})


//路由其实就是一张表
//这个表里面有具体的映射关系
//当请求/login 就执行后面的回调函数
// app
//     .get('/login',函数)
//     .post('/laasd',函数)
//     .get('/asd',函数)



app.get('/login', function (req, res) {
    // res.send('login page')

    res.send(`<h1>hello</h1>`)

})


app.listen(3000, function () {
    console.log('express app is running')
})