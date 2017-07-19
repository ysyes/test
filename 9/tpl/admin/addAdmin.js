/**
 * Created by admin on 2016/11/17.
 */
var href=window.location.href.split('?')[1];
$('input[name="telephone"]').on('keyup',function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
if(href!==undefined){
    var id=href.split('&')[0].split('=')[1];
    var currentpage=href.split('&')[1].split('=')[1];
    $('#box div.header div.admin span').html('管理员编辑');
    $('input[name="name"]').attr('disabled','on');
    $('input[name="password"]').val('******');
    $('input[name="relpassword"]').val('******');
    $.ajax({
        url:'../../v1/manager/admin/'+currentpage,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $(data.admins).each(function(){
                    if(this.id==id){
                        $('input[name="name"]').val(this.name);
                        $('input[name="realname"]').val(this.realname);
                        $('input[name="telephone"]').val(this.telephone);
                        $('input[name="email"]').val(this.email);
                        $('textarea[name="description"]').val(this.description);
                    }
                })
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
    $('div.show div.button button.submit').click(function(){
        var data=$('form').serializeArray();
        for(var i= 0,obj={};i<data.length;i++){
            var name=data[i].name;
            var value=data[i].value;
            obj[name]=value;
        }
        if(obj.relpassword!=obj.password){
            window.parent.alertFn('两次密码输入不一致');
        }else {
            obj = JSON.stringify(obj);
            $.ajax({
                url: '../../v1/manager/admin/' + id,
                type: 'PUT',
                data: obj,
                contentType: 'application/json',
                success: function (data) {
                    if (data.resultcode == 1000) {
                        window.parent.alertFn('编辑成功');
                        window.location = 'admin.html';
                    } else if (data.resultcode == 998) {
                        window.parent.alertFn('登录失效，请重新登录');
                        window.parent.returnLogin();
                    } else {
                        window.parent.alertFn(data.msg)
                    }
                }
            })
        }
    })
}else{
    $('div.show div.button button.submit').click(function(){
        var data=$('form').serializeArray();
        for(var i= 0,obj={};i<data.length;i++){
            var name=data[i].name;
            var value=data[i].value;
            obj[name]=value;
        }
        if(obj.relpassword!=obj.password){
            window.parent.alertFn('两次密码输入不一致');
        }else{
        	obj.name=$('input[name="name"]').val();
        	obj=JSON.stringify(obj);
            $.ajax({
                url:'../../v1/manager/admin',
                type:'POST',
                data:obj,
                contentType:'application/json',
                success:function(data){
                    if(data.resultcode==1000){
                        window.parent.alertFn('添加成功');
                        window.location='admin.html';
                    }else if (data.resultcode == 998) {
                        window.parent.alertFn('登录失效，请重新登录');
                        window.parent.returnLogin();
                    } else{
                        window.parent.alertFn(data.msg)
                    }
                },
                error:function(){
                	window.parent.alertFn('请求数据出错，请联系管理员');
                }
            })
        }
    })
}