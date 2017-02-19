/**
 * Created by Citrus on 2017/2/19.
 */
//洗牌算法，数组随机排序
Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};

var arr = [1,2,3,4];
console.log(arr.shuffle());