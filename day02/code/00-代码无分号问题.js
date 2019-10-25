function say() {
    console.log('hello word')
}

//say()后不加分号造成得问题：TypeError: say(...) is not a function

say()
console.log(123)


//只要以这三种开头（  ( [ `  ） ， 就可以在这符号前面加分号， 不一定要在上面的代码加，因为你不知道上面还有没有，所以直接在符号前面加最保险

// ;(function () {
//     console.log('hello')
// })()


// ;[1,2,3].forEach(function (item) {
//     console.log(item)
// })


// ` 是 EcmaScript 6 中新增的一种字符串包裹方式，叫做：模板字符串
// 它支持换行和非常方便拼接变量,支持换行，普通字符串不支持换行
// var foo = `bar
// 123       789
// 456
// `
// console.log(foo)

//字符串有toString方法
// 'hello'.toString();

;`hello`.toString();



//当你采用了无分号的代码风格的时候，只需要注意一下情况就不会有上述问题：
//  当一行代码是以：
//  (
//  [
//  `
//  开头的时候，则在前面补上一个分号用以避免一些语法解析错误
//   所以在一些第三方代码中能看到一上来就以一个;开头
//  结论：
//    无论你的代码是否有分号，都建议如果一行代码是以 (、[、` 开头的，则最好都在其前面补上一个分号。
//    有些人也喜欢玩儿一些花哨的东西，例如可以使用 ! ~ 等。
