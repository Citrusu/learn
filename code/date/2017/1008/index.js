var count = 50000;
var recount = 0;
for(var i = 0; i < 24; i++){
    var nowCount = count * .0001 * 30;
    recount += nowCount
    count -= 2084;
    console.log(nowCount);
}
console.log(count);
console.log(recount);