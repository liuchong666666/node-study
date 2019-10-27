var fs = require('fs')
var path = require('path')


//模块中的路径标识和文件操作中的相对路径标识不一致
//模块中的路径标识就是相对于当前文件模块,不受执行node命令所处路径影响

require('./b') //在模块标识当中,路径形式的模块标志 相对路径./不能省


// ./a.txt 相对于当前文件路径 这是错误的理解,其实是
// ./a.txt相对于执行 node 命令所处的终端路径
//  >f:\web\PhpstormProjects\19.8.1node.js\node-study\day06\code  node foo\index.js
//  这不是错误.node就是这样设计的
//  就是说,文件操作路径中,相对路径设计的就是相对于node命令行所处的路径
//  node foo/index.js 文件操作的./a.txt会报错找不到, 因为相当于node命令所处的路径


// fs.readFile('f:/web/PhpstormProjects/19.8.1node.js/node-study/day06/code/foo/a.txt', 'utf8', function (err, data) {
//   if (err) {
//     throw err
//   }
//   console.log(data)
// })

// console.log(__dirname + '/a.txt')//文件路径操作时,会把/转为\\

//f:\web\PhpstormProjects\19.8.1node.js\node-study\day06\code
//  ./a.txt多了少了无所谓,path.join会帮你处理
fs.readFile(path.join(__dirname, './a.txt'), 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
})