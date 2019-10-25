//require是一个方法
//它的作用就是用来加载模块的


//在node中，模块有三种
//      具名的核心模块：例如fs http
//      用户自己编写的文件模块
//          可以省略后缀名
//          相对路径必须加 ./
//          相对路径中的 ./不能省略，否则报错

//  在node中，没有全局作用域，只有模块作用域,
//      外部访问不到内部，内部访问不到外部
//      超出这个文件的 都不管用
//      默认都是封闭的

// 既然是模块作用域，那如何让模块之间进行通信
//  有时加载模块是为了使用里面的成员


var foo = 'aaa';

console.log('a start');

function add(x, y) {
    return x + y
}

// require('./b.js');

require('./b');//推荐：可以省略后缀名（b.js中的.js）

console.log('a end');

console.log('foo:' + foo);
