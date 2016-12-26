/**
 * Created by ZY on 2015/12/14.
 */

//用户名
$(function() {
    var user_name = $("#user_name");
    var reg = /^[0-9a-zA-Z]*$/g ;//只能英文和数字
    var user_name_info=$("#user_name_info");
    user_name.blur(function(){
        if(user_name.val().match(reg) &&  user_name.val()){
            user_name_info.html("√正确");
            user_name_info.css("color","green");
        }else if(! user_name.val()){
            user_name_info.html("用户名不能为空");
            user_name_info.css("color","red");
        }else{
            user_name_info.html("只能是英文和数字");
            user_name_info.css("color","red");
        }
    });
});

//密码
$(function(){
    var password=$("#passwordd");
    //密码6-16位字母和数字
    var reg=/^[0-9a-zA-Z]{6,16}/;
    password.blur(function(){
        var password_info=$("#password_info");
        if(password.val().match(reg)){
            password_info.html("√正确");
            password_info.css("color","green");
        }else{
            password_info.html("密码需要6-16位字母和数字");
            password_info.css("color","red");
        }
    });
    //重复输入的密码
    var password_confirm=$("#password_confirm");
    var password_confirm_info=$("#password_confirm_info");
    password_confirm.blur(function(){
        if($(this).val()==password.val()){
            password_confirm_info.html("√正确");
            password_confirm_info.css("color","green");
        }else{
            password_confirm_info.html("密码不一致");
            password_confirm_info.css("color","red");
        }
    });
});

//年龄
$(function(){
    $("#age").blur(function(){
        var age=$(this).val();
        var age_input_info=$("#age_input_info");
        if(age < 18){
            age_input_info.html("未满18岁禁止注册");
            age_input_info.css("color","red");
        }else{
            age_input_info.html("√正确");
            age_input_info.css("color","green");
        }
    });
});
//随机生成验证码
$(function(){
    //随机两个数字
    var check_code1=Math.round(Math.random()*10);
    var check_code2=Math.round(Math.random()*10);
    $("#check-code1").html(check_code1);
    $("#check-code2").html(check_code2);
    //两个数的结果
    var sum=check_code1+check_code2;
    $("#check-code").blur(function(){
        var input_res=$(this).val();
        var info=$("#check_code_info");
        if(input_res != sum){
            info.html("不正确,请重新计算");
            info.css("color","red");
        }else{
            info.html("√正确");
            info.css("color","green");
        }
    });
});