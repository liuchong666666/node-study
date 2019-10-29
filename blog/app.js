var express = require('express');
var path = require('path');
var router = require('./router');
var bodyParser = require('body-parser');
var app = express();

//会把相对路径改为据对路径
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use(
  '/node_modules/',
  express.static(path.join(__dirname, './node_modules/'))
);

//在node中,有很多第三方模板引擎都可以使用,不是只有art-template
//ejs,jade(pug),hanlebars,nunjucks...
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/')); //默认就是views目录,想改就在这里改

//配置body-parser表单POST请求体插件(一定要在挂载前)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//把路由挂载到app中
app.use(router);

app.listen(3000, function () {
  console.log('running3000...');
});
