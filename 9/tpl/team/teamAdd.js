//上传图片预览
function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		$(file).parents("div.logoUpload").find("img").attr("src",evt.target.result);
	}
	reader.readAsDataURL(file.files[0]);
}
//赛事下拉列表
$.ajax({
	type:"get",
	url:"../../v1/manager/common/leagues",
	async:true,
	success:function (data) {
		if (data.resultcode==1000) {
			var options='<option value="">所属联赛</option>';
			for (i in data.leagues) {
				options +='<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>';
			}
			$(".league").html(options);
		} else{
			console.log(data.msg)
		}
	}
});
//编码输入限制
$("input.code").keyup(function () {
	this.value=this.value.replace(/[^0-9a-zA-Z]/g,'');
})
//点击提交
$(".button .submit").click(function () {
	var formData=new FormData();
    formData.append('name',$(".name").val());
    formData.append('code',$(".code").val());
    formData.append('leagueid',$(".league option:checked").val());
    //logo上传
    if ($("#logo")[0].files[0]!=""&&$("#logo")[0].files[0]!=undefined) {
    	formData.append('logourl',$("#logo")[0].files[0]);
    }
    //上传场馆
    if ($("#stadium")[0].files[0]!=""&&$("#stadium")[0].files[0]!=undefined) {
    	formData.append('stadium',$("#stadium")[0].files[0]);
    }
    if ($(".name").val()==""||$(".code").val()==""){
    	window.parent.alertFn("球队名称或编码为空");
    }else{
	    if ($("#logo")[0].files[0]!=""&&$("#logo")[0].files[0]!=undefined) {
	    	$.ajax({
		        url:"../../v1/manager/team",
		        type:"post",
		        data:formData,
		        processData:false,
		        contentType:false,
		        success:function(data){
		        	if (data.resultcode==1000) {
		        		window.parent.alertFn(data.msg);
		        		//返回列表页
		        		window.location.href='team.html';
		        	} else if (data.resultcode == 998) {
						//登录失败
		        		window.parent.alertFn('登录失效，请重新登录');
		                window.parent.returnLogin();
					} else{
		        		window.parent.alertFn(data.msg);
		        	}
		        },
		        error:function () {
		        	console.log("请求错误");
		        }
		    })
	    } else{
	    	window.parent.alertFn("球队logo为空");
	    }
    }
})
