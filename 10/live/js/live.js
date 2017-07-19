ajaxFn();
function ajaxFn() {
	$.ajax({
		type:"get",
		url:"../v1/manager/common/live",
		//url:"new_file.json",
		async:true,
		success:function (data) {
			//定时刷新
			setTimeout(ajaxFn,20000);
			if (data.resultcode == 1000) {
				if (data.lives.length == 0) {
					$("ul").html('<li style="text-align: center;line-height: 60px;">近期暂无比赛</li>');
				} else{
					var lis = '';
					for (var i in data.lives) {
						var that = data.lives[i];
						lis += '<li data-gameid="'+that.gameid+'"><header><p>'+statusFn(that.status)+'</p></header><div class="indexScore"><div class="left"><img src="'+that.hostteamlogo+'"/><p>'+that.hostteamname+'</p></div><div class="center"><time>'+that.gametime+'</time><p><span>'+noneFn(that.status,that.hostteamscore)+'</span>-<span>'+noneFn(that.status,that.clientteamscore)+'</span></p><i>'+that.leaguename+'第'+that.gamesession+'轮</i></div><div class="right"><img src="'+that.clientteamlogo+'"/><p>'+that.clientteamname+'</p></div></div><div class="detail"><a href="'+enFn(that.status,that.lineupstatus)+'">English</a><a href="'+cnFn(that.status,that.lineupstatus)+'">中文</a></div></li>'
					}
					$("ul").html(lis);
				}					
			} else if (data.resultcode == 999){
				$("ul").html('<li style="text-align: center;line-height: 60px;">近期暂无比赛</li>');
			}else{
				alertFn(data.msg);
			}
		},
		error:function () {
			alertFn("请求出错");
		}
	});
}
function statusFn (status) {
	return ["未开赛","进行中","已结束"][status];
}
function noneFn(status,score) {
	if (status == 0 || score == undefined) {
		return "";
	} else{
		return score;
	}
}
function cnFn (status,lineupstatus) {
	if (status == 1|| status == 2) {
		return "main.html?cn";
	} else{
		if (lineupstatus == 1) {
			return "main.html?cn";
		} else{
			return "###";
		}		
	}
}
function enFn (status,lineupstatus) {
	if (status == 1 || status == 2) {
		return "main.html?en";
	} else{
		if (lineupstatus == 1) {
			return "main.html?en";
		} else{
			return "###";
		}
	}
}
//点击a存入gameid
$("ul").on("click",".detail a",function () {
	if ($(this).attr("href") == "###") {
		if ($(this).html() == "English") {
			alertFn("Not Started");
		} else{
			alertFn("未开赛");
		}		
	} else{
		var gameid = $(this).parents("li").attr("data-gameid");
		window.sessionStorage.setItem("gameid",gameid);
	}
})
//提示框
function alertFn (main) {
	$("#hint").html(main);
	$("#hint").show();
	$("#hint").css("opacity","1");
	setTimeout(function () {
		$("#hint").css("opacity","0");
		$("#hint").hide();		
	},1000)
}
