//上传图片预览
function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById('image').src = evt.target.result;
		image = evt.target.result;
		console.log("图片的地址是：" + image);
	}
	reader.readAsDataURL(file.files[0]);
}
//赛事下拉筛选
$.ajax({
	type:"get",
	url:"../../v1/manager/common/league",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			var options = '';
			for (i in data.leagues) {
				options += '<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>';
			}
			$(".leagues").html(options);
		}else if (data.resultcode == 998) {
			window.parent.alertFn('登录失效，请重新登录');
			window.parent.returnLogin();
		} else{
			window.parent.alertFn(data.msg);
		}
	}
});
//提交数据请求
function teamAjax() {
	var formData=new FormData();
    formData.append('name',$("#teamName").val());
    formData.append('code',$("#teamCode").val());
    formData.append('leagueyear',$(".leagueyear option:checked").val());
    formData.append('leagueid',$(".leagues option:checked").val());
    formData.append('continent',$("#continent option:checked").val());
    formData.append('country',$("#country option:checked").val());
    formData.append('area',$("#city option:checked").val()||"");
    formData.append('type',$("#teamtype option:checked").val());
    formData.append('sex',$("#sex option:checked").val());
    //logo上传
    formData.append('logo',$(".logoUpload input")[0].files[0]||"");
    $.ajax({
        url:"../../v1/manager/team",
        type:"post",
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
        	if (data.resultcode==1000) {
				window.parent.alertFn("新增成功");
        		window.location.href='team.html';
        	}else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
        		window.parent.alertFn(data.msg);
        	}
        }
    })
}
//点击提交
$(".button .submit").click(function () {
	teamAjax();
})