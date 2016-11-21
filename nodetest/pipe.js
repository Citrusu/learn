/**
 * Created by Citrus on 2016/9/13.
 */
var fs = require('fs');

//创建可读流
var readerStream  = fs.createReadStream('input.txt');

//创建可写流
var  writerStream = fs.createWriteStream('output.txt');

//管道读写操作
//读取input.txt文体内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream);

console.log('done');