/**
 * Created by Citrus on 2017/5/9.
 */
//创建服务器
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
    //res.render('./index');
});


//连接
io.on('connection', function(){
    console.log('new one connected')
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

