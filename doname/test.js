/**
 * Created by Citrus on 01-Apr-17.
 */
const fs = require('fs');
let code = 'abcdefghijklmnopqrstuvwxyz';
let names = [
    '.com',
    // '.me',
    // '.cc',
    // '.xyz',
    // '.top',
    // '.cn',
];
let len = code.length;

let text = '';
let count = 0;
let block = 500;
names.forEach(function(n, i){
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len; j++){
            for(let m = 0; m < len; m++){
                text+= code[i] + code[j] + code[m] + n + '\r\n';
                count += 1;
                if(count/block === 1){
                    text += count + ':====================' + '\r\n';
                }
            }
        }
    }
});

let dirFile = './tmp.txt';

fs.open(dirFile, 'a', function(err, fd){
    if(err){
        return console.log(err);
    }
});
// fs.stat(dirFile, function(err, stats){
//     if(err){
//         return console.log(err);
//     }
//     console.log(stats);
//     console.log('ok');
//
//     console.log(stats.isFile());
// })

fs.writeFile(dirFile, text, function(err){
    if(err){
        return console.log(err);
    }
});