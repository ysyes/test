/**
 * Created by admin on 2016/11/29.
 */
//上传图片预览
function selectImage(file) {
    if(!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('image').src = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
}
function selectImage2(file) {
    if(!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('image2').src = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
}
var href=window.location.href;
if(href.split('?')[1]!==undefined) {
    //编辑资讯调用接口
    $('#box div.header div.admin span').html('一条资讯编辑')
    var aninfoid = href.split('?')[1].split('=')[1];
    $.ajax({
        url:'../../v1/manager/aninfo/'+aninfoid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
            	$('input[name="title"]').val(data.title);
                $('input[name="label"]').val(data.label);
                $('input[name="publishdate"]').val(data.publishdate);
                $('#image').attr('src',data.logourl);
                $('#image2').attr('src',data.titleimg);
                $('#ueditor_0').contents().find('body.view').html(data.content||'')
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
    });
    $('div.show div.button button.submit').click(function() {
    	if($('input[name="title"]').val()==''||$('input[name="label"]').val()==''||$('input[name="publishdate"]').val()==''||$('#ueditor_0').contents().find('body.view').html()==''){
    		window.parent.alertFn('必填字段不能为空');
    	}else{
    		var formdata = new FormData();
            formdata.append('id',aninfoid);
            formdata.append('title',$('input[name="title"]').val());
            formdata.append('label',$('input[name="label"]').val().replace(/，/g,','));
            formdata.append('publishdate',$('input[name="publishdate"]').val());
            formdata.append('logourl',$('input[name="logourl"]')[0].files[0]||"");
            formdata.append('titleimg',$('input[name="titleimg"]')[0].files[0]||"");
            formdata.append('content',$('#ueditor_0').contents().find('body.view').html())
            $.ajax({
                url:'../../v1/manager/aninfo/update',
                type:'POST',
                data:formdata,
                processData:false,
                contentType:false,
                success:function(data){
                    if(data.resultcode==1000){
                        window.parent.alertFn('编辑成功');
                        window.location='aninfo.html'
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
    //新增资讯接口
    $('div.show div.button button.submit').click(function(){
    	if($('input[name="title"]').val()==''||$('input[name="label"]').val()==''||$('input[name="publishdate"]').val()==''||$('input[name="logourl"]').val()==''||$('input[name="titleimg"]').val()==''||$('#ueditor_0').contents().find('body.view').html()==''){
    		window.parent.alertFn('必填字段不能为空');
    	}else{
	        var formdata=new FormData();
	        formdata.append('title',$('input[name="title"]').val());
	        formdata.append('label',$('input[name="label"]').val().replace(/，/g,','));
	        formdata.append('content',$('#ueditor_0').contents().find('body.view').html())
	        formdata.append('logourl',$('input[name="logourl"]')[0].files[0]);
	        formdata.append('titleimg',$('input[name="titleimg"]')[0].files[0]);
	        formdata.append('publishdate',$('input[name="publishdate"]').val());
	        $.ajax({
	            url:'../../v1/manager/aninfo',
	            type:'POST',
	            data:formdata,
	            processData:false,
	            contentType:false,
	            success:function(data){
	                if(data.resultcode==1000){
	                    window.parent.alertFn('新增成功');
	                    window.location='aninfo.html'
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