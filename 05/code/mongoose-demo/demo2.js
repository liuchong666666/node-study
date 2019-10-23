var mongoose = require('mongoose');

//连接本机数据库
//制定连接的数据库不需要存在，当你插入第一条数据之后就会自动创建出来
mongoose.connect('mongodb://localhost/itcast');

//设计集合结构
