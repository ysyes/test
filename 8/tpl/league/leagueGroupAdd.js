//获取page和leaguesid;
function urlId(name){
	var main = {};
	var urlSplit = window.location.href.split("?")[1];
	if(urlSplit!=""&&urlSplit!=undefined){
		var arr = urlSplit.split("&");
		for (var i = 0; i < arr.length ; i++) {
			main[arr[i].split("=")[0]] = arr[i].split("=")[1];
		}
	}
	return main[name];
}
//写入返回数据
$(".button a").prop("href","leagueGroup.html?leaguesid="+urlId("leaguesid")+"&name="+urlId("name"));
//写入标题
$("#box header h3").html('<a href="league.html">赛事</a><span>&gt;&gt;</span><a href="leagueGroup.html?leaguesid='+urlId("leaguesid")+"&name="+urlId("name")+'">'+decodeURI(urlId("name"))+'</a><span>&gt;&gt;</span>新增分组');
//加载赛事
saishi();
function saishi() {
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/league",
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				var opti = "";
				for (i in data.leagues) {
					opti+='<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>'
				}
				$("#leagueid").html(opti);
				//写入赛事
				$("#leagueid").val(urlId("leaguesid"));
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	});
}

//判断是否是编辑选项
if (urlId("groupid")!=""&&urlId("groupid")!=undefined) {
	//证明是编辑，修改标题
	$("#box header h3").html('<a href="league.html">赛事</a><span>&gt;&gt;</span><a href="leagueGroup.html?leaguesid='+urlId("leaguesid")+"&name="+urlId("name")+'">'+decodeURI(urlId("name"))+'</a><span>&gt;&gt;</span>编辑分组');
	//锁定写入赛季
	$("#leagueyear").attr("disabled","disabled");
	$("#leagueyear").val(urlId("leagueyear"));
	//写入分组名和code
	$("#teamName").val(decodeURI(urlId("groupname")));
	$("#teamCode").val(urlId("groupcode"));
}

//提交数据请求
function groupAjax(ajaTtype,ajaxUrl) {
	var saveData = JSON.stringify({
		leagueyear:$("#leagueyear option:checked").val(),
		groupname:$("#teamName").val(),
		groupcode:$("#teamCode").val()
	});
    $.ajax({
        url:"../../v1/manager/league/group/"+$("#leagueid option:checked").val()+ajaxUrl,
        type:ajaTtype,
        dataType:'json',
        async:true,
		data:saveData,
		contentType:'application/json',
        success:function(data){
        	if (data.resultcode==1000) {
        		window.parent.alertFn("添加成功");
        		window.location.href="leagueGroup.html?leaguesid="+urlId("leaguesid")+"&name="+urlId("name");
        	} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}  else{
        		window.parent.alertFn(data.msg);
        	}
        }
    })
}
//提交事件
$(".button .submit").click(function () {
	if (urlId("groupid")!=""&&urlId("groupid")!=undefined) {
		groupAjax("put","/"+urlId("groupid"));
	}else{
		groupAjax("post","");
	}
	
})