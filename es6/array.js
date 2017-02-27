/**
 * Created by Citrus on 2017/2/27.
 */
let arrLike = {
    'name' : 'zy',
    'age'  : 18,
    'sex'  : 'man',
    length: 5
};
let arr = Array.from(arrLike);
var arr1 = [].slice.call(arrLike);
console.log(arr1);
