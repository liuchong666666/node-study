//require方法有两个作用
//      1.加载文件模块并执行里面的代码
//      2.拿到被夹在文件模块导出的接口对象

//每个文件模块都提供了一个对象：exports
//exports 默认是一个空对象( {} )
//把所有需要被外部访问的成员变量挂载到这个exports对象中
var bExports = require('./b');
var fs = require('fs');

console.log(bExports);

console.log(bExports.foo);

console.log(bExports.add(10, 20));

console.log(bExports.age1);//undefined,因为在b.js中没挂载
console.log(bExports.age2);//18

bExports.readFile('./a.js');
fs.readFile('./a.js',function (err,data) {
    if(err){
        console.log('读取失败')
    }else{
        console.log(data.toString())
    }
})