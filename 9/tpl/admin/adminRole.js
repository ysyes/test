/**
 * Created by admin on 2016/11/16.
 */
//$('div.content table tbody td:last-child span:nth-child(2)').click(function(){
//    if($(this).hasClass('red')){
//        $(this).removeClass('red');
//    }else{
//        $(this).addClass('red');    }
//    $('div.editor').toggle();
//})
//调用页码
//$(".tcdPageCode").createPage({
//    backFn: function (p) {   //单击回调方法，p是当前页码
//        console.log(p);
//    }
//});
//角色列表接口调用
load(1);
//获取adminid
var adminid=window.location.href.split('=')[1];
//列表请求函数
function load(page){
	var adminid=window.location.href.split('=')[1];
    $.ajax({
        url:'../../v1/manager/admin/'+adminid+'/rule',
        type:'GET',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode===1000){
                //if(data.totalpage==1){
                //    $('.tcdPageCode').hide();
                //}else{
                //    $(".tcdPageCode").createPage({
                //        pageCount: data.totalpage, //总页数
                //        current: 1   //当前页
                //    });
                //}
            	$('div.content tbody').html('');
                $(data.rules).each(function(){
                    $('div.content tbody').append("<tr ruleid='"+this.id+"'><td>"+this.name+"</td><td><span>删除</span></tr>")
                })
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else if(data.resultcode==999){
            	$('div.content tbody').html('<tr><td colspan="2">没有查询到符合条件的数据</td></tr>')
            }else{
                window.parent.alertFn(data.msg)
            }
        }
    })
}
//TODO 添加角色
//点击新增角色按钮弹出框
$('#box div.header div.addBtn').click(function(){
    $('div.module').show();
    //新增角色调用角色列表接口
    $.ajax({
        url:'../../v1/manager/rule',
        type:'GET',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $('div.addAdminRole ul').html('');
                $(data.rules).each(function(){
                    $('div.addAdminRole ul').append("<li><input type='checkbox' name='id' value='"+this.id+"'/><span>"+this.name+"</span></li>")
                })
                //将已有角色删除
                var arr=[];
                $('div.content tbody tr').each(function(){
                    arr.push($(this).attr('ruleid'));
                })
                for(var i=0;i<arr.length;i++){
                    $('div.addAdminRole ul li').each(function(){
                    	$('div.addAdminRole ul input[value='+arr[i]+']').parents('li').remove();
                    })
                }
                if($('ul').html()==''){
                	$('ul').html('<li style="text-align:center;">没有角色了</li>')
                }
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else{
                window.parent.alertFn(data.msg);
            }
        }
    })
})
//点击取消按钮关闭弹出框
$('div.addAdminRole div.button button.gray').click(function(){
    $('div.module').hide();
})
//点击完成请求添加角色接口
$('div.addAdminRole div.button button.red').click(function(){
	var data=$('form').serializeArray();
    for(var i= 0,obj={},arr=[];i<data.length;i++){
        arr.push({id:data[i].value});
    }
    obj=JSON.stringify({ids:arr});
    $.ajax({
        url:'../../v1/manager/admin/'+adminid+'/rule',
        type:'POST',
        data:obj,
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $('div.module').hide();
                load(1);
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg)
            }
        }
    })
})


//删除角色
$('div.content tbody').on('click','td:last-child span',function(){
    var ruleid=$(this).parents('tr').attr('ruleid');
    $('div.confirmModule').show().attr('ruleid',ruleid);
});
//点击取消按钮取消删除
$('.confirm button.gray').click(function(){
    $('div.confirmModule').hide();
})
//点击红色按钮请求删除角色接口
$('.confirm button.red').click(function(){
    var ruleid=$('div.confirmModule').attr('ruleid');
    $.ajax({
        url:"../../v1/manager/admin/"+adminid+"/rule/"+ruleid,
        type:'DELETE',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $('div.confirmModule').hide();
                $('div.content tbody tr[ruleid='+ruleid+']').remove();
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg)
            }
        }
    })
})
