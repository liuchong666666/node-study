//EcmaScript6 对数组新增了很多方法

//      find
//      findIndex

//  find 接收一个方法作为参数，方法内部返回一个条件
//  find接收一个方法作为参数，方法内部返回一个条件
//  符合该条件的元素会作为find方法的返回值
//  如果遍历结束还没有符合该条件的元素，则返回undefined

var users = [
    {id: 1, name: 'lisi'},
    {id: 2, name: 'lisi2'},
    {id: 3, name: 'lisi3'},
]
//find和findIndex方法实现原理
Array.prototype.myFind = function (conditionFunc) {
    // 相当于这里为var conditionFunc = function (item,index) {
    //     return item.id ===4
    // }
    for (var i = 0; i < this.length; i++) {
        if (conditionFunc(this[i], i)) {
            //相当于
            //item = this[i]
            // index = i
            //如果调用conditionFunc()过程中为true就执行下一步
            // /就得到return this[i]就为myFind的返回值
            return this[i]  //return i   就是找索引的findIndex方法
        }
    }
}

var  ret = users.myFind(function (item, index) {
    return item.id === 2  //返回一个Boolean值
})
console.log(ret)