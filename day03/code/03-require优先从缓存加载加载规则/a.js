console.log('a.js被加载')

//优先从缓存加载
//由于在a.js中已经加载过了
//所以这里不会重复加载
//可以拿到其中的接口对象
//这样为了避免重复加载，提高模块加载效率
var fn = require('./b')

console.log(fn)