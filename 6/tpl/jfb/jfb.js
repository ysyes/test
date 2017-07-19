/**
 * Created by admin on 2016/10/28.
 */
 //TODO 预览模态框
$('div.content tbody').on('click','td a',function(e){
    e.preventDefault()
    e.cancelBubble=true;
    $('.mask').show();
    dataFn($(this).attr("data-code"));
});

//积分预览数据写入
function dataFn(teamName) {
	$.ajax({
		type:"get",
		url:"../../v1/score/info/" + teamName,
		async:true,
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				var dataMain = "";
				var dataHead = '<tr><th class="paiming">排名</th><th class="teamImg"></th><th class="qiudui">球队</th><th class="sai">赛</th><th class="fen">分</th><th class="sheng">胜/平/负</th><th class="jin">进/失/净</th></tr>'
				//判断比赛类型：1=联赛，2=欧冠等小组赛，3=淘汰赛
				if (data.type == 1) {
					//显示与隐藏模块
					$("#show .table").eq(1).hide();
					$("#show .table").eq(0).show();
					if (data.scoreboard != undefined && data.scoreboard.length > 0) {
						dataMain += dataHead;
						for (var i = 0 ; i < data.scoreboard.length ; i++) {
							var scoreboard = data.scoreboard[i];
							dataMain += '<tr><td><p>' + scoreboard.ranking + '</p></td><td><img src="' + scoreboard.logo + '"/></td><td>' + scoreboard.name + '</td><td>' + scoreboard.session + '</td><td>' + scoreboard.score + '</td><td>' + scoreboard.win + '/' + scoreboard.draw + '/' + scoreboard.loss +
							'</td><td>' + scoreboard.goal + '/' + scoreboard.lossgoal + '/' + scoreboard.gd + '</td></tr>';
						}
						//写入数据
						$("#dataMainFirst table").html(dataMain);
						
						//判断是否晋级，降级
						//晋级
						if (data.top != undefined) {
							for (var j = 0 ;j < data.top ; j ++) {
								$("#dataMainFirst table p").eq(j).addClass("first");
							}
						}
						//资格赛
						if (data.lower != undefined) {
							for (var k = $("#dataMainFirst table p").length-1 ;k > $("#dataMainFirst table p").length-1-data.lower ; k--) {
								$("#dataMainFirst table p").eq(k).addClass("last");
							}
						}
						//降级
						if (data.middle != undefined) {
							var middleArr = data.middle.split(",");
							for (var l = 0 ; l < middleArr.length ; l ++) {
								$("#dataMainFirst table p").eq(middleArr[l]-1).addClass("second");
							}
						}	
						
					} else{
						$("#dataMainFirst table").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;background: white;">暂未数据</p>');
					}
				} else if (data.type == 2) {
					
					//显示与隐藏模块
					$("#show .table").eq(0).hide();
					$("#show .table").eq(1).show();
					if (data.groupscoreboard != undefined && data.groupscoreboard.length > 0) {
						for (var i = 0 ; i < data.groupscoreboard.length ; i ++) {
							dataMain += '<div class="display"><p>'+ data.groupscoreboard[i].groupname +'</p></div><table>' + dataHead;
							
							for (var j = 0 ; j < data.groupscoreboard[i].subscoreboard.length ; j ++) {
								var subscoreboard = data.groupscoreboard[i].subscoreboard[j];
								dataMain += '<tr><td><p>' + subscoreboard.ranking + '</p></td><td><img src="' + subscoreboard.logo + '"/></td><td>' + subscoreboard.name + '</td><td>' + subscoreboard.session + '</td><td>' + 
								subscoreboard.score + '</td><td>' + subscoreboard.win + '/' + subscoreboard.draw + '/' + subscoreboard.loss + '</td><td>' + subscoreboard.goal + '/' + subscoreboard.lossgoal + '/' + subscoreboard.gd + '</td></tr>'
							}
							dataMain += '</table>';
						}
						//写入数据
						$("#dataMainSecond").html(dataMain);
						
						//晋级标志
						if (data.top != undefined) {
							for (var k = 0 ; k < $("#dataMainSecond table").length ; k ++) {
								for (var l = 0 ; l < data.top ; l ++) {
									$("#dataMainSecond table").eq(k).find("p").eq(l).addClass("first");
								}	
							}
						}
					
					} else{
						$("#dataMainSecond").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;">暂未数据</p>');
					}
					
				}
				
				
			} else{
				//未数据时提示
				$("#dataMainFirst table").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;background: white;">暂未数据</p>');
				$("#dataMainSecond").html('<p style="width: 100%;height: 460px;line-height: 300px;text-align: center;">暂未数据</p>');
				console.log("接收失败")
			}
		},
		error:function (){
			console.log("请求地址错误");
		}
	});
}

//TODO 积分榜加载
function load(){
	var obj=JSON.stringify({leagueyear:''});
    $.ajax({
        url:'../../v1/score/1',
        type:'POST',
        data:obj,
        datatype:'json',
        contentType:'application/json',
        success:function(data){
            doresponse(data);
            showpages(data);
            page=1;
        }
    })
}
load();
//TODO 处理响应数据
function doresponse(data){
    $('div.content table tbody').html('');
    if(data.resultcode==1000){
    	function panduan(x){
        	if(x==undefined||x==''){
        		x='-';
        	}else{
        		x=x;
        	}
        	return x;
        }
    	$(data.scoresDtos).each(function(){
            $('div.content table tbody').append(`
            <tr>
            <td>${panduan(this.leaguename)}</td>
            <td><a data-code = "${this.leaguecode}">详情</a></td>
            <td>${panduan(this.leagueyear)}</td>
            </tr>
                    `)
        })
    }else if(data.resultcode==999){
    	$('div.content table tbody').html(`
        		<tr><td colspan='3'  style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
        	$('.page').hide();
    }else if(data.resultcode==998){
        window.parent.returnLogin();
    }else{
        alert(data.msg);
    }
}
function showpages(data){
    var pages=data.totalpage;
    $('.page ul').html('');
    var pages=data.totalpage;
    $('.page ul').html('');
    if(data.totalpage==1||data.totalpage==undefined){
    	$('.page').hide();
    }else{
    	$('.page').show();
    	var frag=document.createDocumentFragment();
        for(var i=1;i<=pages;i++){
            if(i==1){
                $(frag).append('<li class="active">'+i+'</li>')
            }else{
                $(frag).append('<li>'+i+'</li>');
            }
        }
        $('.page ul').append('<li class="disable">上一页</li>');
        $('.page ul').append(frag);
        $('.page ul').append('<li>下一页</li>');
    }
    }
    
//TODO 时间检索默认显示第一页
$('ul.title li i').click(function(){
    var time=$(this).prev().val();
    time=time==0?'':time;
    var obj=JSON.stringify({leagueyear:time});
    $.ajax({
        url:'../../v1/score/1',
        data:obj,
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            doresponse(data);
            showpages(data);
            page=1;
        }
    })
})
//TODO 分页加载显示
var page=1;
$('.page').on('click','ul li',function(){
    var time=$(this).prev().val();
    time=time==0?'':time;
    var obj=JSON.stringify({leagueyear:time});
    var length=$('.page li').length;
    if(($(this).index('.page li')+1)>=length){
        page++;
        $.ajax({
            url:'../../v1/score/'+page,
            type:'POST',
            data:obj,
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                if(page<=data.totalpage){
                    doresponse(data);
                }
            }
        })
    }else if($(this).index('.page li')===0){
        page--;
        $.ajax({
            url:'../../v1/score/'+page,
            type:'POST',
            data:obj,
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                if(page>=1){
                    doresponse(data);
                }
            }
        })
    }else{
        page=$(this).html();
        $.ajax({
            url:'../../v1/score/'+page,
            type:'POST',
            data:obj,
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                doresponse(data);
            }
        })
    }
})
