/**
 * Created by admin on 2016/11/2.
 */
//TODO 页面加载评论内容，默认显示当天
function load(){
    var articalid=window.location.href.split('=')[1];
    //var date=new Date();
    //var y=date.getFullYear();
    //var M=date.getMonth()+1;
    //var d=date.getDate();
    //if(M<10){
    //    M='0'+M;
    //}
    //if(d<10){
    //    d='0'+d;
    //}
    //var starttime=y+'-'+M+'-'+d;
    //var endtime=y+'-'+M+'-'+d;
    var starttime='';
    var endtime='';
    var obj={};
    obj.code=articalid;
    obj.starttime=starttime;
    obj.endtime=endtime;
    obj.status='1';
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/comment/1',
        data:obj,
        type:'POST',
        contentType:'application/json',
        datatype:'json',
        success:function(data){
            doresponse(data);
            showpages(data);
            page=1;
        }
    })
}
load();
//TODO 评论检索
$('ul.title li i').click(function(){
    var articalid=window.location.href.split('=')[1];
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    obj.code=articalid;
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/comment/1',
        data:obj,
        type:'POST',
        contentType:'application/json',
        datatype:'json',
        success:function(data){
            doresponse(data);
            showpages(data);
            console.log(data)
            page=1;
        }
    })
})
function doresponse(data){
    $('div.content>div:first-child').html(data.title);
    $('div.content table.table1 tbody').html('');
    if(data.resultcode==1000){
        $(data.comments).each(function(){
            var status=this.status==0?'启用':'禁用';
            var str=this.status==0?'able':'disable';
            $('div.content table.table1 tbody').append(`
            <tr commenid=${this.id}>
            <td>${this.name}</td>
            <td><input type="text" class="default" value=${this.text} disabled style="border:0;text-align:center;background:transparent"></td>
            <td>${this.createtime}</td>
            <td>
            <a class=${str}>${status}</a>
            </td>
            </tr>
                `)
        })
    }else if(data.resultcode==999){
    	$('div.content table tbody').html(`
        		<tr><td colspan='4'  style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
        	$('.page').hide();
    }else if(data.resultcode==998){
    	window.location='../../index.html';
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
            url:'../../v1/comment/'+page,
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
            url:'../../v1/comment/'+page,
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
            url:'../../v1/comment/'+page,
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
$('.table1').on('click','tbody td a',function(){
    var id=$(this).parents('tr').attr('commenid');
    var me=this;
    $.ajax({
        url:'../../v1/comment/'+id,
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



