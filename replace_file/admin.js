/*
* 后台需要替换的字段，需要注意顺序的优先级
*/ 
module.exports = [
    //删除
    [/<script src="__PUBLIC__\/Js\/jquery.timer.js"><\/script>/g, ''],
    [/<script src="__PUBLIC__\/Js\/jquery.timer.js" type="text\/javascript"><\/script>/g, ''],
    [/-\{:SC\('site.webtitle'\)\}/g, ''],
    [/<link rel="stylesheet" type="text\/css" href="__PUBLIC__\/Css\/reset.css">/g, ''],

    //通用
    [/{\$NOW_THEME_URL}\/Assets\/Css\/common.css/g, '__STATIC__/admin/css/common.css'],
    [/{\$NOW_THEME_URL}\/Assets\/Js\/common.js/g, '__STATIC__/admin/js/common.js'],
    [/__PUBLIC__\/Js\/jquery.min.js/g, '__STATIC__/admin/plugins/jquery/jquery.min.js'],

    //特殊
    [/__PUBLIC__\/Plugins\/LhgDialog\/lhgdialog.js?skin=discuz/g, '__STATIC__/admin/plugins/lhgDialog/lhgdialog.js?skin=discuz'],

    //变量
    [/<include file="Public/g, '<include file="pub'],
    [/__PUBLIC__\/Plugins\/Et/g, '__STATIC__/admin/plugins/et'],
    // [/__PUBLIC__\/Plugins\/js/g, '__STATIC__/admin/plugins/js'],
    [/__PUBLIC__\/Plugins\//g, '__STATIC__/admin/plugins/'],
    [/__PUBLIC__\/Js/g, '__STATIC__/admin/js'],
    [/{\$NOW_THEME_URL}\/Assets\/Css\//g, '__STATIC__/admin/css/'],
    [/{\$NOW_THEME_URL}\/Assets\/Js\//g, '__STATIC__/admin/js/'],
    [/{\$NOW_THEME_URL}\/Assets\/Images\//g, '__STATIC__/admin/js/'],
    [/\{\$/g, '{\\$'],
    [/{:U\(/g, '{:url('],
];