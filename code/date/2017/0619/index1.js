/**
 * Created by Citrus on 2017/6/19.
 */
document.title = new Date();

var content = document.querySelectorAll('.content')[0];
var w = window.innerWidth;
var h = window.innerHeight - 200;
var cvs = document.createElement('canvas');
var ctx = cvs.getContext('2d');
cvs.width = w;
cvs.height = h;
content.appendChild(cvs);

var imgSrc = '../../../../img/';
var imgList1 = ['head1.png', 'head2.png', 'head3.png', 'head4.png', 'head5.png'];
var imgList = [
    {
        i: 1,
        w: 50,
        h: 50,
        x: 0,
        y: 0,
        img: 'head1.png'
    }, {
        i:2,
        w: 50,
        h: 50,
        x: 0,
        y: 0,
        img: 'head2.png'
    },{
        i:3,
        w: 50,
        h: 50,
        x: 0,
        y: 0,
        img: 'head3.png'
    },{
        i:4,
        w: 50,
        h: 50,
        x: 0,
        y: 0,
        img: 'head4.png'
    },{
        i:5,
        w: 50,
        h: 50,
        x: 0,
        y: 0,
        img: 'head5.png'
    },
]

var len = imgList.length;
var index = 1;

imgList.forEach(function (n, i) {
    var img = document.createElement('img');
    img.src = imgSrc + n.img;
    n.loadImg = img;
    img.onload = function(){
        index += 1;
        if(index > len){
            init();
        }
    };
});

function init() {
    // init config position
    // var position = {
    //     w: 50,
    //     h: 50
    // };
    // position.x = w / 2 - (position.w / 2);
    // position.y = h - position.h;

    var imgs = [];

    var endTime = false;
    var coutTime = new Date();

    // init insert img
    var startDrawImg = function(){
        var sanimation = requestAnimationFrame(startDrawImg);
        ctx.clearRect(0, 0, w, h);

        var p = getNewPack();
        imgs.forEach(function(p, i){
            drawImg(p);
            if(p.d > 7){
                p.x += 3;
            }else if(p.d < -7){
                p.x -= 3;
            }
            p.y -= p.s;
            console.log(p.y)
            if(p.y + p.h < 0){
                imgs.splice(i, 1);
            }
        });

        // console.log(imgs.length)
        var compareTime = new Date();
        if(compareTime - coutTime > 300){
            //console.log(compareTime - coutTime);
            imgs.push(p);
        }

        if(endTime){
            cancelAnimationFrame(sanimation);
            // ctx.clearRect(0,0,w,h);
        }
    };

    startDrawImg();

    setTimeout(function(){
        endTime = true;
    }, 2000);

    setInterval(function(){
        coutTime = new Date();
    }, 400);

    // insert img
    function drawImg(p) {
        ctx.drawImage(p.loadImg, p.x, p.y, p.w, p.h);
    }

    //随机数
    function getRandom(a,b){
        return Math.round(Math.random()*(b-a)+a);
    }

    // new position, return not repeat position
    function getNewPack(){
        var p = imgList[getRandom(0, len-1)];
        p.x = w / 2 - (p.w / 2);
        p.y = h - p.h;
        p.d = getRandom(-50, 50);
        p.s = getRandom(5, 13);
        return p;
    }
}
