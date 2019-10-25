//浏览器中的js是没有文件操作的能力的
//但是node中的js具有文件操作的能力

// fs 是 file-system的简写，就是文件系统的意思
// 在node中如果想要进行文件操作，就必须引入fs这个核心模块
// 在fs 这个核心模块中，就提供了所有文件操作相关的 API
// 例如：fs.readFile 就是用来读取文件的

//1.使用 require 方法加载 fs 核心模块
var fs =require('fs');

//2.读取文件
//      第一个参数就是要读取的文件路径
//      第二个参数：回调函数
//      error：
//          如果读取失败，error 错误对象
//          如果读取成功，error 就是null
//      data：
//          如果读取失败，error 就是错误对象
//          如果读取成功，data  就是错误对象

//      简述：
//          成功：data是数据                  error是null
//          失败：data是undefined 没有数据    error是错误对象

fs.readFile('./data/hello',function (error,data) {
    //<Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73>
    //文件中存储的其实都是二进制数据0 1
    //这里为什么看到的不是0和1？ 因为二进制转为15进制了
    //但是无论是二进制还是16进制。人类都不认识
    //所以我们可以通过 toString 方法转为我们认识的字符
    // console.log(data);
    // console.log(data.toString());

    // console.log(error);

    if(error){
        console.log('读取文件失败')
    }else{
        console.log(data.toString());
    }

});
