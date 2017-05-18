/**
 * Created by Citrus on 2017/5/18.
 */

//发送数据到客户端
module.exports = {
    toObj: function(data){
        let msg = JSON.parse(data);
        return msg;
    },
    toStr: function(data){
        let msg = JSON.stringify(data);
        return msg
    }
};
