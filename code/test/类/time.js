
window.onload=function(){
	document.getElementById('start').onclick=eve1;
	document.getElementById('pause').onclick=eve2;
}
var timer;
function eve1(){
	var d=new Date();
	var date=d.getMilliseconds();
	document.getElementById('time').value=date;
	timer=setTimeout('eve1()',1);

};
function eve2(){
	clearTimeout(timer);
};
