//设置现在时间
function setTime () {
	var myDate = new Date();
	var dayArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	$(".injuredTitle .now").html(dayArr[myDate.getDay()] + "  " + myDate.toLocaleDateString());
}
setTime();


//初始化右侧导航栏
$.ajax({
	type:"get",
	url:"v1/injury/init",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			var li = "";
			for (i in data.leagues) {
				li += '<li data-code="'+ data.leagues[i].code +'"data-time="'+ data.leagues[i].createtime.substring(5,10) +'"><div><img src="'+ data.leagues[i].logo +'"/><span>'+ data.leagues[i].name +'</span></div><ul></ul></li>'
			}
			$(".right>ul").html(li);
			//默认选中第一项
//			$(".right ul li").eq(0).addClass("check");
			ingured(data.leagues[0].code,0);
			$(".injuredTitle .updata").html("更新时间: " + $(".right ul li").eq(0).attr("data-time"))
		}else{
			$(".right>ul").html("暂未数据");
		}
	},
	error:function () {
		//$(".right>ul").html("初始化错误");
	}
});


//右侧导航栏
$(document).on("click",".right>ul>li div",function () {
	//改变选中样式
	//$(this).addClass("check").siblings().removeClass("check");
	
	var index = $(".right ul div").index($(this));
	$(".right ul ul").not($(this).next("ul")).slideUp();
	$(".right ul ul").eq(index).slideToggle();
	//改变更新时间
	$(".injuredTitle .updata").html("更新时间: " + $(this).parent().attr("data-time"));
	//通过code调取数据
	var code = $(this).parent().attr("data-code");
	ingured(code,index);
	
})

$(document).on("click",".right>ul>li>ul>li",function () {
	//改变选中样式并显示
	$(this).addClass("check").siblings().removeClass();
	var index = $(this).parent().find("li").index($(this));
	$(".left .injuredData").eq(index).show().siblings().hide();
})

//请求伤停数据
function ingured(teamName,index) {
	$.ajax({
		type:"get",
		url:"v1/injury/" + teamName,
		async:true,
		success:function (data) {
			console.log(data);
			var liTitle = ""
			var injuredMain = "";
			if (data.resultcode == 1000) {
				console.log("获取成功");
				if (data.teams.length == 0) {
					//未数据提示
					$("#injuredMain").html('<p style="text-align: center;line-height: 500px;">暂未数据</p>');
				} else{
					//球队遍历
					for (var i = 0 ; i < data.teams.length ; i++) {
						liTitle += '<li><img src="'+ data.teams[i].teamlog +'"/><span>'+ data.teams[i].teamname +'</span></li>';
						
						injuredMain += '<div class="injuredData"><div class="injuredName"><img src="'+ data.teams[i].teamlog +'"/>'+ data.teams[i].teamname +'</div><table><tr><th class="names">球员</th><th>位置</th><th>场次</th><th>进球</th><th class="state">状态</th>	<th class="remarks">备注</th></tr>';
						 
						//球员数据
						for (var j = 0 ; j < data.teams[i].injurydetail.length ; j ++) {
							injuredMain += '<tr><td>'+ data.teams[i].injurydetail[j].player +'</td><td>'+ dataReturn(data.teams[i].injurydetail[j].position) +'</td><td>'+ dataReturn(data.teams[i].injurydetail[j].session) +'</td><td>'+ dataReturn(data.teams[i].injurydetail[j].goal) +'</td><td>'+ dataReturn(data.teams[i].injurydetail[j].status) +'</td><td>'+ dataReturn(data.teams[i].injurydetail[j].remark) +'</td></tr>';
						}
						injuredMain +='</table></div>';
					}
					//默认显示第一个
					$(".right>ul>li").eq(index).find("ul").html(liTitle);
					$(".right>ul>li").eq(index).find("ul li").eq(0).addClass("check");
					$("#injuredMain").html(injuredMain);
					$(".left .injuredData").eq(0).show().siblings().hide();
				}
			}else{
				$("#injuredMain").html('<p style="text-align: center;line-height: 500px;">暂未数据</p>');
			}
		},
		error:function () {
			console.log("数据请求错误");
		}
	})
}

//数据为空返回“-”；
function dataReturn(data) {
	if (data != undefined) {
		return data;
	} else{
		return "-";
	}
}
