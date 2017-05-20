/**
 * Created by Citrus on 2017/5/9.
 */

var ws = require('ws').Server;

var server = new ws({port:3000});
var msg = require('./msg');         //消息方法
var allSockets = [];                //客户端连接
var users = [];                     //用户信息


server.addListener('connection', function(socket){
    console.log('connection....');

    allSockets.push(socket);
    socket.send(msg.send('已建立连接'));
    msgToAllUser({type:'lineNum',num: allSockets.length});

    socket.addListener('message',function(resData){
        var user = msg.toObj(resData);
        var sendMsg = {
            type: 'newMsg',
            name: user.name,
            msg : user.msg
        };
        msgToAllUser(sendMsg);
    });

    socket.addListener('close', function(){
        allSockets.forEach(function(n, i){
            if(socket === n){
                allSockets.splice(i, 1);
                return;
            }
        });
        msgToAllUser({type:'lineNum',num: allSockets.length});
    });
});

//推送消息给所有在线用户
function msgToAllUser(data){
    allSockets.forEach(function(n, i){
        n.send(msg.send(data));
    });
}

//推送消息给当前用户
function msgToOne(){

}

console.log('running......');