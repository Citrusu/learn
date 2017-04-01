/**
 * Created by Citrus on 2017/3/17.
 */
function* helloGenerator(){
    yield 'hello';
    yield 'world';
    //return 'end';
    console.log('yes');
}

let hw = helloGenerator();
console.log(0);
let node = hw.next(0);
console.log(node.value +','+ node.done);

console.log(1);
let node1 = hw.next(1);
console.log(node1.value +','+ node1.done);

console.log(2);
let node2 = hw.next(2);
console.log(node2.value +','+ node2.done);

console.log(3);
let node3 = hw.next(3);
console.log(node3.value +','+ node3.done);
console.log('done');