//初始化推荐选择栏
$.ajax({
	type:"get",
	url:"v1/recommand/init",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			var liTeam = "";
			for (i in data.leagues) {
				liTeam += '<li data-code = "'+ data.leagues[i].code +'">'+ data.leagues[i].name +'</li>';
			}
			$(".tName").html(liTeam);
			//默认显示第一项，改变样式
			$(".tName li").eq(0).addClass("check");
			recomFn(data.leagues[0].code);
		}else{
			console.log("初始化失败");
		}
	}
});



//推荐选择栏
$(".tName").on("click","li",function () {
	$(this).addClass("check").siblings().removeClass("check");
	console.log($(this).attr("data-code"));
	recomFn($(this).attr("data-code"));
});

function recomFn (teamName) {
	var arrStatus = ['未开赛','进行中','已结束'];
	$.ajax({
		type:"get",
		url:"v1/recommand/" + teamName,
		async:true,
		success:function (data) {
			console.log(data);
			var tMain = "";
			var teamMain = "";
			if (data.resultcode == 1000) {
				
				if (data.teams.length == 0) {
					$("#tMain").html("暂无数据");
				}else {
					for (var i = 0 ; i < data.teams.length ; i ++ ) {
						var team = data.teams[i];
						var baseinfo = team.baseinfo;
						//判断是否开赛，改变score的值
						function score() {
							if (team.score == "" || team.score == undefined) {
								return "未开赛";
							} else{
								console.log("队伍的比分是" + team.score);
								return team.score;
							}
						}
						
						//联赛队伍
						tMain += '<ul><li class="tMainImg"><img src="' + team.hostteamlog+'"/></li><li class="tMainTime"><p><span>' + team.gametime.split(" ")[0]+'</span><span class="tTime">' + team.week+'</span><span>' + team.gametime.split(" ")[1]+'</span></p><p><span class="tTeam">' + team.hostteamname + '</span><span class="tTime tStart">' + arrStatus[team.status] + '</span><span class="tTeam">' + team.guestteamname + '</span></p></li><li class="tMainImg"><img src="'+ team.guestteamlog+'"/></li></ul>';
						
						//基本面数据
						teamMain += '<div class="teamMain"><div class="banner"><time>' + team.gametime + '</time><ul><li class="team1"><img src="'+ team.hostteamlog+'"/><p>' + team.hostteamname+'</p></li><li class="score">' + score() +'</li><li class="team1"><img src="'+ team.guestteamlog+'"/><p>' + team.guestteamname+'</p></li></ul></div><h3>基本面</h3><div class="shili"><p>实力</p><ul><li class="percent">'+ baseinfo.hostteam.strength.scale+'%</li><li><ul class="bar"><li class="barL"></li><li class="barC"></li><li class="barR"></li></ul></li><li class="percent">'+ baseinfo.guestteam.strength.scale+'%</li></ul><div class="main"><div class="mainLeft">';
							
						//实力详情
						for (var j = 0 ; j < baseinfo.hostteam.strength.content.split("\n").length ; j ++) {
							teamMain += '<p>'+baseinfo.hostteam.strength.content.split("\n")[j]+'</p>'
						};
						teamMain += '</div><div class="mainRight">';
						for (var j = 0 ; j < baseinfo.guestteam.strength.content.split("\n").length ; j ++) {
							teamMain += '<p>'+baseinfo.guestteam.strength.content.split("\n")[j]+'</p>'
						};
						teamMain += '</div><div id="vs">VS</div></div></div><div class="shili"><div class="main"><div class="mainLeft">';
							
						//伤停详情
						for (var j = 0 ; j < baseinfo.hostteam.injury.content.split("\n").length ; j ++) {
							teamMain += '<p>'+baseinfo.hostteam.injury.content.split("\n")[j]+'</p>'
						};
						teamMain += '</div><div class="mainRight">';
						for (var j = 0 ; j < baseinfo.guestteam.injury.content.split("\n").length ; j ++) {
							teamMain += '<p>'+baseinfo.guestteam.injury.content.split("\n")[j]+'</p>'
						};
						
						//近四轮状态
						teamMain += '</div><div id="vs">VS</div></div></div><div class="lately"><h2>近四轮状态</h2><div>	<ul class="firstUl"><li>胜</li><li class="ping">胜</li><li>胜</li><li class="fu">胜</li></ul><ul><li>胜</li><li class="ping">胜</li><li>胜</li><li class="fu">胜</li></ul></div>	<p>左一为最近</p></div></div>';
							
					}
					$("#tMain").html(tMain);
					
					$(".box .left").html(teamMain);
					mainHeight();
					//默认显示第一个队伍详情
					teamMainShow(0);
				}
				
			} else{
				$("#tMain").html("暂无数据");
			}
				
		},
		error:function () {
			//请求错误时显示
			console.log("请求错误");
			
		}
	});
}

//点击比赛队改变teamMain
$("#tMain").on("click","ul",function () {
	var idx = $("#tMain ul").index($(this));
	teamMainShow(idx);
})

//显示具体内容
teamMainShow(0);
function teamMainShow(idx) {
	$("#tMain ul").eq(idx).addClass("checkMain").siblings().removeClass("checkMain");
	$(".box .left .teamMain").eq(idx).show().siblings().hide();
}

//设置基本面两个显示框高度相同
function mainHeight() {
	for (var i = 0 ; i < $(".teamMain").length ; i++) {
		//显示框高度
		for (var j = 0 ; j < 2 ; j ++) {
			var heightL = $(".teamMain").eq(i).find(".main").eq(j).find(".mainLeft").innerHeight();
			var heightR = $(".teamMain").eq(i).find(".main").eq(j).find(".mainRight").innerHeight();
			//console.log($(".teamMain").eq(i).find(".main").eq(j).find(".mainLeft").html());
			if (heightL > heightR) {
				$(".teamMain").eq(i).find(".main").eq(j).find(".mainRight").innerHeight(heightL);
			}else{
				$(".teamMain").eq(i).find(".main").eq(j).find(".mainLeft").innerHeight(heightR);
			}
		}
		//柱状图长度
		var barLength = $(".teamMain").eq(i).find(".percent").eq(0).html().substr(0,2);
		console.log("截取的百分比" + barLength);
		$(".teamMain").eq(i).find(".barL").css("width",(barLength-1)+"%");
		$(".teamMain").eq(i).find(".barR").css("width",(99-barLength)+"%");
	}
};
mainHeight();

