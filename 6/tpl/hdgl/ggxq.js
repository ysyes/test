/**
 * Created by admin on 2016/11/2.
 */
var id=window.location.href.split('=')[1];
function load(){
    $.ajax({
        url:'../../v1/notice/'+id,
        type:'GET',
        contentType:'application/json',
        dataType:'json',
        success:function(data){
        	if(data.resultcode==1000){
                $('div.content table tbody').html(`<tr>
                <td><input name="title" disabled value=${data.title}></td>
                <td><input name="createtime" disabled value=${data.createtime}></td>
                <td><input name="disabletime" disabled value=${data.disabletime}></td>
                <td><a class="replace">修改</a><a href="hdgl.html" class="back">返回</a></td>
                </tr>
                `);
                $('textarea.text').html(data.text);
        	}else if(data.resultcode==998){
                window.parent.returnLogin();
            }
        }
    })
}
load();
$('div.content').on('click','a.replace',function(){
	if($(this).html()=='修改'){
		$('input').removeAttr('disabled').css('border','1px solid #ccc');
		$('textarea').removeAttr('disabled');
		$(this).html('保存');
	}else{
		var title=$('input[name="title"]').val();
		var createtime=$('input[name="createtime"]').val();
		var disabletime=$('input[name="disabletime"]').val();
		var text=$('textarea[name="text"]').val();
		var obj=JSON.stringify({title:title,abletime:createtime,disabletime:disabletime,text:text});
		$.ajax({
	        url:'../../v1/notice',
	        type:'POST',
	        data:obj,
	        dataType:'json',
	        contentType:'application/json',
	        success:function(data){
	            if(data.resultcode==1000){
	            	if(confirm('修改成功')){
	            		$('input').attr('disabled','on').css('border','0');
	            		$(this).html('修改');
	               }
	            }else if(data.resultcode==1999){
	            	alert(data.msg);
	            }else if(data.resultcode==998){
	                window.parent.returnLogin();
	            }
	        }
	    })
	}
	
})