<!--
 * @Author: lc
 * @Date: 2019-10-27 13:25:29
 * @Description:
 -->
Node:
  path 路径操作模块
    > path.basename('c:/a/a/a.js')//获取给定路径的文件名
    'a.js'
    > path.basename('c:/a/a/a.js','.js')//第二个参数去掉文件后缀名
    'a'

    > path.dirname('c:/a/b/c/d.js')//获取目录部分
    'c:/a/b/c'

    > path.extname('c:/a/b/c/d.js')//获取扩展名部分
    '.js'


    > path.isAbsolute('c:/a/b/c/d.js')//判断是否是绝对路径
    true
    > path.isAbsolute('a/d.html')//这是相对路径,可以省略点杠 ./
    false
    > path.isAbsolute('./a/d.html')
    false
    > path.isAbsolute('/a/d.html') //当前磁盘所在路径
    true



    > path.parse('c:/a/b/c/d.js') //把路径解析成一个对象
    { root: 'c:/', //根目录
      dir: 'c:/a/b/c',//目录部分
      base: 'd.js',   //包含后缀名的文件名
      ext: '.js',     //扩展名,文件后缀名
      name: 'd' }     //不包含后缀名的文件名

    path.join:当你需要进行路径拼接的时候,推荐使用这个方法,自动加杠,,防止自己多杠或少杠


Node中的非模块成员
    在每个模块中,除了require,exports等模块相关api之外,还有俩个特殊的变量成员:
      __dirname   可以用来获取当前文件模块所属目录的绝对路径
      __filename  可以用来获取当前文件的绝对路径

