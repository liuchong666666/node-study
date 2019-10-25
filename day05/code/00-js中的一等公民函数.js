//一种数据类型
//参数
//返回值
//函数太灵活了，无所不能
//一般情况下，把函数作为参数的目的就是为了获取函数内部的异步操作结果
//js机制  单线程 事件循环


// console.log(1)
// setTimeout(function(){
//     console.log(2)
// },0)
// console.log(3)

//先执行同步 再执行异步   1  3  2

/*
function add(x, y) {
    var ret
    console.log(1)
    setTimeout(function () {
        console.log(2)
        ret = x + y
        // return ret
    }, 0)
    console.log(3)
    return ret
    //到这里执行就结束了，不会等到前面定时器，所以直接就返回了函数默认值undefined
}

// add(10,20) // 1 3 2
console.log('----------------------')
console.log(add(10, 20))  // 1 3 undefined  2
*/
//============================================


/*
var ret

function add(x, y) {
    console.log(1)
    setTimeout(function () {
        console.log(2)
        ret = x + y
    }, 1000)
    console.log(3)
}

add(10, 20)

setTimeout(function () {
    console.log(ret)
}, 1000)

//这样可以获得一秒后的ret，   定义全局ret   上面一秒后ret赋值   下面定时器一秒是add()之后去获得，可以得到
*/



//注意：凡是需要得到一个函数内部异步操作的结果
//      异步：     setTimeout
//                 readFile
//                 writeFile
//                  ajax
//                  readdir等等
//      往往异步 API 都伴随一个回调函数
//      这种情况必须通过：回调函数




function add(x, y, callback) {
    //callback就是回调函数
    //var x = 10
    //var y = 20
    //var callback = function(ret){console.log(ret)}
    console.log(1)
    setTimeout(function () {
        console.log(2)
        var ret = x + y
        callback(ret)
        // //通过这个拿到这个结果可以做任何操作
    }, 1000)
    console.log(3)
}

add(10, 20, function (ret) {
    //我现在拿到这个结果可以做任何操作
    console.log(ret)
    //1秒之后调callback，才得到10+20的结果
    // 1 3  2  30
})



