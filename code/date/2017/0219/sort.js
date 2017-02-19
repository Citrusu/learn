/**
 * Created by Citrus on 2017/2/19.
 */
var arrSimple= [1,7,9,55,44];
arrSimple.sort();
//console.log(arrSimple);

var arrSimple2= [1,7,9,55,44];
arrSimple2.sort(function(a,b){
    return a-b});
console.log(arrSimple2);

var objectList = new Array();
function Persion(name,age){
    this.name=name;
    this.age=age;
}
objectList.push(new Persion('jack',20));
objectList.push(new Persion('tony',25));
objectList.push(new Persion('stone',26));
objectList.push(new Persion('mandy',23));
//按年龄从小到大排序
objectList.sort(function(a,b){
    return a.age-b.age});
for(var i=0;i<objectList.length;i++){
    //console.log('<br />age:'+objectList[i].age+' name:'+objectList[i].name);
}

var objectList2 = new Array();
function WorkMate(name,age){
    this.name=name;
    var _age=age;
    this.age=function(){
        if(!arguments)
        {
            _age=arguments[0];}
        else
        {
            return _age;}
    }

}
objectList2.push(new WorkMate('jack',20));
objectList2.push(new WorkMate('tony',25));
objectList2.push(new WorkMate('stone',26));
objectList2.push(new WorkMate('mandy',23));
//按年龄从小到大排序
objectList2.sort(function(a,b){
    return a.age()-b.age();
});
for(var i=0;i<objectList2.length;i++){
    //console.log('<br />age:'+objectList2[i].age()+' name:'+objectList2[i].name);
}