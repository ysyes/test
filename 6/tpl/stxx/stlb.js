/**
 * Created by admin on 2016/11/4.
 */
/**
 * Created by admin on 2016/10/28.
 */
//TODO 下拉菜单获取 联赛名称/球队名称
function list(){
	$.ajax({
		url:'../../v1/menu/league',
		type:'GET',
		contentType:'application/json',
        dataType:'json',
		success:function(data){
			if(data.resultcode==1000){
				$(data.leagues).each(function(){
					$('select.name').append('<option value='+this.code+'>'+this.name+'</option>')
				})
			}else if(data.resultcode==998){
                window.parent.returnLogin();
		    }
		}
	});
}
$('select.name').change(function(){
	if($(this).val()==''){
		$('select.team').html('')
		$('select.team').append('<option  value="">--全部球队--</option>');
	}else{
		$.ajax({
			url:'../../v1/menu/team/'+$('select.name').val(),
			type:'GET',
			contentType:'application/json',
	        dataType:'json',
			success:function(data){
				if(data.resultcode==1000){
					$('select.team').html('');
					$(data.leagues).each(function(){
						$('select.team').append('<option value='+this.code+'>'+this.name+'</option>');
					})
				}else if(data.resultcode==998){
	                window.parent.returnLogin();
			    }
			}
		});
	}
})
//TODO 初始化
function load(){
	list();
    var obj=JSON.stringify({leaguecode:'',teamcode:'',footballer:''});
    $.ajax({
        url:'../../v1/injury/init/1',
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
//TODO 搜索查询
$('ul.title li i').click(function(e){
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    obj.footballer=$('input[name="footballer"]').val();
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/injury/init/1',
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
//TODO 获取唯一ID
$('div.content tbody tr td:first-child').on('click','a',function(e){
    //e.preventDefault();
    var href=$(this).attr('href').split('?')[0];
    var articalid=$(this).parents('tr').attr('articalid');
    $(this).attr('href',href+'?artileid='+articalid);
});
//TODO 分页显示
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
    if(page<=3||page>=pages-1){
    	if(($(this).index('.page li')+1)>=length){
            page++;
            $.ajax({
                url:'../../v1/injury/init/'+page,
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
                url:'../../v1/injury/init/'+page,
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
        }else if($(this).html()=='...'){
        }else{
            page=$(this).html();
            $.ajax({
                url:'../../v1/injury/init/'+page,
                type:'POST',
                data:obj,
                contentType:'application/json',
                dataType:'json',
                success:function(data){
                    doresponse(data);
                }
            })
        }
    }else{
        if(($(this).index('.page li')+1)>=length){
            page++;
            $('.page ul').html(`
                <li class='able'>上一页</li>
                <li>...</li>
                <li>${page-2}</li>
                <li>${page-1}</li>
                <li class='active'>${page}</li>
                <li>${page+1}</li>
                <li>${page+2}</li>
                <li>...</li>
                <li class='able'>下一页</li>
            `)
            $.ajax({
                url:'../../v1/injury/init/'+page,
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
            $('.page ul').html(`
            <li class='able'>上一页</li>
            <li>...</li>
            <li>${page-2}</li>
            <li>${page-1}</li>
            <li class='active'>${page}</li>
            <li>${page+1}</li>
            <li>${page+2}</li>
            <li>...</li>
            <li class='able'>下一页</li>
                `)
            $.ajax({
                url:'../../v1/injury/init/'+page,
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
        }else if($(this).html()=='...'){
        }else{
            page=parseInt($(this).html());
            if(page>2&&page<pages-2){
            	$('.page ul').html(`
                        <li class='able'>上一页</li>
                        <li>...</li>
                        <li>${page-2}</li>
                        <li>${page-1}</li>
                        <li class='active'>${page}</li>
                        <li>${page+1}</li>
                        <li>${page+2}</li>
                        <li>...</li>
                        <li class='able'>下一页</li>
                `)
            }else if(page==2){
            	$('.page ul').html(`
                        <li class='able'>上一页</li>
                        <li>${page-1}</li>
                        <li class='active'>${page}</li>
                        <li>${page+1}</li>
                        <li>${page+2}</li>
                        <li>...</li>
                        <li class='able'>下一页</li>
                `)
            }else if(page==pages-1){
            	$('.page ul').html(`
                        <li class='able'>上一页</li>
                        <li>...</li>
                        <li>${page-2}</li>
                        <li>${page-1}</li>
                        <li class='active'>${page}</li>
                        <li>${page+1}</li>
                        <li class='able'>下一页</li>
                `)
            }else if(page==pages-2){
            	$('.page ul').html(`
                        <li class='able'>上一页</li>
                        <li>...</li>
                        <li>${page-2}</li>
                        <li>${page-1}</li>
                        <li class='active'>${page}</li>
                        <li>${page+1}</li>
                        <li>${page+2}</li>
                        <li class='able'>下一页</li>
                `)
            }
            $.ajax({
                url:'../../v1/injury/init/'+page,
                type:'POST',
                data:obj,
                contentType:'application/json',
                dataType:'json',
                success:function(data){
                    doresponse(data);
                }
            })
        }
        if(page==3&&$('.page ul li:nth-child(2)').html()=="..."){
            console.log($('.page ul li:nth-child(2)')[0])
            $('.page ul li:nth-child(2)').remove();
        }
        if(page==pages-2&&$('.page ul li:nth-child(8)').html()=='...'){
            $('.page ul li:nth-child(8)').remove();
        }
    }
})
//TODO 处理响应应数据
function doresponse(data){
    $('div.content table.table1 tbody').html('');
    if(data.resultcode==1000){
        $('div.content table tbody').html('');
        function panduan(x){
        	if(x==undefined||x==''){
        		x='--';
        	}else{
        		x=x;
        	}
        	return x;
        }
        $(data.injuryDtos).each(function(){
            $('div.content table tbody').append(`
            <tr>
            <td>${panduan(this.name)}</td>
            <td>${panduan(this.team)}</td>
            <td>${panduan(this.footballer)}</td>
            <td>${panduan(this.location)}</td>
            <td>${panduan(this.num)}</td>
            <td>${panduan(this.status)}</td>
            <td>${panduan(this.remark)}</td>
            <td>
                <a href="stUpdate.html?id=${this.id}" class="able">编辑</a>
            </td>
            </tr>
                    `);
        })
    }else if(data.resultcode==999){
        $('div.content table tbody').html(`
        		<tr><td colspan='8' align='center'>没有查询到符合条件的数据</td></tr>`);
        $('.page').hide();
    }else if(data.resultcode==998){
        window.parent.returnLogin();
    }else{
    	alert(data.msg);
    }
}
//TODO 显示所有页码
function showpages(data){
    pages=data.totalpage;
    $('.page ul').html('');
    if(data.totalpage==1||data.totalpage==undefined){
        $('.page').hide();
    }else{
    	$('.page').show();
        var frag=document.createDocumentFragment();
        if(pages<=5){
        	for(var i=1;i<=pages;i++){
	            if(i==1){
	                $(frag).append('<li class="active">'+i+'</li>')
	            }else{
	                $(frag).append('<li>'+i+'</li>');
	            }
	        }
        }else{
        	for(var i=1;i<=5;i++){
	            if(i==1){
	                $(frag).append('<li class="active">'+i+'</li>')
	            }else{
	                $(frag).append('<li>'+i+'</li>');
	            }
	        }
        }
        $('.page ul').append('<li class="disable">上一页</li>');
        $('.page ul').append(frag);
        if(pages>5){
        	$('.page ul').append('<li>...</li>');
        }
        $('.page ul').append('<li>下一页</li>');
    }
}