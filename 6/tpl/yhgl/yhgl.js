/**
 * Created by admin on 2016/10/26.
 */
//TODO 加载页面
function load(){
//	var obj=JSON.stringify({name:''})
    $.ajax({
        url:'../../v1/fbuser/1',
        type:'GET',
//      data:obj,
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            doresponse(data);
            showpages(data);
            page=1;
        }
    })
};
load();
//TODO 点击搜索按钮进行内容检索检索
$('div.search i').click(function(e){
    var content=$(this).prev().val();
    obj=JSON.stringify({content:content});
    $.ajax({
        url:'../../v1/fbuser/1',
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
});
function doresponse(data){
    if(data.resultcode==1000){
        $('#main table tbody').html('');
        function panduan(x){
        	if(x==undefined||x==''){
        		x='-';
        	}else{
        		x=x;
        	}
        	return x;
        }
        $(data.fbusers).each(function(){
            var status=this.accountStatus==0?'启用':'禁用';
            var str=this.accountStatus==0?'able':'disable';
            $('#main table tbody').append(`
            <tr usercode=${this.code}>
                <td>${panduan(this.name)}</td>
                <td>${panduan(this.createtime)}</td>
                <td>${panduan(this.logintime)}</td>
                <td>${panduan(this.status)}</td>
                <td>${panduan(this.realname)}</td>
                <td>${panduan(this.cardid)}</td>
                <td>${panduan(this.mobile)}</td>
                <td>${panduan(this.gold)}</td>
                <td>
                    <a class=${str}>${status}</a>
                </td>
            </tr>
            `);
        })
    }else if(data.resultcode==999){
    	$('div.content table tbody').html(`
        		<tr><td colspan='9' style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
        	$('.page').hide();
    }else if(data.resultcode==998){
        window.parent.returnLogin();
    }
}
function showpages(data){
    var pages=data.totalpage;
    $('.page ul').html('');
    if(data.totalpage==1){
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
    var name=$(this).prev().val();
    var length=$('.page li').length;
    if(($(this).index('.page li')+1)>=length){
        page++;
        $.ajax({
            url:'../../v1/fbuser/'+page,
            type:'GET',
            contentType:'application/json',
            data:{'name':name},
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
            url:'../../v1/fbuser/'+page,
            type:'GET',
            contentType:'application/json',
            data:{'name':name},
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
            url:'../../v1/fbuser/'+page,
            type:'GET',
            contentType:'application/json',
            data:{'name':name},
            dataType:'json',
            success:function(data){
                doresponse(data);
            }
        })
    }
})
$('.table').on('click','tbody td a',function(){
    var code=$(this).parents('tr').attr('usercode');
    var me=this;
    $.ajax({
        url:'../../v1/unuser/'+code,
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
            }
        }
    })
});