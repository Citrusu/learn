//定义一个json数组来保存多个人的信息
var per=[
	{name:'zhang',age:20},
	{name:'li',age:25},
	{name:'wang',age:28}
];
//遍历json数组
window.onload=function(){
	document.getElementById('div2').onclick=function(){
	for (var i=0;i<per.length ;i++ ){
		str=(per[i].name+':'+per[i].age+'<br/>');
		document.getElementById('div3').innerHTML+=str;
	}
	}
}