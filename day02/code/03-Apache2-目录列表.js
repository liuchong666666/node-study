var http = require('http')
var fs = require('fs')
//1.创建server
var server = http.createServer()


var wwwDir = 'F:/www'

server.on('request', function (req, res) {
    var url = req.url

    fs.readFile('./template.html', function (err, data) {
        if (err) {
            return res.end('404')
        }
        // 1.如何得到wwwDir目录列表中的文件名和目录名
        //      fs.readdir
        //2.如何将得到的文件名和目录名替换到template.html中
        //      2.1在template.html中需要替换的位置预留一个特殊标记(就像以前模板引擎的标一样)
        //      2.2根据files生成需要的html内容
        fs.readdir(wwwDir, function (err, files) {
            if (err) {
                return res.end('can not find www dir')
            }

            // 2.1生成需要替换的内容
            var content = ''
            files.forEach(function (item) {//files是一个数组[ 'a.txt', 'a.txt.bak', 'apple', 'index.html' ]
                //在Ecmascript6的 ` 字符串中，可以使用${}来引用变量
                content += `
                 <tr>
                    <td data-value="apple/"><a class="icon dir" href="/F:/www/apple/">${item}/</a></td>
                    <td class="detailsColumn" data-value="0"></td>
                    <td class="detailsColumn" data-value="1564754890">2019/8/2 下午10:08:10</td>
                 </tr>
            `
            })
            //2.3替换
            data = data.toString()
            //普通的字符串解析替换，浏览器看到的结构就不一样了
            // data.replace('^_^','apple')
            data = data.replace('^_^', content)
            //3.发送解析替换后的响应数据
            res.end(data)

        })

    })
})


//3.绑定端口号，启动服务
server.listen(3000, function () {
    console.log('running....')
})