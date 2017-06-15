/**
 * Created by Citrus on 2017/6/10.
 */
const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', function(client){
    client.on('event', function(data){});
    client.on('disconnect', function(){});
});
server.listen(3000);
