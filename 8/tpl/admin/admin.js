/**
 * Created by admin on 2016/11/15.
 */
//停用和启用点击效果切换
$('div.content table tbody').on('click','td span:first-child',function(){
    var adminid=$(this).parents('tr').attr('adminid');
    var me=this;
    if($(this).html()=='停用'){
        var obj=JSON.stringify({status:'0'})
        $.ajax({
            url:'../../v1/manager/admin/'+adminid,
            type:'put',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('启用')
                    $(me).parents('tr').find('td').addClass('gray');
                }else if (data.resultcode == 998) {
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    }else{
        var obj=JSON.stringify({status:'1'})
        $.ajax({
            url:'../../v1/manager/admin/'+adminid,
            type:'put',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('停用')
                    $(me).parents('tr').find('td').removeClass('gray');
                }else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    }
})
//页码调用
//var pages;
//$(".tcdPageCode").createPage({
//    //pageCount: pages, //总页数
//    //current: 1,   //当前页
//    backFn: function (p) {   //单击回调方法，p是当前页码
//        load(p);
//    }
//});
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
            	if(data.totalpage==1){
                    $('.tcdPageCode').hide();
                    totalpage=1;
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
        }
    })
}
function panduan(x){
    x=(x==undefined||x=="")?'-':x;
    return x;
}

