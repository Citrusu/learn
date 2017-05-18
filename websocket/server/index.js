/**
 * Created by Citrus on 2017/5/9.
 */

const ws = require('ws').Server;

const server = new ws({port:3000});
const msg = require('./msg'); //消息方法
const users = [];

server.addListener('connection', function(socket){
    console.log('connection....');

    users.push(socket);

    socket.send('{"msg":"已建立连接"}');

    console.log(users.length);
    socket.addListener('message',function(resData){
        users.forEach(function(n, i){
            if(socket !== n){
                let user = msg.toObj(resData);
                let sendMsg = {
                    name: user.name,
                    msg : user.msg
                };
                n.send(msg.toStr(sendMsg));
            }
        });
    });

    socket.addListener('close', function(){
        users.forEach(function(n, i){
            if(socket === n){
                users.splice(i, 1);
            }
        });
    });
});

console.log('running......');