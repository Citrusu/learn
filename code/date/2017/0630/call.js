/**
 * Created by Citrus on 2017/6/30.
 */
function Persion(name, age){
    this.name = name;
    this.age  = age;
}

function show(name, age){
    Persion.call(this, name, age);
    console.log(this.name +','+ this.age);
}

show('zy', 18);

