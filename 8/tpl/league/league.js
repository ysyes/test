//页码加载项
//function pageAdd(pageidx,current){
//	if(pageidx==1){
//		$('.tcdPageCode').hide();
//	}else{
//		$(".tcdPageCode").createPage({
//		    pageCount: pageidx, //总页数
//		    current: current,   //当前页
//		    backFn: function (p) {   //单击回调方法，p是当前页码
//		        //加载列表
//		        listAdd(p);
//		    }
//		});
//	}
//}
var totalpage=1;
//初始化加载第一页
listAdd(1)
//加载列表
function listAdd(idx){
	$.ajax({
		type:"get",
		url:"../../v1/manager/league/"+idx,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				var tr = "";
				for (i in data.leagues) {
					tr+='<tr><td>'+
					data.leagues[i].id+'</td><td><img src="'+
					logoFn(data.leagues[i].logo)+'"/><span>'+
					data.leagues[i].name+'</span></td><td>'+
					data.leagues[i].code+'</td><td>'+
					["女足","男足"][data.leagues[i].sex]+'</td><td>'+
					dataNone(data.leagues[i].continent)+'</td><td>'+
					dataNone(data.leagues[i].country)+'</td><td>'+
					["","俱乐部","国家队","省队"][data.leagues[i].type]+'</td><td>'+
					dataNone(data.leagues[i].top)+'</td><td>'+
					dataNone(data.leagues[i].middle)+'</td><td>'+
					dataNone(data.leagues[i].lower)+'</td><td><a href="leagueAdd.html?page='+
					data.currentpage+'&leaguesid='+
					data.leagues[i].id+'">编辑</a><a href="leagueGroup.html?leaguesid='+
					data.leagues[i].id+'&name='+
					encodeURI(data.leagues[i].name)+'">分组</a></td></tr>';
				}
				$("#box table tbody").html(tr);
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
				  		        listAdd(page);
				  			}
			  			});
			    	}
			    }
			}else if(data.resultcode==999){
				$("#box table tbody").html('<tr><td colspan="11">暂无数据</td></tr>');
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
				window.parent.alertFn(data.msg);
			}
		}
	});
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