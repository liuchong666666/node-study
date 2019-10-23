const mongoose = require('mongoose');

//连接mongodb数据库
mongoose.connect('mongodb://localhost/test');
//创建一个模型
//在设计数据库
//mongodb是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
const Cat = mongoose.model('Cat', { name: String });
for (let i = 0; i < 100; i++) {
  //实例化一个cat
  const kitty = new Cat({ name: '喵喵' + i });
  //持久化保存kitty实例
  kitty.save().then(() => console.log('meow'));
}
