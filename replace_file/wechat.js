/*
* 后台需要替换的字段，需要注意顺序的优先级
*/ 
module.exports = [
    //删除

    //通用
    

    //特殊
    // [/__PUBLIC__\/Plugins\/LhgDialog/g, '__STATIC__/admin/plugins/lhgDialog'],
    [/{\$NOW_THEME_URL}Assets\/Css\/common.css/g, '__STATIC__/mobile/css/common.css'],
    [/{\$NOW_THEME_URL}Assets\/etui\/css\/etui.css/g, '__STATIC__/mobile/etui/css/etui.css'],
    [/{\$NOW_THEME_URL}Assets\/actui\/css\/actui.css/g, '__STATIC__/mobile/etui/css/actui.css'],

    //变量
    [/<include file="Public/g, '<include file="pub'],
    [/{\$NOW_THEME_URL}Assets\/Css/g, '__STATIC__/mobile/css'],
    [/{\$NOW_THEME_URL}Assets\/Js/g, '__STATIC__/mobile/js'],
    [/{\$NOW_THEME_URL}Assets\/Images/g, '__STATIC__/mobile/img'],
    [/seajs.use\('Js/g, "seajs.use('js"],
    [/{\$/g, '{\\$'],
    [/{:U\(/g, '{:url('],
];