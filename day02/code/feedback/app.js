//app application 应用程序
//把当前模块所有的依赖项都声明在文件模块最上面
// 为了让目录结构保持统一清晰，所以我们约定，把所有的html文件放views里面
//我们为了方便的同意处理这些静态资源，所以我们约定把所有静态资源都存放在public目录中
//哪些资源能被用户访问，哪些资源不能被用户访问，我们现在可以通过代码来进行非常灵活的控制
//  / index.html
// /public 整个目录中的资源都允许被访问


var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')


var comments = [
    {
        name: 'xx二',
        message: '********天气不错',
        dateTime: '2019-9-21'
    },
    {
        name: 'xx二2',
        message: '********天气不错',
        dateTime: '2019-9-21'
    },
    {
        name: 'xx二3',
        message: '********天气不错',
        dateTime: '2019-9-21'
    },
    {
        name: 'xx二4',
        message: '********天气不错',
        dateTime: '2019-9-21'
    },
    {
        name: 'xx二5',
        message: '********天气不错',
        dateTime: '2019-9-21'
    },
]

// /pinglun?name=12123&message=asdasd
//对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
//所有你不可能通过去判断完整的url路径来处理这个请求
//
// 结论：对于我们来讲，其实只需要判定，如果你的请求路径是  /pinglun 的时候，那我就认为你提交表单的请求过来了

//1.创建
http.createServer(function (req, res) {//这样就不用server.on（）了
    //使用url.parse方法将路径解析为一个方便操作的对象，第二个参数为true表示直接将查询字符串转为一个对象，通过query属性来访问
    var parseObj = url.parse(req.url,true)//req.url浏览器上的地址   //  url.parse   url模块
    //单独获取不包含查询字符串的路径部分（该路径不包含？之后的部分）
    var pathname = parseObj.pathname
    //2.监听
    if (pathname === '/') {
        fs.readFile('./Views/index.html', function (err, data) {
            if (err) {
                return res.end('404 not found.')
            }
            //data默认是二进制文件，如果需要操作，就需要转为字符串
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
            // res.end(data)//data默认是二进制文件，如果需要操作，就需要转为字符串，不需要就不用转，这里就没转
        })
    } else if (pathname === '/post') {
        fs.readFile('./Views/post.html', function (err, data) {
            if (err) {
                return res.end('404 Not found')
            }
            res.end(data)
        })
    } else if (pathname.indexOf('/public/') === 0) {
        // /public/css/main.css
        // /public/js/main.js
        // /public/lib/jquery.js
        //统一处理：
        //      如果请求路径是以/public开头的，则我认为你要获取public中的某个资源
        //      所以我们就直接可以把请求路径当作文件路径来直接进行读取
        // console.log(url)
        fs.readFile('.' + pathname, function (err, data) {//必须加.    ./public/css/main.css
            if (err) {
                return res.end('404 not found.')
            }
            res.end(data)
        })
    } else if (pathname === '/pinglun') {
        //判定url不得行，因为url包含?之后的部分，而且这是动态的
        //注意：这个时候无论 /pinglun?xxx是什么，我都不担心了，因为pathname不包含？之后的部分
        // console.log('收到表单请求了',parseObj.query)
        //一个请求对于一次响应，响应结束这次请求也就结束了
        // res.end(JSON.stringify(parseObj.query))

        //1.我们已经使用url模块的parse方法把请求路径中的查询字符串给解析成一个对象了
        //所以接下来要做的就是：
        //  1.获取表单提交的数据 parseObj.query
        //  2.生成当前时间日期添加到数据对象中，然后存储到数组中
        //  3.让用户重定位跳转到首页 /
        //      当用户重新请求 / 的时候，数组中的数据已经发生变化了，所以用户看到的首页也变了
        var comment = parseObj.query
        comment.dateTime = '2019-121212'
        // comments.push(comment)
        comments.unshift(comment)
        //服务端这个时候已经把数据存储好了，接下来，让用户重新请求 / 首页

        // 如何通过服务器让客户端重定向？
        //      1.状态码设置为302临时重定向  (查nodejs.org文档)
        //          statusCode
        //      2.在响应头中 通过Location 告诉客户端往哪儿重定向
        //          setHeader
        // 如果客户端发现收到服务器的响应码是 302 就会自动去响应头中找 Location，然后对该地址发起新请求
        // 所以你就能看到客户端自动跳转了
        res.statusCode = 302
        // res.setHeader('Location','https://www.baidu.com')
        // res.setHeader('Location','http://127.0.0.1:3000')//这也可以跳到首页
        res.setHeader('Location','/')
        res.end()//结束响应
    } else {
        //其他路径
        fs.readFile('./Views/404.html', function (err, data) {
            if (err) {
                return res.end('404 Not found')
            }
            res.end(data)
        })
    }

}).listen(3000, function () {
    //3.绑定端口号，启动服务

    console.log('running...')
})