var n=Math.round(Math.random()*500);
//document.write(n);

while(true){
	var number=prompt('��һ��0-500����');
	if(number>n){
		window.alert('����');
	}
	if (number<n){
		window.alert('С��');
	}
	if(number==n){
		window.alert('�¶��ˣ�')
		break;
	}
}