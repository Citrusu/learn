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
var imgList = ['head1.png', 'head2.png', 'head3.png', 'head4.png', 'head5.png'];

var loadImgList = [];
var len = imgList.length;
var index = 1;

imgList.forEach(function (n, i) {
    var img = document.createElement('img');
    img.src = imgSrc + n;
    img.onload = function(){
        loadImgList.push(img);
        index += 1;
        if(index > len){
            init();
        }
    };
});

function init() {
    // init config position
    var imgs = [];

    var endTime = false;
    var coutTime = new Date();

    // init insert img
    var startDrawImg = function () {
        var sanimation = requestAnimationFrame(startDrawImg);
        ctx.clearRect(0, 0, w, h);

        var p = getNewPack();
        imgs.forEach(function (p, i) {
            drawImg(p.img, p);
            if (p.d > 7) {
                p.x += 3;
            } else if (p.d < -7) {
                p.x -= 3;
            }
            p.y -= p.s;

            if (p.y + p.h < - h) {
                imgs.splice(i, 1);
            }
        });

        // console.log(imgs.length)
        var compareTime = new Date();
        if (compareTime - coutTime > 200) {
            //console.log(compareTime - coutTime);
            imgs.push(p);
        }

        if (endTime) {
            cancelAnimationFrame(sanimation);
            // ctx.clearRect(0,0,w,h);
        }
    };

    startDrawImg();

    //红包出现的总时间
    setTimeout(function () {
        endTime = true;
        clearInterval(packInterval);
    }, 5000);

    //红包出现间隔
    var packInterval = setInterval(function () {
        coutTime = new Date();
    }, 400);

    // insert img
    function drawImg(img, p) {
        ctx.drawImage(img, p.x, p.y, p.w, p.h);
    }

    //随机数
    function getRandom(a, b) {
        return Math.round(Math.random() * (b - a) + a);
    }

    /*
    * new position, return not repeat position
    * return obj
    * obj.s speed
    * obj.d direction
    * */
    function getNewPack() {
        var p = {};
        p.d = getRandom(-50, 50);
        p.s = getRandom(5, 13);
        var width = getRandom(25, 60);
        var height = width * 1.2;
        p.w = width;
        p.h = height;
        p.x = w / 2 - (p.w / 2);
        p.y = h - p.h;
        p.img = loadImgList[getRandom(0, len - 1)];
        return p;
    }
}
