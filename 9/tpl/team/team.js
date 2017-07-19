var totalpage=1;
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
//赛事下拉列表
$.ajax({
	type:"get",
	url:"../../v1/manager/common/leagues",
	async:true,
	success:function (data) {
		if (data.resultcode==1000) {
			var options='<option value="0">所有赛事</option>';
			for (i in data.leagues) {
				options +='<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>';
			}
			$(".select select").html(options);
		} else{
			console.log(data.msg);
		}
	}
});
$(".header .select select").change(function () {
	totalpage=1;
	pageAdd(1);
	listFn(1);
})

//加载球队列表
listFn(1);
function listFn(page) {
	var leagueid = $(".header select option:checked").val();
	$.ajax({
		type:"get",
		url:"../../v1/manager/team/"+leagueid+"/"+page,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				//加载页码
				if (data.totalpage!=totalpage) {
					totalpage=data.totalpage;
					pageAdd(data.totalpage);
				}
				var tr='';
				for (i in data.teams) {
					//判断激活、冻结
					if (data.teams[i].status==1) {
						tr+='<tr data-id="'+
						data.teams[i].id+'"><td title="'+
						data.teams[i].name+'"><img src="'+
						logoNone(data.teams[i].logourl)+'"/>'+
						mainLength(data.teams[i].name)+'</td><td>'+
						data.teams[i].code+'</td><td>'+
						mainNone(data.teams[i].leaguename)+'</td><td><a href="teamEdit.html?leagueid='+
						leagueid+'&page='+data.page+'&id='+data.teams[i].id+
						'">编辑</a><span>冻结</span></td></tr>';
					} else if (data.teams[i].status==0){
						tr+='<tr class="disabled" data-id="'+
						data.teams[i].id+'"><td title="'+
						data.teams[i].name+'"><img src="'+
						logoNone(data.teams[i].logourl)+'"/>'+
						mainLength(data.teams[i].name)+'</td><td>'+
						data.teams[i].code+'</td><td>'+
						mainNone(data.teams[i].leaguename)+'</td><td><a href="teamEdit.html?leagueid='+
						leagueid+'&page='+data.page+'&id='+data.teams[i].id+
						'">编辑</a><span>激活</span></td></tr>';
					}
				}
				//写入页面
				$("tbody").html(tr);
			}else if (data.resultcode==999) {
				//未数据
				$("tbody").html('<tr><td colspan="4" style="text-align: center;">暂无数据</td></tr>');
				pageAdd(1);
			}else if(data.resultcode==998){
				//未登录
				window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
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
//超长处理
function mainLength(data){
	if (data.length>22) {
		return data.slice(0,21)+"..."
	} else{
		return data;
	}
}
//冻结激活
$("tbody").on("click","td span",function () {
	var id = $(this).parents("tr").attr("data-id");
	var thisBtn = $(this);
	$.ajax({
		type:"get",
		url:"../../v1/manager/team/updatestatus/"+id,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				//成功
				if (thisBtn.html()=="冻结") {
					thisBtn.html("激活");
					thisBtn.parents("tr").addClass("disabled");
				} else{
					thisBtn.html("冻结");
					thisBtn.parent().parent().removeClass();
				}
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
})
