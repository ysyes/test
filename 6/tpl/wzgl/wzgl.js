/**
 * Created by admin on 2016/10/28.
 */
//TODO 页面开始加载时显示全部
function load(){
	var obj=JSON.stringify({starttime:'',endtime:'',status:'',title:''});
    $.ajax({
        url:'../../v1/essay/1',
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
//TODO 点击搜索按钮进行内容检索检索
$('ul.title li i').click(function(e){
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/essay/1',
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
//TODO 点击文章标题查看评论-----使用url传文章唯一ID
$('div.content tbody tr td:first-child').on('click','a',function(e){
    //e.preventDefault();
    var href=$(this).attr('href').split('?')[0];
    var articalid=$(this).parents('tr').attr('articalid');
    $(this).attr('href',href+'?artileid='+articalid);
});
//TODO 分页加载显示
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
            url:'../../v1/essay/'+page,
            type:'POST',
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
            url:'../../v1/essay/'+page,
            type:'POST',
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
            url:'../../v1/essay/'+page,
            type:'POST',
            data:obj,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                doresponse(data);
            }
        })
    }
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
        $(data.essays).each(function(){
            var type=this.type==1?'体育':'劲爆';
            var status=this.status==0?status='启用':status='禁用';
            var str=this.status==0?'able':'disable';
            $('div.content table tbody').append(`
            <tr acticalid=${this.id}>
            <td><a href="plgl.html?articalid=${this.id}">${panduan(this.title)}</a></td>
            <td>${panduan(this.createtime)}</td>
            <td>${panduan(this.src)}</td>
            <td>${type}</td>
            <td>
            <a class="able" href="newUpdate.html?id=${this.id}" >编辑</a>
            <a class=${str}>${status}</a>
            </td>
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
$('.table1 ').on('click','tbody tr td:last-child a:last-child',function(){
    var id=$(this).parents('tr').attr('acticalid');
    var me=this;
    $.ajax({
        url:'../../v1/essay/'+id,
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
