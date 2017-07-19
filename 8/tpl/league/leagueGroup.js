//页码加载项
//function pageAdd(pageidx){
//	$(".tcdPageCode").createPage({
//	    pageCount: pageidx, //总页数
//	    current: 1,   //当前页
//	    backFn: function (p) {   //单击回调方法，p是当前页码
//	        console.log(p);
//	    }
//	});
//}
//pageAdd(1);//测试页码

//获取leaguesid;
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
//取得leaguesid并添加到新增分组跳转地址上,改变title
var leaguesid = urlId("leaguesid");
$("header a").prop("href","leagueGroupAdd.html?leaguesid="+leaguesid+"&name="+urlId("name"));
$("header h3").html("<a href='league.html'>赛事</a><span>&gt;&gt;</span>"+decodeURI(urlId("name")));
//加载赛事分组列表
function groupFn(leagueyear){
	$.ajax({
		type:"get",
		url:"../../v1/manager/league/group/"+leaguesid+"/"+leagueyear,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				var tr = '';
				for (i in data.groups) {
					tr+='<tr><td>'+data.groups[i].leagueyear+'</td><td>'+data.groups[i].id+'</td><td>'+data.groups[i].groupname+'</td><td>'+data.groups[i].groupcode+'</td><td><a href="leagueGroupAdd.html?leaguesid='+leaguesid+'&name='+urlId("name")+'&groupid='+data.groups[i].id+'&leagueyear='+data.groups[i].leagueyear+'&groupname='+encodeURI(data.groups[i].groupname)+'&groupcode='+data.groups[i].groupcode+'">编辑</a><a href="groupTeam.html?leaguesid='+decodeURI(urlId("leaguesid"))+'&leaguename='+decodeURI(urlId("name"))+'&groupname='+data.groups[i].groupname+'&groupid='+data.groups[i].id+'">球队</a></td></tr>';
				}
				$("#box table tbody").html(tr);
			}else if(data.resultcode==999){
				$("#box table tbody").html('<tr><td colspan="5">没有查询到符合条件的数据</td></tr>');
//				$('.tcdPageCode').hide();
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}  else{
				window.parent.alertFn(data.msg);
			}
		},
		error:function () {
			window.parent.alertFn("请求出错");
		}
	});
}

//下拉筛选赛季
$("header div select").change(function () {
	groupFn($("header select option:checked").val());
})
//默认加载
groupFn(2016);
