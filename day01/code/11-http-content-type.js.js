//require
//端口号


var http = require('http');

var server = http.createServer();

server.on('request', function (req, res) {
    //在服务器默认发送的数据，其实是 utf8 编码内容
    //但是浏览器不知道你是 utf8 编码的内容
    //浏览器在不知道服务器响应内容的编码情况下会按照当前操作系统的默认编码去解析
    //中文操作系统默认是 gbk

    //解决方法：正确告诉浏览器我给你发的内容是什么编码的
    //在http协议中，Content-Type就是用来告知对方我给你发送的数据内容是什么类型
    // res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    // res.end('hello world世界')

    var url = req.url;
    if (url === '/plain') {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('hello world世界')
    } else if (url === '/html') {
        //html格式字符串  Content-Type为text/html
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end('<h1>hello html</h1><a href="#">点我</a>')
    }

});

server.listen(3000, function () {
    console.log('server is running...')
});