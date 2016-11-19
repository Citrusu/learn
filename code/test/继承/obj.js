
Object.prototype.ext=function(parObject){
	//循环遍历父类对象所有属性
	for(var i in parObject){
		//为子类对象添加这个遍历到的属性
			//它的值是父类对象这个属性的属性值
		this[i]=parObject[i];
	}
}

//父类
function Person(p_name,p_age){
	this.name=p_name;
	this.age=p_age;
	this.speak=function(){
		window.alert(this.name+this.age);
	}
}
//子类
function Student(p_num){
	this.num=p_num;
	this.say=function(){
		window.alert(this.name+':'+this.age+':'+this.num);
	}
}
//实例化
var str=new Student(101);
str.ext(new Person('zhang',20));
str.say();//调用子类方法
str.speak();//调用父类方法