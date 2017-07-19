/**
 * Created by admin on 2016/11/30.
 */
var href=window.location.href;
if(href.split('?')[1]!==undefined) {
    //编辑渠道调用接口
    $('#box div.header div.admin span').html('新闻编辑')
    var hrefstr = href.split('?')[1];
    var hrefarr=hrefstr.split('&');
    for(var i= 0,arr={};i<hrefarr.length;i++){
        var name=hrefarr[i].split('=')[0];
        var value=hrefarr[i].split('=')[1];
        arr[name]=value;
    }
    $('input[name="name"]').val(decodeURI(arr.name));
    $('select[name="type"]').val(arr.type);
    $('textarea[name="intro"]').val(decodeURI(arr.intro));
    //编辑提交
    $('div.show div.button button.submit').click(function(){
    	if($('input[name="name"]').val()==''||$('textarea[name="intro"]').val()==''){
    		window.parent.alertFn('必填字段不能为空');
    	}else{
    		var data=$('form').serializeArray();
            for(var i= 0,obj={};i<data.length;i++){
                var name=data[i].name;
                var value=data[i].value;
                obj[name]=value;
            }
            obj=JSON.stringify(obj);
            $.ajax({
                url:'../../v1/manager/channel/'+arr.channelid,
                type:'PUT',
                data:obj,
                contentType:'application/json',
                success:function(data){
                    if(data.resultcode==1000){
                        window.parent.alertFn('编辑成功');
                        window.location='channel.html';
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
    })
}else{
    //新增渠道
    $('div.show div.button button.submit').click(function(){
    	if($('input[name="name"]').val()==''||$('textarea[name="intro"]').val()==''){
    		window.parent.alertFn('必填字段不能为空');
    	}else{
	        var data=$('form').serializeArray();
	        for(var i= 0,obj={};i<data.length;i++){
	            var name=data[i].name;
	            var value=data[i].value;
	            obj[name]=value;
	        }
	        obj=JSON.stringify(obj);
	        $.ajax({
	            url:'../../v1/manager/channel',
	            type:'POST',
	            data:obj,
	            contentType:'application/json',
	            success:function(data){
	                if(data.resultcode==1000){
	                    window.parent.alertFn('新增成功');
	                    window.location='channel.html';
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
    })
}
