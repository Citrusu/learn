/**
 * Created by Citrus on 2017/2/17.
 */
function SuperType(){
    this.color = ['red','black','white'];
}
function SubType(){
    SuperType.apply(this);
}
SubType.prototype = new SuperType();
var instead1 = new SubType();
var instead2 = new SubType();
instead1.color.push('yellow');
instead2.color.push('green');
console.log(instead1.color);
console.log(instead2.color);
