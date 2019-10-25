//在node中，每个模块内部都有一个自己的module对象
//该module对象中，有一个成员叫：exports  也是一个对象
//也就是说如果你需要对象导出成员，只需要把导出的成员挂载到module.exports中

//我们发现，每次导出接口成员的时候都通过module.epxorts.xxx=xxx的方式很麻烦
//所有node为了简化你的操作，专门提供了一个变量：exports等于module.exports
//所以等同于epxorts.xxx=xxx

// var module = {
//     exports:{
//          foo:"bar",
//          add:function(x,y){return x + y}
//     }
// }

//var exports = module.exports

/*
// module.exports.foo='bar'
// module.exports.add=function(x,y){return x + y}

// exports.foo='bar'
// exports.add=function(x,y){return x + y}

// exports.foo='bar'
// module.exports.add=function(x,y){return x + y}

//以上三个都一样

console.log(exports === module.exports)//true
//两者一致，那就说明，我们可以使用任意一方来导出接口成员

*/


/*
//当一个模块需要导出单个成员的时候
//直接给exports赋值是不管用的

// exports.a=123//重新赋值之前这里还是执行了的，所以这里有用
//
// exports = {}
// exports.foo = 'hello'
//
// module.exports.b=456
//以上四句，最终导出结果{a:123,b:456}
//给exports赋值会断开和module.exports之间的引用
//同理 module。exports重新赋值也会断开
*/


/*
//给exports赋值会断开和module.exports之间的引用
//给module.exports赋值会断开和exports之间的引用
//因为原来两者是一样的 指向对象中的同一个地址
//exports/module.exports重新赋值后，会指向新地址，两者指向的地址就不一样了
// module.exports.b=456
// exports.aa='hello'

*/



/*
//这里导致exports ！== module.exports
//******只要其中之一被重新赋值，最后都看module.exports*****
//***********最终return的是module.exports，所以无论你exports中的成员是什么都没有**********
module.exports={ //这是module.exports重新赋值     exports={} 这是exports重新赋值   而exports.a='12'不算 exports重新赋值
    foo1:'bar'
}

exports.foo2='hello'

//但是这里又重新建立两者的引用关系
exports=module.exports

*/

//谁来require我 ，谁就得到module.exports
//默认在代码的最后有一句:
//一定要记住，最后 return的是module.exports
//所以你给exorts重新赋值不管用，
//return module.exports





//{a:12}
exports.a=12

//{a:12,foo:'haha'}
module.exports.foo = 'hha'

//这里导致exports ！== module.exports
//最终return的是module。exports
//所以无论你exports中的成员是什么都没用
//{a:12,foo:'haha'}
exports={
    a:23
}

//{a:45,foo:'haha'}
module.exports.a=45

//没关系，混淆的
//{a:45,foo:'haha'}
exports.c=456

//但是这里又重新建立两者的引用关系
exports = module.exports


//由于在上面重新建立了引用关系，所以这里是生效的
//{a:666,foo:'haha'}
exports.a=666


//前面再牛逼，在这里全部推翻，重新赋值
//最终得到的是function
//[Function]
module.exports=function(){
    console.log('hello')
}




//真正去使用的时候：
//  导出多个成员：exports.xxx=xxx
//  导出多个成员也可以：module.exports={}
//  导出单个成员：module.exports ,导出单个必须这样  module.exports =“hello”
//  导出单个成员不要使用 exports=xxx 不管用，因为每个模块最终向外return的是module.exports
// 而exports只是module.exports的一个引用



//如果是在分不清楚exports和module.exports
//可以只使用module.exports也没问题
