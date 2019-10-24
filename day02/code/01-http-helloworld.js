var http = require('http')
var fs = require('fs')
//1.创建server
var server = http.createServer()

//2.监听server的request请求事件，设置请求函数
//  请求
//      处理
//  响应
//  一个请求对应一个响应，如果在一个请求过程中，已经结束响应了，则不能重复响应
//  没有请求就没有响应
//
// 咱们以前使用过 Apache 服务器软件，这个软件默认有一个 www 目录，所有存放在 www 目录中的资源都可以通过网址来浏览
// 127.0.0.1:80/a.txt
// 127.0.0.1:80/index.html
// 127.0.0.1:80/apple/login.html

var wwwDir ='F:/www'

server.on('request', function (req, res) {
    var url = req.url

    //  /   index.html
    //  /a.txt                  wwwDir + a.txt
    //  /apple/login.html       wwwDir + apple/login.html
    //  /img/ab.jpg             wwwDir + apple/login.html

    if (url === '/') {
        fs.readFile('F:/www/index.html', function (err, data) {//也可以F:\\www\\index.html 这种要用一个斜杠转义
            // if (err) {
            //     res.end('404 Not Found')
            // } else {
            //
            // }

            if (err) {
                //return有两个作用
                //  1.方法返回值
                //  2.阻止代码继续往后执行
                return res.end('404 Not Found')

            }
            res.end(data)

        })
    }
    else if (url === '/a.txt') {
        // fs.readFile('F:/www/a.txt', function (err, data) {
        fs.readFile(wwwDir+'/a.txt', function (err, data) {
            if (err) {
                return res.end('404 Not Found')
            }
            res.end(data)
        })
    } else if (url === '/index.html') {
        fs.readFile(wwwDir+'/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found')
            }
            res.end(data)
        })
    } else if (url === '/apple/login.html') {
        fs.readFile(wwwDir+'/apple/login.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found')
            }
            res.end(data)
        })
    }
})


//3.绑定端口号，启动服务
server.listen(3000, function () {
    console.log('running....')
})