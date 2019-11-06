//在node中没有全局作用域，它是模块文件作用域
//模块是独立的，不能因为加载过fs了 b就不需要了，这是错误的理解
//正确的是a，b都需要加载fs
//不存在重复加载性能问题，因为模块会缓存
var fs = require('fs')

console.log(fs.readFile)

require('./foo')