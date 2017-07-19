//banner数据
$.ajax({
	type:"get",
	url:"v1/web/slideshow",
	async:true,
	success:function (data) {
		console.log(data);
		if (data == 1000) {
			var bannerMax = "";
			var bannerMin = "";
			for (var i = 0 ; i < 4 ; i ++) {data.slides
				bannerMax += '<li><img src="'+ data.slides[i].imageurl +'"/><p>'+ data.slides[i].title +'</p></li>';
				bannerMin += '<li><img src="'+ data.slides[i].imageurl +'"/></li>';
			}
			
			$(".banner .bannerMax").html(bannerMax);
			$(".banner .bannerMin").html(bannerMin);
			//调用banner事件
			banner();
		} else{
			console.log("banner图暂未数据")
		}
	}
});
function banner() {
	var idx = 0;
	var timeId;
	$(".bannerMin li").mouseenter(function () {
		idx = $(".bannerMin li").index(this);
		$(".bannerMax").css("left",-idx*650 + "px");
		clearInterval(timeId);
		setTime();
	})
	//鼠标移入停止轮播
	$(".bannerMax").mouseenter(function () {
		clearInterval(timeId);
	})
	$(".bannerMax").mouseleave(function () {
		setTime();
	})
	//自动轮播
	function  setTime() {
		timeId = setInterval(function () {
			idx ++;
			if (idx == 4) {
				idx = 0;
			}
			$(".bannerMax").css("left",-idx*650 + "px");
		},3500)
	}
	setTime();
}
banner();


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
			console.log(data);
			if (data.resultcode == 1000 && data.guesss.length>0) {
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

//竞猜数据点击跳转到guess页面
$(".guess").on("click","table p",function () {
	window.open("guess.html","_self")
})


//数据模块切换与展示
$(".right").on("click",".data>ul li",function () {
	var idx = $(".data>ul li").index(this);
	data(idx);
	
})
//初始化数据模块
data(0);
function data(idx){
	//改变选择样式并写入数据
	$(".data>ul li").eq(idx).addClass("check").siblings().removeClass("check");
	//加载亚冠，欧冠
	if (idx == 6 || idx == 5) {
		xian(1);
		if (idx == 5) {
			var teamName = "yaguan";
		} else{
			var teamName = "ouguan"
		}
		$.ajax({
			type:"get",
			url:"v1/score/" + teamName,
			async:true,
			success:function (data) {
				console.log(data);
				if (data.resultcode == 1000 && data.groupscoreboard != undefined && data.groupscoreboard.length > 0) {
					var dataMain = "";
					var dataHead = '<tr><th class="paiming">排名</th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>';
					for (var i = 0 ; i < data.groupscoreboard.length ; i ++) {
						dataMain += '<h2>'+ data.groupscoreboard[i].groupname +'</h2><table>' + dataHead;
						
						for (var j = 0 ; j < data.groupscoreboard[i].subscoreboard.length ; j ++) {
							var subscoreboard = data.groupscoreboard[i].subscoreboard[j];
							dataMain += '<tr><td><p>' + subscoreboard.ranking + '</p></td><td><img src="' + subscoreboard.logo + '"/>' + subscoreboard.name + '</td><td>' + subscoreboard.session + '</td><td>' + 
							subscoreboard.score + '</td><td>' + subscoreboard.win + '/' + subscoreboard.draw + '/' + subscoreboard.loss + '</td><td>' + subscoreboard.goal + '/' + subscoreboard.lossgoal + '/' + subscoreboard.gd + '</td></tr>';
						}
						dataMain += '</table>';
					}
					//写入数据
					$("#dataMainSecond").html(dataMain);
					
					//晋级标志
					if (data.top != undefined) {
						for (var k = 0 ; k < $("#dataMainSecond table").length ; k ++) {
							for (var l = 0 ; l < data.top ; l ++) {
								$("#dataMainSecond table").eq(k).find("p").eq(l).addClass("first");
							}	
						}
					}
					
				} else{
					$("#dataMainSecond").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
				}
			},
			error:function () {
				$("#dataMainSecond").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
			}
		});
		
	}else if(idx == 4){
		xian(2);
		shiyu(0);
	}else if(idx == 2){
		xian(3);
		zhongyi(0);
	}else{
		xian(0);
		var teamName = ["zhongchao","zhongjia","zhongyi","zuxie","shiyu","yaguan","ouguan","yinghcao","xijia","dejia","yijia"][idx];
		//加载中超。。
		$.ajax({
			type:"get",
			url:"v1/score/" + teamName,
			async:true,
			success:function (data) {
				if (data.resultcode == 1000 && data.scoreboard != undefined && data.scoreboard.length > 0) {
					var dataMain = '<tr><th class="paiming">排名</th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>';
					for (var i = 0 ; i < data.scoreboard.length ; i++) {
						var scoreboard = data.scoreboard[i];
						dataMain += '<tr><td><p>' + scoreboard.ranking + '</p></td><td><img src="' + scoreboard.logo + '"/>' + scoreboard.name + '</td><td>' + scoreboard.session + '</td><td>' + scoreboard.score + '</td><td>' + scoreboard.win + '/' + scoreboard.draw + '/' + scoreboard.loss +
						'</td><td>' + scoreboard.goal + '/' + scoreboard.lossgoal + '/' + scoreboard.gd + '</td></tr>';
					}
					//写入数据
					$("#dataMainFirst table").html(dataMain);
					
					//判断是否晋级，降级
					//晋级
					if (data.top != undefined) {
						for (var j = 0 ;j < data.top ; j ++) {
							$("#dataMainFirst table p").eq(j).addClass("first");
						}
					}
					//资格赛
					if (data.lower != undefined) {
						for (var k = $("#dataMainFirst table p").length-1 ;k > $("#dataMainFirst table p").length-1-data.lower ; k--) {
							$("#dataMainFirst table p").eq(k).addClass("last");
						}
					}
					//降级
					if (data.middle != undefined) {
						var middleArr = data.middle.split(",");
						for (var l = 0 ; l < middleArr.length ; l ++) {
							$("#dataMainFirst table p").eq(middleArr[l]-1).addClass("second");
						}
					}
				} else{
					$("#dataMainFirst table").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
				}
			},
			error:function () {
				$("#dataMainFirst table").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
			}
		});
		
	}
	//三种模块显示与隐藏
	function xian(idx) {
		$(".data .table").eq(idx).show().siblings(".data .table").hide();
	}
}

//中乙数据
$(".table").on("click",".zhongyi li",function () {
	var idx = $(".table .zhongyi li").index(this);
	zhongyi(idx);
})

function zhongyi(idx){
	$(".table .zhongyi li").eq(idx).addClass("check").siblings().removeClass("check");
	var teamName = ["zhongyinanqu","zhongyibeiqu"][idx];
	$.ajax({
			type:"get",
			url:"v1/score/" + teamName ,
			async:true,
			success:function (data) {
				if (data.resultcode == 1000 && data.scoreboard != undefined && data.scoreboard.length > 0) {
					var dataMain = '<tr><th class="paiming">排名</th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>';
					for (var i = 0 ; i < data.scoreboard.length ; i++) {
						var scoreboard = data.scoreboard[i];
						dataMain += '<tr><td><p>' + scoreboard.ranking + '</p></td><td><img src="' + scoreboard.logo + '"/>' + scoreboard.name + '</td><td>' + scoreboard.session + '</td><td>' + scoreboard.score + '</td><td>' + scoreboard.win + '/' + scoreboard.draw + '/' + scoreboard.loss +
						'</td><td>' + scoreboard.goal + '/' + scoreboard.lossgoal + '/' + scoreboard.gd + '</td></tr>';
					}
					//写入数据
					$(".zhongyiMain table").html(dataMain);
					
					//判断是否晋级，降级
					//晋级
					if (data.top != undefined) {
						for (var j = 0 ;j < data.top ; j ++) {
							$(".zhongyiMain table p").eq(j).addClass("first");
						}
					}
					//资格赛
					if (data.lower != undefined) {
						for (var k = $(".zhongyiMain table p").length-1 ;k > $(".zhongyiMain table p").length-1-data.lower ; k--) {
							$(" .zhongyiMain table p").eq(k).addClass("last");
						}
					}
					//降级
					if (data.middle != undefined) {
						var middleArr = data.middle.split(",");
						for (var l = 0 ; l < middleArr.length ; l ++) {
							$(".zhongyiMain table p").eq(middleArr[l]-1).addClass("second");
						}
					}
				} else{
					$(".zhongyiMain table").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
				}
			},
			error:function () {
				$(".zhongyiMain table").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
			}
		});
	
}

//世预赛数据
$(".table").on("click",".shiyu li",function () {
	var idx = $(".table .shiyu li").index(this);
	shiyu(idx);
})
function shiyu(idx){
	$(".table .shiyu li").eq(idx).addClass("check").siblings().removeClass("check");
	//请求世预赛数据
	
	if (idx == 3) {
		$(".table .shiyu2").show();
		$(".table .shiyu1").hide();
		//加载南美预
		
		$.ajax({
			type:"get",
			url:"v1/score/nanmeiyu" ,
			async:true,
			success:function (data) {
				if (data.resultcode == 1000 && data.scoreboard != undefined && data.scoreboard.length > 0) {
					var dataMain = '<tr><th class="paiming">排名</th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>';
					for (var i = 0 ; i < data.scoreboard.length ; i++) {
						var scoreboard = data.scoreboard[i];
						dataMain += '<tr><td><p>' + scoreboard.ranking + '</p></td><td><img src="' + scoreboard.logo + '"/>' + scoreboard.name + '</td><td>' + scoreboard.session + '</td><td>' + scoreboard.score + '</td><td>' + scoreboard.win + '/' + scoreboard.draw + '/' + scoreboard.loss +
						'</td><td>' + scoreboard.goal + '/' + scoreboard.lossgoal + '/' + scoreboard.gd + '</td></tr>';
					}
					//写入数据
					$(".table .shiyu2 table").html(dataMain);
					
					//判断是否晋级，降级
					//晋级
					if (data.top != undefined) {
						for (var j = 0 ;j < data.top ; j ++) {
							$(".table .shiyu2 table p").eq(j).addClass("first");
						}
					}
					//资格赛
					if (data.lower != undefined) {
						for (var k = $(".table .shiyu2 table p").length-1 ;k > $(".table .shiyu2 table p").length-1-data.lower ; k--) {
							$(".table .shiyu2 table p").eq(k).addClass("last");
						}
					}
					//降级
					if (data.middle != undefined) {
						var middleArr = data.middle.split(",");
						for (var l = 0 ; l < middleArr.length ; l ++) {
							$(".table .shiyu2 table p").eq(middleArr[l]-1).addClass("second");
						}
					}
				} else{
					$(".table .shiyu2 table").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
				}
			},
			error:function () {
				$(".table .shiyu2 table").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
			}
		});
		
	}else{
		$(".table .shiyu1").show();
		$(".table .shiyu2").hide();
		//加载世亚预，世欧预，世非预
		var teamName = ["shiyayu","shiouyu","shifeiyu"][idx];
		console.log(teamName);
		$.ajax({
			type:"get",
			url:"v1/score/" + teamName,
			async:true,
			success:function (data) {
				console.log(data);
				if (data.resultcode == 1000 && data.groupscoreboard != undefined && data.groupscoreboard.length > 0) {
					var dataMain = "";
					var dataHead = '<tr><th class="paiming">排名</th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>';
					for (var i = 0 ; i < data.groupscoreboard.length ; i ++) {
						dataMain += '<h2>'+ data.groupscoreboard[i].groupname +'</h2><table>' + dataHead;
						
						for (var j = 0 ; j < data.groupscoreboard[i].subscoreboard.length ; j ++) {
							var subscoreboard = data.groupscoreboard[i].subscoreboard[j];
							dataMain += '<tr><td><p>' + subscoreboard.ranking + '</p></td><td><img src="' + subscoreboard.logo + '"/>' + subscoreboard.name + '</td><td>' + subscoreboard.session + '</td><td>' + 
							subscoreboard.score + '</td><td>' + subscoreboard.win + '/' + subscoreboard.draw + '/' + subscoreboard.loss + '</td><td>' + subscoreboard.goal + '/' + subscoreboard.lossgoal + '/' + subscoreboard.gd + '</td></tr>';
						}
						dataMain += '</table>';
					}
					//写入数据
					$(".table .shiyu1").html(dataMain);
					
					//晋级标志
					if (data.top != undefined) {
						for (var k = 0 ; k < $(".table .shiyu1 table").length ; k ++) {
							for (var l = 0 ; l < data.top ; l ++) {
								$(".table .shiyu1 table").eq(k).find("p").eq(l).addClass("first");
							}	
						}
					}
					
				} else{
					$(".table .shiyu1").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
				}
			},
			error:function () {
				$(".table .shiyu1").html('<p style="height: 400px;line-height: 200px;text-align: center;">暂未数据</p>');
			}
		});
		
	}
}

function dataFn(teamName) {
	$.ajax({
		type:"get",
		url:"v1/score/" + teamName,
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				var dataMain = "";
				var dataHead = '<tr><th class="paiming">排名</th><th class="teamImg"></th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>';
				//判断比赛类型：1=联赛，2=欧冠等小组赛，3=淘汰赛
				if (data.type == 1) {
					//显示与隐藏模块
					$(".left .table").eq(1).hide();
					$(".left .table").eq(0).show();
					if (data.scoreboard != undefined && data.scoreboard.length > 0) {
						dataMain += dataHead;
						for (var i = 0 ; i < data.scoreboard.length ; i++) {
							var scoreboard = data.scoreboard[i];
							dataMain += '<tr><td><p>' + scoreboard.ranking + '</p></td><td><img src="' + scoreboard.logo + '"/></td><td>' + scoreboard.name + '</td><td>' + scoreboard.session + '</td><td>' + scoreboard.score + '</td><td>' + scoreboard.win + '/' + scoreboard.draw + '/' + scoreboard.loss +
							'</td><td>' + scoreboard.goal + '/' + scoreboard.lossgoal + '/' + scoreboard.gd + '</td></tr>';
						}
						//写入数据
						$("#dataMainFirst table").html(dataMain);
						
						//判断是否晋级，降级
						//晋级
						if (data.top != undefined) {
							for (var j = 0 ;j < data.top ; j ++) {
								$("#dataMainFirst table p").eq(j).addClass("first");
							}
						}
						//资格赛
						if (data.lower != undefined) {
							for (var k = $("#dataMainFirst table p").length-1 ;k > $("#dataMainFirst table p").length-1-data.lower ; k--) {
								$("#dataMainFirst table p").eq(k).addClass("last");
							}
						}
						//降级
						if (data.middle != undefined) {
							var middleArr = data.middle.split(",");
							for (var l = 0 ; l < middleArr.length ; l ++) {
								$("#dataMainFirst table p").eq(middleArr[l]-1).addClass("second");
							}
						}	
						
					} else{
						$("#dataMainFirst table").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;background: white;">暂未数据</p>');
					}
				} else if (data.type == 2) {
					
					//显示与隐藏模块
					$(".left .table").eq(0).hide();
					$(".left .table").eq(1).show();
					if (data.groupscoreboard != undefined && data.groupscoreboard.length > 0) {
						for (var i = 0 ; i < data.groupscoreboard.length ; i ++) {
							dataMain += '<div class="display"><p>'+ data.groupscoreboard[i].groupname +'</p></div><table>' + dataHead;
							
							for (var j = 0 ; j < data.groupscoreboard[i].subscoreboard.length ; j ++) {
								var subscoreboard = data.groupscoreboard[i].subscoreboard[j];
								dataMain += '<tr><td><p>' + subscoreboard.ranking + '</p></td><td><img src="' + subscoreboard.logo + '"/></td><td>' + subscoreboard.name + '</td><td>' + subscoreboard.session + '</td><td>' + 
								subscoreboard.score + '</td><td>' + subscoreboard.win + '/' + subscoreboard.draw + '/' + subscoreboard.loss + '</td><td>' + subscoreboard.goal + '/' + subscoreboard.lossgoal + '/' + subscoreboard.gd + '</td></tr>'
							}
							dataMain += '</table>';
						}
						//写入数据
						$("#dataMainSecond").html(dataMain);
						
						//晋级标志
						if (data.top != undefined) {
							for (var k = 0 ; k < $("#dataMainSecond table").length ; k ++) {
								for (var l = 0 ; l < data.top ; l ++) {
									$("#dataMainSecond table").eq(k).find("p").eq(l).addClass("first");
								}	
							}
						}
					
					} else{
						$("#dataMainSecond").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;">暂未数据</p>');
					}
					
				}
				
				
			} else{
				//未数据时提示
				$("#dataMainFirst table").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;background: white;">暂未数据</p>');
				$("#dataMainSecond").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;">暂未数据</p>');
				console.log("接收失败")
			}
		},
		error:function (){
			alert("请求地址错误")
		}
	});
}


//后台判断是否登录
function orderPage(){
	$.ajax({
		type:"post",
		url:"v1/webbet/records/1",
		async:true,
		success:function (data) {
			console.log(data);
			if(data.resultcode == 998){
				localStorage.setItem("name","");
				localStorage.setItem("thirdName","");
				localStorage.setItem("gold","");
				$(".right .loginRegister").show();
				$(".right .header").hide();
			}
		}
	});
}
orderPage();

//判断是否是登录状态
function login(){
	var userName = localStorage.getItem("name") || "";
	var userlogo = localStorage.getItem("logo") || "";
	var usergold = localStorage.getItem("gold") || "";
	var userlevel = localStorage.getItem("level") || "";
	console.log("保存的name为：" + userName);
	if (userName !== "") {
		$(".right .loginRegister").hide();
		$(".right .header").show();
		$(".header .headerImg p a").html(userName);
		if (userlogo !== "") {
			$(".headerImg img").attr("src",userlogo);
		}
		$(".header .level a").html("等级 : " + userlevel);
		$(".header .gold a").html("金币 : " + usergold);
	} else{
		$(".right .loginRegister").show();
		$(".right .header").hide();
	}
}
login();

//退出按钮
$(".header .exit").click(function () {
	localStorage.setItem("name","");
	localStorage.setItem("thirdName","");
	localStorage.setItem("gold","");
	$(".right .loginRegister").show();
	$(".right .header").hide();
})
	
	
	
	
	
