/*(function(qq){
	window.alert(qq);
	//window.alert('hello');
})(10);
//window.alert("hello");
*/
/*
(function(x,y){
	alert(x+y);
//	return x+y;
})(3,4);
*/
/*
var i=10;
function dis(){
	i=20;
}
dis();
alert(i);
*/
/* i=10;
function fn1(){
	 i=100;
	function fn2(){
		 i=1000;
		function fn3(){
			 i=10000;
		}
		fn3();
	}
	fn2();
}
fn1();
alert(i);*/
/*
function total(){
	var sum=0;
	for(i=0;i<arguments.length;i++)
		sum+=arguments[i];
	document.write(sum+'<br/>');
}


total(2000,3000,4000);
total(1000,2000,3400,4900,5200);
*/

/*var row=['qwq','ere','wew','ttt'];
document.write(row.length+'<br/>');
var length=row.length;
for(i=0;i<length;i++){
	document.write(row[i]+'&nbsp');//row数组的第[i]个元素
}
*/
/*
var row=['qwq','ere','wew','ttt'];
for(var i in row){
	document.write(i+':'+row[i]+'<br/>');
}
*/
/*
var a=[
		[10,'zhang','男',2400],
		[11,'li','女'],
		[12,'wang','男'],
		[13,'zhao','女']

];
for(var i=0;i<a.length;i++){
	b=a[i];
	for(var j=0;j<b.length;j++){
	document.write(a[i][j]+'&nbsp');
	}
	document.write('<br/>');
}
*/


