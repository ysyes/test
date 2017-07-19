/**
 * Created by admin on 2016/11/17.
 */
var href=window.location.href.split('?')[1];
if(href!==undefined){
    //编辑模块获取
	$('#box div.header div.admin span').html('模块编辑');
    var programid=href.split('=')[1];
    $.ajax({
        url:'../../v1/manager/program',
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $(data.programs).each(function(){
                    if(this.id==programid){
                        $('[name="name"]').val(this.name)
                        $('[name="accesspath"]').val(this.accesspath)
                    }
                })

            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(msg)
            }
        }
    })
    //编辑模块提交
    $('div.show div.button button.submit').click(function(){
    	 var data=$('form').serializeArray();
    	 for(var i= 0,obj={};i<data.length;i++){
 	        var name=data[i].name;
 	        var value=data[i].value;
 	        obj[name]=value;
 	    }
 	    obj = JSON.stringify(obj);
 	    $.ajax({
 	        url: '../../v1/manager/program/'+programid,
 	        type: 'put',
 	        data: obj,
 	        contentType: 'application/json',
 	        success: function (data) {
 	            if (data.resultcode == 1000) {
 	                window.parent.alertFn('修改成功');
 	                window.location = 'program.html';
 	            } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }else{
 	                window.parent.alertFn(data.msg)
 	            }
 	        }
 	    })
    })
}else{
    //新增模块 
    $('div.show div.button button.submit').click(function(){
    	var data=$('form').serializeArray();
        for(var i= 0,obj={};i<data.length;i++){
            var name=data[i].name;
            var value=data[i].value;
            obj[name]=value;
        }
        obj = JSON.stringify(obj);
        $.ajax({
            url: '../../v1/manager/program',
            type: 'Post',
            data: obj,
            contentType: 'application/json',
            success: function (data) {
                if (data.resultcode == 1000) {
                    window.parent.alertFn('新增成功');
                    window.location = 'program.html';
                }else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg)
                }
            }
        })
    })
}