//通用赛事列表下拉筛选
$.ajax({
    type:"get",
    url:"../../v1/manager/common/league",
    async:false,
    success:function (data) {
        if (data.resultcode == 1000) {
            var options = '';
            for (i in data.leagues) {
                options += '<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>';
            }
            $("#box .header select.league").html(options);
            $('#import select.leagueid').html(options);
        }else if (data.resultcode == 998) {
            window.parent.alertFn('登录失效，请重新登录');
            window.parent.returnLogin();
        }else{
            window.parent.alertFn(data.msg);
        }
    }
});
//根据赛季赛事检索列表
$('div.header select[name="leagueyear"]').change(function(){
    var type=$(".chooseName li.checked").index('.chooseName li')+1;
    var leagueyear=$('select[name="leagueyear"]').val();
    var leagueid=$('select[name="leagueid"]').val();
    window.sessionStorage.setItem('leagueid',leagueid);
    if(type==1){
        loadscore(leagueyear,leagueid);
    }else if(type==2){
        loadshooter(leagueyear,leagueid);
    }else if(type==3){
        loadassists(leagueyear,leagueid);
    }else if(type==4){
        loadAssistboard(leagueyear,leagueid);
    }else if(type==5){
        loadTeamscoreboard(1,leagueyear,leagueid);
    }else if(type==6){
        loadTeamscoreboard(2,leagueyear,leagueid);
    }
})
$('div.header select[name="leagueid"]').change(function(){
    $('select[name="leagueyear"]').change();
})
//加载session里的index
var index=window.sessionStorage.getItem('lichecked');
var leaguesession=window.sessionStorage.getItem('leagueid');
if(index){
    $(".chooseName li:nth-child("+index+")").addClass("checked").siblings().removeClass();
    $('div.content>div').hide();
    $('div.content>div:nth-child('+index+')').show();
}
if(leaguesession){
	$('div.header select.league').val(leaguesession);
}else{
	leaguesession=1;
}
if(index==2){
    $('#box div.header>a').attr('href','addShooter.html')
    loadshooter(2016,leaguesession);
}else if(index==3){
    $('#box div.header>a').attr('href','addAssists.html')
    loadassists(2016,leaguesession);
}else if(index==4){
    $('#box div.header>a').attr('href','addAssistboard.html')
    loadAssistboard(2016,leaguesession);
}else if(index==5){
    $('#box div.header>a').attr('href','addHscoreboard.html?type=1')
    loadTeamscoreboard(1,2016,leaguesession);
}else if(index==6){
    $('#box div.header>a').attr('href','addCscoreboard.html?type=2')
    loadTeamscoreboard(2,2016,leaguesession);
}else{
    $('#box div.header>a').attr('href','addScoreboard.html')
    loadscore(2016,leaguesession);
}
//菜单改变
$(".chooseName li").click(function () {
    $(this).addClass("checked").siblings().removeClass();
    //内容发生改变
    var index=$(this).index('.chooseName li')+1;
    window.sessionStorage.setItem('lichecked',index);
    $('div.content>div').hide();
    $('div.content>div:nth-child('+index+')').show();
    var leagueyear=$('#box .header select.leagueyear').val();
    var leagueid=$('#box .header select.league').val();
    if(index==1){
        $('#box div.header>a').attr('href','addScoreboard.html')
        loadscore(leagueyear,leagueid);
    }else if(index==2){
        $('#box div.header>a').attr('href','addShooter.html')
        loadshooter(leagueyear,leagueid);
    }else if(index==3){
        $('#box div.header>a').attr('href','addAssists.html')
        loadassists(leagueyear,leagueid);
    }else if(index==4){
        $('#box div.header>a').attr('href','addAssistboard.html')
        loadAssistboard(leagueyear,leagueid);
    }else if(index==5){
        $('#box div.header>a').attr('href','addHscoreboard.html')
        loadTeamscoreboard(1,leagueyear,leagueid);
    }else if(index==6){
        $('#box div.header>a').attr('href','addCscoreboard.html')
        loadTeamscoreboard(2,leagueyear,leagueid);
    }
});
//文件选择
$('.excel input').change(function(){
    $('#import .excel span').html($('input[type="file"]').val()).css('color','#333');
})
//点击导入数据按钮出现弹窗
$('#box div.header>div.addBtn').click(function(){
    var type=$(".chooseName li.checked").index('.chooseName li')+1;
    $('#import').show().attr('type',type)
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
	//判断Excel不为空
	if ($('#import .excel input').val()!="") {
	//将录入信息保存至弹出框的自定义属性
    $('#import').attr('leagueyear',$('#import select.leagueyear').val()).attr('leagueid',$('#import select.leagueid').val());
    //显示确认框
    $('#importConfirm').show();
    //将录入信息显示到确认框中
    $('#importConfirm p.leagueyear').html($('#import select.leagueyear option:checked').html())
    $('#importConfirm p.league').html($('#import select.leagueid option:checked').html())
    $('#importConfirm p.filename').html($('#import .excel span').html());
    //获取type值，显示再确认框中  1积分榜    2射手榜  3球员助攻榜  4球队助攻榜 5主队积分榜 6客队积分榜
    var type=$('#import').attr('type');
    var typename='';
    switch(type){
        case '1': typename="积分榜";;break;
        case '2': typename='射手榜';break;
        case '3': typename='球员助攻榜';break;
        case '4': typename='球队助攻榜';break;
        case '5': typename='主队积分榜';break;
        case '6': typename='客队积分榜';
    }
    $('#importConfirm p.text span').html(typename);
    } else{
		window.parent.alertFn('请上传Excel文件');
	}
})
//确认框点击确认按钮 获取录入信息并提交到后台
$('#importConfirm div.button button.red').click(function(){
	//获取录入信息
    var type=$('#import').attr('type');
    var leagueyear=$('#import').attr('leagueyear');
    var leagueid=$('#import').attr('leagueid');
    //提交formdata数据
    var formdata=new FormData();
    formdata.append('datafile',$('#import div.excel input')[0].files[0])
    $.ajax({
        url:'../../v1/manager/billboard/'+type+'/import/'+leagueyear+'/'+leagueid,
        type:'post',
        data:formdata,
        processData:false,
        dataType:'json',
        contentType:false,
        beforeSend:function () {
        	//添加loading
        	$('div.content table tbody').html('<tr><td style="border-bottom: none;padding: 100px 0;" colspan="7"><img style="width: 100px;height:100px;" src="../../img/loading.gif"/></td></tr>')
        },
        success:function(data){
            if(data.resultcode==1000){
                window.parent.alertFn('数据导入成功');
                $('#import').hide();
                $('#importConfirm').hide();
                $('#import select.leagueyear').val(2016)
                $('#import select.leagueid').val(1)
                $('#import .excel span').html('上传EXCEL文件');
                $('#import .excel input').val('');
                //根据type值的不同请求不同的列表
                if(type==2){
                    loadshooter(2016,leaguesession);
                }else if(type==3){
                    loadassists(2016,leaguesession);
                }else if(type==4){
                    loadAssistboard(2016,leaguesession);
                }else if(type==5){
                    loadTeamscoreboard(1,2016,leaguesession);
                }else if(type==6){
                    loadTeamscoreboard(2,2016,leaguesession);
                }else{
                    loadscore(2016,leaguesession);
                }
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else if(data.resultcode==1999){
            	window.parent.alertFn(data.msg);
//                $('#import').hide();
//                $('#importConfirm').hide();
                //根据type值的不同请求不同的列表
                if(type==2){
                    loadshooter(2016,leaguesession);
                }else if(type==3){
                    loadassists(2016,leaguesession);
                }else if(type==4){
                    loadAssistboard(2016,leaguesession);
                }else if(type==5){
                	loadTeamscoreboard(1,2016,leaguesession);
                }else if(type==6){
                	loadTeamscoreboard(2,2016,leaguesession);
                }else{
                    loadscore(2016,leaguesession);
                }
//            	window.open(data.url);
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
})
//榜单-积分榜列表加载函数
function loadscore(leagueyear,leagueid){
    $.ajax({
        url:'../../v1/manager/billboard/scoreboard/'+leagueyear+'/'+leagueid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                var tr='';
                var teamname='';
                $(data.scoreboards).each(function(){
                    tr+='<tr billboardid='+this.id+'><td>'+this.ranking+'</td><td><img src="'+doteamimg(this.teamlogo)+'" alt=""/><span title="'+this.teamname+'">'+teamlength(this.teamname)+'</span></td><td>'+this.session+'</td><td>'+this.win+'/'+this.draw+'/'+this.loss+'</td> <td>'+this.goal+'/'+this.lossgoal+'/'+this.wingoal+'</td><td>'+donone(this.integral)+'</td><td><span>删除</span><span><a href="addScoreboard.html?id='+this.id+'">编辑</a></span></td></tr>';
                })
                $('#scoreboard tbody').html(tr);
            }else if(data.resultcode==999){
                $('#scoreboard tbody').html("<tr><td colspan='7'>没有查询到符合条件的数据</td></tr>");
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//榜单-射手榜列表函数
function loadshooter(leagueyear,leagueid){
    $.ajax({
        url:'../../v1/manager/billboard/shooter/'+leagueyear+'/'+leagueid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                var tr='';
                $(data.shooters).each(function(){
                    tr+='<tr billboardid='+this.id+'><td>'+this.ranking+'</td><td><img src="'+doteamimg(this.teamlogo)+'" alt=""/><span title="'+this.teamname+'">'+teamlength(this.teamname)+'</span></td><td><img src="'+doimg(this.playerlogo)+'" alt=""/><span>'+this.playername+'</span></td><td>'+this.goaltime+'</td><td>'+this.totaltime+'</td><td>'+this.goal+'</td><td><span>删除</span><span><a href="addShooter.html?id='+this.id+'&leagueyear='+this.leagueyear+'&leagueid='+this.leagueid+'&ranking='+this.ranking+'&teamid='+this.teamid+'&playerid='+this.playerid+'&totaltime='+this.totaltime+'&goal='+this.goal+'">编辑</a></span></td></tr>';
                })
                $('#shooter tbody').html(tr);
            }else if(data.resultcode==999){
                $('#shooter tbody').html("<tr><td colspan='7'>没有查询到符合条件的数据</td></tr>");
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//榜单-球员助攻榜列表加载函数
function loadassists(leagueyear,leagueid){
    $.ajax({
        url:'../../v1/manager/billboard/assists/'+leagueyear+'/'+leagueid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                var tr='';
                $(data.assistses).each(function(){
                    tr+='<tr billboardid='+this.id+'><td>'+this.ranking+'</td><td><img src="'+doteamimg(this.teamlogo)+'" alt=""/><span title="'+this.teamname+'">'+this.teamname+'</span></td><td><img src="'+doimg(this.playerlogo)+'" alt=""/><span>'+this.playername+'</span></td><td>'+this.num+'</td><td><span>删除</span><span><a href="addAssists.html?id='+this.id+'&leagueyear='+this.leagueyear+'&leagueid='+this.leagueid+'&playerid='+this.playerid+'&teamid='+this.teamid+'&ranking='+this.ranking+'&num='+this.num+'">编辑</a></span></td></tr>';
                })
                $('#assists tbody').html(tr);
            }else if(data.resultcode==999){
                $('#assists tbody').html("<tr><td colspan='5'>没有查询到符合条件的数据</td></tr>");
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//榜单-球队助攻榜列表加载函数
function loadAssistboard(leagueyear,leagueid){
    $.ajax({
        url:'../../v1/manager/billboard/assistboard/'+leagueyear+'/'+leagueid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                var tr='';
                $(data.assistboards).each(function(){
                    tr+='<tr billboardid='+this.id+'><td>'+this.ranking+'</td><td><img src="'+doteamimg(this.teamlogo)+'" alt=""/><span title="'+donone(this.teamname)+'">'+teamlength(donone(this.teamname))+'</span></td><td>'+this.num+'</td><td><span>删除</span><span><a href="addAssistboard.html?id='+this.id+'&leagueyear='+this.leagueyear+'&leagueid='+this.leagueid+'&ranking='+this.ranking+'&teamid='+this.teamid+'&num='+this.num+'">编辑</a></span></td></tr>';
                })
                $('#assistboard tbody').html(tr);
            }else if(data.resultcode==999){
                $('#assistboard tbody').html("<tr><td colspan='4'>没有查询到符合条件的数据</td></tr>");
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//榜单-主客队积分榜列表加载函数
function loadTeamscoreboard(type,leagueyear,leagueid){
	$.ajax({
        url:'../../v1/manager/billboard/teamscoreboard/'+type+'/'+leagueyear+'/'+leagueid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                var tr='';
                var teamname='';
                if(type==1){
                    var url='addHscoreboard.html';
                }else{
                    var url='addCscoreboard.html';
                }
                $(data.hcscoreboards).each(function(){
                    tr+='<tr billboardid='+this.id+'><td>'+this.ranking+'</td><td><img src="'+doteamimg(this.teamlogo)+'" alt=""/><span title="'+this.teamname+'">'+teamlength(this.teamname)+'</span></td><td>'+this.session+'</td><td>'+this.win+'/'+this.draw+'/'+this.loss+'</td> <td>'+this.goal+'/'+this.lossgoal+'/'+this.wingoal+'</td><td>'+donone(this.integral)+'</td><td><span>删除</span><span><a href="'+url+'?id='+this.id+'&type='+type+'">编辑</a></span></td></tr>';
                })
                if(type==1){
                    $('#host tbody').html(tr);
                }else{
                    $('#client tbody').html(tr);
                }
            }else if(data.resultcode==999){
            	if(type==1){
                    $('#host tbody').html("<tr><td colspan='7'>没有查询到符合条件的数据</td></tr>");
            	}else{
            		$('#client tbody').html("<tr><td colspan='7'>没有查询到符合条件的数据</td></tr>");
            	}
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//判断数据是否为空
function donone(x){
    return x==''||x==undefined?'-':x;
}
function doimg(x){
    return x==''||x==undefined?'../../img/parent.png':x;
}
function doteamimg(x){
    return x==''||x==undefined?'../../img/teamlogo.png':x;
}
//球队过长显示...
function teamlength(team){
	if (team.length>9) {
		return team.substr(0,8)+"...";
	} else{
		return team;
	}
}
//删除数据
$('div.content tbody').on('click','td:last-child span:first-child',function(data){
    $('.confirmModule').show();
    var type=$(".chooseName li.checked").index('.chooseName li')+1;
    var billboardid=$(this).parents('tr').attr('billboardid');
    var typename='';
    switch(type){
        case 1:typename='scoreboard';break;
        case 2:typename='shooter';break;
        case 3:typename='assists';break;
        case 4:typename='assistboard';break;
        case 5:typename='hscoreboard';break;
        case 6:typename='cscoreboard';
    }
    $('.confirmModule').attr('typename',typename).attr('billboardid',billboardid);
})
//确认删除
$('.confirmModule div.confirm button.red').click(function(){
    var index=$(".chooseName li.checked").index('.chooseName li')+1;
    var billboardid=$('div.confirmModule').attr('billboardid');
    var typename=$('div.confirmModule').attr('typename');
    $.ajax({
        url:'../../v1/manager/billboard/'+typename+'/'+billboardid,
        type:'DELETE',
        success:function(data){
            if(data.resultcode==1000){
                $('.confirmModule').hide();
                window.parent.alertFn('删除成功');
                var leagueyear=$('#box .header select.leagueyear').val();
                var leagueid=$('#box .header select.league').val();
                if(index==1){
                    loadscore(leagueyear,leagueid);
                }else if(index==2){
                    loadshooter(leagueyear,leagueid);
                }else if(index==3){
                    loadassists(leagueyear,leagueid);
                }else{
                    loadAssistboard(leagueyear,leagueid);
                }
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
})

//取消删除
$('.confirmModule div.confirm button.gray').click(function(){
    $('.confirmModule').hide();
})

