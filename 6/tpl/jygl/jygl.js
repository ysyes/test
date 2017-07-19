/**
 * Created by admin on 2016/10/27.
 */
$('ul.title li:not(:last-child)').click(function(){
    $('ul.title li.active').removeClass('active');
    $(this).addClass('active');
    var index=$(this).index('ul.title li')+1;
    $('div.content>div').hide();
    $('div.content>div:nth-child('+index+')').show();
    var index=$(this).index('ul.title li');
    if(index===1){
        $('ul li:last-child input').hide();
        $('ul li:last-child input.username').show();
        load2();
    }else{
        $('ul li:last-child input').show();
        $('ul li:last-child input.username').hide();
        load1();
    }
})
$('div.content').on('click','.page:visible li',function(){
    var length=$('.page:visible li').length;
    if(($(this).index('.page:visible li')+1)>=length){
        $('.page:visible li:first-child').removeClass('disable');
        var index=$('.page:visible li.active').index('.page:visible li')+2;
        if(index===length){
            $('.page:visible li:last-child').addClass('disable');
        }else{
            $('.page:visible li.active').removeClass('active');
            $('.page:visible li:nth-child('+index+')').addClass('active');
            if(index===length-1){
                $('.page:visible li:last-child').addClass('disable');
            }
        }
    }else if($(this).index('.page:visible li')===0){
        $('.page:visible li:last-child').removeClass('disable');
        var index=$('.page:visible li.active').index('.page:visible li');
        if(index===1){
            $('.page:visible li:first-child').addClass('disable');
        }else{
            $('.page:visible li.active').removeClass('active');
            $('.page:visible li:nth-child('+index+')').addClass('active');
            if(index===2){
                $('.page:visible li:first-child').addClass('disable');
            }
        }
    }else{
        $('.page:visible li.active').removeClass('active');
        $(this).addClass('active');
        var index=$(this).index('.page:visible li');
        if(index===length-2){
            $('.page:visible li:first-child').removeClass('disable');
            $('.page:visible li:last-child').addClass('disable');

        }else if(index===1){
            $('.page:visible li:last-child').removeClass('disable');
            $('.page:visible li:first-child').addClass('disable');
        }else{
            $('.page:visible li:last-child').removeClass('disable');
            $('.page:visible li:first-child').removeClass('disable');
        }
    }
})
load1();
function load1(){
//	var obj=JSON.stringify({starttime:'',endtime:'',status:'',title:''});
    $.ajax({
        url:'../../v1/trade/betrecord/1',
        type:'GET',
//      data:obj,
        contentType:'application/json',
        dataType:'json',
        success:function(data){
            doresponse1(data);
            showpages(data);
            page=1;
        }
    })
}
function load2(){
//	var obj=JSON.stringify({starttime:'',endtime:'',status:'',title:''});
    $.ajax({
        url:'../../v1/trade/deposit/1',
        type:'GET',
//      data:obj,
        contentType:'application/json',
        dataType:'json',
        success:function(data){
            doresponse2(data);
            showpages(data);
            page=1;
        }
    })
}
//TODO 点击搜索按钮进行内容检索检索
$('ul.title li i').click(function(e){
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    obj=JSON.stringify(obj);
    console.log(obj);
    var indx=$('div.content>div:visible').index('div.content>div');
    if(indx==0){
    	 $.ajax({
    	        url:'../../v1/trade/betrecord/1',
    	        type:'POST',
    	        data:obj,
    	        datatype:'json',
    	        contentType:'application/json',
    	        success:function(data){
    	            doresponse1(data);
    	            showpages(data);
    	            page=1;
    	        }
    	    })
    }else if(indx==1){
    	 $.ajax({
    	        url:'../../v1/trade/deposit/1',
    	        type:'POST',
    	        data:obj,
    	        datatype:'json',
    	        contentType:'application/json',
    	        success:function(data){
    	            doresponse2(data);
    	            showpages(data);
    	            page=1;
    	        }
    	    })
    }
   
});
//TODO 分页加载显示
var page=1;
$('.page').on('click','ul:visible li',function(){
	var length=$('.page li:visible').length;
	var indx=$('div.content>div:visible').index('div.content>div');
    if(($(this).index('.page:visible li')+1)>=length){
        page++;
        if(indx==0){
        	 $.ajax({
                 url:'../../v1/trade/betrecord/'+page,
                 type:'GET',
                 contentType:'application/json',
                 dataType:'json',
                 success:function(data){
                     if(page<=data.totalpage){
                         doresponse1(data);
                     }
                 }
             })
        }else if(indx==1){
        	$.ajax({
                url:'../../v1/trade/deposit/'+page,
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success:function(data){
                    if(page<=data.totalpage){
                        doresponse2(data);
                    }
                }
            })
        }
       
    }else if($(this).index('.page:visible li')===0){
        page--;
        if(indx==0){
	        $.ajax({
	            url:'../../v1/trade/betrecord/'+page,
	            type:'GET',
	            contentType:'application/json',
	            dataType:'json',
	            success:function(data){
	                if(page>=1){
	                    doresponse1(data);
	                }
	            }
	        })
        }else if(indx==1){
        	$.ajax({
                url:'../../v1/trade/deposit/'+page,
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success:function(data){
                    if(page>=1){
                        doresponse2(data);
                    }
                }
            })
        }
    }else{
        page=$(this).html();
        if(indx==0){
        	$.ajax({
                url:'../../v1/trade/betrecord/'+page,
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success:function(data){
                    doresponse1(data);
                }
            })
        }else if(indx==1){
        	$.ajax({
                url:'../../v1/trade/deposit/'+page,
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success:function(data){
                    doresponse2(data);
                }
            })
        }
        
    }
})

//TODO 处理响应数据1
function panduan(x){
    if(x==undefined||x==''){
        x='-';
    }else{
        x=x;
    }
    return x;
}
function doresponse1(data){
    $('div.content table.table1 tbody').html('');
    if(data.resultcode==1000){
        $('div.content table tbody').html('');
        $(data.betrecords).each(function(){
            $('div.content table.table1 tbody').append(`
            		<tr>
            		<td>${panduan(this.mobile)}</td>
                    <td>${panduan(this.code)}</td>
                    <td>
                        ${panduan(this.leagueinfo).replace(/,/g,'<br>')}
                    </td>
                    <td>
                        ${panduan(this.createtime)}
                    </td>
                    <td>${panduan(this.gold)}</td>
                    <td>${panduan(this.wingold)}</td>
                    <td>${panduan(this.result)}</td>
                    <td>${panduan(this.status)}</td>
                    </tr>
                    `);
        })
    }else if(data.resultcode==999){
    	$('div.content table tbody').html(`
    		<tr><td colspan='8' style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
    	$('.page').hide();
    }else if(data.resultcode==998){
    	window.parent.returnLogin();
    }else{
    	alert(data.msg);
    }
}
//TODO 处理响应数据2
function doresponse2(data){
    $('div.content table.table1 tbody').html('');
    if(data.resultcode==1000){
        $('div.content table tbody').html('');
        $(data.deposits).each(function(){
            $('div.content table tbody').append(`
            		<tr>
            		<td style="padding:0 15px;">${panduan(this.depositid)}</td>
                    <td>${panduan(this.name)}</td>
                    <td>
                        ${panduan(this.createtime)}
                    </td>
                    <td>${panduan(this.type)}</td>
                    <td>${panduan(this.money)}</td>
                    <td>${panduan(this.status)}</td>
                    <td>${panduan(this.failresult)}</td>
                    </tr>
                    `);
        })
    }else if(data.resultcode==999){
    	$('div.content table tbody').html(`
    		<tr><td colspan='8' style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
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