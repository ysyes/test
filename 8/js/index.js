/**
 * Created by admin on 2016/11/15.
 */
$(function(){
if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();
};
})
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
window.sessionStorage.clear();
//点击图片调用验证码
$("#main .login p:nth-child(3) img").click(function () {
    code();
})
//大小写锁定
//$('#main input[name="password"]').keydown(function(){
//	if(event.keyCode=='20'){
//		$('#main .login p i').toggle();
//	}
//})
//$('#main input[name="password"]').blur(function(){
//	$('#main .login p i').hide();
//})

//获取验证码
code();
function code() {
    var myDate = new Date();
    $("#main .login p:nth-child(3) img").prop("src","v1/manager/admin/user/verifycode/" + myDate.getTime())
}
$('body').keydown(function(){
    if (event.keyCode == "13") {
        $('#main .login button').click();
    }
})
//从localStorage里获取name;
if(window.localStorage.getItem('name')){
    $('#main .login p:first-child input[type="text"]').val(window.localStorage.getItem('name'));
}else{
    $('#main .login p:first-child input[type="text"]').val('');
}
//按回车登录
$("body").keydown(function() {
    if (event.keyCode == "13") {
        $("#main .login button").click();
    }
});
//点击登录按钮进行登录
$('#main .login button').click(function(){
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    if(obj.remember=='on'){
        window.localStorage.setItem('name',obj.name);
    }else if(obj.remember==undefined||obj.remember==null){
        window.localStorage.clear();
    }
    if($('input[name="name"]').val()==""){
    	$('div.login div.box div').css('opacity','1').html('※  用户名不能为空');
    	$('input[name="name"]').focus()
    }else if($('input[name="password"]').val()==""){
    	$('div.login div.box div').css('opacity','1').html('※  密码不能为空');
    	$('input[name="password"]').focus()
    }else if($('input[name="verifycode"]').val()==""){
    	$('div.login div.box div').css('opacity','1').html('※  验证码不能为空');
    	$('input[name="verifycode"]').focus();
    }else{
    	obj=JSON.stringify(obj);
        $.ajax({
            url:'v1/manager/admin/login',
            type:'POST',
            data:obj,
            contentType:'application/json',
            success:function(data){
            	$('input.red').removeClass('red');
                if(data.resultcode==1000){
                	$('div.login div.box div').css('opacity','0');
                    window.sessionStorage.setItem('userName',data.realname);
                    for(var i=0,arr=[];i<data.programs.length;i++){
                    	arr.push(data.programs[i].accesspath.split('/')[3]);
                    }
                    window.sessionStorage.setItem('programs',arr.join('&'));
                    window.location='default.html';
                }else{
                	$('div.login div.box div').css('opacity','1').html('※  '+data.msg);
                	if(data.msg=='用户不存在'){
                    	$('input[name="name"]').focus().addClass('red');
                	}else if(data.msg=='密码错误'){
                		$('input[name="password"]').focus().addClass('red');
                	}else if(data.msg=='验证码错误'){
                		$('input[name="verifycode"]').focus().addClass('red');
                	}
                }
            }
        })
    }
    
})