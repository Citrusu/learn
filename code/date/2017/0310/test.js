/**
 * Created by Citrus on 2017/3/10.
 */

// for(var i = 0; i < 5; i++){
//     setTimeout(function(){
//         console.log(i);
//     },i * 1000);
// }
//
// for(var i = 0; i < 5; i++){
//     (function(i){
//         setTimeout(function(){
//             console.log(i);
//         },i * 1000);
//     })(i)
// }

// for(var i = 0; i < 5; i++){
//     (function(){
//         setTimeout(function(){
//             console.log(i);
//         },i * 1000);
//     })(i)
// }

for(var i = 0; i < 5; i++){
    setTimeout(function(i){
        console.log(i);
    },i * 1000);
}
