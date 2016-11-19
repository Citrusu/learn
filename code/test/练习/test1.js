function insertParagraph(text){
	var str="<p>";
	str+=text;
	str+="</p>";
	document.write(str);
}
window.onload=function(){
	var testdiv=document.getElementById("testdiv");
	//alert(testdiv.innerHTML);
	testdiv.innerHTML="<p>I inserted <em>this</em> content";
}

window.onload=function(){
	var para=document.createElement("p");//创建一个元素节点"p"
	var testdiv=document.getElementById("testdiv");//获取id为testdiv
	testdiv.appendChild(para);						//把"p"插入到id为testdiv中
	var txt=document.createTextNode("Hello World");//创建一个文本节点
	para.appendChild(txt);	//把这个文本节点插入到元素“p”中
}