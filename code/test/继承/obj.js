
Object.prototype.ext=function(parObject){
	//ѭ���������������������
	for(var i in parObject){
		//Ϊ�������������������������
			//����ֵ�Ǹ������������Ե�����ֵ
		this[i]=parObject[i];
	}
}

//����
function Person(p_name,p_age){
	this.name=p_name;
	this.age=p_age;
	this.speak=function(){
		window.alert(this.name+this.age);
	}
}
//����
function Student(p_num){
	this.num=p_num;
	this.say=function(){
		window.alert(this.name+':'+this.age+':'+this.num);
	}
}
//ʵ����
var str=new Student(101);
str.ext(new Person('zhang',20));
str.say();//�������෽��
str.speak();//���ø��෽��