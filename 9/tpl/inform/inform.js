//初始化总页参数
var totalpage=1;
//页码加载项
function pageAdd(pageidx,current){
	if(pageidx==1){
		$('.tcdPageCode').hide();
	}else{
		$(".tcdPageCode").createPage({
		    pageCount: pageidx, //总页数
		    current: current,   //当前页
		    backFn: function (p) {   //单击回调方法，p是当前页码
		        //加载列表
		        //listAdd(p);
		    }
		});
	}
}
pageAdd(1,1);

//加载情报列表
function listFn(page){
	$.ajax({
		type:"get",
		url:"../../",
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				//加载页码
				if (data.totalpage!=totalpage) {
					totalpage=data.totalpage;
					//调取加载页面函数
					pageAdd(data.totalpage,data.currentpage)
				}
				
				var tr = '';
				for (i in data) {
					tr +='<td>中超联赛</td>
	                    <td>2</td>
	                    <td>2016-11-25</td>
	                    <td>广州恒大淘宝</td>
	                    <td>黑龙江火山明泉</td>
	                    <td>2:1</td>
	                    <td>2016</td>
	                    <td>球赛未开始</td>'
				}
				//写入
				$(".content tbody").html(tr);
			} else if(data.resultcode==999){
				$("tbody").html('<tr><td colspan="8">暂无数据</td></tr>');
			}else if(data.resultcode==998){
				//未登录
				
			}
		}
	});
}
