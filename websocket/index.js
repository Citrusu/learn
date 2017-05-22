/**
 * Created by Citrus on 2017/5/17.
 */

//if ("WebSocket" in window){alert('ok');}else{alert('no');}

var msg = new Vue({
    el: '.ui-page-current',
    data: {
        //系统信息
        sys: {
            userNum: 0, //在线用户数
        },
        localInfo: {
            uuid: tools.generateUuid(),
            name: ''
        },
        msgItems: [],
        lineUsers:[]
    },
    methods: {
        //接收消息,type 对应方法名
        reciveMsg: function(msg){
            this[msg.type](msg);
            //console.log(msg);
        },
        tip: function(msg){
            this.msgItems.push(msg);
        },
        newMsg: function(msg){
            this.msgItems.push(msg);
            scrollToBottom(msgBox);
        },
        lineNum: function(msg){
            this.sys.userNum = msg.num;
        },
        onLine: function(msg){
            this.msgItems.push({type: 'tip', data: msg.userName + ' 已加入'});
        },
        offLine: function(msg){
            this.msgItems.push({type: 'tip', data: msg.userName + ' 已离开'});
        },
        send: function(data){
            if(typeof data === 'string'){
                return this.toStr({
                    type: 'newMsg',
                    user: msg.localInfo,
                    msg : data
                });
            }else{
                return this.toStr(data);
            }
        },
        toObj: function(data){
            return JSON.parse(data);
        },
        toStr: function(data){
            return JSON.stringify(data);
        },
    }
});

var socket = null;
var msgBox = document.querySelector('#msgBox');     //显示的消息列表
var inputBox = document.querySelector('#inputBox'); //输入的消息

//收集用户名字
function getName() {
    var name = prompt("请输入您的昵称", "");
    if (name != null && name != "") {
        msg.localInfo.name = name;
        creatWS();
    } else {
        alert('请输入您的昵称');
        location.reload();
    }
}
getName();

//创建连接
function creatWS() {
    socket = new WebSocket(winConfig.url);
    console.log("Clinet is running...");
    socket.addEventListener('message', function (event) {
        msg.reciveMsg(JSON.parse(event.data));
    });

    socket.addEventListener('open', function (event) {
        console.log("websocket is open");
        socket.send(msg.send({type: 'onLine', user: msg.localInfo})); //通知服务端已经上线
        init();
    });

    socket.addEventListener('close', function (event) {
        msg.msgItems.push({type:'tip', data: '服务器已关闭'});
        console.log('closed');
    });

    socket.addEventListener('error', function (event) {
        alert("websocket create failed");
    });
}


function init() {
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
    var val = inputBox.value.replace(/(^\s+)|(\s+$)/g,""); //去除前后空字符
    if (val) {
        //显示自己的消息

        msg.msgItems.push({
            type: 'local',
            msg: val
        });
        inputBox.value = '';

        scrollToBottom(msgBox);

        //发送消息给服务端
        socket.send(msg.send(val));
    }
}


//消息自动滚动到底部
function scrollToBottom(node){
    setTimeout(function(){
        node.scrollTop = node.scrollHeight;
    },0);
}
