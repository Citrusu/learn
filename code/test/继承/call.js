//父类
function Person(p_name,p_age){
	this.name=p_name;
	this.age=p_age;
	this.speak=function(){
		window.alert(this.name+this.age);
	}
}
//子类
function Student(p_num,p_name,p_age){
	this.num=p_num;
	this.say=function(){
		window.alert(this.name+':'+this.age+':'+this.num);
	}
	//语法：父类.call（this,……）
	Person.call(this,p_name,p_age);
}
//实例化
var str=new Student(101,'zhang',19);
str.say();