/**
 * Created by admin on 2016/11/9.
 */
function load(){
    var date=$('input[name="date"]').val();
    var status=$('select[name="status"]').val();
    var obj=JSON.stringify({date:date,status:status});
    $.ajax({
        url:'../../v1/game/1',
        type:'POST',
        data:obj,
        contentType:'application/json',
        dataType:'json',
        success:function(data){
            doresponse(data);
            showpages(data);
            page=1;
        }
    })
}
load();
//搜索框查询
$('ul.title li i').click(function(){
	var date=$('input[name="date"]').val();
    var status=$('select[name="status"]').val();
    var obj=JSON.stringify({date:date,status:status});
    $.ajax({
        url:'../../v1/game/1',
        type:'POST',
        data:obj,
        contentType:'application/json',
        dataType:'json',
        success:function(data){
            doresponse(data);
            showpages(data);
            page=1;
        }
    })
})
//TODO 处理响应数据
function doresponse(data){
    $('div.content table.table1 tbody').html('');
    if(data.resultcode==1000){
        $('div.content table tbody').html('');
        function panduan(x){
        	if(x==undefined||x==''){
        		x='-';
        	}else{
        		x=x;
        	}
        	return x;
        }
        function panduanScore(x){
        	if(x==undefined||x==''){
        		x='-:-';
        	}else{
        		x=x;
        	}
        	return x;
        }
        $(data.teams).each(function(){
            //var status=this.status==0?status='启用':status='禁用';
            //var str=this.status==0?'able':'disable';
            $('div.content table tbody').append(`
            <tr gameid=${this.id}>
            <td>${panduan(this.teama)} vs ${panduan(this.teamb)}</td>
            <td>${panduan(this.date)}</td>
            <td>${panduan(this.statusname)}</td>
            <td><input type="text" disabled value=${panduanScore(this.source)}></td>
            <td><a class="able">编辑</a></td>
            </tr>
                    `);
        })
    }else if(data.resultcode==999){
        $('div.content table tbody').html(`
    <tr><td colspan='5' style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
        $('.page').hide();
    }else if(data.resultcode==998){
        window.parent.returnLogin();
    }else{
        alert(data.msg);
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
//TODO 编辑比分
$('.table1').on('click','tbody td a',function(){
	$(this).parent().prev().children('input').css('border','1px solid #ccc').removeAttr('disabled').focus(function(){
//		$(this).val('');
		}).blur(function(){
		$(this).css('border','0').attr('disabled','on');
		var score=$(this).val();
		var gameid=$(this).parents('tr').attr('gameid');
		var me=this;
		$.ajax({
			url:'../../v1/game/'+gameid+'/'+score,
			type:'GET',
			contentType:'application/json',
			success:function(data){
				if(data.resultcode==1000){
					alert('编辑成功')
				}else if(data.resultcode==998){
                    window.parent.returnLogin();
                }else{
                	$(me).val('-:-');
                	alert(data.msg);
                }
			}
		})
	});
})
//TODO 分页加载显示
var page=1;
$('.page').on('click','ul li',function(){
	var date=$('input[name="date"]').val();
    var status=$('select[name="status"]').val();
    var obj=JSON.stringify({date:date,status:status});
    var length=$('.page li').length;
    if(($(this).index('.page li')+1)>=length){
        page++;
        $.ajax({
            url:'../../v1/game/'+page,
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
            url:'../../v1/game/'+page,
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
            url:'../../v1/game/'+page,
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

//比分修改验证格式限制
$(document).on("keyup",".table1 tbody td input",function () {
	if(this.value.length>5){
		this.value=this.value.slice(0,5)
	}else{
		this.value=this.value.replace(/[^1-9:]/g,'')
	}
})