//用来获取机器信息的
var os =require('os');
//用来获取操作路径的
var path = require('path');


//获取当前机器的cpu信息
console.log(os.cpus());
//获取内存大小
console.log(os.totalmem());

//extname  扩展名
console.log(path.extname('F:/web/PhpstormProjects/19.8.1node.js/day01/code/data/hello'));