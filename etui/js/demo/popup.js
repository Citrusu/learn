/**
 * Created by zhubing on 2016/9/29.
 */
define(function(require, exports, module){
    $('.btn-alert').on('click',function(){
        $.alert('这是一个警告');
    });

    $('.btn-confirm').on('click',function(){
        $.confirm('你确定要这样吗？',function(){
            console.log('已经执行');
        });
    });
});