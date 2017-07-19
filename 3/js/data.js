$(document).on("click",".right ul li",function () {
	//改变选中样式
	$(this).addClass("check").siblings().removeClass("check");
	//改变tital样式(图标，文字)
	$(".dataTitle img").attr('src',$(this).children("img").attr("src"));
	$(".dataTitle span").html($(this).children("span").html());
	//点击请求数据
	console.log($(this).attr("data-code"));
	dataFn($(this).attr("data-code"));
})

//初始化数据
$.ajax({
	type:"get",
	url:"v1/score/init",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			var li = "";
			for (i in data.leagues) {
			li += '<li data-code = "'+ data.leagues[i].code +'"><img src="'+ data.leagues[i].logo +'"/><span>'+ data.leagues[i].name +'</span></li>'
			}
			$(".right ul").html(li);
			
			//初始化
			$(".right ul li").eq(0).addClass("check");
			dataFn(data.leagues[0].code);
		} else{
			$(".right ul").html("暂未数据");
		}
	}
});
//数据写入
function dataFn(teamName) {
	$.ajax({
		type:"get",
		url:"v1/score/" + teamName,
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				var dataMain = "";
				var dataHead = '<tr><th class="paiming">排名</th><th class="teamImg"></th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>'
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
			console.log("请求地址错误");
		}
	});
}

//计算屏幕高度
var deskHeight = window.screen.availHeight;
console.log(deskHeight)
$(".right").css("height",deskHeight-170 + "px");
$(".left .table").css("height",deskHeight-262 + "px");
