/**
 * Created by Citrus on 2017/3/7.
 */
var data = {
    name : 'zy'
};
function func(a ,b) {
    console.log(this.name);
    console.log(a);
    console.log(b);
}

func.call(data, ['zlh', 'zt', 'lp', 'll'], 'bb');