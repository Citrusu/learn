/**
 * Created by Citrus on 2017/2/27.
 */
function func(ms){
    setTimeout((val) => {
        console.log(val);
    },ms,'abc');
}
func(1000);