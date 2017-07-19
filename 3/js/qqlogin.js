//QQ获取openid 和 accesstoken
function qq(){
	if(QC.Login.check()) { //如果已登录
	QC.Login.getMe(function(openId, accessToken) {
		alert(["当前登录用户的", "openId为：" + openId, "accessToken为：" + accessToken].join("\n"));
		localStorage.setItem("openId",openId);
		console.log("存入的localStorage为：" + localStorage.getItem("openId"));
	});
	
	//从页面收集OpenAPI必要的参数。get_user_info不需要输入参数，因此paras中没有参数
	var paras = {};
	//用JS SDK调用OpenAPI
	QC.api("get_user_info", paras)
		//指定接口访问成功的接收函数，s为成功返回Response对象
		.success(function(s) {
			//成功回调，通过s.data获取OpenAPI的返回数据
			alert("获取用户信息成功！当前用户昵称为：" + s.data.nickname);
			alert("获取用户信息成功！当前用户头像为：" + s.data.figureurl_qq_2);
		})
		//指定接口访问失败的接收函数，f为失败返回Response对象
		.error(function(f) {
			//失败回调
			alert("获取用户信息失败！");
		})
		//指定接口完成请求后的接收函数，c为完成请求返回Response对象
		.complete(function(c) {
			//完成请求回调
			alert("获取用户信息完成！");
		});
		
	}
}
//qq();

//微信三方登陆
function weixin() {
	var urlArr = window.location.search.slice(1).split("&");
	var main = {};
	for (var i = 0; i < urlArr.length ; i++) {
		main[urlArr[i].split("=")[0]] = urlArr[i].split("=")[1];
	}
	var myCode = main.code;
	if (myCode == "" || myCode == undefined) {
		console.log("code为空");
		return
	} else{
		var saveData = JSON.stringify({type:1,token:myCode,thirdauthorid:""});
		console.log(saveData);
		//发送code值
		$.ajax({
			type:"post",
			url:"v1/user/login/third",
			async:true,
			data:saveData,
			contentType:'application/json',
			success:function (data) {
				//已经绑定手机号直接登录成功
				console.log(data);
				if (data.resultcode == 1000) {
					localStorage.setItem("name",data.name);
					localStorage.setItem("logo",data.logo);
					console.log("获得用户昵称为："+data.name);
					console.log("获得用户头像为："+data.logo);
					//获取金币接口
					gold();
					//刷新网页
					login();
				//未绑手机跳转到注册界面
				} else if (data.resultcode == 2013) {
					localStorage.setItem("thirdId",data.openid);
					localStorage.setItem("thirdName",data.name);
					localStorage.setItem("thirdLogo",data.logo);
					console.log("获得用户昵称为："+data.name);
					console.log("获得用户头像为："+data.logo);
					//跳转到注册页面
					window.open("register.html","_self");
				}
			}
		});		
	}
}
weixin();
