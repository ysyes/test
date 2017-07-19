//页码加载项
//function pageAdd(pageidx){
//	$(".tcdPageCode").createPage({
//	    pageCount: pageidx, //总页数
//	    current: 1,   //当前页
//	    backFn: function (p) {   //单击回调方法，p是当前页码
//	        console.log(p);
//	        //加载列表
//	        //listAdd(p);
//	    }
//	});
//}
//pageAdd(1);//测试页码

//点击新增弹框
$("header .headerAdd").click(function () {
	$("#groupTeamAddBac").show();
	teamsFn();
})
//点击取消关闭
$("#groupTeamAdd button.cancel").click(function () {
	$("#groupTeamAddBac").hide();
	//清空数组
	teamArr=[];
	//清空状态
	$("#groupTeamAdd ul input").prop("checked",false);
})
//获取URL后的值
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
//修改title
$("header h3").html("<a href='league.html'>赛事</a><span>&gt;&gt;</span><a href='leagueGroup.html?leaguesid="+urlId("leaguesid")+"&name="+urlId("leaguename")+"'>"+decodeURI(urlId("leaguename"))+"</a><span>&gt;&gt;</span>"+decodeURI(urlId("groupname")));
//定义球队列表ID
var teamArrOld = [];
//获取球队列表
teamFN();
function teamFN() {
	$.ajax({
		type:"get",
		url:"../../v1/manager/league/group/"+urlId("groupid"),
		async:true,
		success:function (data){
			if (data.resultcode==1000) {
				if(data.totalpage==1){
//					$('.tcdPageCode').hide();
				}
				var tr = '';
				for (i in data.teams) {
					tr+='<tr><td><img src="'+logoFn(data.teams[i].logo)+'"/><span>'+data.teams[i].name+'</span></td><td>'+
					data.teams[i].code+'</td><td><a data-teamid = "'+
					data.teams[i].id+'">删除</a></td></tr>';
					//添加到数组中
					teamArrOld.push(data.teams[i].id);
					//console.log("----已存在的----")
					//console.log(teamArrOld)
				}
				$("table tbody").html(tr);
			}else if (data.resultcode==999){
				$("table tbody").html('<tr><td colspan="4">没有查询到符合条件的数据</td></tr>');
				$('.tcdPageCode').hide();
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
				//console.log(data.msg);
			}
		},
		error:function () {
			window.parent.alertFn("请求数据时出错，请联系管理员");
		}
	});
}

//默认球队logo
function logoFn(url){
	if (url!=""&&url!=undefined) {
		return url;
	} else{
		return '../../img/teamlogo.png';
	}
}
//点击删除
var delateData
$("table").on("click","tbody a",function () {
	//写入球队名称
	$("div.logout p").html("确认删除&nbsp;"+$(this).parents("tr").find("span").html());
	$("div.module").show();
	//删除的teamID
	delateData = JSON.stringify({teamid:$(this).attr("data-teamid")});
	
})
//删除点击取消关闭
$("div.logout button.gray").click(function () {
	$("div.module").hide();
})
//删除点击确定
$(".module button.red").click(function (){
	$.ajax({
		url:"../../v1/manager/league/group/"+urlId("groupid"),
        type:"delete",
        dataType:'json',
        async:true,
		data:delateData,
		contentType:'application/json',
        success:function(data){
        	if (data.resultcode==1000) {
        		//隐藏删除弹框
        		$("div.module").hide();
        		//window.parent.alertFn("删除成功");
        		//删除旧数组信息
        		//teamArrOld.splice(teamArrOld.indexOf(delate.attr("data-teamid")),1);
        		//delate.parents("tr").remove();
        		//刷新页面
        		teamArrOld=[];
        		teamFN();
        	} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
				//隐藏删除弹框
        		$("div.module").hide();
				window.parent.alertFn(data.msg);
        	}
        }
	});
})
//新增球队
//球队
function teamsFn(){
	$.ajax({
		type:"get",
		url:"../../v1/manager/league/group/team/"+urlId("groupid"),
		async:true,
		success:function (data) {
			if (data.resultcode == 1000) {
				var lis = "";
				for (i in data.teams) {
					//判断是否已经添加球队
					if (teamArrOld.indexOf(data.teams[i].id) == -1) {
						lis+='<li><input type="checkbox" value="'+data.teams[i].id+'" /><span>'+data.teams[i].name+'</span></li>';
					}
				}
				if (lis=="") {
					$("#groupTeamAdd ul").html('<li style="width: 100%;text-align: center;padding-top: 20px;">没有可添加的球队</li>');
				} else{
					$("#groupTeamAdd ul").html(lis);
					teamArrCheckFn();
				}
				
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}
		}
	});
}

//判断teamArr中是元素checked
function teamArrCheckFn() {
	for (var i = 0;i < $("#groupTeamAdd ul li").length; i++) {
		if (teamArr.indexOf($("#groupTeamAdd ul li").eq(i).children("input").val())!= -1) {
			$("#groupTeamAdd ul li").eq(i).children("input").prop("checked",true);
		}
	}
}

//新增球队数据
function teamAdd(){
	var saveData = JSON.stringify({teamids:teamArr});
	$.ajax({
		type:"post",
		url:"../../v1/manager/league/group/team/"+urlId("groupid"),
		dataType:'json',
        async:true,
		data:saveData,
		contentType:'application/json',
		success:function (data) {
			//console.log(data);
			if (data.resultcode = 1000) {
				window.parent.alertFn("添加成功");
				teamFN();
				$("#groupTeamAddBac").hide();
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}  else{
				window.parent.alertFn(data.msg);
			}
		}
	});
}
$("#groupTeamAdd .button .submit").click(function () {
	if (teamArr.length>0) {
		teamAdd();
	} else{
		window.parent.alertFn("未选择球队");
	}
})

//球队点击选中存入数组
var teamArr = [];
$("#groupTeamAdd").on("click","ul li span",function () {
	var inputs = $(this).parent().children("input");
	var teamid = inputs.prop("value");
	if(inputs.prop("checked")){
		inputs.prop("checked",false);
		teamArr.splice(teamArr.indexOf(teamid),1);
	}else{
		inputs.prop("checked",true);
		teamArr.push(teamid)
	}
	//console.log(teamArr);
});
$("#groupTeamAdd").on("click","ul li input",function () {
	var teamid = $(this).prop("value");
	if($(this).prop("checked")){
		teamArr.push(teamid);
	}else{
		teamArr.splice(teamArr.indexOf(teamid),1);
	}
	//console.log(teamArr);
});