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

    console.log(users.length);
    socket.addListener('message',function(resData){
        //let resMsg = JSON.parse(resData);
        users.forEach(function(n, i){
            if(socket !== n){
                let sendMsg = '';
                n.send(resData.msg);
            }
        });
    });

    socket.addEventListener('close', function(){
        console.log('close');
        users.forEach(function(n, i){
            if(socket === n){
                users.splice(i, 1);
            }
        });
        console.log(users.length);
    });
});

console.log('running......');