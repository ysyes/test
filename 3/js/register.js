//用户协议
$(".register p a").click(function () {
	$("#xieyi").show();
});
$("#xieyi button").click(function () {
	$("#xieyi").hide();
})

//键盘只能输入数字
//function keyPress() {
//	var keyCode = event.keyCode;
//	if ((keyCode >= 48 && keyCode <= 57))
//	{
//		event.returnValue = true;
//	} else {
//		event.returnValue = false;
//	}
//}
//手机号正则验证
$("#tel").blur(function () {
	telFn();
})
function telFn(){
    var phone = $('#tel').val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
    	$("#tel").next().removeClass().addClass("false");
        //alert("手机号码有误，请重填");
        return false;
    }else{
    	$("#tel").next().removeClass().addClass("true");
    	//alert("手机正确");
    	return true;
    }
}

//昵称验证
if (localStorage.getItem("thirdName") !== undefined) {
	$("#name").val(localStorage.getItem("thirdName"));
}
$("#name").blur(function () {
	nameFn();
});
//定义昵称
 var nameTrue = 0;
function nameFn(){
    var name = $('#name').val();
    if(name !== ""){
    	var saveData = JSON.stringify({name:name});
		$.ajax({
			type:"post",
			url:"v1/user/checkname",
			async:true,
			data:saveData,
			contentType:'application/json',
			success:function (data) {
				console.log(data);
				if (data.resultcode == 1000) {
					//昵称不重复为1
					nameTrue = 1;
					$("#name").next().removeClass().addClass("true");
				} else{
					alert(data.msg);
					$("#name").next().removeClass().addClass("false");
				}
			},
			error:function () {
				console.log("请求错误");
			}
		});
    }else{
    	$("#name").next().removeClass().addClass("false");
        return false;
    }
}

//设置密码验证
$("#password").blur(function () {
	passFn();
})
function passFn(){
    var password = $('#password').val();
    if(!(/^([A-Za-z]|[0-9]|[,.!@#$%&_*-+=?;]){6,20}$/.test(password))){
    	$("#password").next().removeClass().addClass("false");
        return false;
    }else{
    	$("#password").next().removeClass().addClass("true");
    	return true;
    }
}

//重新设置密码
$("#passwordRepeat").blur(function () {
	passRepeat();
})
function passRepeat(){
	passFn();
    var passwordRepeat = $('#passwordRepeat').val();
    if($('#passwordRepeat').val() !== $('#password').val() || $('#passwordRepeat').val() == ""){
    	$("#passwordRepeat").next().removeClass().addClass("false");
        return false;
    }else{
    	$("#passwordRepeat").next().removeClass().addClass("true");
    	return true;
    }
}

//验证码验证
$("#verifycode").blur(function () {
	verifycodeFn();
})
function verifycodeFn(){
    var num = $('#verifycode').val();
    if(!(/^[0-9]{6}$/.test(num))){
    	$(".tel span").eq(0).removeClass().addClass("false");
        return false;
    }else{
    	$(".tel span").eq(0).removeClass().addClass("truefalse");
    	return true;
    }
}


//获取手机号倒计时
$(".tel .button").click(function () {
	//手机号通过验证后请求
	if (telFn()) {
		$(".tel .button").attr("disabled",true);
		var time = 60;
		//请求成功开始计时60S
		var setidx = setInterval(function () {
			$(".tel .button").attr("disabled",true);
			$(".tel .button").val(--time + "s后重试");
			//时间为0时可以重新请求验证码
			if(time === 0){
				$(".tel .button").removeAttr("disabled");
				$(".tel .button").val("点击获取");
				clearInterval(setidx);
			}
		},1000);
		
		$.ajax({
			type:"get",
			url:"v1/user/smsverify/" + $('#tel').val(),
			async:true,
			success:function (data) {
				console.log(data);
				if (data.resultcode == 1000) {
					$(".tel .button").val("发送成功");
					
				}else{
					$(".tel .button").removeAttr("disabled");
					clearInterval(setidx);
					$(".tel .button").val("获取失败");
				}
			},
			error:function () {
				$(".tel .button").removeAttr("disabled");
				clearInterval(setidx);
				$(".tel .button").val("发送失败");
			}
		});
		
	}	
})

//勾选足彩协议
function checkFn() {
	if ($(".checkBox").prop("checked")) {
		$(".register p .check").hide();
		return true;
	} else{
		$(".register p .check").show();
		return false;
	}
}

//点击注册按钮
$(".register .sub").click(function () {
	if (telFn() && verifycodeFn() && passFn() && checkFn()&& passRepeat() && nameTrue == 1) {
		//注册信息
		var result = new Object();
		result.name = $("#name").val();
		result.password = $("#password").val();
		result.mobile = $("#tel").val();
		result.verifycode = $("#verifycode").val();
		//获取三方登录的信息
		var thirdId = localStorage.getItem("thirdId");
		var thirdLogo = localStorage.getItem("thirdLogo");
		if (thirdId !== undefined && thirdId !== "" && thirdLogo !== undefined && thirdLogo !== "") {
			result.thirdauthorid = thirdId;
			result.logo = thirdLogo;
		}
		
		var saveData = JSON.stringify(result);
		console.log(saveData);

		//请求注册
		$.ajax({
			type:"post",
			url:"v1/user/",
			async:true,
			data:saveData,
			contentType:'application/json',
			success:function (data) {
				console.log(data);
				if (data.resultcode == 1000) {
					alert("注册成功");
					//注册未登录
//					localStorage.setItem("name",data.name);
//					if (data.logo !== undefined) {
//						localStorage.setItem("logo",data.logo);
//					}
					//回跳主页
					setTimeout(function () {
						window.open("index.html","_self");
					},1000)
				} else{
					alert(data.msg);
				}
			},
			error:function () {
				alert("请求失败");
			}
			
		});
		
	}else{
		telFn();verifycodeFn();passFn();nameFn();checkFn();passRepeat();
		alert("请填写正确信息");
	}
	
})
