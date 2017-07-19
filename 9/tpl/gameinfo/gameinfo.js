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
//pageAdd(1,1);
listFn(1);
//加载情报列表
function listFn(page){
	$.ajax({
		type:"get",
		url:"../../v1/manager/gameinfo/"+page,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				//加载页码
				if (data.totalpage!=totalpage) {
					totalpage=data.totalpage;
					//调取加载页面函数
					pageAdd(data.totalpage);
				}
				var tr = '';
				for (i in data.gameinfos) {
					switch(data.gameinfos[i].status){
						case 1:status='未开赛';break;
						case 2:status='上半场';break;
						case 3:status='中场';break;
						case 4:status='下半场';break;
						case 5:status='加时赛上半场';break;
						case 6:status='加时赛下半场';break;
						case 7:status='点球决战';break;
						case 8:status='完场';break;
						case 9:status='推迟';break;
						case 10:status='中断';break;
						case 11:status='腰斩';break;
						case 12:status='取消';break;
						case 13:status='待定';
					}
					tr +='<tr><td>'+data.gameinfos[i].leaguename+'</td><td>'+panduan(data.gameinfos[i].session)+'</td><td>'+data.gameinfos[i].gametime+'</td><td>'+data.gameinfos[i].hostname+'</td><td>'+data.gameinfos[i].guestname+'</td><td>'+data.gameinfos[i].score+'</td><td>'+data.gameinfos[i].gameyear+'</td><td>'+status+'</td></tr>'
				}
				//写入
				$(".content tbody").html(tr);
			}else if(data.resultcode==999){
				$("tbody").html('<tr><td colspan="8">暂无数据</td></tr>');
				pageAdd(1);
			}else if(data.resultcode==998){
				//未登录
				window.parent.alertFn('登录超时，请重新登录');
                window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	});
}
//判断返回数据是否为空
function panduan(x){
	return x==""||x==undefined?'-':x;
}
