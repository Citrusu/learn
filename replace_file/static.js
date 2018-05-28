//静态资源添加版本号

// 基本设置
let config = {
    baseDir: '/Volumes/env/yidake/ydkos/application/mobile/view/', //替换的目录或文件
    recusion: true, //递归目录
}

let list = [

    [/\.css"/g, '.css?{$Think.ET_VERSION}"'],
    [/\.js'\)/g, '.js?{$Think.ET_VERSION}\')'],
    [/\.jpg"/g, '.jpg?{$Think.ET_VERSION}"'],
    [/\.png"/g, '.png?{$Think.ET_VERSION}"'],
    [/\.gif"/g, '.gif?{$Think.ET_VERSION}"'],
    //[/?{$Think.ET_VERSION}?{$Think.ET_VERSION}/g, '?{$Think.ET_VERSION}'],
];

module.exports = {
    config: config,
    list: list
}