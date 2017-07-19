//页码加载项
//$(".tcdPageCode").createPage({
//	backFn: function (p) {   //单击回调方法，p是当前页码
//	   //加载列表
//		listAdd(p);
//	}
//})
//赛事下拉筛选
$.ajax({
	type:"get",
	url:"../../v1/manager/common/league",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			var options = '';
			for (i in data.leagues) {
				options += '<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>';
			}
			$("header div select.league").append(options);
		}else if (data.resultcode == 998) {
			window.parent.alertFn('登录失效，请重新登录');
			window.parent.returnLogin();
		}else{
			window.parent.alertFn(data.msg);
		}
	}
});
//赛季选择
var leagueyear =0;
$("header div select.leagueyear").change(function () {
	leagueyear = $(this).children("option:checked").val();
	//加载列表
	listAdd(1);
})
//赛事下拉事件
var leagueId = 0;
$("header div select.league").change(function () {
	leagueId = $(this).children("option:checked").val();
	//加载列表
	listAdd(1);
})
var totalpage=1;
//初始化加载第一页
listAdd(1);
//加载列表
function listAdd(idx){
	$.ajax({
		type:"get",
		url:"../../v1/manager/team/"+leagueyear+"/"+leagueId+"/"+idx,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
//				$(".tcdPageCode").createPage({
//				    pageCount: data.totalpage, //总页数
//				    current: data.currentpage   //当前页
//				});
				if(data.totalpage==1){
			        $('.tcdPageCode').hide();
			        totalpage=1;
			    }else {
			    	if(data.totalpage!==totalpage){
			    		$('.tcdPageCode').show();
			            totalpage=data.totalpage;
			            $("#tcdPageCode").Page({
				  			totalPages: data.totalpage,//分页总数
				  			liNums: 7,//分页的数字按钮数(建议取奇数)
				  			activeClass: 'activP', //active 类样式定义
				  			callBack : function(page){
				  				listAdd(page)
				  			}
			  			});
			    	}
			    }
				var tr = "";
				for (i in data.teams) {
					tr+='<tr><td>'+
						data.teams[i].code+'</td><td title="'+
						data.teams[i].name+'"  class="logo"><img src="'+
						logoFn(data.teams[i].logo)+'"/>'+
						teamLength(data.teams[i].name)+'</td><td>'+
						data.teams[i].leagueyear+'</td><td>'+
						["","俱乐部","国家队","省队"][data.teams[i].type]+'</td><td>'+
						dataNone(data.teams[i].continent)+'</td><td>'+
						dataNone(data.teams[i].country)+'</td><td>'+
						dataNone(data.teams[i].leaguename)+'</td><td>'+
						dataNone(data.teams[i].area)+'</td><td>'+
						["女足","男足"][data.teams[i].sex]+'</td><td><a href="teamEdit.html?'+
						encodeURI("teamid="+data.teams[i].id+
						"&name="+data.teams[i].name+
						"&code="+data.teams[i].code+
						"&area="+data.teams[i].area+
						"&type="+data.teams[i].type+
						"&sex="+data.teams[i].sex+
						"&country="+data.teams[i].country+
						"&continent="+data.teams[i].continent+
						"&logo="+data.teams[i].logo)+
						'">编辑</a><a teamid='+data.teams[i].id+'>升降级</a></td></tr>';
				}
				$("#box table tbody").html(tr);
			}else if (data.resultcode == 999) {
				$('#box table tbody').html('<tr><td colspan="9">没有查询到符合条件的数据</td></tr>')
			}else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
				window.parent.alertFn(data.msg);
			}
		}
	});
}
//球队过长显示...
function teamLength(team){
	if (team.length>9) {
		return team.substr(0,8)+"...";
	} else{
		return team;
	}
}

//默认赛事logo
function logoFn(url){
	if (url!=""&&url!=undefined) {
		return url;
	} else{
		return '../../img/teamlogo.png';
	}
}
//没有数据的显示-
function dataNone(data) {
	if (data==undefined || data=="" || data==NaN) {
		return "-";
	} else{
		return data;
	}
}
//加载赛事下拉
function loadleague(){
	$.ajax({
		url:'../../v1/manager/common/league',
		type:'get',
		contentType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				var options='';
				$(data.leagues).each(function(){
					options+='<option value='+this.id+'>'+this.name+'</option>'
				})
				$('.zhuanhui .now select.league').html(options);
			}
		}
	})
}
$('#box table').on('click','tbody td a:last-child',function(e){
	//写入赛季赛事球队
	$("#zhuanhui .ago .name").html($(this).parents("tr").children("td").eq(2).html());
	$("#zhuanhui .ago .code").html($(this).parents("tr").children("td").eq(6).html());
	$("#zhuanhui .ago .team").html($(this).parents("tr").children("td").eq(1).attr("title"));
	e.preventDefault();
	var teamid=$(this).attr('teamid');
	$('#zhuanhui').show().attr('teamid',teamid);
	//加载赛事下拉
	loadleague();
})
$('#zhuanhui button.back').click(function(){
	$('#zhuanhui').hide();
})
$('#zhuanhui button.confirm').click(function(){
	var leagueyear=$('#zhuanhui select.leagueyear').val();
	var leagueid=$('#zhuanhui select.league').val();
	var teamid=$('#zhuanhui').attr('teamid');
	$.ajax({
		url:'../../v1/manager/team/shengjiang/'+leagueyear+'/'+leagueid+'/'+teamid,
		type:'get',
		contentType:'appliation/json',
		success:function(data){
			if(data.resultcode==1000){
				window.parent.alertFn(data.msg);
				$('#zhuanhui').hide();
				listAdd(1);
			}else if(data.resultcode==998){
				window.parent.alertFn('登录超时，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	})
})
