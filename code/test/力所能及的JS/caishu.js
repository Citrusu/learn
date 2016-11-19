var n=Math.round(Math.random()*500);
//document.write(n);

while(true){
	var number=prompt('猜一个0-500的数');
	if(number>n){
		window.alert('大了');
	}
	if (number<n){
		window.alert('小了');
	}
	if(number==n){
		window.alert('猜对了！')
		break;
	}
}