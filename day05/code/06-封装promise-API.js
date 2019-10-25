var fs = require('fs');

//promise版本的readFile

function promiseReadFile(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

promiseReadFile('./data/a.txt')
  .then(function(data) {
    console.log(data);
    return promiseReadFile('./data/b.txt');
  })
  .then(function(data) {
    console.log(data);
    return promiseReadFile('./data/c.txt');
  })
  .then(function(data) {
    console.log(data);
    console.log('end');
  });
