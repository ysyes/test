
var href=window.location.href.split('?')[1];
//调用通用赛事接口
$.ajax({
    url:'../../v1/manager/common/league',
    type:'get',
    async:false,
    success:function(data){
        if(data.resultcode==1000){
            var leaguesoption='';
            $(data.leagues).each(function(){
                leaguesoption+='<option value="'+this.id+'">'+this.name+'</option>'
            })
            $('select[name="leagueid"]').html(leaguesoption);
        }
    }
})
if(href!==undefined){
    $('#box div.header div.admin span').html('<a href="billboard.html">榜单</a>>>球员助攻榜编辑');
    var arr=href.split('&');
    for(var i= 0,obj={};i<arr.length;i++){
        var name=arr[i].split('=')[0];
        var value=arr[i].split('=')[1];
        obj[name]=value;
    }
    //初始化数据
    var id=obj.id;
    loadteams(obj.leagueyear,obj.leagueid);
    loadplayers(obj.leagueyear,obj.leagueid,obj.teamid);
    $('select[name="leagueyear"]').val(obj.leagueyear);
    $('select[name="leagueid"]').val(obj.leagueid);
    $('select[name="teamid"]').val(obj.teamid);
    $('select[name="playerid"]').val(obj.playerid);
    $('input[name="ranking"]').val(obj.ranking);
    $('input[name="num"]').val(obj.num);
    //编辑榜单-积分榜
    $('#box button.submit').click(function(){
    	if($('div.show input[name="ranking"]').val()==''||$('div.show input[name="num"]').val()==''){
    		window.parent.alertFn('必填字段不能为空')
    	}else{
    		var data=$('form').serializeArray();
            for(var i= 0,obj={};i<data.length;i++){
                var name=data[i].name;
                var value=data[i].value;
                obj[name]=value;
            }
            obj = JSON.stringify(obj);
            $.ajax({
                url:'../../v1/manager/billboard/assists/'+id,
                type:'put',
                contentType:'application/json',
                data:obj,
                success:function(data){
                    if(data.resultcode==1000){
                        window.parent.alertFn('编辑成功');
                        window.location='billboard.html';
                    } else if (data.resultcode == 998) {
                        window.parent.alertFn('登录失效，请重新登录');
                        window.parent.returnLogin();
                    } else{
                        window.parent.alertFn(data.msg);
                    }
                }
            })
    	}
        
    })
}else{
    //默认赛季为2016，赛事为中超，调用根据赛季，赛事查询球队
    loadteams(2016,1);
    loadplayers(2016,1,1);
    //新增榜单-积分榜
    //点击提交按钮，提交表单数据
    $('#box button.submit').click(function(){
    	if($('div.show input[name="ranking"]').val()==''||$('div.show input[name="num"]').val()==''){
    		window.parent.alertFn('必填字段不能为空')
    	}else{
    		var data=$('form').serializeArray();
            for(var i= 0,obj={};i<data.length;i++){
                var name=data[i].name;
                var value=data[i].value;
                obj[name]=value;
            }
            obj = JSON.stringify(obj);
            $.ajax({
                url:'../../v1/manager/billboard/assists',
                type:'post',
                contentType:'application/json',
                data:obj,
                success:function(data){
                    if(data.resultcode==1000){
                        window.parent.alertFn('新增成功');
                        window.location='billboard.html';
                    } else if (data.resultcode == 998) {
                        window.parent.alertFn('登录失效，请重新登录');
                        window.parent.returnLogin();
                    } else{
                        window.parent.alertFn(data.msg);
                    }
                }
            })
    	}
    })
}
//根据赛季，赛事查询球队接口
function loadteams(leagueyear,leagueid){
    $.ajax({
        url:'../../v1/manager/common/'+leagueyear+'/'+leagueid,
        type:'get',
        async:false,
        success:function(data){
            if(data.resultcode==1000){
                var teamsoption='';
                $(data.teams).each(function(){
                    teamsoption+='<option value="'+this.id+'">'+this.name+'</option>'
                })
                $('select[name="teamid"]').html(teamsoption);
            } else if(data.resultcode==999){
                $('select[name="teamid"]').html('');
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//根据赛季，赛事，球队查询球员接口
function loadplayers(leagueyear,leagueid,teamid){
    $.ajax({
        url:'../../v1/manager/common/'+leagueyear+'/'+leagueid+'/'+teamid,
        type:'get',
        async:false,
        success:function(data){
            if(data.resultcode==1000){
                var playeroptions='';
                $(data.players).each(function(){
                    playeroptions+='<option value="'+this.id+'">'+this.name+'</option>'
                })
                $('select[name="playerid"]').html(playeroptions);
            } else if(data.resultcode==999){
                $('select[name="playerid"]').html('');
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//赛季、赛事发生改变
$('select[name="leagueyear"]').change(function(){
    var leagueyear=$('select[name="leagueyear"]').val();
    var leagueid=$('select[name="leagueid"]').val();
    loadteams(leagueyear,leagueid);
    var teamid=$('select[name="teamid"]').val();
    if(teamid!==null){
        loadplayers(leagueyear,leagueid,teamid);
    }else{
    	$('select[name="playerid"]').html('')
    }
})
$('select[name="leagueid"]').change(function(){
    var leagueyear=$('select[name="leagueyear"]').val();
    var leagueid=$('select[name="leagueid"]').val();
    loadteams(leagueyear,leagueid)
    var teamid=$('select[name="teamid"]').val();
    if(teamid!==null){
        loadplayers(leagueyear,leagueid,teamid);
    }else{
    	$('select[name="playerid"]').html('')
    }
})
//球队发生改变
$('select[name="teamid"]').change(function(){
    var leagueyear=$('select[name="leagueyear"]').val();
    var leagueid=$('select[name="leagueid"]').val();
    var teamid=$('select[name="teamid"]').val();
    loadplayers(leagueyear,leagueid,teamid);
})
//限制input只能输入数字
$('input').keyup(function(){
    var reg=/[^\d]*/g;
    $(this).val($(this).val().replace(reg,''));
})


