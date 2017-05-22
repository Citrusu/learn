/**
 * Created by Citrus on 2017/5/17.
 */
//配置
window.winConfig = {
    url: 'ws://192.168.9.123:3000/server',
    //url: 'ws://chat.hicitrus.com:3000/websocket/server',
    port: '3000',
};

//工具
window.tools = {
    generateUuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
};