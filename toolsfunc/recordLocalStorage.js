/*
 * @param 过期的回调方法
 * @param 自定缓存的 key，如果不指定可能会冲突
 * @param 过期时间/秒，默认一天
 * */
function recordLocalStorage(func, name, time) {
    var compareTime = time || 5; //过期时间、秒
    var cacheName = name || 'thisismytestcache';
    var cacheInfo = JSON.parse(localStorage.getItem(cacheName));
    //存在
    if (cacheInfo) {
        var now = nowData();
        console.log(cacheInfo.time);
        console.log(now);
        console.log(parseInt(now) - parseInt(cacheInfo.time));
        if (parseInt(now) - parseInt(cacheInfo.time) > compareTime) {
            console.log('overTime');
            if (func) {
                func();
            }
        }
    } else {
        console.log('nullTime');
        if (func) {
            func();
        }
    }
    localStorage.setItem(cacheName, JSON.stringify({
        time: nowData()
    }));

    function nowData() {
        var nowTime = new Date();
        var Y = nowTime.getFullYear().toString();
        var M = litter(nowTime.getMonth() + 1);
        var D = litter(nowTime.getDate());
        var H = litter(nowTime.getHours());
        var Min = litter(nowTime.getMinutes());
        var S = litter(nowTime.getSeconds());

        function litter(v) {
            return v >= 10 ? v.toString() : '0' + v.toString();
        }
        return parseInt(Y + M + D + H + Min + S);
    }
}
// recordLocalStorage();