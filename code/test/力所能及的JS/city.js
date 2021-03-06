
/*思路:使用getElementById获得省份的ID值，再动态创建<option>标记，
然后把省份数组的值追加到<option>标记中。当点击省份后通过onclick事件
修改城市的数组的值。


*/
var a=['请选择','湖南','湖北','江西','福建'];
var b=[
	['--'],
	['长沙','衡阳','株洲'],
	['武汉','十堰','荆州'],
	['南昌','九江','上饶'],
	['福州','厦门','泉州'],
];
	/*window.onload=function(){
		//省份
		var sheng=document.getElementById("sheng");
		//sheng.onchange=createDiqu;
		for(i=0;i<a.length;i++){
			sf=a[i];
			var para=document.createElement("option");
			var node=document.createTextNode(sf);
			sheng.appendChild(para);
			para.appendChild(node);
		}
		//城市
		function diqu(){
			var diqu=document.getElementById("diqu");
			for(j=0;j<dq.length;j++){
				var para1=document.createElement("option");
				var node1=dq[j];
				
				var qu=document.createTextNode(dq);
				
				diqu.appendChild(para1);
				para1.appendChild(dq);
			}

		}
	
	*/

window.onload=function(){
	createSheng();
	document.getElementById('sheng').onchange=createDiqu;
}
function createSheng(){
	var sheng=document.getElementById('sheng');
	for(var i in a){
		var ap=new Option(a[i]);
		sheng.options.add(ap);
	}
}
function createDiqu(){
	//取出sheng选中项的索引
	var index=document.getElementById('sheng').selectedIndex;
	var diqu=document.getElementById('diqu');
	diqu.options.length=0;	//将diqu原有的所有option移除
	for(var i in b[index]){
		var ap=new Option(b[index][i],b[index][i]);
		diqu.options.add(ap);
	}
}