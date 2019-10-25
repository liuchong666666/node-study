//app application应用程序

var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')
var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]

// /pinglun?name=的撒的撒&message=的撒的撒的撒
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
// 所以你不可能通过去判断完整的 url 路径来处理这个请求
//
// 结论：对于我们来讲，其实只需要判定，如果你的请求路径是 /pinglun 的时候，那我就认为你提交表单的请求过来了


http.createServer(function (req, res) {
   // console.log(req.url)///pinglun?name=123123&message=123123123

    var parseObj = url.parse(req.url, true)
    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = parseObj.pathname//这个不是url模块

    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                return res.end('404 not found')
            }
            //这里的data是二进制，当需要操作的时候用toString转为字符串
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
        })
    } else if (pathname.indexOf('/public/') === 0) {
        //动态地址  不能用 === 来判断  因为后面还有些参数 不可能固定
        // /public/css/main.css
        // /public/js/main.js
        //统一处理：
        //      如果请求路径是以/public/开头得，则我要认为你要获取public里面得资源
        //      所以我们就直接可以把请求路径当作文件路径来直接进行读取
        fs.readFile('.' + pathname, function (err, data) {
            //*******现在所有/public/里面得资源 都可以访问****
            //可以通过这个来控制哪些资源可以访问
            if (err) {
                return res.end('404  not found')
            }
            res.end(data)
        })
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return res.end('404  not found')
            }
            res.end(data)
        })
    }else if (pathname === '/pinglun') {
        // 注意：这个时候无论 /pinglun?xxx 之后是什么，我都不用担心了，因为我的 pathname 是不包含 ? 之后的那个路径
        // 一次请求对应一次响应，响应结束这次请求也就结束了
        // res.end(JSON.stringify(parseObj.query))

        // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
        // 所以接下来要做的就是：
        //    1. 获取表单提交的数据 parseObj.query
        //    2. 将当前时间日期添加到数据对象中，然后存储到数组中
        //    3. 让用户重定向跳转到首页 /
        //       当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
        var comment = parseObj.query
        comment.dateTime = '2017-11-2 17:11:22'
        comments.unshift(comment)
        // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了

        // 如何通过服务器让客户端重定向？
        //    1. 状态码设置为 302 临时重定向
        //        statusCode
        //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
        //        setHeader
        // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
        // 所以你就能看到客户端自动跳转了
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    }
    else {
        // return res.end('404  not found')
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                return res.end('404  not found')
            }
            res.end(data)//之所以会显示中文，因为这个404.html里面有  <meta charset="UTF-8">
        })
    }


    //createServer返回值就是server
}).listen(3000, function () {
    console.log('running....')
})