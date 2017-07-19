function load(publishdate,page){
    var obj=JSON.stringify({'publishdate':publishdate});
    $.ajax({
        url:'../../v1/manager/aninfo/'+page,
        type:'POST',
        data:obj,
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                doresponse(data);
            }else if(data.resultcode==999){
            	//暂无数据处理
                $('div.content tbody').html('<tr><td colspan="6" style="text-align:center;">没有查询到符合条件的数据</td></tr>')
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
//当图片为空时显示默认图片
function morenimg(logo){
    if(logo==""||logo==undefined){
        return "<img src='../../img/moren.png' style='height:35px;margin-bottom:7.5px;'>";
    }else{
        return "<img src='"+logo+"'>";
    }
}
var totalpage=1;
//处理响应数据
function doresponse(data){
    var tr='';
    $(data.aninfos).each(function(){
    	var title=this.title.length>12?('<span title="'+this.title+'">'+this.title.slice(0,12)+'...</span>'):this.title;
        if(this.status==1){
            tr+="<tr aninfoid="+this.id+"><td>"+morenimg(this.logourl)+title+"</td><td>"+this.label+"</td><td>"+this.publishdate+"</td><td>"+this.fabulous+"</td><td><span><a href='addAninfo.html?id="+this.id+"'>编辑</a></span><span>冻结</span></td></tr>"
        }else{
            tr+="<tr aninfoid="+this.id+"><td class='gray'>"+morenimg(this.logourl)+title+"</td><td class='gray'>"+this.label+"</td><td class='gray'>"+this.publishdate+"</td><td class='gray'>"+this.fabulous+"</td><td class='gray'><span><a href='addAninfo.html?id="+this.id+"'>编辑</a></span><span class='able'>激活</span></td></tr>"
        }
    })
    //向tbody中写入数据
    $('div.content tbody').html(tr);
    //当总页码为1时隐藏页码
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
	  		        var publishdate=$('div.header input[name="publishdate"]').val();
	  		        load(publishdate,page);
	  			}
  			});
    	}
    }
}

load(0,1);
//按照发布时间检索咨询列表
$('div.header input[name="publishdate"]').on('focus input',function(){
    var publishdate=$('div.header input[name="publishdate"]').val();
    load(publishdate,1);
})
//冻结激活新闻
$('div.content table tbody').on('click','td:last-child span:nth-child(2)',function(){
    var aninfoid=$(this).parents('tr').attr('aninfoid');
    //调用冻结函数
    freeze('aninfo',aninfoid,this);
})