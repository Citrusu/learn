/**
 * Created by Citrus on 2017/5/21.
 */
module.exports = {
    //接收消息,type 对应方法名
    reciveMsg: function(msg){
        this[msg.type](msg);
        console.log(msg);
    },
};