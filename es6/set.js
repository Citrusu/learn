/**
 * Created by Citrus on 2017/3/17.
 */
const s = new Set();
let arr = [1,2,1,3,2,2,3,4,3,1];

arr.forEach(function(n){
    s.add(n);
});

for(let i of s){
    console.log(i);
}