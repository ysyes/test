/**
 * Created by admin on 2016/11/29.
 */
//新闻列表加载
function load(teamid,publishdate,page){
    var obj=JSON.stringify({'publishdate':publishdate});
    $.ajax({
        url:'../../v1/manager/news/list/'+teamid+'/'+page,
        type:'POST',
        data:obj,
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
            	//调用响应数据处理函数
                doresponse(data,page);
            }else if(data.resultcode==999){
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
//当图片返回为空时加载加载默认图片
function doimg(logo){
	if(logo==""){
		return "<img src='../../img/moren.png' style='height:35px;margin-bottom:7.5px;'>";
	}else{
		return "<img src='"+logo+"'>";
	}
}
var totalpage=1;
//请求成功的回调函数
function doresponse(data,page){
    var tr='';
    $(data.news).each(function(){
    	//新闻标题超出12位的部分显示省略号，鼠标放上去后显示完整标题
    	var title=this.title.length>12?('<span title="'+this.title+'">'+this.title.slice(0,12)+'...</span>'):this.title;
    	//状态为1时为激活状态，状态为0时为冻结状态
        if(this.status==1){
            tr+="<tr newsid="+this.id+"><td>"+doimg(this.logourl)+title+"</td><td>"+this.src+"</td><td>"+this.teamname+"</td> <td>"+this.publishdate+"</td><td>"+this.commentnum+"</td> <td><span><a href='addNew.html?newsid="+this.id+"'>编辑</a></span><span>冻结</span><span><a href='newComment.html?newsid="+this.id+"'>评论</a></span></td></tr>"
        }else{
            tr+="<tr newsid="+this.id+"><td class='gray'>"+doimg(this.logourl)+title+"</td><td class='gray'>"+this.src+"</td><td class='gray'>"+this.teamname+"</td><td class='gray'>"+this.publishdate+"</td><td class='gray'>"+this.commentnum+"</td><td class='gray'><span><a href='addNew.html?newsid="+this.id+"'>编辑</a></span><span class='able'>激活</span><span><a href='newComment.html?newsid="+this.id+"'>评论</a></span></td></tr>"
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
	  				var teamid=$('div.header select[name="teamid"]').val();
	  		        var publishdate=$('div.header input[name="publishdate"]').val();
	  		        load(teamid,publishdate,page);
	  			}
  			});
    	}
    	
    }
}
//页面初始化新闻列表
load(0,0,1);
//通用球队接口调用
$.ajax({
	url:'../../v1/manager/common/teams',
	type:'get',
	contentType:'application/json',
	async:true,
	success:function(data){
		if(data.resultcode==1000){
			var option='<option value="0">所有球队</option>';
			$(data.teams).each(function(){
				option+='<option value="'+this.id+'">'+this.name+'</option>'
			})
			$('select[name="teamid"]').html(option);
		}
	},
    error:function(){
    	window.parent.alertFn('请求数据出错，请联系管理员');
    }
})
//根据球队检索
$('div.header select[name="teamid"]').change(function(){
    var teamid=$('div.header select[name="teamid"]').val();
    var publishdate=$('div.header input[name="publishdate"]').val();
    load(teamid,publishdate,1);
})
//根据发布时间检索
$('div.header input[name="publishdate"]').on('focus input',function(){
	console.log($('div.header input[name="publishdate"]').val())
    var teamid=$('div.header select[name="teamid"]').val();
    var publishdate=$('div.header input[name="publishdate"]').val();
    load(teamid,publishdate,1);
})
//冻结激活新闻
$('div.content table tbody').on('click','td:last-child span:nth-child(2)',function(){
    var newsid=$(this).parents('tr').attr('newsid');
    //调用冻结函数
    freeze('news',newsid,this)
})