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
	var para=document.createElement("p");//����һ��Ԫ�ؽڵ�"p"
	var testdiv=document.getElementById("testdiv");//��ȡidΪtestdiv
	testdiv.appendChild(para);						//��"p"���뵽idΪtestdiv��
	var txt=document.createTextNode("Hello World");//����һ���ı��ڵ�
	para.appendChild(txt);	//������ı��ڵ���뵽Ԫ�ء�p����
}