//如果是非路径形式的标识
//路径形式的模块
//  ./      当前目录，不可省略
//  ../     上一级目录，不可省略
//  /xxx （绝对路径）几乎不用
//  d:/a/foo.js     几乎不用
//  首位的 / 在这里表示的是当前文件模块所属磁盘根路径
//  .js后缀名可以省略

// require('模块标识符')

// require('./foo')


//核心模块的本质也是文件
//核心模块文件已经被编译到二进制文件中了，我们只需要按照名字来加载就可以了
// require('fs')
// require('http')


//第三方模块
//凡是第三方模块都必须通过npm来下载
//使用的是后可以通过require('包名')的方式来进行加载才可以使用
//不可能有任何一个第三方包和核心模块的名字是一样的
//既不是核心模块，也不是路径形式的模块
//      先找到当前文件所处目录中的node_modules目录
//      node_modules/art-template
//      node_modules/art-template/package.json文件
//      node_modules/art-template/package.json文件中的main属性
//      main属性中就记录了当前art-template的入口模块
//      然后加载使用这个第三方包
//      实际上最终加载的还是文件
//
//  如果package.json文件不存在 或者 main 指定的入口也没有
//  则node 会自动找该目录下的index.js
//  index.js会作为默认备选项
//  如果连index.js都没有，就会报错 can not find module xxx
//
//      如果以上所有任何一个条件都不成立，则会进入上一级目录中的node_modules目录查找
//      如果上一级还是没有，则继续往上上一级查找
//      。。。
//      如果直到当前磁盘根目录（c盘，f盘，看当前是哪个盘）还找不到，最后报错
//          can not find module xxx
//
//      注意：我们一个项目有且只有一个node_modules 放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包
//          不会出现多个node_modules
//  模块查找机制
//      优先从缓存加载
//      核心模块
//      路径形式的文件模块
//      第三方模块：不会去兄弟文件里面的子级找，但会去父级的兄弟文件的子级找，
//      终极：可以通过路径找(../node_modules/art-template)
//
//          不过这些初衷就是为了减少../  ./ 之类的
//
//如果想要了解更多底层细节，可以自行参考，《深入浅出Node.js》中的模块系统章节
var template=require('art-template')
require('a')