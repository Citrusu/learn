//加载配置
let replaceList = require('./admin.js');

// 基本设置
let config = {
    baseDir : '/Volumes/env/ydkos/application/admin/view/company/', //替换目录
    recusion: true,     //递归目录
}

const fs = require('fs');

// 读取文件列表
function readDir(dir){
    fs.readdir(dir, (err, files) => {
        if(err){
            console.log(`readErr:${err}`)
        }
        files.forEach((n) => {
            fs.lstat(dir + n, (err, stats) => {
                if(err){
                    console.log(`lstatErr:${err}`)
                }
                // 是否为目录
                if(stats.isDirectory()){
                    // 是否递归
                    if(config.recusion){
                        readDir(dir + n + '/');
                    }
                }else{
                    // console.log(dir + n);
                    readFile(dir + n);
                }
            })
        })
    });
}
readDir(config.baseDir)

/*
 * 读取文件
 * */
function readFile(src){
    fs.readFile(src, 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            let replaceFile = data;
            replaceList.forEach((n, i) => {
                replaceFile = replaceFile.replace(n[0], n[1]);
            })
            useFile(replaceFile, src);
            // console.log(replaceFile)
        }
    });
}

/*
 * 替换文件
 * */
function useFile(fileData, dist){
    fs.writeFile(dist, fileData, (err) => {
        if(err){
            return console.log(err);
        }

        console.log(`已替换 ${dist}`);
    });
}


