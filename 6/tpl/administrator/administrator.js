$.ajax({
	type:"get",
	url:"../../v1/user/1",
	async:true,
	success:function (data) {
		console.log(data);
		doresponse(data);
		showpages(data);
		page=1;
	}
});

$(".main .so span").click(function () {
	var time = $(".main .so input").val();
	var saveData = JSON.stringify({time:time});
	console.log(saveData);
	$.ajax({
		type:"post",
		url:"../../v1/user/1",
		async:true,
		data:saveData,
		contentType:'application/json',
		success:function (data) {
			console.log(data);
			if (data.resultcode == 1000) {
				var tr = "";
				for (i in data.users) {
					var status=data.users[i].status==0?'启用':'禁用';
					var str=data.users[i].status==0?'able':'disable';
					tr += '<tr data-id = "'+data.users[i].id+'"><td>'+data.users[i].realname+'</td><td>'+data.users[i].name+'</td><td>'+data.users[i].mobile+'</td><td>'+data.users[i].logintime+'</td><td><a class="able"  href="adminiUpdate.html?id='+data.users[i].id+'">编辑</a><a class="'+str+'">'+status+'</a></td></tr>';
				}
				$(".main tbody").html(tr);
			}else if(data.resultcode==998){
				window.parent.returnLogin();
		    }else{
				$(".main tbody").html("<tr><td colspan='6' style='text-align:center;background:#fff;'>"+data.msg+"</tr></td>");
			}
			showpages(data);
		}
	});
});
$('table').on('click','tbody tr td:last-child a:nth-child(2)',function(){
	var id=$(this).parents('tr').attr('data-id');
	var me=this;
	$.ajax({
		url:'../../v1/user/disable/'+id,
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
					$(me).addClass('disable')
				}
			}else if(data.resultcode==998){
				window.parent.returnLogin();
		    }
		}
	})
});
function doresponse(data){
	if (data.resultcode == 1000) {
		var tr = "";
		for (i in data.users) {
			var status=data.users[i].status==0?'启用':'禁用';
			var str=data.users[i].status==0?'able':'disable';
			tr += '<tr data-id = "'+data.users[i].id+'"><td>'+data.users[i].realname+'</td><td>'+data.users[i].name+'</td><td>'+data.users[i].mobile+'</td><td>'+data.users[i].logintime+'</td><td><a class="able"  href="adminiUpdate.html?id='+data.users[i].id+'">编辑</a><a class="'+str+'">'+status+'</a></td></tr>';
		}
		$(".main tbody").html(tr);
	}else if(data.resultcode==998){
		window.parent.returnLogin();
    }else{
		$(".main tbody").html("<tr><td colspan='6' style='text-align:center;background:#fff;'>"+data.msg+"</tr></td>");
	}
}
//TODO 加载所有页码
function showpages(data){
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
//TODO 分页加载显示
var page=1;
$('.page').on('click','ul li',function(){
	var time = $(".main .so input").val();
    var obj=JSON.stringify({time:time});
    var length=$('.page li').length;
    if(($(this).index('.page li')+1)>=length){
        page++;
        $.ajax({
            url:'../../v1/user/'+page,
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
            url:'../../v1/user/'+page,
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
            url:'../../v1/user/'+page,
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