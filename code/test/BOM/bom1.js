/*document.write("内部代码是："+navigator.appCodeName+"<br/>");
document.write("浏览器名称："+navigator.appName+"<br/>");
document.write("版本号是："+navigator.appVersion+"<br/>");
document.write("操作系统是："+navigator.platform+"<br/>");
document.write("屏幕高度是："+screen.height+"&nbsp"+"宽度是："+screen.width+"<br/>");

document.write(navigator.userAgent);

function display(){
	window.alert('hello');
}
setTimeout("display()",3000);*/
var a=screenh;
var b=screenw;
var top=0;
var left=0;
function changeCss(){
	for(var i=0;i<a;i++){
		for(var j=0;j<b;j++){
		left+=1;
		}
		top+=1;
	}
}