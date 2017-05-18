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
            return data;
        }else if( this.func[data.type] ){
            this.func[data.type](data);
        }else{
            console.log( 'err data type' );
        }
    },
    func: {
        //系统类消息
        sysMsg: function(data){

        },
        //聊天消息
        chatMsg: function(data){

        }
    }
};
