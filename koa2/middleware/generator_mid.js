/**
 * Created by Citrus on 2017/6/12.
 */
function log(ctx){
    console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function(){
    return function * (next){
        log(this);

        if(next){
            yield next;
        }
    }
};