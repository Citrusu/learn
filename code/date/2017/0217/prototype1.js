/**
 * Created by Citrus on 2017/2/17.
 */
function SuperType(name){
    this.name = name;
}
function SubType(){
    SuperType.call(this,'zy');
    this.age = 24;
}
SubType.prototype = new SuperType();
var instead1 = new SubType();
console.log(instead1);
