/**
 * Created by Citrus on 2016/9/13.
 */
var fs = require('fs');
var data = 'Citrus周游啦啦啦';

var writerStream = fs.createWriteStream('output.txt');

writerStream.write(data,'UTF8');

writerStream.end();

writerStream.on('finish',function(){
    console.log('写入完成');
});

writerStream.on('error',function(err){
    console.log(err.stack);
});

console.log('程序执行完毕');