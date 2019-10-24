var url =require('url')
// var obj = url.parse('http://127.0.0.1:3000/pinglun?name=123&message=%E8%AF%B7%E9%97%AE%E8%AF%B7%E9%97%AE%E8%AF%B7%E9%97%AE%E8%AF%B7%E9%97%AE')
//var obj = url.parse('http://www.baidu.com?name=123&l=123')
//这个得到的只是字符串

var obj = url.parse('http://127.0.0.1:3000/pinglun?name=123&message=%E8%AF%B7%E9%97%AE%E8%AF%B7%E9%97%AE%E8%AF%B7%E9%97%AE%E8%AF%B7%E9%97%AE',true)
//这个得到的就是对象
console.log(obj)
console.log(obj.query)
console.log(obj.query.name)