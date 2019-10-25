var fs = require('fs')
/*
//异步的，读取顺序不一定，文件越大读取速度越慢，越靠后
fs.readFile('./data/a.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    //抛出异常
    //    1.阻止程序的执行,阻止继续往下执行
    //    2.把错误消息打印到控制台
    throw err
  }
  console.log(data)

})

fs.readFile('./data/b.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    //抛出异常
    //    1.阻止程序的执行,阻止继续往下执行
    //    2.把错误消息打印到控制台
    throw err
  }
  console.log(data)
})

fs.readFile('./data/c.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    //抛出异常
    //    1.阻止程序的执行,阻止继续往下执行
    //    2.把错误消息打印到控制台
    throw err
  }
  console.log(data)
})

//异步无法保证顺序的代码

*/

//通过回调嵌套的方式来保证顺序
//回调地狱
fs.readFile('./data/a.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
  fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    console.log(data)
    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      console.log(data)
    })
  })
})



