/**
 * Created by admin on 2016/11/15.
 */
//停用和启用点击效果切换
$('div.content table tbody').on('click','td span:first-child',function(){
	var programid=$(this).parents('tr').attr('programid');
	var me=this;
    if($(this).html()=='停用'){
        var obj=JSON.stringify({status:'0'})
        $.ajax({
            url:'../../v1/manager/program/'+programid,
            type:'DELETE',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('启用')
                    $(me).parents('tr').find('td').addClass('gray');
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }
            }
        })
    }else{
        var obj=JSON.stringify({status:'1'})
        $.ajax({
            url:'../../v1/manager/program/'+programid,
            type:'DELETE',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('停用')
                    $(me).parents('tr').find('td').removeClass('gray');
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }
            }
        })
    }
})
//页码调用
//$(".tcdPageCode").createPage({
//    backFn: function (p) {   //单击回调方法，p是当前页码
//
//    }
//});
load();
//TODO 模块列表加载
function load(){
    $.ajax({
        url:'../../v1/manager/program',
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $('div.content tbody').html('');
                $(data.programs).each(function(){
                    var status=this.status==1?'停用':'启用';
                    if(this.status==1){
                        $('div.content tbody').append("<tr programid='"+this.id+"'><td>"+this.name+"</td><td>"+this.accesspath+"</td><td><span>"+status+"</span><span><a href='addProgram.html?id="+this.id+"'>编辑</a></span></td></tr>")
                    }else{
                        $('div.content tbody').append("<tr programid='"+this.id+"'><td class='gray'>"+this.name+"</td><td class='gray'>"+this.accesspath+"</td><td class='gray'><span>"+status+"</span><span><a href='addProgram.html?id="+this.id+"'>编辑</a></span></td></tr>")
                    }
                })
            }else if(data.resultcode==999){
            	$('div.content tbody').html('<tr><td colspan="3">没有查询到符合条件的数据</td></tr>');
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }
        }
    })
}