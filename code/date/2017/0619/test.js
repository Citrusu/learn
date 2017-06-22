/**
 * Created by Citrus on 2017/6/20.
 */
//随机数
function getRandom(a,b){
    return Math.round(Math.random()*(b-a)+a);
}
console.log(getRandom(-5,10));
let arr = [];
for(let i = 0; i < 1000; i++){
    arr.push(getRandom(-200, 200));
}
console.log(arr);