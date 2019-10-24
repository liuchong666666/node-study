var foo = 'bbb';// 这个没被a.js调用

// console.log(exports);

exports.foo = 'hello';

exports.add = function (x, y) {
    return x + y;
};

exports.readFile = function (path,callback) {
    console.log('文件路径：'+path);
}


var age1 = 18;
exports.age2 = 18;
function add(x,y) {//这个没被a.js调用
    return x*y
}