var http = require('http');


var server = http.createServer();

//request 请求事件处理函数，需要接收两个参数：
//      Request 请求对象：请求对象可以用来获取客户端的一些请求信息，例如请求路径
//      Response 响应对象：响应对象可以用来给客户端发送响应消息
server.on('request', function (request, response) {
    //http://127.0.0.1:3000/        /
    //http://127.0.0.1:3000/a       /a
    //http://127.0.0.1:3000/foo/b     /foo/b
    console.log('收到客户端请求了，请求路径是；' + request.url);

    //response 对象有一个方法：write 可以用来客户端发送响应数据
    //write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一致等待

    // response.write('hello');

    //告诉客户端，我的话说完了，你可以呈递给客户了
    // response.end();


    //由于现在我们的服务器的能力还非常的弱，无论什么请求，都只能响应hello
    //思考：
    //  我希望当请求 不同的路径时候响应不同的结果
    //  例如：
    //      /  index
    //      /login 登陆
    //      /register 注册
    //      /haha 哈哈

    if (request.url == '/') {
        response.write('index');
        response.end();
    }
    if (request.url == '/login') {
        response.write('hello');
        response.write('登录');
        response.end();
    }
    if (request.url == '/register') {
        response.write('hello');
        response.write('注册');
        response.end();
    }
    if (request.url == '/haha') {
        response.write('哈哈');
        response.end();
    }


});


server.listen(3000, function () {
    console.log('服务器启动成功了，可以使用http://127.0.0.1:3000/ 来进行访问')
});