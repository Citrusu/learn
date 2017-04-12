/**
 * Created by Citrus on 17/04/11.
 */
function setName(obj){
    obj.name = 'zy';
    obj = {};
    obj.name = 'zlh';
}
let myobj = {};
setName(myobj);
console.log(myobj);