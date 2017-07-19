//加载敏感字列表
function load(page){
    $.ajax({
        url:'../../v1/manager/aninfoword/'+page,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                doresponse(data,page);
            }else if(data.resultcode==999){
            	//查询到没有数据时的显示
                $('div.content tbody').html('<tr><td colspan="2" style="text-align:center;">没有查询到符合条件的数据</td></tr>')
                $('.tcdPageCode').hide();
            }else if(data.resultcode==998){
                window.parent.alertFn('登录超时，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
var totalpage=1;
//响应成功，处理响应数据
function doresponse(data,page){
    var tr='';
    $(data.aninfowords).each(function(){
        if(this.status==1){
            tr+="<tr aninfowordid="+this.id+"><td>"+this.keyword+"</td><td><span>编辑</span><span>冻结</span></td>";
        }else{
            tr+="<tr aninfowordid="+this.id+"><td class='gray'>"+this.keyword+"</td><td class='gray'><span>编辑</span><span class='able'>激活</span></td>"
        }
    });
    $('div.content tbody').html(tr);
    if(data.totalpage==1){
        $('.tcdPageCode').hide();
    }else {
    	if(data.totalpage!==totalpage){
    		$('.tcdPageCode').show();
            totalpage=data.totalpage;
            $("#tcdPageCode").Page({
	  			totalPages: data.totalpage,//分页总数
	  			liNums: 7,//分页的数字按钮数(建议取奇数)
	  			activeClass: 'activP', //active 类样式定义
	  			callBack : function(page){
	  		        load(page);
	  			}
  			});
    	}
    }
}
load(1);
//点击新增搜索词出现弹窗
$('#box div.addBtn').click(function(){
    $('#addHot').show();
    $('.addHot>div input').val('');
	$('.addHot>p').html('新增热门搜索词');
	$('.addHot').attr('aninfowordid','');
})
//新增热门搜索词弹窗点击取消按钮关闭弹窗
$('div#addHot button.back').click(function(){
    $('#addHot').hide();
})
//新增和编辑热门搜索词函数
function request(type,url,str){
	if($('.addHot>div input').val()==''){
		window.parent.alertFn('热门搜索词不能为空')
	}else{
		var obj=JSON.stringify({'keyword':$('.addHot>div input').val()})
	    $.ajax({
	        url:'../../v1/manager/aninfoword'+url,
	        type:type,
	        data:obj,
	        contentType:'application/json',
	        success:function(data){
	            if(data.resultcode==1000){
	                window.parent.alertFn(str);
	                $('#addHot').hide();
	                location.reload();
	            }else if(data.resultcode == 998) {
	                window.parent.alertFn('登录失效，请重新登录');
	                window.parent.returnLogin();
	            }else{
	                window.parent.alertFn(data.msg);
	            }
	        },
	        error:function(){
	        	window.parent.alertFn('请求数据出错，请联系管理员');
	        }
	    })
	}
}
//新增热门搜索词
$('.addHot button.confirm').click(function(data){
	var aninfowordid=$('.addHot').attr('aninfowordid');
	//编辑热门搜索词提交
	if(aninfowordid){
		 request('put',"/"+aninfowordid,"编辑成功");
	//新增热门搜索词
	}else{
		 request('post',"","新增成功");
	}
})

//编辑热门搜索词
$('div.content table tbody').on('click','td:last-child span:first-child',function(){
    $('#addHot').show();
    var aninfowordid=$(this).parents('tr').attr('aninfowordid');
    $('.addHot').attr('aninfowordid',aninfowordid);
    var aninfoword=$(this).parents('tr').find('td:first-child').html();
    $('.addHot>p').html('编辑热门搜索词');
    $('.addHot>div input').val(aninfoword);
})
//冻结热门搜索词
$('div.content table tbody').on('click','td:last-child span:nth-child(2)',function(){
    var aninfowordid=$(this).parents('tr').attr('aninfowordid');
    freeze('aninfoword',aninfowordid,this)
})