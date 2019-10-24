var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//连接数据库
// mongoose.connect('mongodb://localhost:27017/itcast')//默认端口27017可以省略
mongoose.connect('mongodb://localhost/itcast'); //默认端口27017

var studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    enum: [0, 1], //枚举，限定必须只能里面的0,1 其他数字不行
    default: 0, //默认0
  },
  age: {
    type: Number,
  },
  hobbies: {
    type: String,
  },
});

//直接导出模型构造函数
module.exports = mongoose.model('Student', studentSchema);
