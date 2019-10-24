//1.结合fs发送文件中的数据
//2.Content-Type
//  http://tool.oschina.net/commons
//      不同资源对应的Content-Type是不一样的
//      图片不需要指定编码
//      一般只为字符数据才指定编码


var http = require('http');
var fs = require('fs');

//1.创建Server
var server = http.createServer();

//2.监听request 请求事件 ，设置处理函数
server.on('request', function (req, res) {
    //index.html
    var url = req.url;

    if (url === '/') {
        //肯定不这个干
        //res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body><h1>首页</h1></body></html>')

        //我们要发送的还是文件内容
        fs.readFile('./resource/index.html', function (err, data) {//当html内容改变时，不需要重启服务器。因为客户端发请求后再触发这个事件，服务器再去找路径资源
            //node动态读取文件，所以不需要重启
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8')
                res.end('文件读取失败，请稍后重试!')
            } else {
                //data 默认是二进制，通过toString转为我们能是别的字符串
                //res.end支持两种数据类型，一种是二进制，一种是字符串
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(data)
            }
        })
    } else if (url === '/jpg') {
        // url:统一资源定位符
        //一个url最终其实是要对应到一个资源的
        fs.readFile('./resource/ab.jpg', function (err, data) {//当html内容改变时，不需要重启服务器。因为客户端发请求后再触发这个事件，服务器再去找路径资源
            //node动态读取文件，所以不需要重启
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                res.end('文件读取失败，请稍后重试!')
            } else {
                //data 默认是二进制，通过toString转为我们能是别的字符串
                //res.end支持两种数据类型，一种是二进制，一种是字符串
                //图片不需要指定编码，因为我们常说的编码一般指的是：字符编码
                res.setHeader('Content-Type', 'image/jpeg;charset=utf-8');
                res.end(data)
            }
        })
    }
});

//3.绑定端口号，启动服务
server.listen(3000, function () {//要确定80端口没被占用
    console.log('服务器启动成功');
});