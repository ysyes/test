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
//籍贯
$('#areas').focus(function(){
	$('#areas').blur();
	$('#area').show();
})
$('#area button.back').click(function(){
	$('#area').hide();
})
$('#area button.confirm').click(function(){
	if($('#country').val()=='中国'){
		$('#areas').val($('#city').val());
	}else{
		$('#areas').val($('#country').val());
	}
	$('#area').hide();
})
$('#country').change(function(){
	if($(this).val()=='中国'){
		$('#city').css('opacity','1');
	}else{
		$('#city').css('opacity','0');
	}
})
$('#continent').change(function(){
	if($(this).val()=='亚洲'){
		$('#city').css('opacity','1');
	}else{
		$('#city').css('opacity','0');
	}
})
//获取page和leaguesid;
function urlId(name){
	var main = {};
	var urlSplit = decodeURI(window.location.href.split("?")[1]);
	if(urlSplit!=""&&urlSplit!=undefined){
		var arr = urlSplit.split("&");
		for (var i = 0; i < arr.length ; i++) {
			main[arr[i].split("=")[0]] = arr[i].split("=")[1];
		}
	}
	return main[name];
}
//编辑写入数据
footballerWrite();
function footballerWrite() {
	$("#name").val(urlId("name"));
	$("#code").val(urlId("code"));
	$("#areas").val(urlId("city"));
	$("#birthday").val(urlId("birthday"));
	$("#height").val(urlId("height"));
	$("#weight").val(urlId("weight"));
	$("#positions").val(urlId("positions"));
	$("#sex").val(urlId("sex"));
	$("#foot").val(urlId("foot"));
	$("#jerseynumber").val(urlId("jerseynumber"));
	$("#registernumber").val(urlId("registernumber"));
	$("#salary").val(urlId("salary"));
	$("#image").prop("src",urlId("image"));
}
//提交数据请求
function teamAjax() {
	var formData=new FormData();
    formData.append('name',$("#name").val());
    formData.append('code',$("#code").val());
    formData.append('area',$("#areas").val()||"");
    formData.append('birthday',$("#birthday").val());
    formData.append('height',$("#height").val());
    formData.append('weight',$("#weight").val());
    formData.append('positions',$("#positions").val());
    formData.append('sex',$("#sex").val());
    formData.append('foot',$("#foot").val());
    formData.append('jerseynumber',$("#jerseynumber").val());
    formData.append('registernumber',$("#registernumber").val());
    formData.append('salary',$("#salary").val());    
    //logo上传
    formData.append('logo',$(".logoUpload input")[0].files[0]||"");
    formData.append('id',urlId("playerid"));
    $.ajax({
        url:"../../v1/manager/player/edit",
        type:"post",
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
        	if (data.resultcode==1000) {
				window.parent.alertFn("编辑成功");
        		window.location.href='player.html';
        	} else if (data.resultcode == 998) {
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
//限制身价只能输入数字
$('#salary').keyup(function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
$('#height').keyup(function(){
	var reg=/[^(\d||.)]*/g;
	$(this).val($(this).val().replace(reg,''));
})
$('#jerseynumber').keyup(function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
$('#weight').keyup(function(){
	var reg=/[^(\d||.)]*/g;
	$(this).val($(this).val().replace(reg,''));
})