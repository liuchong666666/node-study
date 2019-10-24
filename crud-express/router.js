/**
 * router.js路由模块
 * 职责：
 *      处理路由
 *      根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码可维护性
 * 提升开发效率
 *
 * */

//express提供了一种更好的方式
//专门用来包装路由的
var express = require('express')
var fs = require('fs')
var Students = require("./Students")


var router = express.Router()

//渲染首页列表
router.get('/',function(req,res){
   Students.find(function(err,data){
       if(err){
           return res.status(500),send('server error')
       }
       res.render('index.html',{
           students:data
       })
   })
})


// 渲染添加页面
router.get('/add',function(req,res){
    res.render('add.html')
})


//处理添加请求
router.post('/add',function(req,res){
    Students.save(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})

// 处理删除请求
router.get('/delete',function(req,res){
    Students.delete(req.query.id,function(err){
        console.log(req.query.id)
        if(err){
           return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})


//渲染编辑页面
router.get('/edit',function(req,res){
   Students.findById(req.query.id,function(err,data){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('edit.html',{
            student:data
        })
   })
})


//处理编辑请求
router.post('/edit',function(req,res){
    Students.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})


module.exports=router