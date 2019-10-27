var express = require('express')
var path = require('path')

var app = express()

//会把相对路径改为据对路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.get('/', function (req, res) {
  res.send('hello')
})

app.listen(5000, function () {
  console.log('running...')
})