function positionMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem=document.getElementById("message");
	elem.style.position="absolute";
	elem.style.top="0px";
	elem.style.left="0px";
	movement=setTimeout("moveMessage()",500);//设置要多长时间跳往所给出的函数
}										//使用方法：setTimeout(函数，等待时间)

function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload !='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

addLoadEvent(positionMessage);

function moveMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem=document.getElementById("message");
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var sHeight=screen.availHeight;
	var sWidth=screen.availWidth;
/*
	for(var i=0;i<sHeight;i++){
		for(var j=0;j<sWidth;j++){
			xpos=j;	
			elem.style.left=xpos+"px";
		}
		ypos=i;	
		elem.style.top=ypos+"px";
		movement=setTimeout("moveMessage()",10);
	}
	window.alert(i,j);*/
	
	if(xpos==sHeight && ypos==sWidth){
		return true;
	}
	if(xpos<sHeight){
	xpos++;
	}
	if(xpos>sHeight){
	xpos--;
	}
	if(ypos<sWidth){
	ypos++;
	}
	if(ypos>sWidth){
	ypos--;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	movement=setTimeout("moveMessage()",10);//变量=setTimeout(函数，跳跃时间)
	//window.alert(typeof(sHeight));
	//document.write(sHeight+','+sWidth);
}
