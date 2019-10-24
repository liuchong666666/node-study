var mysql = require('mysql');

//1.创建连接
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'//数据库名//一不小心把表名和数据库名起一样的了
});
//2.连接数据库
connection.connect();
//3.执行数据操作
//查询数据
//users表名
connection.query('SELECT * FROM `users`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

//插入一条数据
//没指定id就不能省略，给NULL
// connection.query(`INSERT INTO users VALUES(NULL,"admin","123456")`, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });


//4.关闭连接
connection.end();