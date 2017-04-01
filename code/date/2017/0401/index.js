/**
 * Created by Citrus on 01-Apr-17.
 */
let creatFunc = function (m) {
    return function () {
        console.log(m);
    }
};

let creatObj = {
    func: function(a){
        console.log(a);
    }
};

let arrFunc = [];


for(let i = 0; i < 10; i++){
    //setTimeout(function(){
        let func = creatFunc(i);
        arrFunc.push(func);
    //}, 1000)
}

arrFunc.forEach(function(n, i){
   n();
});