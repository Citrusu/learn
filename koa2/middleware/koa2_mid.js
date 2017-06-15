/**
 * Created by Citrus on 2017/6/12.
 */
function log(ctx){
    console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function(){
    return async function(ctx, next){
        log(ctx);

        await next();
    }
};