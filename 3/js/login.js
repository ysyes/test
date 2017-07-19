//QQ三方登陆
$("#qq").click(function () {
//	QC.Login.showPopup({
//		appId:"101358396",
//		redirectURI:"http://www.51dongcai.com"
//	});

	alert("暂未开放")
})

//图片验证码
//$("#code").focus(function () {
//	code();
//})
$(".login .code img").click(function () {
	code();
});
code();
function code() {
	var myDate = new Date();
	var time = myDate.getTime();
	$(".login .code img").prop("src","v1/user/verifycode/" + myDate.getTime())
}


//登录记住密码选项
function mima() {
	var loUser = localStorage.getItem("user") || "";
	var loPass = localStorage.getItem("pass") || "";
	$("#name").val(loUser);
	$("#password").val(loPass);
	if(loUser !== "" && loPass !== "") {
		$("#check").prop("checked","checked")
	}
	
	$(".login button").click(function () {
		if($("#check").prop("checked")) {
			localStorage.setItem("user", $("#name").val());
			localStorage.setItem("pass", $("#password").val());
		} else {
			localStorage.setItem("user", "");
			localStorage.setItem("pass", "");
		}
		
		//登陆请求
		if ($("#name").val() && $("#password").val() && $("#code").val()) {
			var result = new Object();
			result.accounts = $("#name").val();
			result.password = $("#password").val();
			result.verifycode = $("#code").val();
			var saveData = JSON.stringify(result);
			console.log(saveData)
			$.ajax({
				type:"post",
				url:"v1/user/login",
				async:true,
				data:saveData,
				contentType:'application/json',
				success:function (data) {
					console.log(data);
					if (data.resultcode == 1000) {
						console.log("登陆成功");
						localStorage.setItem("name",data.name);
						if (data.logo != undefined) {
							localStorage.setItem("logo",data.logo);
						}
						
						//获取金币接口
						gold();
						
					}else{
						alert(data.msg);
					}
				},
				error:function () {
					console.log("请求失败");
				}
			});
			
		}else{
			alert("输入信息")
		}
	})	
}
mima();

//获取用户金币等级
function gold() {
	$.ajax({
		type:"get",
		url:"v1/webgold",
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				localStorage.setItem("gold",data.gold);
				var levelArr = ["草民","七品","六品","五品","四品","三品","二品","一品"];
				localStorage.setItem("level",levelArr[data.level]);
				//刷新页面
				login();
				window.location.reload();
			} else{
				alert(data.msg);
			}
		},
		error:function () {
			console.log("金币请求出错")
		}
	});
}
