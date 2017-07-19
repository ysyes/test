//右侧注单固定
document.onscroll = function () {
	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
	//$(".right").offset({top:scrolltop + 70});
	if (scrolltop >= 410) {
		$(".right").css("top",(scrolltop-410) + "px");
	}else{
		$(".right").css("top","0px");
	}
}

//竞猜标题点击切换
$(".guessTitle").on("click","ul li",function () {
	$(this).addClass("check").siblings().removeClass("check");
	var teams = ["zhongchao","zhongjia","zhongyi","yaguan","ouguan","yingchao","xijia","dejia","yijia"];
	var idx = $(".guessTitle ul li").index($(this));
	console.log(teams[idx]);
	guessTeam(teams[idx]);
})
//遍历有数据的队伍
chooseTeam(0);
function chooseTeam(idx) {
	var teams = ["zhongchao","zhongjia","zhongyi","yaguan","ouguan","yingchao","xijia","dejia","yijia"];
	$.ajax({
		type:"get",
		url:"v1/bet/" + teams[idx],
		async:true,
		success:function (data) {
			if (data.resultcode == 1000&& data.guesss.length>0) {
				//初始化加载项
				$(".guessTitle ul li").eq(idx).addClass("check");
				guessTeam(teams[idx]);
			}else{
				chooseTeam(idx+1);
			}
		}
	});
}

//初始化加载
//guessTeam("ouguan");

function guessTeam(team){
	$.ajax({
		type:"get",
		url:"v1/bet/" + team,
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				
				var guessMain = "";
				var theadMain = '</span></th><th class="td2"></th><th class="td3">1X2</th><th class="td4"></th><th class="td3">让球</th><th class="td4"></th><th class="td3">大/小</th></tr></thead><tbody><tr><td class="td1">';
				
				//判断是否有数据
				if (data.guesss.length == 0) {
					$("#guessMain").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;">暂未数据</p>')
				} else{
					for (var i = 0 ; i < data.guesss.length ; i ++) {
						var guess = data.guesss[i];
						guessMain += '<table id="'+ guess.pk +'"><thead><tr><th class="td1">'+ guess.gametime.slice(5,11) +'<span class="guessOrange">'+ guess.gametime.slice(11,16) + '' + theadMain + ''+ guess.teams[0].name +'</td><td class="td2"></td><td class="td3"><p id="';
						guessMain += guessIdxTyp (17,"betcode")+'" data-type="17">'+ guessIdxTyp (17,"outright") +'</p></td><td class="td4"><span class="guessOrange">' + guessIdxTyp (1,"handicap") +'</span></td><td class="td3"><p id="'+ guessIdxTyp (1,"betcode") +'" data-type="1">'+ guessIdxTyp (1,"outright") +'</p></td><td class="td4"><span>大<span class="guessOrange">'+ guessIdxTyp (9,"handicap") +'</span></span></td><td class="td3"><p id="'+ guessIdxTyp (9,"betcode") +'" data-type="9">'+ guessIdxTyp (9,"outright")+'</p></td></tr><tr><td>'+ guess.teams[1].name +'</td><td></td><td><p id="' + guessIdxTyp (18,"betcode")+ '" data-type="18">'+ guessIdxTyp (18,"outright") +'</p></td><td class="td4"><span class="guessOrange">'+ guessIdxTyp (2,"handicap") +'</span></td><td><p id="' + guessIdxTyp (2,"betcode")+ '" data-type="2">'+guessIdxTyp (2,"outright")+ '</p></td><td class="td4"><span>小<span class="guessOrange">'+ guessIdxTyp (10,"handicap")+'</span></span></td><td><p id="' + guessIdxTyp (10,"betcode")+ '" data-type="10">' + guessIdxTyp (10,"outright") + '</p></td></tr><tr><td>和局</td><td></td><td><p id="' + guessIdxTyp (19,"betcode")+ '" data-type="19">' + guessIdxTyp (19,"outright") + '</p></td><td></td><td></td><td></td><td></td></tr></tbody><tbody><tr><td class="td1">' + guess.teams[0].name + '</td><td class="td2"></td><td class="td3"></td><td class="td4"><span class="guessOrange">' + guessIdxTyp (3,"handicap") + '</span></td><td class="td3"><p id="' + guessIdxTyp (3,"betcode")+ '" data-type="3">' + guessIdxTyp (3,"outright") + '</p></td><td class="td4"><span>大<span class="guessOrange">' + guessIdxTyp (11,"handicap") + '</span></span></td><td class="td3"><p id="' + guessIdxTyp (11,"betcode")+ '" data-type="11">' + guessIdxTyp (11,"outright") + '</p></td></tr><tr><td>' + guess.teams[1].name + '</td><td></td><td></td><td class="td4"><span class="guessOrange">' + guessIdxTyp (4,"handicap") + '</span></td><td><p id="' + guessIdxTyp (4,"betcode")+ '" data-type="4">' + guessIdxTyp (4,"outright") + '</p></td><td class="td4"><span>小<span class="guessOrange">' + guessIdxTyp (12,"handicap") + '</span></span></td><td><p id="' + guessIdxTyp (12,"betcode")+ '" data-type="12">' + guessIdxTyp (12,"outright") + '</p></td></tr></tbody><tbody><tr><td class="td1">' + guess.teams[0].name + '</td><td class="td2"></td><td class="td3"></td><td class="td4"><span class="guessOrange">' + guessIdxTyp (5,"handicap") + '</span></td><td class="td3"><p id="' + guessIdxTyp (5,"betcode")+ '" data-type="5">' + guessIdxTyp (5,"outright") + '</p></td><td class="td4"><span>大<span class="guessOrange">' + guessIdxTyp (13,"handicap") + '</span></span></td><td class="td3"><p id="' + guessIdxTyp (13,"betcode")+ '" data-type="13">' + guessIdxTyp (13,"outright") + '</p></td></tr><tr><td>' + guess.teams[1].name + '</td><td></td><td></td><td class="td4"><span class="guessOrange">' + guessIdxTyp (6,"handicap") + '</span></td><td><p id="' + guessIdxTyp (6,"betcode")+ '" data-type="6">' + guessIdxTyp (6,"outright") + '</p></td><td class="td4"><span>小<span class="guessOrange">' + guessIdxTyp (14,"handicap") + '</span></span>	</td><td><p id="' + guessIdxTyp (14,"betcode")+ '" data-type="14">' + guessIdxTyp (14,"outright") + '</p></td></tr></tbody><tbody><tr><td class="td1">' + guess.teams[0].name + '</td><td class="td2"></td><td class="td3"></td><td class="td4"><span class="guessOrange">' + guessIdxTyp (7,"handicap") + '</span></td><td class="td3"><p id="' + guessIdxTyp (7,"betcode")+ '" data-type="7">' + guessIdxTyp (7,"outright") + '</p></td><td class="td4"><span>大<span class="guessOrange">' + guessIdxTyp (15,"handicap") + '</span></span></td><td class="td3"><p id="' + guessIdxTyp (15,"betcode")+ '" data-type="15">' + guessIdxTyp (15,"outright") + '</p></td></tr><tr><td>' + guess.teams[1].name + '</td><td></td><td></td><td class="td4"><span class="guessOrange">' + guessIdxTyp (8,"handicap") + '</span></td><td><p id="' + guessIdxTyp (8,"betcode")+ '" data-type="8">' + guessIdxTyp (8,"outright") + '</p></td><td class="td4"><span>小<span class="guessOrange">' + guessIdxTyp (16,"handicap") + '</span></span>	</td><td><p id="' + guessIdxTyp (16,"betcode")+ '" data-type="16">' + guessIdxTyp (16,"outright") + '</p></td></tr></tbody></table>';
						
						//选取bets编号为idx的typ数据
						function guessIdxTyp (idx,typ) {
							for (j in guess.bets) {
								if (guess.bets[j].type === idx) {
									return guess.bets[j][typ]
								}	
							}
							return "";
						}
						
						//判断竞猜数据格式，全盘还是半盘
//						function guessMains() {
//							if (guess.bets.length == 19) {
//								return  guess.bets[16].betcode+'">'+ guess.bets[16].outright +'</p></td><td class="td4"><span class="guessOrange">' + guess.bets[0].handicap +'</span></td><td class="td3"><p id="'+ guess.bets[0].betcode +'" >'+ guess.bets[0].outright +'</p></td><td class="td4"><span>大<span class="guessOrange">'+ guess.bets[8].handicap +'</span></span></td><td class="td3"><p id="'+ guess.bets[8].betcode +'">'+ guess.bets[8].outright+'</p></td></tr><tr><td>'+ guess.teams[1].name +'</td><td></td><td><p id="' + guess.bets[17].betcode+ '" >'+ guess.bets[17].outright +'</p></td><td class="td4"><span class="guessOrange">'+ guess.bets[1].handicap +'</span></td><td><p id="' + guess.bets[1].betcode+ '">'+guess.bets[1].outright+ '</p></td><td class="td4"><span>小<span class="guessOrange">'+ guess.bets[9].handicap+'</span></span></td><td><p id="' + guess.bets[9].betcode+ '">' + guess.bets[9].outright + '</p></td></tr><tr><td>和局</td><td></td><td><p id="' + guess.bets[18].betcode+ '">' + guess.bets[18].outright + '</p></td><td></td><td></td><td></td><td></td></tr></tbody><tbody><tr><td class="td1">' + guess.teams[0].name + '</td><td class="td2"></td><td class="td3"></td><td class="td4"><span class="guessOrange">' + guess.bets[2].handicap + '</span></td><td class="td3"><p id="' + guess.bets[2].betcode+ '">' + guess.bets[2].outright + '</p></td><td class="td4"><span>大<span class="guessOrange">' + guess.bets[10].handicap + '</span></span></td><td class="td3"><p id="' + guess.bets[10].betcode+ '">' + guess.bets[10].outright + '</p></td></tr><tr><td>' + guess.teams[1].name + '</td><td></td><td></td><td class="td4"><span class="guessOrange">' + guess.bets[3].handicap + '</span></td><td><p id="' + guess.bets[3].betcode+ '">' + guess.bets[3].outright + '</p></td><td class="td4"><span>小<span class="guessOrange">' + guess.bets[11].handicap + '</span></span></td><td><p id="' + guess.bets[16].betcode+ '">' + guess.bets[11].outright + '</p></td></tr></tbody><tbody><tr><td class="td1">' + guess.teams[0].name + '</td><td class="td2"></td><td class="td3"></td><td class="td4"><span class="guessOrange">' + guess.bets[4].handicap + '</span></td><td class="td3"><p id="' + guess.bets[4].betcode+ '">' + guess.bets[4].outright + '</p></td><td class="td4"><span>大<span class="guessOrange">' + guess.bets[12].handicap + '</span></span></td><td class="td3"><p id="' + guess.bets[12].betcode+ '">' + guess.bets[12].outright + '</p></td></tr><tr><td>' + guess.teams[1].name + '</td><td></td><td></td><td class="td4"><span class="guessOrange">' + guess.bets[5].handicap + '</span></td><td><p id="' + guess.bets[5].betcode+ '">' + guess.bets[5].outright + '</p></td><td class="td4"><span>小<span class="guessOrange">' + guess.bets[13].handicap + '</span></span>	</td><td><p id="' + guess.bets[13].betcode+ '">' + guess.bets[13].outright + '</p></td></tr></tbody><tbody><tr><td class="td1">' + guess.teams[0].name + '</td><td class="td2"></td><td class="td3"></td><td class="td4"><span class="guessOrange">' + guess.bets[6].handicap + '</span></td><td class="td3"><p id="' + guess.bets[6].betcode+ '">' + guess.bets[6].outright + '</p></td><td class="td4"><span>大<span class="guessOrange">' + guess.bets[14].handicap + '</span></span></td><td class="td3"><p id="' + guess.bets[14].betcode+ '">' + guess.bets[14].outright + '</p></td></tr><tr><td>' + guess.teams[1].name + '</td><td></td><td></td><td class="td4"><span class="guessOrange">' + guess.bets[7].handicap + '</span></td><td><p id="' + guess.bets[7].betcode+ '">' + guess.bets[7].outright + '</p></td><td class="td4"><span>小<span class="guessOrange">' + guess.bets[15].handicap + '</span></span>	</td><td><p id="' + guess.bets[15].betcode+ '">' + guess.bets[15].outright + '</p></td></tr></tbody></table>'
//							} else if (guess.bets.length == 7){
//								return  guess.bets[4].betcode+'">'+ guess.bets[4].outright +'</p></td><td class="td4"><span class="guessOrange">' + guess.bets[0].handicap +'</span></td><td class="td3"><p id="'+ guess.bets[0].betcode +'" >'+ guess.bets[0].outright +'</p></td><td class="td4"><span>大<span class="guessOrange">'+ guess.bets[2].handicap +'</span></span></td><td class="td3"><p id="'+ guess.bets[2].betcode +'">'+ guess.bets[2].outright+'</p></td></tr><tr><td>'+ guess.teams[1].name +'</td><td></td><td><p id="' + guess.bets[5].betcode+ '" >'+ guess.bets[5].outright +'</p></td><td class="td4"><span class="guessOrange">'+ guess.bets[1].handicap +'</span></td><td><p id="' + guess.bets[1].betcode+ '">'+ guess.bets[1].outright+ '</p></td><td class="td4"><span>小<span class="guessOrange">'+ guess.bets[3].handicap+'</span></span></td><td><p id="' + guess.bets[3].betcode+ '">' + guess.bets[3].outright + '</p></td></tr><tr><td>和局</td><td></td><td><p id="' + guess.bets[6].betcode+ '">' + guess.bets[6].outright + '</p></td><td></td><td></td><td></td><td></td></tr></tbody></table>'
//							}else{
//								return '"></p></td><td class="td4"><span class="guessOrange"></span></td><td class="td3"><p id="" ></p></td><td class="td4"><span>大<span class="guessOrange"></span></span></td><td class="td3"><p id=""></p></td></tr><tr><td>'+ guess.teams[1].name +'</td><td></td><td><p id="" ></p></td><td class="td4"><span class="guessOrange"></span></td><td><p id=""></p></td><td class="td4"><span>小<span class="guessOrange"></span></span></td><td><p id=""></p></td></tr><tr><td>和局</td><td></td><td><p id=""></p></td><td></td><td></td><td></td><td></td></tr></tbody></table>';
//							}
//						}
						
					}
					$("#guessMain").html(guessMain);
					//隐藏没有结果项
					for (var k = 0 ; k < $("#guessMain p").length ; k ++) {
						if ($("#guessMain p").eq(k).html() === "") {
							$("#guessMain p").eq(k).parent().parent().parent().hide();
						}
					}					
				}
				
			} else{
				console.log(data.resultcode);
				$("#guessMain").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;">暂未数据</p>')
			}
				
		},
		error:function () {
			console.log("请求数据错误")
		}
	});

}


//选中投注单
var pkId;
var betcodeId;
var outrightId;
var pei;
$(".guess").on("click","table p",function () {
	//改变样式
	$(".guess table p").removeClass("check");
	$(this).addClass("check");
	//清空注单输入框
	$(".money input").val("");
	//显示隐藏注单
	$(".add").slideUp(500);
	$(".page").slideDown(500);
	$(".ID").slideUp(500);
	var td = $(this).parent();
	var tr = td.parent();
	var th = $("table thead tr th");
	if (tr.children().index(td) == 2) {
		pei = $(this).html() - 1;
	} else{
		pei = $(this).html();
	}
	
	//点击的赔率的球队ID,盘口ID,下注倍率
	pkId = tr.parent().parent().attr("id");
	betcodeId = $(this).attr("id");
	outrightId = $(this).html();
	console.log("--------------");
	console.log(pkId);
	console.log(betcodeId);
	console.log(outrightId);
	console.log("--------------");
	//第几列
	console.log(tr.children().index(td));
	//点击的队名
	console.log(tr.children().eq(0).html());
	//两队对战信息
	console.log(tr.parent().children().eq(0).children().eq(0).html());
	console.log(tr.parent().children().eq(1).children().eq(0).html());
	//写入界面
	$(".pageName").html(th.eq(tr.children().index(td)).html());
	if (tr.children().index(td) == 2) {
		$(".pageName").html("独赢");
		$(".page .pagePL span").eq(0).html(tr.children().eq(0).html());
		$(".page .pagePL span").eq(1).html("");
	}else if(tr.children().index(td) == 4){
		$(".page .pagePL span").eq(0).html(tr.children().eq(0).html());
		$(".page .pagePL span").eq(1).html(td.prev().children("span").html());
	}else if(tr.children().index(td) == 6){
		$(".page .pagePL span").eq(0).html("");
		$(".page .pagePL span").eq(1).html("");
		$(".page .pagePL span").eq(1).html(td.prev().children("span").html());
	}
	
	$(".page .pagePL>span").eq(3).html($(this).html());
	$(".vs").html(tr.parent().children().eq(0).children().eq(0).html() + '<span class="pageOrange padd">VS</span>' + tr.parent().children().eq(1).children().eq(0).html());
	
	//写入购买结果
	setmoney();
	$(document).keyup(function () {
		setmoney();
	});
})

//点击按钮添加金额
$(".page").on("click",".addMoney p",function () {
	var idx = $(".addMoney p").index($(this));
	var money = $(".money input").val();
	if (idx == 0) {
		$(".money input").val(Number(money) + 1000);
	}else if(idx == 1){
		$(".money input").val(Number(money) + 5000);
	}else if (idx == 2) {
		$(".money input").val(Number(money) + 10000);
	}
	setmoney();
})
//写入购买结果
function setmoney(){
	if ($(".money input").eq(0).val() == "" || $(".money input").val() == 0) {
		$(".money span").eq(0).html("可赢额");
	}else{
		$(".money span").eq(0).html(Math.round(pei * $(".money input").val() - 0.1));
	}
}


//判断是否登录状态
function login(){
	//本地判断登录状态
	var userName = localStorage.getItem("name") || "";
	console.log("保存的userName为：" + userName);
	if (userName !== "") {
		$(".page div").hide();
		$(".page button").css("display","block");
		$(".background").hide();
		$(".loginRegister").hide();
		$("body").css("overflow","visible");
	} else{
		$(".page div").show();
		$(".page button").hide();
	}
	
	//服务器判断登录状态
	$.ajax({
		type:"post",
		url:"v1/webbet/records/1",
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				$(".page div").hide();
				$(".page button").css("display","block");
				$(".background").hide();
				$(".loginRegister").hide();
				$("body").css("overflow","visible");
			}else if(data.resultcode == 998) {
				localStorage.setItem("name","");
				localStorage.setItem("thirdName","");
				localStorage.setItem("gold","");
				$(".page div").show();
				$(".page button").hide();
			}
		}
	})
	
}
login();

//登录注册弹出
$(document).on("click",".page .login",function () {
	$(".background").show();
	$(".loginRegister").show();
	$("body").css("overflow","hidden");
})

//点击关闭按钮关闭
$(document).on("click",".loginRegister .close",function () {
	$(".background").hide();
	$(".loginRegister").hide();
	$("body").css("overflow","visible");
})

//下注提交
$(document).on("click",".page button",function () {
	var money = $(".money input").val();
	var saveData = JSON.stringify({pk:pkId,betcode:betcodeId,outright:outrightId,gold:money});
	console.log(saveData);
	$.ajax({
		type:"post",
		url:"v1/webbet/order",
		async:true,
		data:saveData,
		contentType:'application/json',
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				alert("下注成功,记录可在用户中心查看");
				$(".page").slideUp(500);
				$(".add").slideDown(500);
				$(".ID").slideDown(500);
			}else if(data.resultcode == 998){
				localStorage.setItem("name","");
				localStorage.setItem("thirdName","");
				localStorage.setItem("gold","");
				$(".background").show();
				$(".loginRegister").show();
				$("body").css("overflow","hidden");
			} else{
				alert(data.msg);
			}
		},
		error:function () {
			console.log("下注失败");
		}
	});
})
