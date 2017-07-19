/**
 * Created by admin on 2016/11/30.
 */
//加载敏感字列表
function load(page){
    $.ajax({
        url:'../../v1/manager/illword/'+page,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                doresponse(data,page);
            }else if(data.resultcode==999){
                $('div.content tbody').html('<tr><td colspan="2" style="text-align:center;">没有查询到符合条件的数据</td></tr>')
                $('.tcdPageCode').hide();
            }else if(data.resultcode==998){
                window.parent.alertFn('登录超时，请重新登录');
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
var totalpage=1;
//处理响应数据
function doresponse(data,page){
    var tr='';
    $(data.illwords).each(function(){
        if(this.status==1){
            tr+="<tr illwordid="+this.id+"><td>"+this.name+"</td><td><span>编辑</span><span>冻结</span></td>";
        }else{
            tr+="<tr illwordid="+this.id+"><td class='gray'>"+this.name+"</td><td class='gray'><span>编辑</span><span class='able'>激活</span></td>"
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
    $('#addMinganzi').show();
    $('.addMinganzi>div input').val('');
    $('.addMinhanzi').attr('illwordid','');
	$('.addMinganzi>p').html('新增敏感字');
})
//新增热门搜索词弹窗点击取消按钮关闭弹窗
$('div#addMinganzi button.back').click(function(){
    $('#addMinganzi').hide();
})
//编辑新增敏感字通用
function request(type,url,str){
	if($('.addMinganzi>div input').val()==''){
		window.parent.alertFn('敏感字不能为空')
	}else{
		var name=$('.addMinganzi>div input').val();
		var obj=JSON.stringify({'name':name})
	    $.ajax({
	        url:'../../v1/manager/illword'+url,
	        type:type,
	        data:obj,
	        contentType:'application/json',
	        success:function(data){
	            if(data.resultcode==1000){
	                window.parent.alertFn(str);
	                $('#addMinganzi').hide();
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
//敏感词提交
$('.addMinganzi button.confirm').click(function(data){
	var illwordid=$('.addMinganzi').attr('illwordid');
	//编辑敏感词提交
	if(illwordid){
		 request('put',"/"+illwordid,"编辑成功");
	//新增敏感词
	}else{
		 request('post',"","新增成功");
	}
})
//编辑敏感字
$('div.content table tbody').on('click','td:last-child span:first-child',function(){
    $('#addMinganzi').show();
    //获取需要编辑文字的id放到弹框上
    var illwordid=$(this).parents('tr').attr('illwordid');
    $('.addMinganzi').attr('illwordid',illwordid);
    //获取当前要编辑的文字
    var illword=$(this).parents('tr').find('td:first-child').html();
    //将弹框标题修改为编辑敏感字
    $('.addMinganzi>p').html('编辑敏感字');
    //文字写入
    $('.addMinganzi>div input').val(illword);
})
//冻结敏感字
$('div.content table tbody').on('click','td:last-child span:nth-child(2)',function(){
    var illwordid=$(this).parents('tr').attr('illwordid');
    freeze('illword',illwordid,this)
})
