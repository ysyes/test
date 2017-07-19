/**
 * Created by admin on 2016/11/20.
 */
//停用启用样式切换
$('#box table tbody').on('click','td a:first-child',function(e){
    e.preventDefault();
    var partnerid=$(this).parents('tr').attr('partnerid');
    var me=this;
    if($(this).html()=='停用'){
        var obj=JSON.stringify({status:0})
        $.ajax({
            url:'../../v1/manager/partner/'+partnerid,
            type:'put',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('启用')
                    $(me).parents('tr').find('td').addClass('gray');
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    }else{
        var obj=JSON.stringify({status:1})
        $.ajax({
            url:'../../v1/manager/partner/'+partnerid,
            type:'put',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('停用')
                    $(me).parents('tr').find('td').removeClass('gray');
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg);
                }
            }
        });
    }
})
//页码切换请求列表
//$(".tcdPageCode").createPage({
//    backFn: function (p) {
//        load(p);
//    }
//});
var totalpage=1;
//获取列表信息
load(1);
function load(page){
    $.ajax({
        url:'../../v1/manager/partner/'+page,
        type:'GET',
        contentType:'application/json',
        success:function(data){
//            pages=data.totalpage;
//            if(pages==1){
//                $('.tcdPageCode').hide();
//            }else{
//                $(".tcdPageCode").createPage({
//                    pageCount: pages, //总页数
//                    current: page
//                });
//            }
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
            $('#box table tbody').html('');
            if(data.resultcode===1000){
                $(data.partners).each(function(){
                    if(this.status==1){
                        $('#box table tbody').append("<tr partnerid="+this.id+"><td>"+this.name+"<div><p><span>编码 : </span><span>"+this.code+"</span></p><p><span>key : </span><span>"+this.pkey+"</span></p></div></td><td>"+this.linkman+"</td><td>"+dataNone(this.telephone)+"</td><td>"+dataNone(this.email)+"</td><td>"+dataNone(this.createtime)+"</td><td><a href=''>停用</a><a href='addPartner.html?partnerid="+this.id+"&currentpage="+data.currentpage+"'>编辑</a><a href=''>重置Key</a><a href='partnerMatch.html?partnerid="+this.id+"'>权限</a></td></tr>")
                    }else{
                        $('#box table tbody').append("<tr partnerid="+this.id+"><td class='gray'>"+this.name+"<div><p><span>编码 : </span><span>"+this.code+"</span></p><p><span>key : </span><span>"+this.pkey+"</span></p></div></td><td class='gray'>"+this.linkman+"</td><td class='gray'>"+dataNone(this.telephone)+"</td><td class='gray'>"+dataNone(this.email)+"</td><td class='gray'>"+dataNone(this.createtime)+"</td><td> class='gray'><a href=''>停用</a><a href='addPartner.html?partnerid="+this.id+"&currentpage="+data.currentpage+"'>编辑</a><a href=''>重置Key</a><a href='partnerMatch.html?partnerid="+this.id+"'>权限</a></td></tr")
                    }
                })
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else if(data.resultcode==999){
                $('#box table tbody').html('<tr><td colspan="6">没有查询到符合条件的数据</td></tr>')
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//重置KEY
$('#box table').on('click','tbody a:nth-child(3)',function(e){
	e.preventDefault();
	var partnerid=$(this).parents('tr').attr('partnerid');
	$.ajax({
		url:'../../v1/manager/partner/'+partnerid+'/resetkey',
		type:'get',
		contentType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				window.parent.alertFn('重置成功');
				location.reload();
			} else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else{
				window.parent.alertFn(data.msg);
			}
		}
	})
});
function dataNone(data) {
    if (data==undefined || data=="" || data==NaN) {
        return "-";
    } else{
        return data;
    }
}