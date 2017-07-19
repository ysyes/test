/**
 * Created by admin on 2016/11/15.
 */
//页码调用
//$(".tcdPageCode").createPage({
//    pageCount: 10, //总页数
//    current: 1,   //当前页
//    backFn: function (p) {   //单击回调方法，p是当前页码
//        console.log(p);
//    }
//});
load();
//TODO 角色列表加载
function load(){
    $.ajax({
        url:'../../v1/manager/rule',
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $('div.content tbody').html('');
                $(data.rules).each(function(){$('div.content tbody').append("<tr ruleid='"+this.id+"'><td>"+this.name+"</td><td><span>删除</span><span>编辑</span></td></tr>")
                })
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
//TODO 调用模块接口
$.ajax({
    url:'../../v1/manager/program',
    type:'get',
    contentType:'application/json',
    success:function(data){
        if(data.resultcode==1000){
        	$('div.addRole ul').html('');
        	$('div.updateRole ul').html('');
            $(data.programs).each(function(){
                if(this.status==1){
                    $('div.addRole ul').append("<li><input type='checkbox' name='id' value='"+this.id+"'/><span>"+this.name+"</span></li>")
                    $('div.updateRole ul').append("<li><input type='checkbox' name='id' value='"+this.id+"'/><span>"+this.name+"</span></li>")
                }
            })
        } else if (data.resultcode == 998) {
            window.parent.alertFn('登录失效，请重新登录');
            window.parent.returnLogin();
        }else{
            window.parent.alertFn(data.msg);
        }
    }
})
//点击新增角色按钮打开新增框
$('div.addBtn').click(function(){
    $('div.module1').show();
})
$('div.addRole div.button button.gray').click(function(){
    $('div.module1').hide();
})
$('div.addRole div.button button.red').click(function(){
	var data=$('#form1').serializeArray();
	for(var i= 0,obj={},arr=[];i<data.length;i++){
		arr.push({id:data[i].value});
    }
	var name=$('div.addRole input[type="text"]').val();
	obj=JSON.stringify({name:name,programs:arr});
	$.ajax({
		url:'../../v1/manager/rule',
		type:'post',
		data:obj,
		contentType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				$('div.module1').hide();
				load();
			} else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
				window.location.alertFn(data.msg);
			}
		}
	})
})
//TODO 编辑角色
//点击编辑角色按钮打开编辑框并将已有模块打上对勾
$('div.content tbody').on('click','td:last-child span:last-child',function(){
    $('div.updateRole input[type="text"]').val($(this).parent().prev().html());
    $('div.updateRole ul li input').removeAttr('checked');
    var ruleid=$(this).parents('tr').attr('ruleid');
    $('div.module2').show().attr('ruleid',ruleid);
    $.ajax({
        url:'../../v1/manager/rule',
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $(data.rules).each(function(){
                    if(this.id==ruleid){
                    	var arr=[];
                        $(this.programs).each(function(){
                        	arr.push(this.id);
                        })
                        for(var i=0;i<arr.length;i++){
                        	$('div.updateRole ul li input[value='+arr[i]+']')[0].checked=true;
                        }
                    }
                })
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(msg);
            }
        }
    })
})
//编辑点击完成提交
$('div.updateRole div.button button.red').click(function(){
    var ruleid=$('div.module2').attr('ruleid');
    var data=$('#form2').serializeArray();
	for(var i= 0,obj={},arr=[];i<data.length;i++){
		arr.push({id:data[i].value});
    }
	var name=$('div.updateRole input[type="text"]').val();
	obj=JSON.stringify({name:name,programs:arr});
    $.ajax({
        url:'../../v1/manager/rule/'+ruleid,
        type:'PUT',
        data:obj,
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
            	$('div.module2').hide();
            	load();
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
})
$('div.updateRole div.button button.gray').click(function(){
    $('div.module2').hide();
})

//TODO 删除角色
$('div.content tbody').on('click','td:last-child span:first-child',function(){
    var ruleid=$(this).parents('tr').attr('ruleid');
    $('.confirmModule').show().attr('ruleid',ruleid);
})
//点击取消按钮取消删除
$('.confirm button.gray').click(function(){
    $('div.confirmModule').hide();
})
//点击红色按钮请求删除角色接口
$('.confirm button.red').click(function(){
    var ruleid=$('div.confirmModule').attr('ruleid');
    $.ajax({
        url:'../../v1/manager/admin/rule/'+ruleid,
        type:'DELETE',
        contentType:'application/json',
        success:function(data) {
            $('div.confirmModule').hide();
            $('div.content tbody tr[ruleid='+ruleid+']').remove();
        }
    })
})

