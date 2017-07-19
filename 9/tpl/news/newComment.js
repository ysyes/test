//获取newsid
var href=window.location.href;
var newsid=href.split('?')[1].split('=')[1];
//新闻评论加载
function load(page){
    $.ajax({
        url:'../../v1/manager/news/comment/'+newsid+'/'+page,
        type:'Get',
        contentType:'appliation/json',
        success:function(data){
            if(data.resultcode==1000){
            	//调用响应数据处理函数
                doresponse(data);
            }else if(data.resultcode==999){
                $('div.content tbody').html('<tr><td colspan="6" style="text-align:center;">没有查询到符合条件的数据</td></tr>');
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
//请求成功，处理响应数据
function doresponse(data){
    var tr='';
    $(data.comments).each(function(){
    	//this.status为1时是激活状态，为0时是冻结状态
        if(this.status==1){
            tr+="<tr commentid='"+this.id+"'><td>"+(this.nickname==""||this.nickname==undefined?'匿名':this.nickname)+"</td><td>"+this.content+"</td><td>"+this.createtime+"</td> <td>"+this.goodnum+"</td><td><span>冻结</span></td></tr>";
        }else{
            tr+="<tr commentid='"+this.id+"'><td class='gray'>"+(this.nickname==""||this.nickname==undefined?'匿名':this.nickname)+"</td><td class='gray'>"+this.content+"</td><td class='gray'>"+this.createtime+"</td> <td>"+this.goodnum+"</td><td class='gray'><span>冻结</span></td></tr>";
        }
    })
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
//新闻评论激活冻结
$('div.content table tbody').on('click','td:last-child span',function(){
    var commentid=$(this).parents('tr').attr('commentid');
    var me=this;
    //调用冻结激活函数，成功后改变样式
    freeze('news/comment',commentid,this)
})