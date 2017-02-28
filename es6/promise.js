/**
 * Created by Citrus on 2017/2/27.
 */
function timeout(ms){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    })
}
timeout(1000).then((value) => {
    console.log(value);
});