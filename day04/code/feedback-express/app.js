var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//express.static('public/')  //./public是文件路径 可以省略./  但是加上比较直观
app.use('/public/',express.static('./public/'))





//express-art-template

//配置使用art-template模板引擎
//第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用art-template 模板殷勤
//express-art-template 是专门用来在express 中把 art-template 整合到express中
//虽然外面这里不需要加载art-template但是也必须安装
//原因就在于 express-art-template 依赖了art-template
app.engine('html', require('express-art-template'));

//express 为 response相应对象提供了一个方法render()
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名'，{模板数据})
//第一个参数不能写路径，默认会去项目中的  views  目录查找该模板文件
//也就是说  express  有一个约定：开发人员把所有的视图文件都放到  views  目录中
//第二个参数可选


//  app.engine('art', require('express-art-template'));
//  app.get('/',function(req,res){
//       res.render('404.art')//推荐以art结尾 让别人知道这个需要倍模板引擎渲染//第二个参数可选
//  })


//如果想要修改默认的views目录，则可以
//app.set('views',render函数的默认路径) //****第一个参数特殊名称必须写成 views *****，第二个目录路径



//配置body-parser 中间件（插件，专门用来解析表单POST请求体）

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]


app.get('/',function(req,res){
    res.render('index.html',{
        comments:comments
    })
})


app.get('/admin',function(req,res){
    res.render('admin/index.html',{
        title:'管理系统'
    })//默认views目录下
})


app.get('/post',function(req,res){
    res.render('post.html')
})

// app.get('/pinglun',function(req,res){
//     // console.log(req.query)
//     var comment = req.query
//     comment.dateTime = '2019-10-5 17:53:53'
//     comments.unshift(comment)
//
//     // res.statusCode = 302
//     // res.setHeader('Location','/')
//
//     res.redirect('/') //express封装的重定向
// })

//在地址栏上输入http://localhost:3000/post  这是get请求
//*********在浏览器地址栏上输入的地址 都是 get请求、 而post请求只能在表单和ajax中************

//表单post请求
//当以post请求 /post 路径的时候，执行指定的处理函数
//同一个路径可以用多次  ， 因为请求方法不同
//这样就可以利用不同的请求方法让一个路径使用多次，就不要起更多的路径名
app.post('/post',function(req,res){
    // console.log('收到post请求')
    //  1.获取post请求数据
    //  2.处理
    //  3.发送响应

    //******  req.query 只能拿 get 请求参数  ******
    // console.log(req.query) //{}


    //post
    // console.log(req.body)//通过body-parser 中间件

    var comment = req.body
    comment.dateTime = '2017-11-2 17:11:22'
    comments.unshift(comment)

    //res.send
    //res.redirect
    //这些方法 express会自动结束响应
    res.redirect('/')


})



app.listen(3000,function(){
    console.log('running')
})