var fs =require('fs')


//咱们所使用的所有文件操作的api都是异步的
//就像你的ajax请求一样

//文件操作中的路径可以省略 ./
fs.readFile('data/a.txt',function(err,data){
    if(err){
    return console.log('读取失败')
    }
    console.log(data.toString())
})



//****在模块加载中，相对路径中的./不能省略****
//require('data/foo')//Cannot find module 'data/foo'

require('./data/foo')('hello2')//加载完直接调用
//咱们所使用的所有文件操作的api都是异步的
//就像你的ajax请求一样
//所以hello2先执行



//****在文件操作的相对路径中****
//      ./data/a.txt    相对于当前目录
//      data/a.txt      相对于当前目录
//      /data/a.txt     绝对路径  当前文件模块所处磁盘根目录
//      c:/xx/xx...     绝对路径

fs.readFile('/data/a.txt',function(err,data){
    // `/xxxx` / 在这里表示的是磁盘根路径     如果你的文件在C盘 这个/就代表C盘
    if(err){
        console.log(err)//F:\\data\\a.txt
        return console.log('读取失败')  //读取失败
    }
    console.log(data.toString())
})


//注意这里如果忽略了. ， 则也是磁盘根目录
require('/data/foo.js')//Cannot find module '/data/foo.js'
                //如果F盘下有个foo.js 就不报错


