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

hw.next(function(data){
    console.log(data);
});
hw.next();
hw.next();