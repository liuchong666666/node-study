var http = require('http');

//1.创建Server
var server = http.createServer();


//2.监听request 请求事件 ，设置处理函数
server.on('request', function (req, res) {

    console.log('收到请求了，请求路径为：'+req.url);
    console.log('请求我的客户端的端口号是：',req.socket.remotePort);
    console.log('请求我的客户端的ip地址是：',req.socket.remoteAddress);

    // response.write('hello');
    // response.write('node');
    // response.end();


    //上面的方式比较麻烦，推荐使用更简单的方式，直接end的同时发送响应数据
    // res.end('hello world')

    //根据不同请求路径发送不同响应结果
    //1.获取请求路径
    //      req.url获取到的是端口号之后的那一部分路径
    //      也就是说所有url都是以’/‘开头的
    //2.判断路径处理响应

    var url = req.url;
    // res.end(url);


    if (url === '/') {
        res.end('index page')
    } else if (url === '/login') {
        res.end('login page')
    } else if (url === '/products') {
        var products = [
            {
                name: 'apple',
                price: 8888,
            },
            {
                name: '华为',
                price: 8888,
            },
            {
                name: '小米',
                price: 8888,
            },
        ];
        // 响应内容只能是二进制数据或字符串
        //  数字，对象，数组，布尔值都不行
        // res.end(123);//错误
        res.end(JSON.stringify(products));//JSON.stringify可以将数组( [] )转为字符串数组（ "[]" ）
    }
    else {
        res.end('404 Not Found')
    }


});


//3.绑定端口号，启动服务
server.listen(3000, function () {//要确定80端口没被占用
    console.log('服务器启动成功');
});