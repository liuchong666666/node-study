var express = require('express')
var fs = require('fs')
var app = express()

// app.get('/abc', function (req, res, next) {
//   console.log('abc')
//   // req.foo = 'bar'
//   req.body = {}
//   next()
// })

// app.get('/abc', function (req, res, next) {
//   console.log(req.body)//上面添加的成员这里就可以用
//   console.log('abc 2')
// })

app.get('/', function (req, res, next) {
  // 禅模式 zen code
  fs.readFile('.d/asd', function (err, data) {
    if (err) {
      // return res.status(500).send('server error')
      //当调用next的时候，如果传递了参数，则直接往后找到带有四个参数的应用程序级别的中间件
      //当发生错误的时候，我们可以调用next传递错误对象
      //然后就会被全局错误处理中间件匹配到并处理之
      next(err)
    }
  })
})
app.get('/', function (req, res, next) {
  //   //当上面调用next的时候，如果传递了参数，则直接往后找到带有四个参数的应用程序级别的中间件
  //就不会执行这个中间件了
  console.log('/2')
})
app.get('/a', function (req, res, next) {
  // 禅模式 zen code
  fs.readFile('.d/asd', function (err, data) {
    if (err) {
      // return res.status(500).send('server error')
      next(err)
    }
  })
})

//***配置全局错误处理的中间件****
app.use(function (req, res, next) {
  console.log('404')
})
app.use(function (err, req, res, next) {
  return res.status(500).send(err.message)
})

app.listen(3000, function () {
  console.log('app is running at port 3000...')
})

