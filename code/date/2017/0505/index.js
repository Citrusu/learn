/**
 * Created by Citrus on 2017/5/5.
 */
//知识点：基础的对象，函数，作用域的应用
var obj = {
    name: 'hello',
    sayName: function(){
        console.log(this.name);
    }
};

var myName = obj;
myName.name = 'zy';
myName.sayName();