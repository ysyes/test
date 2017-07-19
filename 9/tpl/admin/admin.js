//停用和启用点击效果切换
$('div.content table tbody').on('click','td:last-child span:first-child',function(){
	//获取管理员id
    var adminid=$(this).parents('tr').attr('adminid');
    var me=this;
    if($(this).html()=='停用'){
        var obj=JSON.stringify({status:'0'});
        $.ajax({
            url:'../../v1/manager/admin/'+adminid,
            type:'PUT',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('启用').addClass('able');
                    $(me).parents('tr').find('td').addClass('gray');
                }else if (data.resultcode == 998) {
                	window.parent.alertFn('登录失效，请重新登录')
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg);
                }
            },
            error:function(){
            	window.parent.alertFn('请求数据出错，请联系管理员');
            }
        })
    }else{
        var obj=JSON.stringify({status:'1'})
        $.ajax({
            url:'../../v1/manager/admin/'+adminid,
            type:'PUT',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('停用').removeClass('able');
                    $(me).parents('tr').find('td').removeClass('gray');
                }else if (data.resultcode == 998) {
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
})
//页码调用
var pages;
var totalpage=1;
//获取管理员列表
load(1);
function load(page){
    $.ajax({
        url:'../../v1/manager/admin/'+page,
        type:'GET',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                pages=data.totalpage;
                if(pages==1){
                    $('.tcdPageCode').hide();
                }else{
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
                $('div.content tbody').html('');
                $(data.admins).each(function(){
                    if(this.status==1){
                        $('div.content tbody').append("<tr adminid='"+this.id+"'><td>"+panduan(this.name)+"</td><td>"+panduan(this.realname)+"</td><td>"+panduan(this.telephone)+"</td><td>"+panduan(this.email)+"</td><td>"+panduan(this.createtime)+"</td><td><span>停用</span><span><a href='addAdmin.html?id="+this.id+"&currentpage="+data.currentpage+"'>编辑</a></span><span><a href='adminRole.html?id="+this.id+"'>角色</a></span></td></tr>")
                    }else{
                        $('div.content tbody').append("<tr adminid='"+this.id+"'><td class='gray'>"+panduan(this.name)+"</td><td class='gray'>"+panduan(this.realname)+"</td><td class='gray'>"+panduan(this.telephone)+"</td><td class='gray'>"+panduan(this.email)+"</td><td class='gray'>"+panduan(this.createtime)+"</td><td class='gray'><span>启用</span><span><a href='addAdmin.html?id="+this.id+"&currentpage="+data.currentpage+"'>编辑</a></span><span><a href='adminRole.html?id="+this.id+"'>角色</a></span></td></tr>")
                    }
                })
            }else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else{
                window.parent.alertFn(data.msg);
            }
        },
        error:function(){
        	window.parent.alertFn('请求数据出错，请联系管理员');
        }
    })
}
function panduan(x){
    x=(x==undefined||x=="")?'-':x;
    return x;
}