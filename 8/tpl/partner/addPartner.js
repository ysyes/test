/**
 * Created by admin on 2016/11/20.
 */
var href=window.location.href.split('?')[1];
//限制电话号码只能输入数字
$('input[name="telephone"]').on('keyup',function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
if(href!==undefined) {
    var partnerid=href.split('&')[0].split('=')[1];
    var currentpage=href.split('&')[1].split('=')[1];
    $.ajax({
        url:'../../v1/manager/partner/'+currentpage,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $(data.partners).each(function(){
                    if(this.id==partnerid){
                        $('input[name="name"]').val(this.name);
                        $('input[name="linkman"]').val(this.linkman);
                        $('input[name="telephone"]').val(this.telephone);
                        $('input[name="email"]').val(this.email);
                        $('textarea[name="description"]').val(this.description);
                    }
                })
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else {
                window.parent.alertFn(data.msg);
            }
        }
    })
    $('#box div.header div.admin span').html('编辑合作伙伴');
    $('#box button.submit').click(function () {
        var data = $('form').serializeArray();
        for (var i = 0, obj = {}; i < data.length; i++) {
            var name = data[i].name;
            var value = data[i].value;
            obj[name] = value;
        }
        obj = JSON.stringify(obj);
        $.ajax({
            url: '../../v1/manager/partner/' + partnerid,
            type: 'put',
            data: obj,
            contentType: 'application/json',
            success: function (data) {
                if (data.resultcode == 1000) {
                    window.parent.alertFn('编辑成功');
                    window.location = 'partner.html';
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                } else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    })
}else{
    //新增提交form表单
    $('#box button.submit').click(function () {
        var data = $('form').serializeArray();
        for (var i = 0, obj = {}; i < data.length; i++) {
            var name = data[i].name;
            var value = data[i].value;
            obj[name] = value;
        }
        obj.status='1';
        obj = JSON.stringify(obj);
        $.ajax({
            url: '../../v1/manager/partner',
            data: obj,
            type: 'post',
            contentType: 'application/json',
            success: function (data) {
                if (data.resultcode == 1000) {
                    window.parent.alertFn('新增合作伙伴成功');
                    window.location = 'partner.html';
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }  else {
                    window.parent.alertFn(data.msg);
                }
            }
        })
    })
}