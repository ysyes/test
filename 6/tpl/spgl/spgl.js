/**
 * Created by admin on 2016/11/1.
 */
$('ul.title input').on('blur',function(){
	console.log(this)
})
//商品列表与商品兑换界面的page切换效果
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
//代发货已发货状态改变请求不同的数据
$('.status li').click(function(){
    $('.status li.active').removeClass('active');
    $(this).addClass('active');
    var index=$(this).index('.status li');
    $('#daifahuo').hide();
    $('#yifahuo').hide();
    $('#yibohui').hide();
    var code=$('input[name="code"]').val();
    if(index==0){
        $('#daifahuo').show();
        var obj=JSON.stringify({type:index,code:code});
        $.ajax({
        	url:'../../v1/goods/exchange/1',
        	type:'POST',
        	data:obj,
        	dataType:'json',
            contentType:'application/json',
            success:function(data){
            	product(index,data);
            	showpages(data);
            	page=1;
            }
        })
    }else if(index==1){
    	$('#yifahuo').show();
    	var obj=JSON.stringify({type:index,code:code});
    	$.ajax({
        	url:'../../v1/goods/exchange/1',
        	type:'POST',
        	data:obj,
        	dataType:'json',
            contentType:'application/json',
            success:function(data){
            	product(index,data);
            	showpages(data);
            	page=1;
            }
        })
    }else if(index==2){
    	$('#yibohui').show();
    	var obj=JSON.stringify({type:index,code:code});
    	$.ajax({
        	url:'../../v1/goods/exchange/1',
        	type:'POST',
        	data:obj,
        	dataType:'json',
            contentType:'application/json',
            success:function(data){
            	product(index,data);
            	showpages(data);
            	page=1;
            }
        })
    }
})
function product(type,data){
	if(data.resultcode==1000){
    	$('#daifahuo').html('');
    	$('#yifahuo').html('');
    	$('#yibohui').html('');
    	function panduan(x){
        	if(x==undefined||x==''){
        		x='-';
        	}else{
        		x=x;
        	}
        	return x;
        }
		$(data.goodsDtos).each(function(){
			var status='';
			var name='操作';
			var fahuo='';
			if(type==1){
				this.sforderid==this.sforderid;
				if(this.sendtime==''||this.sendtime==undefined){
					this.sendtime='';
				}else{
					this.sendtime=this.sendtime;
				}
				status='已发货';
				fahuo='#yifahuo';
			}else if(type==0){
				this.sforderid='<input type="text" placeholder="请输入运单号" name="sfcode"/>';
				this.sendtime='确认发货';
				status='驳回';
				fahuo='#daifahuo';
			}else if(type==2){
				$('ul.info').hide();
				name='理由';
				fahuo='#yibohui';
				status=this.status;
			}
			$(fahuo).append(`
			<div class="pinfo">
            <table class="product" width="100%">
                <thead>
                <tr>
                    <th colspan="3" width="50%">兑换码:<span>${panduan(this.code)}</span></th>
                    <th colspan="3" width="50%">兑换时间:${panduan(this.createtime)}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>商品名称</td>
                    <td>兑换金币</td>
                    <td>数量</td>
                    <td>昵称</td>
                    <td>${name}</td>
                    <td>总金币</td>
                </tr>
                <tr>
                    <td width='260px'>${panduan(this.name)}</td>
                    <td width='120px'>${panduan(this.goldnum)}</td>
                    <td width='70px'>${panduan(this.num)}</td>
                    <td width='280px'>${panduan(this.fname)}</td>
                    <td width='80px'>${status}</td>
                    <td width='100px'>${panduan(this.totalgold)}</td>
                </tr>
                </tbody>
                <tfoot>
            </table>
            <ul class="info">
                <li>${panduan(this.addrinfo)}</li>
                <li>${panduan(this.sforderid)}</li>
                <li>${panduan(this.sendtime)}</li>
            </ul>
        </div>
			`)
			if(type==2){
				$('ul.info').hide();
			}
		})
	}else if(data.resultcode==999){
		$('#daifahuo').html('<div style="text-align:center;line-height:50px;">没有查询到符合条件的数据</div>');
		$('#yifahuo').html('<div style="text-align:center;line-height:50px;">没有查询到符合条件的数据</div>');
		$('#yibohui').html('<div style="text-align:center;line-height:50px;">没有查询到符合条件的数据</div>');
	}else if(data.resultcode==998){
		window.parent.returnLogin();
	}
}
$('ul.title>li:not(:last-child)').click(function(){
    $('ul.title>li.active').removeClass('active');
    $(this).addClass('active');
    var index=$(this).index('ul.title li')+1;
    $('div.content>div').hide();
    $('div.content>div:nth-child('+index+')').show();
    $('ul.title input').hide();
    $('ul.title i').hide();
    if(index==2){
    	console.log($('ul.title input')[0])
    	$('ul.title input').show();
        $('ul.title i').show();
    	var obj=JSON.stringify({type:0});
    	$.ajax({
    		
        	url:'../../v1/goods/exchange/1',
        	type:'POST',
        	data:obj,
        	dataType:'json',
            contentType:'application/json',
            success:function(data){
            	if(data.resultcode==1000){
                	product(0,data);
                	showpages(data);
                	page=1;
        		}else if(data.resultcode==998){
        			window.parent.returnLogin();
        		}
            }
        })
    }
    
})
//TODO 加载
function load(){
    $.ajax({
        url:'../../v1/goods/1',
        type:'GET',
        datatype:'json',
        contentType:'application/json',
        success:function(data){
        	if(data.resultcode=1000){
        		doresponse(data);
        		showpages(data);
        		page=1;
    		}
            else if(data.resultcode==998){
    			window.parent.returnLogin();
    		}
        }
    })
}
load();
//TODO 分页加载显示
var page=1;
$('div.content').on('click','div:visible .page li',function(){
    var length=$('div.content div:visible .page li').length;
    var indx=$('ul.title li.active').index('ul.title li');
    var index=$('.status li.active').index('.status li');
    var code=$('input[name="code"]').val();
    console.log($(this).index('div.content div:visible .page li'),length)
    if(($(this).index('div.content div:visible .page li')+1)>=length){
        page++;
        if(indx==0){
        	 $.ajax({
                 url:'../../v1/goods/'+page,
                 type:'GET',
//               data:obj,
                 contentType:'application/json',
                 dataType:'json',
                 success:function(data){
                     if(page<=data.totalpage){
                         doresponse(data);
                     }
                 }
             })
        }else if(indx==1){
        	var obj=JSON.stringify({type:index,code:code});
            $.ajax({
            	url:'../../v1/goods/exchange/'+page,
            	type:'POST',
            	data:obj,
            	dataType:'json',
                contentType:'application/json',
                success:function(data){
                	product(index,data);
                }
            })
        }
       
    }else if($(this).index('div.content div:visible .page li')===0){
        page--;
        if(indx==0){
	        $.ajax({
	            url:'../../v1/goods/'+page,
	            type:'GET',
	//            data:obj,
	            contentType:'application/json',
	            dataType:'json',
	            success:function(data){
	                if(page>=1){
	                    doresponse(data);
	                }
	            }
	        })
        }else if(indx==1){
        	var obj=JSON.stringify({type:index,code:code});
            $.ajax({
            	url:'../../v1/goods/exchange/'+page,
            	type:'POST',
            	data:obj,
            	dataType:'json',
                contentType:'application/json',
                success:function(data){
                	product(index,data);
                }
            })
        }
    }else{
        page=$(this).html();
        if(indx==0){
        	$.ajax({
                url:'../../v1/goods/'+page,
                type:'GET',
//              data:obj,
                contentType:'application/json',
                dataType:'json',
                success:function(data){
                    doresponse(data);
                }
            })
        }else if(indx==1){
        	var obj=JSON.stringify({type:index,code:code});
            $.ajax({
            	url:'../../v1/goods/exchange/'+page,
            	type:'POST',
            	data:obj,
            	dataType:'json',
                contentType:'application/json',
                success:function(data){
                	product(index,data);
                }
            })
        }
        
    }
})
//TODO 处理响应数据
function doresponse(data){
    $('div.content table.table1 tbody').html('');
    if(data.resultcode==1000){	
    	$(data.goodssDtos).each(function(){
    		var status=this.status==0?'启用':'禁用';
            var str=this.status==0?'able':'disable';
            $('div.content table.table1 tbody').append(`
            <tr goodid=${this.id}>
	            <td>
	            	<div><img src=${this.imageurl} alt='加载失败'></div>
		        </td>
		        <td>${this.name}</td>
		        <td>${this.gold}金币</td>
		        <td>${this.num}</td>
		        <td>
		            <a class=${str}>${status}</a>
		        </td>
            </tr>
                    `)
        })
    }else if(data.resultcode==999){
    	$('div.content table.table1 tbody').html(`
        		<tr><td colspan='5'  style='text-align:center;'>没有查询到符合条件的数据</td></tr>`);
        	$('.page').hide();
    }else if(data.resultcode==998){
		window.parent.returnLogin();
	}else{
        alert(data.msg);
    }
}
//显示所有页码
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
//确认发货
$('div.content #daifahuo').on('click','.info li:nth-child(3)',function(){
	var sfcode=$(this).prev().find('input').val();
	var rechangecode=$(this).parents('ul').prev().find('thead th:first span').html();
	var obj=JSON.stringify({type:'0',code:'',sfcode:sfcode,rechangecode:rechangecode});
	var me=this;
	$.ajax({
		url:'../../v1/goods/exchange/deliver/1',
		type:'POST',
		data:obj,
		contentType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				alert('发货成功');
				$(me).parents('div.pinfo').remove();
			}else{
				alert(data.msg)
			}
		}
	})
});
$('div.content #daifahuo').on('click','table.product tbody tr:nth-child(2) td:nth-child(5)',function(){
	$('.bohuireson').show();
	var code=$(this).parents('table').find('thead th:first span').html();
	var me=this;
	$('div.bohuireson a.queren').click(function(){
		var reason=$('textarea[name="renson"]').val();
		var obj=JSON.stringify({reason:reason});
		$.ajax({
			url:'../../v1/goods/exchange/reject/'+code,
			type:'POST',
			data:obj,
			contentType:'application/json',
			success:function(data){
				if(data.resultcode==1000){
					$('div.bohuireson').hide();
					$(me).parents('div.pinfo').remove();
				}else if(data.resultcode==998){
			    	window.location='../../index.html';
			    }else{
					alert(data.msg);
				}
			}
		})
	});
	$('div.bohuireson a.quxiao').click(function(){
		$('div.bohuireson').hide();
	})
});
$('.table1').on('click','tbody td a',function(){
    var id=$(this).parents('tr').attr('goodid');
    var me=this;
    $.ajax({
        url:'../../v1/goods/disable/'+id,
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
$('ul.title li i').click(function(){
	console.log(111)
	var type=$('ul.status li.active').index('ul.status li');
	var obj=JSON.stringify({type:type,code:$('ul.title input').val()});
	$.ajax({
    	url:'../../v1/goods/exchange/1',
    	type:'POST',
    	data:obj,
    	dataType:'json',
        contentType:'application/json',
        success:function(data){
        	product(type,data);
        	showpages(data);
        	page=1;
        }
    })
})