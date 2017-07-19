/**
 * Created by admin on 2016/11/15.
 */
//读取缓存的url
var mainUrl = sessionStorage.getItem("mainUrl") || "";
var userName = sessionStorage.getItem("userName") || "";
var mainIdx = sessionStorage.getItem("mainIdx") || "0";
if (userName != "") {
	if (mainUrl != "") {
		$("#main iframe").attr("src",mainUrl);
	} else{
		$("#main iframe").attr("src",'tpl/league/league.html');
	}
	$("ul.list li").eq(mainIdx).addClass('active').siblings().removeClass();
	$('div.userInfo span').html(userName);
}else{
	window.location='index.html';
}
//用户权限
var programs=window.sessionStorage.getItem('programs');
//var programs='league&gameplan&import&partner&admin&rule&program&billboard&team&player';
var arr=programs.split('&');
var showArr=[]
var htmlArr = ["league","billboard","team","player","gameplan","import","partner","admin","rule","program"];
//将arr中没有的路径隐藏
for(var i= 0;i<htmlArr.length;i++){
    for(var j= 0;j<arr.length;j++){
        if(arr[j]==htmlArr[i]){
        	showArr.push(arr[j])
            break;
        }
    }
    if(j>=arr.length){
        $('#main ul.list li:nth-child('+(i+1)+')').hide();
      
    }
}
//选择左侧标题
$("#main ul.list li").click(function () {
    //改变选中样式
    $('#main li.active').removeClass('active');
    $(this).addClass('active');
    var htmlName = showArr[$("#main li:visible").index($(this))];
    var mainUrl = "tpl/"+ htmlName +"/"+ htmlName +".html";
    //写入iframe地址
    $("#main iframe").attr("src",mainUrl);
    //存入当前页面的URL
    sessionStorage.setItem("mainUrl",mainUrl);
    //存入当前页面的idx;
    sessionStorage.setItem("mainIdx",$("#main ul li:visible").index($(this)));
})
//点击右上角用户名弹出修改密码和退出登录
$('#header div.userInfo').click(function(){
    $('#header div.userInfo ul').toggle();
    if($('#header div.userInfo ul:visible').length>0){
        $(this).children('i').css('background-image','url(img/icon_xiala_01.png)');
    }else{
        $(this).children('i').css('background-image','url(img/icon_xiala_02.png)');
    }
});
//点击修改密码或退出登录弹出对应的框
$('.userInfo li').click(function(){
    if($(this).index('.userInfo li')==0){
        $('div.module1').show();
    }else if($(this).index('.userInfo li')==1){
        $('div.module2').show();
        
    }
})
//点击取消将弹出框隐藏
$('.updatePassWord button.gray').click(function(){
    $('div.module1').hide();
})
$('.logout button.gray').click(function(){
    $('div.module2').hide();
})
//点击修改密码确认按钮提交密码
$('div.updatePassWord button.red').click(function(){
    if($('[name="newpassword"]').val()!==$('[name="relpassword"]').val()){
        alertFn('两次密码输入不一致');
    }else{
        var obj=JSON.stringify({newpassword:$('[name="newpassword"]').val(),oldpassword:$('[name="oldpassword"]').val()})
        $.ajax({
            url:'v1/manager/admin/modifypassword',
            data:obj,
            type:'post',
            contentType:'application/json',
            success:function(data){
                if(data.resultcode===1000){
                    alertFn('密码修改成功');
                    window.location='index.html';
                    $('div.module1').hide();
                }else if(data.resultcode==998){
                    alertFn('登录失效，请重新登录');
                    returnLogin();
                }else{
                    alertFn(data.msg);
                }
            }
        })
    }
})
//退出登录
$('div.logout button.red').click(function(){
    $.ajax({
        url:'v1/manager/admin/logout',
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
            	window.sessionStorage.clear();
                window.location='index.html';
            }else if(data.resultcode==998){
                alertFn('登录失效，请重新登录');
                sessionStorage.clear();
                window.location='index.html';
            }else{
                alertFn(data.msg);
            }
        }
    })
})
//alert弹出框
function alertFn(str){
    $('div.module3').show();
    $('div.module3 div.alertFn p').html('提示 : '+str)
    $('div.alertFn button.red').click(function(){
        $('div.module3').hide();
    })
}
//子集iframe未登录回调函数
function returnLogin(){
    //清空本地缓存
    sessionStorage.clear();
    window.location='../../index.html';
}