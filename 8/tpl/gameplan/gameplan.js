/**
 * Created by admin on 2016/11/23.
 */
var leagueyear,leagueid,groupid;
//赛事球队下拉列表加载
$.ajax({
    type:"get",
    url:"../../v1/manager/common/leagueteam",
    contentType:'application/json',
    success:function (data) {
        //请求成功获得data
        if (data.resultcode == 1000) {
        	var optionyear='';
            var options=""
            var optiongroup="<option value='0'>所有分组</option>"
            $(data.leagueteams).each(function(){
            	optionyear+="<option value="+this.leagueyear+">"+this.leagueyear+"赛季</option>";
                $(this.leagues).each(function(){
                    options+="<option value="+this.id+">"+this.name+"</option>";
                    if(this.id==1){
                    	$(this.groups).each(function(){
                            optiongroup+="<option value="+this.id+">"+this.name+"</option>";
                        })
                    }
                })
            })
            $('select[name="leagueyear"]').html(optionyear);
            $('select[name="leagueid"]').html(options);
            $('select[name="groupid"]').html(optiongroup);
            leagueyear=$('[name="leagueyear"]').val();
            leagueid = $('[name="leagueid"]').val();
            groupid = $('[name="groupid"]').val();
            listAdd();
        }else if (data.resultcode == 998) {
            window.parent.alertFn('登录失效，请重新登录');
            window.parent.returnLogin();
        }else{
            window.parent.alertFn(data.msg);
        }
    }
});
//赛季选择下拉事件联动
$(".header div select.leagueyear").change(function () {
    leagueyear = $(this).children("option:checked").val();
    $.ajax({
        type:"get",
        url:"../../v1/manager/common/leagueteam",
        async:true,
        contentType:'application/json',
        success:function (data) {
            //请求成功获得data
            if(data.resultcode == 1000) {
                var options="";
                var optiongroup="<option value='0'>所有分组</option>";
                $(data.leagueteams).each(function(){
                    //如果赛季为0时查询所有赛季中的所有赛事，否则根据赛季筛选
                    if(this.leagueyear==leagueyear){
                        $(this.leagues).each(function(){
                            options+="<option value="+this.id+">"+this.name+"</option>"
                            $(this.groups).each(function(){
                                //$(this.teams).each(function(){
                                optiongroup+="<option value="+this.id+">"+this.name+"</option>"
                                //})
                            })
                        })
                    }
                })
                $('select[name="leagueid"]').html(options);
                $('select[name="groupid"]').html(optiongroup);
                //加载列表
                leagueid = $('[name="leagueid"] option:checked').val();
                groupid = $('[name="groupid"] option:checked').val();
                listAdd();
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    });

})
//赛事球队下拉事件联动
$(".header select.league").change(function () {
    leagueyear=$('[name="leagueyear"]').val();
    leagueid = $(this).children("option:checked").val();
    $.ajax({
        type:"get",
        url:"../../v1/manager/common/leagueteam",
        async:true,
        contentType:'application/json',
        success:function (data) {
            //请求成功获得data
            if(data.resultcode == 1000) {
                var options=""
                var optiongroup="<option value='0'>所有分组</option>"
                $(data.leagueteams).each(function(){
                    //如果赛季为0时查询所有赛季中的所有赛事，否则根据赛季筛选
                    if(this.leagueyear==leagueyear){
                        $(this.leagues).each(function(){
                            if(this.id==leagueid){
                                $(this.groups).each(function(){
                                    //$(this.teams).each(function(){
                                    optiongroup+="<option value="+this.id+">"+this.name+"</option>"
                                    //})
                                })
                            }
                        })
                    }
                })
                $('select[name="groupid"]').html(optiongroup);
                //加载列表
                groupid = $('[name="groupid"] option:checked').val();
                listAdd();
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    });
})
$(".header select.group").change(function(){
    leagueyear=$('[name="leagueyear"] option:checked').val();
    leagueid = $('[name="leagueid"] option:checked').val();
    groupid = $('[name="groupid"] option:checked').val();
    //加载列表
    listAdd();
//    listPage();
})
//加载列表
function listAdd(){
    $.ajax({
        url:'../../v1/manager/gameplan/'+leagueyear+'/'+leagueid+'/'+groupid,
        type:'get',
        contentType:'application/json',
        beforeSend:function () {
        	//添加loading
        	$('div.content table tbody').html('<tr><td style="border-bottom: none;padding: 100px 0;" colspan="10"><img style="width: 100px;height:100px;" src="../../img/loading.gif"/></td></tr>')
        },
        success:function(data){
            $('div.content table tbody').html('');
            if(data.resultcode==1000){
                $(data.gameplans).each(function(){
                    $('div.content table tbody').append("<tr gameid="+this.id+"> <td><input type='checkbox'/></td><td>"+this.leagueyear+"</td> <td>"+this.leaguename+"</td><td>"+this.groupname+"</td><td>"+this.gamesession+"</td><td>"+this.hostteamname+"</td> <td>"+this.clientteamname+"</td><td>"+this.gametime+"</td><td><input type='text' value='"+this.score+"' disabled/></td><td><span><a href='addGameplan.html?id="+this.id+"&leagueyear="+this.leagueyear+"&leagueid="+this.leagueid+"&groupid="+this.groupid+"&hostteamid="+this.hostteamid+"&clientteamid="+this.clientteamid+"&gamesession="+this.gamesession+"&gametime="+this.gametime+"&score="+this.score+"'>编辑</a></span></td></tr>");
                })
            }else if(data.resultcode==999){
            	$('div.content table tbody').append('<tr><td colspan="10">没有查询到符合条件的数据</td></tr>')
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//页码加载
//function listPage(){
//    $.ajax({
//        type:"get",
//        url:"../../v1/manager/gameplan/"+leagueyear+"/"+leagueid+"/"+groupid+"/1",
//        async:true,
//        success:function (data) {
//            if (data.resultcode==1000) {
//                pageAdd(data.totalpage);
//            }
//        }
//    });
//}
//没有数据的显示-
function dataNone(data) {
    if (data==undefined || data=="" || data==NaN) {
        return "-";
    } else{
        return data;
    }
}

//导出数据弹出框
$('#box div.header>div.daochuButton').click(function(){
	//判断有无选中数据；
	var gameids=[];
    var inputs=$('div.content tbody td:first-child input');
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].checked){
           gameids.push($('div.content tbody tr:nth-child('+(i+1)+')').attr('gameid'))
        }
    }
    if (gameids.length>0) {
    	$(".daochu").show();
    	$('#daochu').show();
    } else{
    	window.parent.alertFn("未选择任何据");
    }
	
})
$('.daochu button.back').click(function(){
    $('#daochu').hide();
    $(".daochu").hide();
})
$('.daochu button.confirm').click(function(){
	$(".daochu").hide();
	$("#loading").show();
	var type=$('input[name="content"]:checked').val();
	var detail=$('input[name="type"]:checked').val();
    var gameids=[];
    var input=$('div.content tbody td:first-child input');
    for(var i=0;i<input.length;i++){
        if(input[i].checked){
           gameids.push($('div.content tbody tr:nth-child('+(i+1)+')').attr('gameid'))
        }
    }
    var obj=JSON.stringify({'type':type,'detail':detail,'gameids':gameids});
    $.ajax({
        url:'../../v1/manager/gameplan/export',
        type:'post',
        data:obj,
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                window.parent.alertFn(data.msg);
                window.location.href = data.url;
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
            //关闭弹窗
            $('#daochu').hide();
    		$("#loading").hide();
        },
        error:function () {
        	$('#daochu').hide();
    		$("#loading").hide();
    		window.parent.alertFn('请求错误');
        }
    })
})
//全选
$('div.content table th:first-child input').click(function(){
	var input=$('div.content tbody td:first-child input');
    if($('div.content table th:first-child input:checked')[0]){
    	for(var i=0;i<input.length;i++){
    		input[i].checked=true;
    	}
    }else{
    	for(var i=0;i<input.length;i++){
    		input[i].checked=false;
    	}
    }
})
//文件选择
$('.excel input').change(function(){
    $('#import .excel span').html($('input[type="file"]').val()).css('color','#333');
})
//点击导入数据按钮出现弹窗
$('#box div.header>div.daoruButton').click(function(){
//    var type=$(".chooseName li.checked").index('.chooseName li')+1;
    $('#import').show()
})
//导入弹窗点击取消关闭弹窗
$('#import button.gray').click(function(){
    $('#import').hide();
})
//导入数据确认弹窗关闭
$('#importConfirm button.gray').click(function(){
    $('#importConfirm').hide();
})
//导入弹窗点击确认按钮出现确认数据弹窗
$('#import button.red').click(function(){
	if ($('#import div.excel input').val() != "") {
	
	//将录入信息保存至弹出框的自定义属性
    $('#import').attr('leagueyear',$('#import select.leagueyear').val()).attr('leagueid',$('#import select.leagueid').val());
    //显示确认框
    $('#importConfirm').show();
    //将录入信息显示到确认框中
    $('#importConfirm p.leagueyear').html($('#import select.leagueyear option:checked').html());
    $('#importConfirm p.league').html($('#import select.leagueid option:checked').html());
    $('#importConfirm p.filename').html($('#import .excel span').html());
    } else{
		window.parent.alertFn('请上传Excel文件');
	}
})
//确认框点击确认按钮 获取录入信息并提交到后台
$('#importConfirm div.button button.red').click(function(){
	//获取录入信息
    var leagueyear=$('#import').attr('leagueyear');
    var leagueid=$('#import').attr('leagueid');
    //提交formdata数据
    var formdata=new FormData();
    formdata.append('datafile',$('#import div.excel input')[0].files[0])
    $.ajax({
        url:'../../v1/manager/gameplan/import/'+leagueyear+'/'+leagueid,
        type:'post',
        data:formdata,
        processData:false,
        dataType:'json',
        contentType:false,
        beforeSend:function () {
        	//添加loading
        	$('div.content table tbody').html('<tr><td style="border-bottom: none;padding: 100px 0;" colspan="10"><img style="width: 100px;" src="../../img/loading.gif"/></td></tr>')
        },
        success:function(data){
            if(data.resultcode==1000){
                window.parent.alertFn('数据导入成功');
                $('#import').hide();
                $('#importConfirm').hide();
                listAdd();
            }else if(data.resultcode==1999){
            	window.parent.alertFn(data.msg);
//                $('#import').hide();
//                $('#importConfirm').hide();
            	listAdd();
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
})