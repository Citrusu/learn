/**
 * Created by Citrus on 2017/6/30.
 */
function a(){
    let aa = 0;
    function b(){
        return aa += 1;
    }
    return b;
}

let show = a();
console.log(show());
console.log(show());
console.log(show());
console.log(show());