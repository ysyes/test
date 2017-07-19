//赛季赛事球队初始化查询所有
var leagueyear=2016;
var leagueid=0;
var teamid =0;
//赛季事件
$("header .leagueyear").change(function () {
	leagueFn();
})
//赛事下拉加载
leagueFn();
function leagueFn() {
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
				$("header .league").html('<option value="0">所有赛事</option>'+opti);
				//调取球队列表
				teamFn();
			}else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	});
}
$("header .league").change(function () {
	teamFn();
})
//球队下拉列表
function teamFn(){
	var opti='';
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/teamleague/"+$('header .leagueyear option:checked').val(),
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				for (i in data.leagues) {
					if ($('header .league option:checked').val()==0) {
						for (j in data.leagues[i].teams) {
							opti+='<option value="'+data.leagues[i].teams[j].id+'">'+data.leagues[i].teams[j].name+'</option>';
						}
					} else{
						if (data.leagues[i].id==$('header .league option:checked').val()) {
							for (j in data.leagues[i].teams) {
								opti+='<option value="'+data.leagues[i].teams[j].id+'">'+data.leagues[i].teams[j].name+'</option>';
							}
						}
					}
				}
				//写入球队
				$("header .team").html('<option value="0">所有球队</option>'+opti);
				//调取列表
				leagueyear=$('[name="leagueyear"]').val();
				leagueid = $('[name="league"]').val();
				teamid = $('[name="team"]').val();
				listAdd(1);
			}else if (data.resultcode==999){
				$("header .team").html('<option value="0">所有球队</option>');
				$("#box table tbody").html('<tr><td colspan="14" style="text-align: center;">没有查询到符合条件的数据</td></tr>');
			}
		}
	});
}
//改变球队
$("header select.team").change(function(){
	leagueyear=$('[name="leagueyear"]').val();
	leagueid = $('[name="league"]').val();
	teamid = $('[name="team"]').val();
	//加载列表
	listAdd(1);
})
var totalpage=1;
//加载列表
function listAdd(idx){
	$.ajax({
		type:"get",
		url:"../../v1/manager/player/"+leagueyear+"/"+leagueid+"/"+teamid+"/"+idx,
		async:true,
		beforeSend:function () {
        	//添加loading
        	$('#box table tbody').html('<tr><td style="border-bottom: none;padding: 100px 0;" colspan="15"><img style="width: 100px;height: 100px;border: none;margin: 0 auto;float: initial;" src="../../img/loading.gif"/></td></tr>');
        },
		success:function (data) {
			if (data.resultcode==1000) {
				if(data.totalpage==1){
			        $('.tcdPageCode').hide();
		    		totalpage=1
			    }else {
			    	if(data.totalpage!==totalpage){
			    		$('.tcdPageCode').show();
			            totalpage=data.totalpage;
			            $("#tcdPageCode").Page({
				  			totalPages: parseInt(data.totalpage),//分页总数
				  			liNums: 7,//分页的数字按钮数(建议取奇数)
				  			activeClass: 'activP', //active 类样式定义
				  			callBack : function(page){
				  		        listAdd(page);
				  			}
			  			});
			    	}
			    }
				var tr = "";
				for (i in data.players) {
					var tname=dataNone(data.players[i].teamname);
					var teamname=tname.length>9?tname.slice(0,6)+'...':tname;
					var name=data.players[i].name;
					var namereplace=data.players[i].name.replace(/ /g,'&nbsp;');
					var nameslice=name.length>20?name.slice(0,18).replace(/ /g,'&nbsp;')+'...':name;
					var salary=(dataNone(data.players[i].salary)=='-')?'-':(dataNone(data.players[i].salary))/10000;
					var status=dataNone(data.players[i].type)=='-'?'-':["","在编","已转会"][data.players[i].type]
					if(data.players[i].type==1){
						tr+='<tr playerid='+data.players[i].id+'><td><img src="'+
						logoFn(data.players[i].logo)+'"/><span title='+namereplace+'>'+
						nameslice+'</span></td><td>'+
						["女","男"][data.players[i].sex]+'</td><td>'+
						data.players[i].code+'</td><td>'+
						dataNone(data.players[i].leaguename)+'</td><td title='+dataNone(data.players[i].teamname)+'>'+
						teamname+'</td><td>'+
						dataNone(data.players[i].area)+'</td><td>'+
						dataNone(data.players[i].birthday).slice(2)+'</td><td>'+
						dataNone(data.players[i].height)+'/'+dataNone(data.players[i].weight)+'</td><td>'+
						dataNone(data.players[i].jerseynumber)+'</td><td>'+
						dataNone(data.players[i].registernumber)+'</td><td>'+
						dataNone(data.players[i].positions)+'</td><td>'+
						dataNone(["","左脚","右脚"][data.players[i].foot])+'</td><td>'+
						salary+'</td><td>'+
						status+'</td><td><a href="playerEdit.html?'+
						encodeURI("playerid="+data.players[i].id+
						"&name="+data.players[i].name+
						"&code="+data.players[i].code+
						"&city="+datakong(data.players[i].area)+
						"&birthday="+datakong(data.players[i].birthday)+
						"&height="+datakong(data.players[i].height)+
						"&weight="+datakong(data.players[i].weight)+
						"&positions="+datakong(data.players[i].positions)+
						"&sex="+data.players[i].sex+
						"&foot="+datakong(data.players[i].foot)+
						"&jerseynumber="+datakong(data.players[i].jerseynumber)+
						"&registernumber="+datakong(data.players[i].registernumber)+
						"&salary="+datakong(data.players[i].salary)+
						"&image="+logoFn(data.players[i].logo))+
						'">编辑</a><a>转会</a></td></tr>';
					}else if(data.players[i].type==2){
						tr+='<tr playerid='+data.players[i].id+'><td class="gray"><img src="'+
						logoFn(data.players[i].logo)+'"/><span title='+namereplace+'>'+
						nameslice+'</span></td><td class="gray">'+
						["女","男"][data.players[i].sex]+'</td><td class="gray">'+
						data.players[i].code+'</td><td class="gray">'+
						dataNone(data.players[i].leaguename)+'</td><td title='+dataNone(data.players[i].teamname)+' class="gray">'+
						teamname+'</td><td class="gray">'+
						dataNone(data.players[i].area)+'</td><td class="gray">'+
						dataNone(data.players[i].birthday).slice(2)+'</td><td class="gray">'+
						dataNone(data.players[i].height)+'/'+dataNone(data.players[i].weight)+'</td><td class="gray">'+
						dataNone(data.players[i].jerseynumber)+'</td><td class="gray">'+
						dataNone(data.players[i].registernumber)+'</td><td class="gray">'+
						dataNone(data.players[i].positions)+'</td><td class="gray">'+
						dataNone(["","左脚","右脚"][data.players[i].foot])+'</td><td class="gray">'+
						salary+'</td><td class="gray">'+
						status+'</td><td><a href="playerEdit.html?'+
						encodeURI("playerid="+data.players[i].id+
						"&name="+data.players[i].name+
						"&code="+data.players[i].code+
						"&city="+datakong(data.players[i].area)+
						"&birthday="+datakong(data.players[i].birthday)+
						"&height="+datakong(data.players[i].height)+
						"&weight="+datakong(data.players[i].weight)+
						"&positions="+datakong(data.players[i].positions)+
						"&sex="+data.players[i].sex+
						"&foot="+datakong(data.players[i].foot)+
						"&jerseynumber="+datakong(data.players[i].jerseynumber)+
						"&registernumber="+datakong(data.players[i].registernumber)+
						"&salary="+datakong(data.players[i].salary)+
						"&image="+logoFn(data.players[i].logo))+
						'">编辑</a><a>转会</a></td></tr>';
					}
					
				}
				$("#box table tbody").html(tr);
			}else if(data.resultcode==999){
				$("#box table tbody").html('<tr><td colspan="14" style="text-align: center;">没有查询到符合条件的数据</td></tr>');
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
				window.parent.alertFn(data.msg);
			}
		}
	});
}

//没有数据的显示-
function dataNone(data) {
	if (data==undefined || data=="" || data==NaN) {
		return "-";
	} else{
		return data;
	}
}
function datakong(data) {
	if (data==undefined || data=="" || data==NaN) {
		return "";
	} else{
		return data;
	}
}
//默认球员logo
function logoFn(url){
	if (url!=""&&url!=undefined) {
		return url;
	} else{
		return '../../img/parent.png';
	}
}
//转会
$('#box table tbody').on('click','tr td a:nth-child(2)',function(){
	//调取赛事联动
	leagueInfoFn();
	var name=$(this).parents('tr').find('td:first-child span').html();
	var nametitle=$(this).parents('tr').find('td:first-child span').attr('title');
	var code=$(this).parents('tr').find('td:eq(2)').html();
	var team=$(this).parents('tr').find('td:eq(4)').html();
	var playerid=$(this).parents('tr').attr('playerid');
	$('#zhuanhui').show();
	$('#zhuanhui p.ago span.name').attr('title',nametitle).html(name);
	$('#zhuanhui p.ago span.code').html("("+code+")");
	$('#zhuanhui p.ago span.team').html(" "+team);
	$('#zhuanhui').attr('playerid',playerid);
})
$('#zhuanhui button.back').click(function(){
	$('#zhuanhui').hide();
})
$('#zhuanhui button.confirm').click(function(){
	var playerid=$('#zhuanhui').attr('playerid');
	var leagueyear=$('#zhuanhui select.leagueyear option:checked').val();
	var teamid=$('#zhuanhui select[name="team"]').val();
	var type=$('#zhuanhui .check input:checked')[0]?2:0;
	$.ajax({
		url:'../../v1/manager/player/'+playerid+'/'+leagueyear+'/join/'+teamid,
		type:'get',
		contentType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				window.parent.alertFn('转会成功');
				$('#zhuanhui').hide();
				location.reload()
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	})
})

//转会赛季事件
$(".now .leagueyear").change(function () {
	teamInfoFn();
})

//赛事下拉加载
function leagueInfoFn() {
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
				$(".now .league").html(opti);
				teamInfoFn();
			}
		}
	});
}
//转会赛事事件
$(".now .league").change(function () {
	teamInfoFn();
})
//球队下拉列表
function teamInfoFn(){
	var opti='';
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/teamleague/"+$('.now .leagueyear option:checked').val(),
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				for (i in data.leagues) {
					if ($('.now .league option:checked').val()==0) {
						for (j in data.leagues[i].teams) {
							opti+='<option value="'+data.leagues[i].teams[j].id+'">'+data.leagues[i].teams[j].name+'</option>';
						}
					} else{
						if (data.leagues[i].id==$('.now .league option:checked').val()) {
							for (j in data.leagues[i].teams) {
								opti+='<option value="'+data.leagues[i].teams[j].id+'">'+data.leagues[i].teams[j].name+'</option>';
							}
						}
					}
				}
				//写入球队
				$(".now .team").html(opti);
			}else if (data.resultcode==999){
				$(".now .team").html('');
			}
		}
	});
}
