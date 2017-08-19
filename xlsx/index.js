/**
 * Created by Citrus on 2017/8/17.
 */
const fs = require('fs');
let XLSX = require('xlsx');
let book = XLSX.readFile('1.xlsx'); //文件
let sheets = book.SheetNames; //表，数组
let workSheet = book.Sheets[sheets[0]];

let a1 = workSheet['!ref'];
let a2 = workSheet['A2'];

let xJson = XLSX.utils.sheet_to_json(workSheet);

let listArr = [];
let replaceMaps = [{
    name: '归属',
    replace: 'range'},{
    name: '商户名称',
    replace: 'name'
},{
    name: '地址',
    replace: 'site'
}];
xJson.forEach((n, i) => {
    let val = JSON.stringify(n);
    replaceMaps.forEach((m, j) => {
        val = val.replace(m.name, m.replace);
    });
    listArr.push( val );
});

fs.writeFile('out.js', listArr, function(err){
    if(err){
        console.log(err);
    }
    console.log('ok');
});
