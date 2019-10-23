var mongoose = require('mongoose');
//架构、结构、模型
var Schema = mongoose.Schema;

//1.连接本机数据库
//制定连接的数据库不需要存在，当你插入第一条数据之后就会自动创建出来
mongoose.connect('mongodb://localhost/itcast');

//2.设计文档（集合）结构
//字段名称就是表结构中的属性名称
//值
//约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String, //类型
    required: true, //必须有
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String, //非必须可有可无
  },
});

//3.将文档结构发布为模型
//  mongoose.model方法就是用来将一个架构发布为model
//    第一个参数：传入一个大写名词单数字符串，用来表示你的数据库名称
//        mongoose会自动将大写名词的字符串生成  小写复数  的集合名称
//        例如这里的  User 最终会变为 users 集合名称
//    第二个参数：架构Schema
//
//        返回值：模型构造函数
var User = mongoose.model('User', userSchema);

//4.当我们有了模型构造函数之后，就可以使用这个构造函数对 User 集合中的数据为所欲为了（增删改查）

//************新增************* */

// var admin = new User({
//   username: '张三',
//   password: '123456',
//   emial: 'admin@admin.com',
// });

// //数据持久化
// admin.save(function(err, ret) {
//   if (err) {
//     console.log('保存失败');
//   } else {
//     console.log('保存成功');
//     console.log(ret);
//   }
// });

//************查询************* */
/*查询所有*/
// User.find((err, ret) => {
//   if (err) {
//     console.log('查询失败');
//   } else {
//     console.log(ret);
//   }
// });

/*按条件查 */
// User.find(
//   {
//     username: '张三',
//   },
//   (err, ret) => {
//     if (err) {
//       console.log('查询失败');
//     } else {
//       console.log(ret);
//     }
//   }
// );

/*只找匹配的第一个 */
User.findOne(
  {
    username: '张三',
  },
  (err, ret) => {
    if (err) {
      console.log('查询失败');
    } else {
      console.log(ret);
    }
  }
);
