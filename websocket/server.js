/**
 * Created by Citrus on 2017/5/9.
 */

const ws = require('ws').Server;

const server = new ws({port:3000});

server.addListener('connection', function(socket){
    console.log('connection....');
    console.log(socket);

    socket.addListener('message',function(msg){
        console.log(msg);

        socket.send(msg);
    });
});

console.log('running......');