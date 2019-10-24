//默认得到的是对象
//使用对象成员必须通过点某个成员来使用
//有时候，对于一个模块仅仅希望导出方法或者其他的
var fooExports = require('./foo')
// console.log(foo)//ReferenceError
console.log(fooExports)