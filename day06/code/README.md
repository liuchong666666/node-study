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
      __dirname   **动态获取**可以用来获取当前文件模块所属目录的绝对路径
      __filename  **动态获取**可以用来获取当前文件的绝对路径
      __dirname和__filename 是不受执行node命令所属目录影响的


  在文件操作中,使用相对路径是不可靠的,因为在node中文件操作的路径被设计为相对于执行node命令所处的路径(这不是bug,人家这样设计是有使用场景):
  相对路径
fs.readFile('./a.txt',function(err.data){})
  所以为了解决这个问题,很简单,只需把相对路径变为绝对路径就可以了:
  绝对路径:
fs.readFile('f:/web/PhpstormProjects/19.8.1node.js/node-study/day06/code/foo/a.txt',function(err.data){})
  但是如果这样把项目给别人了,别人不一定有这个路径,就会报错


  这里我们就可以使用 __dirname或者__filename来帮我们解决这个问题了

  在拼接路径的过程中,为了避免手动拼接带来的一些低级错误,所以推荐多使用:path.join()来辅助拼接

  所以为了尽量避免刚才所描述这个问题,大家以后在文件操作中使用相对路径都统一转换为动态路径
    补充:模块中的路径标识和这里的路径没关系,不受影响(相对于文件模块)
