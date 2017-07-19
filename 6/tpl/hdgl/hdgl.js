/**
 * Created by admin on 2016/11/2.
 */
//TODO 页面加载时加载第一页
function load(){
	var obj=JSON.stringify({title:""});
    $.ajax({
        url:'../../v1/notice/1',
        type:'POST',
        data:obj,
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            doresponse(data);
            showpages(data);
            page=1;
        }
    })
}
load();
//TODO 页面append活动列表
function doresponse(data){
    if(data.resultcode==1000){
        $('div.content table.table1 tbody').html('');
        function panduan(x){
        	if(x==undefined||x==''){
        		x='-';
        	}else{
        		x=x;
        	}
        	return x;
        }
        $(data.notices).each(function(){
            var status=this.status==0?status='启用':status='禁用';
            var str=this.status==0?'able':'disable';
            $('div.content table.table1 tbody').append(`
            <tr acticalid=${this.id}>
            <td>${this.title}</td>
            <td><a href="ggxq.html?id=${this.id}">详情</a></td>
            <td>${this.createtime}</td>
            <td>${this.disabletime}</td>
            <td><a class=${str}>${status}</a></td>
            </tr>
            `)
        })
    }else if(data.resultcode==999){
    	$('div.content table tbody').html(`
        	<tr><td colspan='5'  style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
        	$('.page').hide();
    }else if(data.resultcode==998){
        window.parent.returnLogin();
    }
}
//TODO 加载所有页码
function showpages(data){
    var pages=data.totalpage;
    $('.page ul').html('');
    if(data.totalpage==1||data.totalpage==undefined){
    	$('.page').hide();
    }else{
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
    var length=$('.page li').length;
    console.log($('input[name="title"]').val())
    var title=$('input[name="title"]').val();
    if(title==0){
    	title='';
    }else{
    	title=title;
    }
    var obj=JSON.stringify({title:title})
    if(($(this).index('.page li')+1)>=length){
        page++;
        $.ajax({
            url:'../../v1/notice/'+page,
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
            url:'../../v1/notice/'+page,
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
            url:'../../v1/notice/'+page,
            type:'POST',
            data:obj,
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                doresponse(data);
            }
        })
    }
});
//TODO 名称检索
$('ul.title li i').click(function(){
	var title=$(this).prev().val();
    var obj={title:title}
    obj=JSON.stringify(obj);
    console.log(obj)
    $.ajax({
        url:'../../v1/notice/1',
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
})
$('.table1 ').on('click','tbody tr td:last-child a:last-child',function(){
    var id=$(this).parents('tr').attr('acticalid');
    var me=this;
    $.ajax({
        url:'../../v1/notice/disable/'+id,
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