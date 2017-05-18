/**
 * Created by Citrus on 2017/5/17.
 */

//if ("WebSocket" in window){alert('ok');}else{alert('no');}

var socket = null;
var msgBox = document.querySelector('#msgBox');     //显示的消息列表
var inputBox = document.querySelector('#inputBox'); //输入的消息

//创建用户信息
var userInfo = {
    UUID: tools.generateUUID(),
    name: '',
    msg: ''
};

//收集用户名字
function getName(){
    userInfo.name = prompt("请输入您的昵称","");
    if (userInfo.name != null && userInfo.name != ""){
        creatWS();
    }else{
        alert('请输入您的昵称');
        location.reload();
    }
}
getName();

//创建连接
function creatWS(){
    socket = new WebSocket(winConfig.url);
    console.log("Clinet is running...");
    console.log(socket.readyState);
    socket.addEventListener('message', function (event) {
        receiveMsg(JSON.parse(event.data));
    });

    socket.addEventListener('open', function (event) {
        console.log("websocket is open");
        init();
    });

    socket.addEventListener('close', function(){
        console.log('closed');
    });

    socket.addEventListener('error', function (event) {
        alert("websocket create failed");
    });
}


function init(){
    //键盘发送消息
    document.addEventListener('keyup', function (key) {
        if (key.keyCode == 13) {
            sendMsg();
        }
    });

    //点击发送消息
    document.querySelector('#sendBtn').addEventListener('click', function () {
        sendMsg();
    });

    //离开响应
    window.onbeforeunload = function () {
        //socket.send("Client is Leaving");
        socket.close();
    };
}


//发送消息
function sendMsg() {
    var val = inputBox.value;
    if (val) {
        //显示自己的消息
        var msgItem = document.createElement('li');
        msgItem.innerText = val;
        msgItem.setAttribute('class', 'right');
        msgBox.appendChild(msgItem);
        inputBox.value = '';

        //发送消息给服务端
        userInfo.msg = val;
        console.log(userInfo);
        socket.send(JSON.stringify(userInfo));
    }
}

//接收消息
function receiveMsg(data) {
    //显示来自服务器的消息
    var msgItem = document.createElement('li');
    console.log(data);
    msgItem.innerText = data.msg;
    msgBox.appendChild(msgItem);
}