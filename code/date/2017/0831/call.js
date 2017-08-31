function Tools1(){
    this.add = function(a, b){
        console.log(a + b);
    }
}
function Tools2(){
    this.sub = function(a, b){
        console.log(a - b);
    }
}

function Tools(){
    Tools1.call(this);
    Tools2.call(this);
}

var aa = new Tools();
aa.add(10, 5);