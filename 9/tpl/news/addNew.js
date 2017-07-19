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
//通用球队接口调用
$.ajax({
	url:'../../v1/manager/common/teams',
	type:'get',
	async:false,
	contentType:'application/json',
	success:function(data){
		if(data.resultcode==1000){
			var option='';
			$(data.teams).each(function(){
				option+='<option value="'+this.id+'">'+this.name+'</option>'
			})
			$('select[name="teamid"]').html(option);
		}else if(data.resultcode==998){
            window.parent.alertFn('登录超时，请重新登录');
            window.parent.returnLogin();
        }else{
            window.parent.alertFn(data.msg);
        }
	}
})
//获取url链接
var href=window.location.href;
if(href.split('?')[1]!==undefined){
	//编辑新闻调用接口
	$('#box div.header div.admin span').html('新闻编辑')
	var newsid=href.split('?')[1].split('=')[1];
    $.ajax({
        url:'../../v1/manager/news/'+newsid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
            	//向编辑框中写入数据
                $('input[name="title"]').val(data.title);
                $('input[name="src"]').val(data.src);
                $('select[name="teamid"]').val(data.teamid);
                $('input[name="publishdate"]').val(data.publishdate);
                $('#image').attr('src',data.logourl);
                
                $('#ueditor_0').contents().find('body.view').html(data.content||'');
            }else if(data.resultcode==998){
                window.parent.alertFn('登录超时，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    });
    //点击提交表单数据
    $('div.show div.button button.submit').click(function(){
    	if($('input[name="title"]').val()==''||$('input[name="src"]').val()==''||$('select[name="teamid"]').val()==''||$('#ueditor_0').contents().find('body.view').html()==''||$('input[name="publishdate"]').val()==''){
    		window.parent.alertFn('必填字段不能为空');
    	}else{
    		var formdata=new FormData();
            formdata.append('id',newsid);
            formdata.append('title',$('input[name="title"]').val());
            formdata.append('src',$('input[name="src"]').val());
            formdata.append('teamid',$('select[name="teamid"]').val());
            formdata.append('content',$('#ueditor_0').contents().find('body.view').html())
            formdata.append('logourl',$('input[name="logourl"]')[0].files[0]||"");
            formdata.append('publishdate',$('input[name="publishdate"]').val());
            $.ajax({
                url:'../../v1/manager/news/update',
                type:'POST',
                data:formdata,
                processData:false,
                contentType:false,
                success:function(data){
                    if(data.resultcode==1000){
                    	window.parent.alertFn('编辑成功');
                        window.location='news.html'
                    }else if(data.resultcode==998){
                        window.parent.alertFn('登录超时，请重新登录');
                        window.parent.returnLogin();
                    }else{
                        window.parent.alertFn(data.msg);
                    }
                }
            })
    	}
    })
}else{
	//新增新闻提交表单数据
    $('div.show div.button button.submit').click(function(){
    	if($('input[name="title"]').val()==''||$('input[name="src"]').val()==''||$('select[name="teamid"]').val()==''||$('#ueditor_0').contents().find('body.view').html()==''||$('input[name="logourl"]').val()==''||$('input[name="publishdate"]').val()==''){
    		window.parent.alertFn('必填字段不能为空');
    	}else{
            var formdata=new FormData();
            formdata.append('title',$('input[name="title"]').val());
            formdata.append('src',$('input[name="src"]').val());
            formdata.append('teamid',$('select[name="teamid"]').val());
            formdata.append('content',$('#ueditor_0').contents().find('body.view').html())
            formdata.append('logourl',$('input[name="logourl"]')[0].files[0]);
            formdata.append('publishdate',$('input[name="publishdate"]').val());
            $.ajax({
                url:'../../v1/manager/news',
                type:'POST',
                data:formdata,
                processData:false,
                contentType:false,
                success:function(data){
                    if(data.resultcode==1000){
                    	window.parent.alertFn('新增成功');
                        window.location='news.html'
                    }else if(data.resultcode==998){
                        window.parent.alertFn('登录超时，请重新登录');
                        window.parent.returnLogin();
                    }else{
                        window.parent.alertFn(data.msg);
                    }
                }
            })
    	}
    })
}
