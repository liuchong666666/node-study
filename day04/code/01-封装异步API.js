// function fn() {
//     // setTimeout(function(){
//     //     var data='hello'
//     //     return data
//     // },1000)
//
//
//     // var data='默认'
//     // setTimeout(function(){
//     //     data='hello'
//     //     return data
//     // },1000)
//
// }
//
// //调用fn，得到内部的data
// // console.log(fn())





function fn(callback) {
    //var callback = function(data){ console.log(data)}
    setTimeout(function () {
        var data = 'hello'
        callback(data)
    }, 1000)
}

//如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
//回调函数：获取异步操作的结果

fn(function (data) {
    console.log(data)
})




$.get('asdas?foo=bar',function(data){

})
//下面这个把参数放对象里面了更方便，需要传查询字符串用ajax
$.ajax({
    url:'adas',
    type:'get',
    data:{
        foo:'bar'
    },
    //使用者只负责传递，封装者需要去调用
    success:function(){

    }
})

function ajax(options){
    options.success(data)
}