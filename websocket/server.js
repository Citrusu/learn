/**
 * Created by Citrus on 2017/5/9.
 */

const ws = require('ws').Server;

const server = new ws({port:3000});

const users = [];

server.addListener('connection', function(socket){
    console.log('connection....');
    users.push(socket);
    socket.send('已建立连接');
    socket.addListener('message',function(resData){
        console.log(resData);
        users.forEach(function(n, i){
            if(socket !== n){
                n.send(resData.msg);
            }
        });
    });
});

console.log('running......');