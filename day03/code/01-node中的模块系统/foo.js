var foo = 'bar'

function add(x,y){
    return x+y
}


// exports=add//这个方式不行
//你可以认为在每个模块的最好return了这个exports
//main.js里面得到的是 {} 空对象， 说明这样不行


//如果一个模块需要直接导出某个成员，而非挂载的方式
//那这个时候必须使用下面这种方式
module.exports=add //如果两个module.exports后面会覆盖前面

//导出多个
// module.exports={
//     add:function(){console.log(123);return '123'},
//     str:'hello'
// }




//只能得到我想要给你的成员
//这样做的目的是为了解决变量命名冲突的问题
// exports.a=add  //a的名字随便取

//exports是一个对象
//我们可以通过多次为这个对象添加成员实现对外导出多个内部成员

exports.str = 'hello';


//node main.js 执行结果：
//{ a: [Function: add], str: 'hello' }



//现在我有一个需求
//我希望加载得到直接就是一个：
//方法
//字符串
//数字
//数组