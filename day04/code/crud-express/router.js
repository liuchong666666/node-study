/**
 * router.js路由模块
 * 职责：
 *      处理路由
 *      根据不同的请求方法+请求路径设置具体的请求处理函数
 *模块职责单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码可维护性
 * 提升开发效率
 *
 * */


var fs = require('fs')//谁的依赖就在谁里面引进来
var Student = require('./student')


// 这样也不方便
//
// module.exports=function(app){
//
//     app.get('/students',function(req,res){
//         //readFile第二个参数是 可选的，传入 utf8 就是告诉它把读取到的文件按照 utf8 编码转成我们认识的字符
//         //除了这样来转换之外，也可以通过data.toString()的方式
//         fs.readFile('./db.json','utf8',function(err,data){// 读文件./可以省略
//             if(err){
//                 return res.status(500).send('server error')//status(500) 状态码500
//             }
//             // console.log(data)//json字符串
//             // console.log(JSON.parse(data))//json对象
//             // console.log(JSON.stringify(JSON.parse(data)))//json字符串
//
//             //文件中读到的数据一定是字符串，需要转为对象
//             var students = JSON.parse(data).students
//
//             res.render('index.html',{
//                 fruits:[
//                     'apple',
//                     'banana',
//                     'orange'
//                 ],
//                 //文件中读到的数据一定是字符串，需要转为对象
//                 // JSON.parse:  JSON转换为JS对象
//                 // JSON.stringify:  JS对象转换为JSON
//                 students:students
//             })
//         })
//     })
//     app.get('/students/new',function(req,res){
//
//     })
//     app.get('/students',function(req,res){
//
//     })
//     app.get('/students',function(req,res){
//
//     })
//     app.get('/students',function(req,res){
//
//     })
//     app.get('/students',function(req,res){
//
//     })
//
// }


//express提供了一种更好的方式
//专门用来包装路由的
var express = require('express')

//1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到router路由容器种


router.get('/', function (req, res) {
    res.send('index page')
})

//渲染首页
router.get('/students', function (req, res) {
    //readFile第二个参数是 可选的，传入 utf8 就是告诉它把读取到的文件按照 utf8 编码转成我们认识的字符
    //除了这样来转换之外，也可以通过data.toString()的方式

    // fs.readFile('./db.json', 'utf8', function (err, data) {// 读文件./可以省略
    //     if (err) {
    //         return res.status(500).send('server error')//status(500) 状态码500
    //     }
    //     // console.log(data)//json字符串
    //     // console.log(JSON.parse(data))//json对象
    //     // console.log(JSON.stringify(JSON.parse(data)))//json字符串
    //
    //     //文件中读到的数据一定是字符串，需要转为对象
    //     var students = JSON.parse(data).students
    //
    //     res.render('index.html', {
    //         fruits: [
    //             'apple',
    //             'banana',
    //             'orange'
    //         ],
    //         //文件中读到的数据一定是字符串，需要转为对象
    //         // JSON.parse:  JSON转换为JS对象
    //         // JSON.stringify:  JS对象转换为JSON
    //         students: students
    //     })
    // })

    Student.find(function(err,students){
        if (err) {
            return res.status(500).send('server error')//status(500) 状态码500
        }
        res.render('index.html', {
            fruits: [
                'apple',
                'banana',
                'orange'
            ],
            //文件中读到的数据一定是字符串，需要转为对象
            // JSON.parse:  JSON转换为JS对象
            // JSON.stringify:  JS对象转换为JSON
            students: students
        })
    })

})

//渲染添加学生页面
router.get('/students/new', function (req, res) {
    res.render('new.html')
})

// 处理添加学生请求
router.post('/students/new', function (req, res) {
    //1.获取表单数据
    //  console.log(req.body)
    //2.处理
    //  将数据保存到db.json文件中用以持久化
    //   将db.json文件读出来转为对象，再加入，加完之后再转为字符串，再存进去
    //3.发送响应
    //先读取出来，转为对象
    //然后往对象中 push 数据
    //然后把对象转为 字符串
    //然后把 字符串 再次写入文件

    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('server error')//status(500) 状态码500
        }
        //重定向首页
        res.redirect('/students')
    })

})

//渲染编辑页面
router.get('/students/edit', function (req, res) {
    //1.在客户端的列表页中处理链接问题（需要有id参数）
    //2.获取要编辑的学生id
    //
    //3.渲染编辑页面
    //  根据 id 把学生信息查出来
    //  使用模板引擎渲染页面
    // console.log(req.query.id)//string类型


    Student.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })

})

//处理编辑请求
router.post('/students/edit', function (req, res) {
    //1.获取表单数据
    //  req.body
    //2.更新
    //  Student.updateById()
    //3.发送响应
    // console.log(req.body)
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error')//status(500) 状态码500
        }
        res.redirect('/students')
    })
})

//处理删除请求
router.get('/students/delete', function (req, res) {
    //1.获取要删除的id
    //2.根据id执行删除操作
    //3.根据操作结果发送响应数据
    Student.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})


//3.把router 导出
// exports.router = router //这样导出， 引入的时候需要点出来
module.exports = router
