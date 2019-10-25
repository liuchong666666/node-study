var fs = require('fs')

fs.readdir('F:/www', function (err, files) {
    if (err) {
        console.log('目录不存在')
    }
    console.log(files)//[ 'a.txt', 'a.txt.bak', 'apple', 'index.html' ]

})