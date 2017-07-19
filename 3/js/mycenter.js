//判断是否是登录状态
function login(){
	var userName = localStorage.getItem("name") || "";
	var userlogo = localStorage.getItem("logo") || "";
	var usergold = localStorage.getItem("gold") || "";
	var userlevel = localStorage.getItem("level") || "";
	console.log("保存的userName为：" + userName);
	if (userName !== "") {
		$(".background").hide();
		$(".loginRegister").hide();
		$("body").css("overflow","visible");
		$(".header .headerImg p").html(userName);
		if (userlogo !== "") {
			$(".headerImg img").attr("src",userlogo);
		}
		$(".header .level").html("等级 : " + userlevel);
		$(".header .gold").html("金币 : " + usergold);
	} else{
		$(".background").show();
		$(".loginRegister").show();
		$("body").css("overflow","hidden");
	}
}
login();

//退出按钮
$(".header .exit").click(function () {
	localStorage.setItem("name","");
	localStorage.setItem("thirdName","");
	localStorage.setItem("gold","");
	$(".background").show();
	$(".loginRegister").show();
	$("body").css("overflow","hidden");
})

//充值选项
$(".pay ul li").click(function () {
	$(".pay ul li").removeClass();
	$(this).addClass("checkpay");
	$("#money").val($(this).children("p").html());
})
//充值按钮
$(".pay button").click(function () {
	alert("此功能暂未开放，可通过动彩APP进行充值");
})


//页数更新
$("#page").on("click","span",function () {
	$(this).addClass("check").siblings().removeClass("check");
	orderFn($(this).html());
})
//页码写入
orderPage();
function orderPage(){
	$.ajax({
		type:"post",
		url:"v1/webbet/records/1",
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				//写入页码编号
				var page = "";
				for (var i = 1 ; i <= data.totalpage; i++) {
					page += '<span>' + i + '</span>'
				}
				$("#page").html(page);
				$("#page span").eq(0).addClass("check");
				
				//我的注单详情
				var order = "";
				for (j in data.records) {
					function winlose() {
						if (data.records[j].status == 0) {
							return '<p>可赢金额:';
						} else if (data.records[j].status == 1) {
							return '<p style="color: #7fc666;">赢:'
						}else{
							return '<p style="color: #d76861;">输:'
						}
					}
					order += '<div class="order"><div class="orderHeader"><div class="orderTitle"><p class="orderName">'+ data.records[j].team +' '+ orderRet(data.records[j].handicap)+'@'+ data.records[j].outright +'</p><p class="pankou">'+ data.records[j].betname +'</p></div><div><p>'+ data.records[j].leaguename +' '+ data.records[j].pkname +'</p><p>比赛时间:<span>'+ data.records[j].gametime +'</span></p></div></div><div class="orderMain"><div><p>投注金额:<span>'+ data.records[j].gold +'</span></p>' + winlose() + '<span>'+ data.records[j].wingold +'</span></p></div><div><p>投注时间:<span>'+ data.records[j].createtime +'</span></p></div><div><p class="orderNumber">投注单号:<span>'+ data.records[j].code +'</span></p></div></div></div>';
				}
				$("#myorder").html(order);
			}else if(data.resultcode==998){
				localStorage.setItem("name","");
				localStorage.setItem("thirdName","");
				localStorage.setItem("gold","");
				$(".background").show();
				$(".loginRegister").show();
				$("body").css("overflow","hidden");
			}else{
				$("#myorder").html('<p style="background: white;width: 650px;height: 300px;text-align: center; line-height: 300px;">暂未记录</p>');
			}
		}
	});
}

//我的注单
function orderFn(idx){
	$.ajax({
		type:"post",
		url:"v1/webbet/records/" + idx,
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {				
				//我的注单详情
				var order = "";
				for (j in data.records) {
					function winlose() {
						if (data.records[j].status == 0) {
							return '<p>可赢金额:';
						} else if (data.records[j].status == 1) {
							return '<p style="color: #7fc666;">赢:'
						}else{
							return '<p style="color: #d76861;">输:'
						}
					}
					order += '<div class="order"><div class="orderHeader"><div class="orderTitle"><p class="orderName">'+ data.records[j].team +' '+ orderRet(data.records[j].handicap)+'@'+ data.records[j].outright +'</p><p class="pankou">'+ data.records[j].betname +'</p></div><div><p>'+ data.records[j].leaguename +' '+ data.records[j].pkname +'</p><p>比赛时间:<span>'+ data.records[j].gametime +'</span></p></div></div><div class="orderMain"><div><p>投注金额:<span>'+ data.records[j].gold +'</span></p>' + winlose() + '<span>'+ data.records[j].wingold +'</span></p></div><div><p>投注时间:<span>'+ data.records[j].createtime +'</span></p></div><div><p class="orderNumber">投注单号:<span>'+ data.records[j].code +'</span></p></div></div></div>';
				}
				$("#myorder").html(order);
			}else if(data.resultcode==998){
				localStorage.setItem("name","");
				localStorage.setItem("thirdName","");
				localStorage.setItem("gold","");
				$(".background").show();
				$(".loginRegister").show();
				$("body").css("overflow","hidden");
			} else{
				$("#myorder").html('<p style="background: white;width: 650px;height: 300px;text-align: center; line-height: 300px;">暂未记录</p>');
			}
		},
		error:function () {
			console.log("请求失败");
		}
	});
}

function orderRet(pei){
	if (pei == undefined) {
		return "";
	} else{
		return pei;
	}
}
