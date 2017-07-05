/**
 * Created by Citrus on 04/07/2017.
 */
/*定时功能
 * 格式 [{}]
 * cls 处理的 class
 * end 处理的时间,全格式。如：2017年1月2日23点0时0分0秒就是：2017010223000000
 * func 可选，要处理的事件，默认是关闭
 */
endAct([{
    cls: 'Jdang',
    end: 20170705000000
    }
]);
function endAct(list){
    var l = list;
    var nowTime = new Date();
    var Y = nowTime.getFullYear().toString();
    var M = litter(nowTime.getMonth()+1);
    var D = litter(nowTime.getDate());
    var H = litter(nowTime.getHours());
    var Min = litter(nowTime.getMinutes());
    var S = litter(nowTime.getSeconds());

    function litter(v){
        return v >= 10 ? v.toString() : '0' + v.toString();
    }
    var now = Y+M+D+H+Min+S;

    l.forEach(function(n){
        var end = n.end;
        if(now >= end){
            document.querySelectorAll('.'+n.cls).forEach(function(m){
                if(n['func']){
                    n['func'](m);
                }else{
                    m.style.display = 'none';
                }
            })
        }
    });
}
