/**
 * Created by Citrus on 2017/6/28.
 */
var log = function(func){
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            resolve(func);
        }, 3000)
    })
}

var start = async function(){
    console.log(1);
    var func = await log(function(){console.log('delay')});
    func();
    console.log(2);
};

start();