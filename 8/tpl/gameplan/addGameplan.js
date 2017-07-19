/**
 * Created by admin on 2016/11/24.
 */
var href=window.location.href.split('?')[1];
function teamsload(leagueyear,leagueid){
	$.ajax({
		url:'../../v1/manager/team/'+leagueyear+'/'+leagueid,
		type:'get',
		async:false,
		contentType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				var optionteams='';
				$(data.teams).each(function(){
					optionteams+='<option value='+this.id+'>'+this.name+'</option>';
				})
				$('select[name="hostteamid"]').html(optionteams);
	            $('select[name="clientteamid"]').html(optionteams);
			}
		}
	})
}
var leagueyear;
var leagueid;
//赛季选择下拉事件联动
$(".show select[name='leagueyear']").change(function () {
    $.ajax({
        type:"get",
        url:"../../v1/manager/common/leagueteam",
        async:true,
        contentType:'application/json',
        success:function (data) {
            //请求成功获得data
            if(data.resultcode == 1000) {
                var options='',optiongroup='';
            	leagueyear = $('select[name="leagueyear"]').val();
                $(data.leagueteams).each(function(){
                    //如果赛季为0时查询所有赛季中的所有赛事，否则根据赛季筛选
                    if(this.leagueyear==leagueyear){
                        $(this.leagues).each(function(){
                            options+="<option value="+this.id+">"+this.name+"</option>"
                            $(this.groups).each(function(){
                                optiongroup+="<option value="+this.id+">"+this.name+"</option>"
//                                $(this.teams).each(function(){
//                                    optionteams+="<option value="+this.id+">"+this.name+"</option>"
//                                })
                            })
                        })
                    }
                })
                $('select[name="leagueid"]').html(options);
                $('select[name="groupid"]').html(optiongroup);
                teamsload(leagueyear,leagueid);
            }
        }
    });
})
//赛事下拉事件联动
$(".show select[name='leagueid']").change(function () {
    $.ajax({
        type:"get",
        url:"../../v1/manager/common/leagueteam",
        async:true,
        contentType:'application/json',
        success:function (data) {
            //请求成功获得data
            if(data.resultcode == 1000) {
                var options='',optiongroup='',optionteams='';
                leagueyear=$('[name="leagueyear"]').val();
                leagueid = $('select[name="leagueid"]').children("option:checked").val();
                $(data.leagueteams).each(function(){
                    //如果赛季为0时查询所有赛季中的所有赛事，否则根据赛季筛选
                    if(this.leagueyear==leagueyear){
                        $(this.leagues).each(function(){
                            if(this.id==leagueid){
                                $(this.groups).each(function(){
                                    optiongroup+="<option value="+this.id+">"+this.name+"</option>"
//                                    $(this.teams).each(function(){
//                                        optionteams+="<option value="+this.id+">"+this.name+"</option>"
//                                    })
                                })
                            }
                        })
                    }
                })
                $('select[name="groupid"]').html(optiongroup);
                teamsload(leagueyear,leagueid);
            }
        }
    });
})
//分组
//$(".show select[name='groupid']").change(function(){
//    leagueyear=$('[name="leagueyear"]').val();
//    leagueid = $('[name="leagueid"]').val();
//    groupid = $('[name="groupid"]').val();
//    $.ajax({
//        type:"get",
//        url:"../../v1/manager/common/leagueteam",
//        async:true,
//        contentType:'application/json',
//        success:function (data) {
//            //请求成功获得data
//            if(data.resultcode == 1000) {
//                var options='',optiongroup='',optionteams='';
//                $(data.leagueteams).each(function(){
//                    //如果赛季为0时查询所有赛季中的所有赛事，否则根据赛季筛选
//                    if(this.leagueyear==leagueyear){
//                        $(this.leagues).each(function(){
//                            if(this.id==leagueid){
//                                $(this.groups).each(function(){
//                                    optiongroup+="<option value="+this.id+">"+this.name+"</option>"
//                                    if(this.id==groupid){
//                                        $(this.teams).each(function(){
//                                            optionteams+="<option value="+this.id+">"+this.name+"</option>"
//                                        })
//                                    }
//                                })
//                            }
//                        })
//                    }
//                })
//                $('select[name="hostteamid"]').html(optionteams);
//                $('select[name="clientteamid"]').html(optionteams);
//            }
//        }
//    });
//})
if(href!==undefined){
	//赛程编辑
    $('#box div.header div.admin span').html('赛程编辑');
    var arr=href.split('&');
    for(var i= 0,obj={};i<arr.length;i++){
        var name=arr[i].split('=')[0];
        var value=arr[i].split('=')[1];
        obj[name]=value;
    }
    $.ajax({
        type:"get",
        url:"../../v1/manager/common/leagueteam",
        async:true,
        contentType:'application/json',
        success:function (data) {
            //请求成功获得data
            if (data.resultcode == 1000) {
            	var options='',optiongroup='',optionteams='';
	            $(data.leagueteams).each(function(){
	                //如果赛季为0时查询所有赛季中的所有赛事，否则根据赛季筛选
	                if(this.leagueyear==obj.leagueyear){
	                    $(this.leagues).each(function(){
	                        options+="<option value="+this.id+">"+this.name+"</option>";
	                        if(this.id==obj.leagueid){
	                        	$(this.groups).each(function(){
	                                optiongroup+="<option value="+this.id+">"+this.name+"</option>"
//	                                $(this.teams).each(function(){
//	                                    optionteams+="<option value="+this.id+">"+this.name+"</option>"
//	                                })
	                            })
	                        }
	                    })
	                }
	            })
	            //写入下拉列表
	            $('select[name="leagueid"]').html(options);
	            $('select[name="groupid"]').html(optiongroup);
	            //选择值
	            $('[name="leagueyear"]').val(obj.leagueyear).attr('disabled','on');
	            $('select[name="leagueid"]').val(obj.leagueid).attr('disabled','on');
	            $('[name="groupid"]').val(obj.groupid);
	            teamsload(obj.leagueyear,obj.leagueid);
	            $('[name="gamesession"]').val(obj.gamesession);
	            $('[name="hostteamid"]').val(obj.hostteamid).attr('disabled','on');
	            $('[name="clientteamid"]').val(obj.clientteamid).attr('disabled','on');
            }
        }
    });
    $('[name="gametime"]').val(decodeURI(obj.gametime)+":00");
    $('[name="score"]').val(obj.score);
    
    $('div.show div.button button.submit').click(function() {
        var data = $('form').serializeArray();
        for (var i = 0, objdata = {}; i < data.length; i++) {
            var name = data[i].name;
            var value = data[i].value;
            objdata[name] = value;
        }
        objdata = JSON.stringify(objdata);
        $.ajax({
            url:'../../v1/manager/gameplan/'+obj.id,
            type:'put',
            data:objdata,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    window.parent.alertFn('编辑成功');
                    window.location='gameplan.html';
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                } else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    })
}else{
	//赛程新增
	$.ajax({
	    type:"get",
	    url:"../../v1/manager/common/leagueteam",
	    async:false,
	    contentType:'application/json',
	    success:function (data) {
	        //请求成功获得data
	        if (data.resultcode == 1000) {
	            var options='',optiongroup='',optionteams='';
	            $(data.leagueteams).each(function(){
	                //如果赛季为0时查询所有赛季中的所有赛事，否则根据赛季筛选
	                if(this.leagueyear==2016){
	                    $(this.leagues).each(function(){
	                        options+="<option value="+this.id+">"+this.name+"</option>";
	                        if(this.id==1){
	                        	$(this.groups).each(function(){
	                                optiongroup+="<option value="+this.id+">"+this.name+"</option>"
//	                                $(this.teams).each(function(){
//	                                    optionteams+="<option value="+this.id+">"+this.name+"</option>"
//	                                })
	                            })
	                        }
	                    })
	                }
	            })
	            $('select[name="leagueid"]').html(options);
	            $('select[name="groupid"]').html(optiongroup);
	            var leagueyear=$('select[name="leagueyear"]').val();
	            var leagueid= $('select[name="leagueid"]').val()
	            teamsload(leagueyear,leagueid);
	        }
	    }
	});
    $('div.show div.button button.submit').click(function(){
        var data=$('form').serializeArray();
        for(var i= 0,obj={};i<data.length;i++){
            var name=data[i].name;
            var value=data[i].value;
            obj[name]=value;
        }
        obj = JSON.stringify(obj);
        $.ajax({
            url:'../../v1/manager/gameplan',
            type:'post',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    window.parent.alertFn('新增成功');
                    window.location='gameplan.html';
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                } else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    })
}
$('input[name="gamesession"]').keyup(function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
