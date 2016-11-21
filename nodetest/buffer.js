// var buf = new Buffer(10);
// var len = buf.write('www');
// console.log(len);

var buf = new Buffer(26);
for(var i = 0 ; i < 26 ; i++){
    buf[i] = i+97;
}
console.log(buf.toString('ascii'));