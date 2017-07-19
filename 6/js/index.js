//读取缓存的url
var mainUrl = sessionStorage.getItem("mainUrl") || "";
var userName = sessionStorage.getItem("userName") || "";
var mainIdx = sessionStorage.getItem("mainIdx") || "0";
if (userName != "") {
	if (mainUrl != "") {
		$("#main iframe").attr("src",mainUrl);
	} else{
		$("#main iframe").attr("src",'tpl/yhgl/yhgl.html');
	}
	$("#title ul li").eq(mainIdx).addClass('check').siblings().removeClass();
	$("header .login span").html(userName);
	
	$("#login").hide();
	$("#box").show();
}else{
	$("#login").show();
	$("#box").hide();
}

//选择左侧标题
$("#title ul li").click(function () {
	//改变选中样式
	$(this).addClass('check').siblings().removeClass();
	var htmlArr = ["yhgl","jygl","wzgl","stxx","jfb","recommend","banner","hdgl","spgl","administrator","bsgl"];
	var htmlName = htmlArr[$("#title ul li").index($(this))];
	var mainUrl = "tpl/"+ htmlName +"/"+ htmlName +".html";
	//写入iframe地址
	$("#main iframe").attr("src",mainUrl);
	//存入当前页面的URL
	sessionStorage.setItem("mainUrl",mainUrl);
	//存入当前页面的idx;
	sessionStorage.setItem("mainIdx",$("#title ul li").index($(this)));
})

//验证码
$("#login ul .test span").click(function () {
	code();
})
code();
function code() {
	var myDate = new Date();
	$("#login ul .test span img").prop("src","v1/user/verifycode/" + myDate.getTime())
}
//按回车键登录
$("body").keydown(function() {
    if (event.keyCode == "13") {
    	$("#login button").click();
    }
});
//登录按钮
$("#login button").click(function () {
	var name = $("#name").val();
	var pass = $("#pass").val();
	var code = $("#code").val();
	var saveData = JSON.stringify({accounts:name,password:pass,verifycode:code});
	//前端判断输入规则
	if (name != "" && pass != "" && code != "") {
		$.ajax({
			type:"post",
			url:"v1/user/login",
			async:true,
			data:saveData,
			contentType:'application/json',
			success:function (data) {
				if (data.resultcode == 1000) {
					//登录成功
					$("header .login span").html(data.realname);
					sessionStorage.setItem("userName",data.realname);
					userName = data.realname;
					$("#login").hide();
					$("#box").show();
					$('#main iframe').attr('src','tpl/yhgl/yhgl.html');
					$("#title ul li").eq(0).addClass('check').siblings().removeClass();
				} else{
					alert(data.msg);
				}
			}
		});
		
	} else{
		alert("请输入输入信息")
	}
})
//子集iframe未登录回调函数
function returnLogin(){
	code();
	//清空本地缓存
	sessionStorage.clear();
	$("header .login span").html('管理员登录');
	$("#login").show();
	$("#box").hide();
}
//退出按钮
$("#exit").click(function () {
	returnLogin();
});
//修改密码
$("#amend").click(function () {
	if (userName != "") {
		$("#amendBox").show();
	}
})
$("#amendBox button").click(function () {
	var oldPass = $("#oldPass").val();
	var newPass = $("#newPass").val();
	var newPassRep = $("#newPassRep").val();
	if (oldPass != "" && newPass != "" && newPassRep != "") {
		if (newPass === newPassRep) {
			var saveData = JSON.stringify({oldpassword:oldPass,password:newPass});
			$.ajax({
				type:"post",
				url:"v1/user/updatepwd/5",
				async:true,
				data:saveData,
				contentType:'application/json',
				success:function (data) {
					console.log(data);
					if (data.resultcode == 1000) {
						alert("修改成功");
						$("#amendBox").hide();
						returnLogin();
					} else{
						alert(data.msg);
					}
					
				},
				error:function () {
					console.log("请求失败")
				}
			});
		}else{
			alert("两次输入密码不同")
		}
	} else{
		alert('请输入信息')
	}	
})
$("#amendBox div").click(function () {
	$("#amendBox").hide();
})