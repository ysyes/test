/**
 * Created by admin on 2016/11/30.
*/
//列表加载函数
function load(page){
    $.ajax({
        url:'../../v1/manager/channel/'+page,
        type:'GET',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                doresponse(data,page);
            }else if(data.resultcode==999){
                $('div.content tbody').html('<tr><td colspan="4" style="text-align:center;">没有查询到符合条件的数据</td></tr>')
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
    var tr="";
    $(data.channels).each(function(){
        switch(this.type){
            case 1 :type='android';break;
            case 2 :type='ios';break;
            case 3 :type='wp';break;
            case 4 :type='网站';break;
        }
        tr+="<tr channelid="+this.id+"> <td>"+this.name+"</td> <td>"+type+"</td> <td>"+panduan(this.intro)+"</td> <td><span><a href='addQudao.html?channelid="+this.id+"&name="+encodeURI(this.name)+"&type="+this.type+"&intro="+encodeURI(this.intro==undefined||this.intro==''?'':this.intro)+"'>编辑</a></span></td></tr>"
    })
    $('div.content tbody').html(tr);
    //当总页码为1时隐藏页码，否则显示页码
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
function panduan(x){
	return x==""||x==undefined?'-':x;
}