/**
 * 处理文件操作api
 * */

var fs = require("fs")

var dbPath = './db.json'

/**
 * 查询所有
 *
 * */
exports.find = function (callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            callback(err)
        }
        var students = JSON.parse(data).students
        callback(null,students)
    })
}

/*
* find(function(data){
*   console.log(data)
* })
* */


/**
 * 查询单个
 * */

exports.findById = function (id,callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            callback(err)
        }
        var students = JSON.parse(data).students
        //es6 find  返回 匹配那一项
        var stu = students.find(function(item){
            return item.id === parseInt(id)
        })
        callback(null,stu)
    })
}
/*
* findById(id,function(data){
*
* })
* */

/**
 * 添加保存
 * */

exports.save = function (student,callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return  callback(err)
        }
        var students = JSON.parse(data).students
        if(students.length>0){
            student.id = students[students.length-1].id+1
        }else{
            student.id=1
        }
        console.log(student.id)
        //存入students数组中
        students.push(student)
        //把数据转为 字符串
        var fileData = JSON.stringify({
            students:students
        })
        //写入文件
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}
/*
* save({
*   id:1
*   name:'xx',
*   age:18,
*   gender:0，
*   hobbies：'xxxx'
*
* },function(err){
*   if(err){
*       console.log(err)
*   }else{
*
*   }
*
* })
* */

/**
 * 编辑更新
 * */

exports.updateById = function (student,callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)

        var stu = students.find(function(item){
            return item.id ===  student.id
        })

        for(var key in stu){
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 删除
 * @param {number} id 学生id
 * */

exports.delete = function (id,callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
          return  callback(err)
        }
        var students = JSON.parse(data).students;
        id = parseInt(id)

        //es6  findIndex
        var delId = students.findIndex(function(item){
            return item.id === id
        })
        // 删除,splice会改变原数组
        students.splice(delId,1)
        //转为对象字符串
        var fileData = JSON.stringify({
            students:students
        })
        //写入文件
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })

    })
}
