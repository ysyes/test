//加载轮播列表
function load() {
	
	$.ajax({
		type:"get",
		url:"../../v1/rotateplay/1",
		async:true,
		contentType:'application/json',
		success:function (data) {
			doresponse(data);
			showpages(data);
			page=1;
		}
	});
}
load();
//分页加载
var page=1;
$('.page').on('click','ul li',function(){
    var length=$('.page li').length;
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    obj=JSON.stringify(obj);
    if(($(this).index('.page li')+1)>=length){
        page++;
        $.ajax({
            url:'../../v1/rotateplay/'+page,
            type:'GET',
            data:obj,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                if(page<=data.totalpage){
                    doresponse(data);
                }
            }
        })
    }else if($(this).index('.page li')===0){
        page--;
        $.ajax({
            url:'../../v1/rotateplay/'+page,
            type:'GET',
            data:obj,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                if(page>=1){
                    doresponse(data);
                }
            }
        })
    }else{
        page=$(this).html();
        $.ajax({
            url:'../../v1/rotateplay/'+page,
            type:'GET',
            data:obj,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                doresponse(data);
            }
        })
    }
})
//TODO 列表检索默认显示第一页
$('.main ul .so span').click(function(){
    var status=$('select[name="status"]').val();
    var title=$('input[name="title"]').val();
    var obj=JSON.stringify({status:status,title:title});
    $.ajax({
        url:'../../v1/rotateplay/1',
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
//TODO 处理响应数据
function doresponse(data){
    $('div.content table tbody').html('');
    if (data.resultcode == 1000) {
		var tr = "";
		function status(num){
			if (num == 0) {
				return "启用";
			} else if (num == 1) {
				return "禁用";
			}
		}
		for (i in data.rotateplays) {
            var str=data.rotateplays[i].status==0?'able':'disable';
			tr += '<tr data-id='+data.rotateplays[i].id+'><td>'+data.rotateplays[i].title+'</td><td><a href="bannerDetail.html?id='+data.rotateplays[i].id+'">详情</a></td><td>'+data.rotateplays[i].createtime+'</td><td><a href="bannerUpdate.html?id='+data.rotateplays[i].id+'" class="able">编辑</a><a class="'+str+'">'+status(data.rotateplays[i].status)+'</a></td></tr>'
		}
		$(".main table tbody").html(tr);
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
$('table').on('click','tbody td a:nth-child(2)',function(){
    var id=$(this).parents('tr').attr('data-id');
    var me=this;
    $.ajax({
        url:'../../v1/rotateplay/disable/'+id,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                if($(me).html()=='禁用'){
                    $(me).html('启用');
                    $(me).removeClass('disable');
					$(me).addClass('able');
                }else{
                    $(me).html('禁用');
                    $(me).removeClass('able');
					$(me).addClass('disable');
                }
            }else if(data.resultcode==998){
                window.parent.returnLogin();
            }
        }
    })
});