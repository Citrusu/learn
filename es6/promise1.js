/**
 * Created by Citrus on 2017/2/27.
 */
let promise = new Promise(function(resolve ,reject){
    console.log('promise');
    resolve();
});
promise.then(function(){
    console.log('done');
});
console.log('hi');