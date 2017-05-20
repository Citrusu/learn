/**
 * Created by Citrus on 2017/5/18.
 */

//发送数据到客户端
module.exports = {
    toObj: function(data){
        return JSON.parse(data);
    },
    toStr: function(data){
        return JSON.stringify(data);
    },
    send: function(data){
        if(typeof data === 'string'){
            return this.toStr({
                type: 'tip',
                data: data
            });
        }else{
            return this.toStr(data);
        }
    }
};
