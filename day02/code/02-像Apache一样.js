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

var wwwDir = 'F:/www'

server.on('request', function (req, res) {
    var url = req.url

    //  /   index.html
    //  /a.txt                  wwwDir + a.txt
    //  /apple/login.html       wwwDir + apple/login.html
    //  /img/ab.jpg             wwwDir + apple/login.html

    var filePath = '/index.html'
    if (url !== '/') {
        filePath = url
    }

    console.log(filePath,wwwDir+filePath)

    fs.readFile(wwwDir+filePath,function (err,data) {
        if(err){
            return res.end('404')
        }
        res.end(data)
    })

})


//3.绑定端口号，启动服务
server.listen(3000, function () {
    console.log('running....')
})