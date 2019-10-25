var fs = require('fs');

//在 ecmascript6 中新增了一个 API Promise
//promise是构造函数

// console.log(1);

//创建Promise容器
//1.给别人一个承诺 i promise you、
//    Promise容器一旦创建，就开始执行里面的代码
//***********promise承诺本身不是异步的，只是一个容器，但内部往往是封装一个异步任务************   1 2 4 3
var p1 = new Promise(function(resolve, reject) {
  //resolve,reject 形参，随便写
  // console.log(2);
  fs.readFile('./data/aa.txt', 'utf8', function(err, data) {
    if (err) {
      //失败了，承诺容器中的任务失败了
      // console.log(err);

      //把容器的 Pending 状态变为 Rejected
      //调用 reject 就相当于调用了 then 方法的第二个参数函数function
      reject(err);
    } else {
      // console.log(3);
      //承诺容器中的任务成功了
      // console.log(data);

      //把容器的 Pending 状态改为成功 Resolved
      //也就是説这里调用的 resolve 方法实际上就是 then 方法的第一个function
      resolve(data);
      // resolve(123);//下面then中的方法就输出123
    }
  });
});
// console.log(4);

//p1就是那个承诺
//当 p1 成功了，然后（then）做指定的操作
//then方法接收的function就是容器中的 resolve 函数
//接受俩个参数 第一个参数作用于 resolve，第二个参数作用于 reject
p1.then(
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err);
  }
);
