//初始化总页参数
var totalpage=1;
//页码加载项
function pageAdd(totalpage){
	if(totalpage==1){
		$('.tcdPageCode').hide();
	}else{
		$('.tcdPageCode').show();
		$("#tcdPageCode").Page({
			totalPages: totalpage,//分页总数
			liNums: 7,//分页的数字按钮数(建议取奇数)
			activeClass: 'activP', //active 类样式定义
			callBack : function(page){
				//console.log(page);
				listFn(page);
			}
		});
	}
}
//pageAdd(3);
listFn(1);
//加载赛事队列表
function listFn(page) {
	$.ajax({
		type:"get",
		url:"../../v1/manager/league/"+page,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				//加载页码
				if (data.totalpage!=totalpage) {
					totalpage=data.totalpage;
					//调取加载页面函数
					pageAdd(data.totalpage);
				}
				//加载列表
				var tr='';
				for (i in data.leagues) {
					//判断激活、冻结
					if (data.leagues[i].status==1) {
						tr+='<tr data-id="'+
						data.leagues[i].id+'"><td>'+
						mainNone(data.leagues[i].parentname)+'</td><td><img src="'+
						logoNone(data.leagues[i].logo)+'"/>'+
						data.leagues[i].name+'</td><td>'+
						data.leagues[i].code+'</td><td>'+
	                    ["","联赛","小组赛","淘汰赛"][data.leagues[i].type]+'</td><td>'+
	                    mainNone(data.leagues[i].top)+'</td><td>'+
	                    mainNone(data.leagues[i].middle)+'</td><td>'+
	                    mainNone(data.leagues[i].lower)+'</td><td><a href="leagueEdit.html?page='+
	                    data.page+'&id='+data.leagues[i].id+
	                    '">编辑</a><span>冻结</span></td></tr>';
					} else if(data.leagues[i].status==0){
						tr+='<tr class="disabled" data-id="'+
						data.leagues[i].id+'"><td>'+
						mainNone(data.leagues[i].parentname)+'</td><td><img src="'+
						logoNone(data.leagues[i].logo)+'"/>'+
						data.leagues[i].name+'</td><td>'+
						data.leagues[i].code+'</td><td>'+
	                    ["","联赛","淘汰赛","小组赛"][data.leagues[i].type]+'</td><td>'+
	                    mainNone(data.leagues[i].top)+'</td><td>'+
	                    mainNone(data.leagues[i].middle)+'</td><td>'+
	                    mainNone(data.leagues[i].lower)+'</td><td><a href="leagueEdit.html?page='+
	                    data.page+'&id='+data.leagues[i].id+
	                    '">编辑</a><span>激活</span></td></tr>';
					}
				}
				//写入页面
				$("tbody").html(tr);
			}else if (data.resultcode==999) {
				pageAdd(1);
				//未数据
				$("tbody").html('<tr><td colspan="8" style="text-align: center;">暂无数据</td></tr>');
			}else if(data.resultcode==998){
				//未登录
				window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		},
		error:function () {
			console.log("请求错误");
		}
	});
}
//默认显示logo
function logoNone(logo){
	if (logo==undefined||logo=="") {
		return "../../img/logo_none.png";
	} else{
		return logo;
	}
}
//没有数据显示
function mainNone(main){
	if (main==undefined||main=="") {
		return "-";
	} else{
		return main;
	}
}
//冻结激活
$("tbody").on("click","td span",function () {
	var id = $(this).parents("tr").attr("data-id");
	var thisBtn = $(this);
	if ($(this).html()=="冻结") {
		$.ajax({
			type:"get",
			url:"../../v1/manager/league/updatestatus/"+id,
			async:true,
			success:function (data) {
				if (data.resultcode==1000) {
					//成功
					thisBtn.html("激活");
					thisBtn.parents("tr").addClass("disabled");
				} else if(data.resultcode==998){
					//未登录
					window.parent.alertFn('登录失效，请重新登录');
	                window.parent.returnLogin();
				}else{
					//alert(data.msg);
					window.parent.alertFn(data.msg);
				}
			},
			error:function () {
				console.log("请求错误");
			}
		});
		//测试用
		//$(this).html("激活");
		//$(this).parent().parent().addClass("disabled");
	} else{
		$.ajax({
			type:"get",
			url:"../../v1/manager/league/updatestatus/"+id,
			async:true,
			success:function (data) {
				if (data.resultcode==1000) {
					//成功
					thisBtn.html("冻结");
					thisBtn.parents("tr").removeClass();
				} else if(data.resultcode==998){
					//未登录
					window.parent.alertFn('登录失效，请重新登录');
	                window.parent.returnLogin();
				}else{
					//alert(data.msg);
					window.parent.alertFn(data.msg);
				}
			},
			error:function () {
				console.log("请求错误");
			}
		});
		//测试用
		//$(this).html("冻结");
		//$(this).parent().parent().removeClass();
	}
})
