/**
 * Created by Citrus on 2017/2/27.
 */
global.aa = '111';
function abc(){
    aa = 111;
    console.log(this.aa);
}
abc();