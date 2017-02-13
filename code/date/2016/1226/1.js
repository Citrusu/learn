/**
 * Created by Citrus on 2016/12/26.
 */
var obj = document.querySelectorAll('video')[0];
obj.currentTime = obj.duration * .25;
obj.play();