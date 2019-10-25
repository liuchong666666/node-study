/**
 * 设计操作文件数据的API模块
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习node的精华部分：奥义之所在
 * 封装api
 *
 * */

var fs = require('fs')

var dbPath = './db.json'


/**
 * 获取所有学生列表
 * callback中的参数
 *      第一个参数是 err
 *          成功是 null，
 *          错误是 错误对象
 *      第二个参数是 结果
 *          成功是 数组
 *          错误是 undefined
 * return []
 * */

exports.find = function (callback) {
    //readFile是异步的
    ////如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
    //看01-封装异步API
    ////回调函数：获取异步操作的结果

    //readFile第二个参数是 可选的，传入 utf8 就是告诉它把读取到的文件按照 utf8 编码转成我们认识的字符
    //除了这样来转换之外，也可以通过data.toString()的方式
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }
        //没错就 第一个参数传null
        callback(null, JSON.parse(data).students)
    })
}

//调用
// find(function(err,data){
//
// })

/**
 * 获取单个学生
 *  根据id
 *  @param {number} id  学生id
 *  @param {Function} callback  回调函数
 * */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}


/**
 * 添加保存学生
 *
 *     先读取出来，转为对象
 *     然后往对象中 push 数据
 *     然后把对象转为 字符串
 *     然后把 字符串 再次写入文件
 * */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }

        //先读取出来，转为对象
        var students = JSON.parse(data).students //数组
        //加入唯一id ，这样会有一个缺陷 可能重复到删除的id，有待完善
        student.id = students[students.length - 1].id + 1


        //把用户传递的对象保存到数组中
        students.push(student)//现在只是一个数组

        //然后把对象数据转为 字符串
        var fileData = JSON.stringify({//json外面包了一个对象{}  对象里面放数组
            students: students
        })

        //然后把 字符串 再次写入文件
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                //错误就是把错误对象传递给他
                return callback(err)
            }
            //成功就没错，所以错误对象是null
            callback(null)
        })
    })
}

//调用
// save({
//     name:"xx",
//     age:18
// },function(err,data){
//     if(err){
//         console.log('保存失败了')
//     }else{
//         console.log('保存成功了')
//     }
// })


/**
 * 更新学生
 *      根据id更新
 * */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }

        var students = JSON.parse(data).students
        // 注意：这里记得把 id 统一转换为数字类型
        student.id = parseInt(student.id)

        //你要修改谁，就需要根据id找出谁
        //es6中的一个数组方法：find
        //需要接收一个函数作为参数
        //当某个遍历项符合 item.id === student.id 条件的时候，find终止遍历并返回遍历项
        var stu = students.find(function (item) {
            return item.id === student.id
        })

        //这个方式就写死了，有100个难道写100次吗
        // stu.name=student.name
        // stu.age=student.age

        //遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }


        //然后把对象数据转为 字符串
        var fileData = JSON.stringify({//json外面包了一个对象{}  对象里面放数组
            students: students
        })

        //然后把 字符串 再次写入文件
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                //错误就是把错误对象传递给他
                return callback(err)
            }
            //成功就没错，所以错误对象是null
            callback(null)
        })

    })
}

//调用
//先想想怎么调用
// updateByID({
//     id:1,
//     name:'xx',
//     age:15
// },function(err){
//
// })


/**
 * 删除学生
 * */

exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }

        var students = JSON.parse(data).students

        // 注意：这里记得把 id 统一转换为数字类型
        id = parseInt(id)

        //查找出id对应的数组元素
        //findIndex方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === id
        })

        //根据数组索引删除
        students.splice(deleteId, 1)

        //然后把对象数据转为 字符串
        var fileData = JSON.stringify({//json外面包了一个对象{}  对象里面放数组
            students: students
        })

        //写入文件
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                callback(err)
            }
            callback(null)
        })
    })
}
//调用
//deleteById(id,function(err){
//
// })


//如果出现 cannt not ‘id’ of  undefined     就看看db.json 里面id是不是成了字符串。
// 在方法里面存，更新，编辑，id都需要是number类型  parseInt(id)