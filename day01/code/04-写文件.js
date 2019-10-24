var fs = require('fs');

//第一个参数：文件路径
//第二个参数：文件内容
//第三个参数：回调函数
//      error:形参,随便写

//      成功：
//          文件写入成功，error就是null
//      失败:
//          文件写入失败，error就是错误对象

fs.writeFile('./data/你好.md', '啊实打实大家好，啊实打实的我是nodejs', function (error) {

    if (error) {
        console.log('写入失败');
    } else {
        console.log('文件写入成功')
    }

    console.log(error);//null

});