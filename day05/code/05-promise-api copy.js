var fs = require('fs');

var p1 = new Promise(function(resolve, reject) {
  fs.readFile('./data/a.txt', 'utf8', function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

var p3 = new Promise(function(resolve, reject) {
  fs.readFile('./data/c.txt', 'utf8', function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

var p2 = new Promise(function(resolve, reject) {
  fs.readFile('./data/b.txt', 'utf8', function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

p1.then(
  function(data) {
    console.log(data);
    //当p1读取成功的时候
    // return 'hello'; //没有返回值的话下面就是undefined
    //当前函数中的 return 的 结果就可以在后面的then中function接收到
    //当你  return 123 后面就接收到 123
    //      return 'hello' 后面就接收到 'hello'
    //      没有 return 的话后面就接收到undefined
    //  上面那些 return 的数据没什么卵用
    //  真正有用的是：我们可以 return 一个 promise 对象
    //  当 return 一个 promise 对象的时候，后续的 then 中的 方法的第一个参数会作为 p2 的resolve
    //
    return p2; //p2 是一个 promise对象
  },
  function(err) {
    console.log('读取文件失败了', err);
  }
)
  .then(function(data) {
    console.log(data);
    return p3;
  })
  .then(function(data) {
    console.log(data);
    console.log('end');
  });
