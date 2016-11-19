//滑动门
$(function(){
    var meum=$("#change_meun li");
    var cont=$("#change_content li");
    //鼠标悬停
    meum.mouseover(function(){
        var index=$(this).index();
        change_cont(index);
    });
    //点击
    meum.click(function(){
        var index=$(this).index();
        change_cont(index);
    });
    function change_cont(index){
        meum.eq(index).addClass("meun_active").siblings().removeClass("meun_active");
        cont.eq(index).fadeIn().siblings().fadeOut();
    };
});

//图片播放
$(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        autoplay:5000 ,
        speed:600,
        loop: true,

        // 分页器
        pagination: '.swiper-pagination',
        paginationClickable :true,
        // 前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        // 滚动条
        //scrollbar: '.swiper-scrollbar',
    });
});

//图片轮播
$(function(){
    //把最前一个li复制到最后
    $("#showZone>li:first").clone().appendTo("#showZone");
    var showImg=$("#showZone>li");
    var imgshowindex=0;
    var len=showImg.length;
    var autochange=null;
    var showCon=$("#showContro li");
    var showImgEveWidth=showImg.innerWidth();
    var showImgWidth=len*showImgEveWidth;
    $("#showZone").css("width",showImgWidth);
    //控件
    showCon.mouseover(function(){
        imgshowindex=$(this).index();
        imgshow(imgshowindex);
    });
    //往后翻
    $(".imgcontronext").click(function(){
        imgshowindex+=1;
        imgshow(imgshowindex);
        //当显示最后一张（复制的）时直接跳到第二张
        if(imgshowindex>len-1){
            imgshowindex=1;
        }
    });
    //往前翻
    $(".imgcontropre").click(function(){
        imgshowindex-=1;
        imgshow(imgshowindex);
        //当显示第一张时直接跳到最后一张（复制的）
        if(imgshowindex<0){
            imgshowindex=len-2;
        }
    });
    //定时翻页
    $("#showPic").hover(function(){
        //让两个翻页显示
        $(".imgcontronext").show();
        $(".imgcontropre").show();
        //清除定时
        if(autochange){
            clearInterval(autochange);
        }
    },function(){
        //让两个翻页隐藏
        $(".imgcontronext").hide();
        $(".imgcontropre").hide();
        //设置定时器
        autochange=setInterval(function(){
            imgshowindex+=1;
            imgshow(imgshowindex);
            //当显示最后一张（复制的）时直接跳到第二张
            if(imgshowindex>len-1){
                imgshowindex=1;
            }
        },5000);
    }).trigger("mouseleave");

    //图片显示
    function imgshow(imgshowindex){
        //当显示最后一张（复制的）时，控件第一个为选中状态
        if(imgshowindex==len-1){
            showCon.eq(0).attr("class","buttonRadiusCheck")
                .siblings().attr("class","buttonRadius");
        }
        //当显示最后一张时（复制的），定位到第一张
        if(imgshowindex>=len){
            $("#showZone").css("left","-"+0+"px");
            imgshowindex=1;
        }else if(imgshowindex<0){
            //当显示第一张时，定位到最后一张（非复制的）
            $("#showZone").css("left","-"+(len-1)*showImgEveWidth+"px");
            imgshowindex=len-2;
        }
        $("#showZone").stop(true,false).animate({left:"-"+imgshowindex*showImgEveWidth+"px"},800);
        //改变控件的样式
        showCon.eq(imgshowindex).attr("class","buttonRadiusCheck")
            .siblings().attr("class","buttonRadius");
    }

});