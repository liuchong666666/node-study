//art-template
//art-template不仅可以在浏览器使用，也可以在node中使用

//安装：在你想安装的文件夹下打开命令行：npm install art-template --save
// 该命令在哪执行就会把包下载到哪里， 默认会下载到node_modules目录中
//  node_modules不要改，也不支持改

//在node中使用 art-template模板引擎
//模板引擎最早诞生于服务器领域，后来发展到前端

//1.安装 npm install art-template --save
//2.在需要的使用的文件模块中加载art-template
//      只需要require方式加载就可以了require('art-template')
//      参数中的 art-template 就是你下载包的名字
//      也就是说你install名字是什么，则你require中的就是什么
//3.查文档，使用模板引擎的api

var template = require('art-template')
var fs = require('fs')

//这里不是浏览器，不能这么用
// template('script 标签 id',{对象})


// var  tplStr=`
//     <!doctype html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport"
//           content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Document</title>
// </head>
// <body>
// <p>大家好我叫 {{ name }}</p>
// <p>今年{{ age }}</p>
// <p>来自{{ province }}</p>
// <p>我喜欢：{{each hobbies}}{{ $value }}{{/each}}</p>
// </body>
// </html>
// `

//服务器端使用方法：
// template.render('模板字符串',替换对象)
// var ret = template.render('hello{{name}}',{name:'jack'})
fs.readFile('./tpl.html', function (err, data) {
    if (err) {
        return console.log('读取文件失败')
    }
    //默认读取到的data是二进制数据
    //而模板引擎的render方法需要接受的是字符串
    //所以我们需要把data二进制数据转为 字符串  才能给模板引擎使用
    var ret = template.render(data.toString(), {
        name: 'jack',
        age: 18,
        province: 'beijing',
        hobbies: [
            '写代码',
            '打游戏',
            '听音乐'
        ],
        title:'个人信息'
    })
    console.log(ret)
})


