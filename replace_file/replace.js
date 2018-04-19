//加载配置
let replaceList = require('./wechat.js');

// 基本设置
let config = {
    baseDir : '/Volumes/env/ydkos/application/mobile/view/pub/', //替换的目录或文件
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


// 判断是否为目录
fs.lstat(config.baseDir, (err, stats) => {
    if(err){
        console.log(`firstlstatErr:${err}`)
    }
    // 是否为目录
    if(stats.isDirectory()){
        readDir(config.baseDir);
    }else{
        readFile(config.baseDir);
    }
})
