var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//连接数据库
mongoose.connect('mongodb://localhost/users', { useMongoClient: true });

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_time: {
    //注册时间
    type: Date,
    //注意:这里不能写 Date.now()因为会即刻调用
    //这里直接给了一个方法: Date.now
    //当你去new Model的时候,如果你没有传递 create_time,则mongoose就会调用default指定的Date.now方法,使用其返回值作为默认值
    //自动得到当前时间
    default: Date.now, //这里不能加括号,如果这里加了,就会立马调用,就写死了,就永远是创建Schema的时间
  },
  last_modified_time: {
    //最新修改时间
    type: Date,
    default: Date.now,
  },
  avatar: {
    //头像
    type: String,
    default: '/public/img/avatar-max-img.png', //默认图片
  },
  bio: {
    //个人简介,介绍
    type: String,
    default: '',
  },
  gender: {
    //性别
    type: Number,
    enum: [-1, 0, 1], //-1保密
    default: -1,
  },
  birthday: {
    type: Date,

  },
  status: {
    //状态,拉黑,正常之类的
    type: Number,
    //0 没有权限限制
    //1 不可以评论
    //2 不可以登录
    //是否可以评论
    //是否可以登录使用
    enum: [0, 1, 2],
    default: 0,
  },
});

//第一个参数：传入一个大写名词单数字符串，用来表示你的数据库名称
//        mongoose会自动将大写名词的字符串生成  小写复数  的集合名称
module.exports = mongoose.model('User', userSchema);
