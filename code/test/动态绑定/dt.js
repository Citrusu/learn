//window.alert('hello');

window.onload=function(){
	document.getElementById('div1').onclick=display;
	document.getElementById('div2').onclick=display2;
}

function display(){
	this.style.color='red';//谁调用this，this就指向谁
}
function display2(){
	this.style.color='blue';
	this.style.fontSize='30px'
}