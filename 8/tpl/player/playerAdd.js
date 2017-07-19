//上传图片预览
function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById('image').src = evt.target.result;
		//image = evt.target.result;
		//console.log("图片的地址是：" + image);
	}
	reader.readAsDataURL(file.files[0]);
}
//赛事球队下拉列表加载
$.ajax({
	type:"get",
	url:"../../v1/manager/common/leagueteam",
	async:true,
	contentType:'application/json',
	success:function (data) {
		//请求成功获得data
		if (data.resultcode == 1000) {
			var options="";
			var optionteams="";
			$(data.leagueteams).each(function(){
				$(this.leagues).each(function(){
					options+="<option value="+this.id+">"+this.name+"</option>"
					$(this.groups).each(function(){
						$(this.teams).each(function(){
							optionteams+="<option value="+this.id+">"+this.name+"</option>"
						})
					})
				})
			})
			$('select[name="league"]').html(options);
			$('select[name="team"]').html(optionteams);
		} else if (data.resultcode == 998) {
			window.parent.alertFn('登录失效，请重新登录');
			window.parent.returnLogin();
		}
	}
});
//赛季选择下拉事件联动
$("div.show select.leagueyear").change(function () {
	leagueyear = $(this).children("option:checked").val();
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/leagueteam",
		async:true,
		contentType:'application/json',
		success:function (data) {
			//请求成功获得data
			if(data.resultcode == 1000) {
				var options="";
				var optionteams=""
				$(data.leagueteams).each(function(){
					//如果赛季时查询所有赛季中的所有赛事，否则根据赛季筛选
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							options+="<option value="+this.id+">"+this.name+"</option>"
							$(this.groups).each(function(){
								$(this.teams).each(function(){
									optionteams+="<option value="+this.id+">"+this.name+"</option>"
								})
							})
						})
					}
				})
				$('select[name="league"]').html(options);
				$('select[name="team"]').html(optionteams);
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}
		}
	});
})
//赛事球队下拉事件联动
$("div.show select.leagues").change(function () {
	leagueyear=$('[name="leagueyear"]').val();
	leagueid = $(this).children("option:checked").val();
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/leagueteam",
		async:true,
		contentType:'application/json',
		success:function (data) {
			//请求成功获得data
			if(data.resultcode == 1000) {
				var options=""
				var optionteams=""
				$(data.leagueteams).each(function(){
					//如果赛季时查询所有赛季中的所有赛事，否则根据赛季筛选
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							if(this.id==leagueid){
								$(this.groups).each(function(){
									$(this.teams).each(function(){
										optionteams+="<option value="+this.id+">"+this.name+"</option>"
									})
								})
							}
						})
					}
				})
				$('select[name="team"]').html(optionteams);
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg)
			}
		}
	});
})
//籍贯

$('#areas').focus(function(){
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
//提交数据请求
function teamAjax() {
	var formData=new FormData();
    formData.append('name',$("#name").val());
    formData.append('code',$("#code").val());
    formData.append('leagueyear',$(".leagueyear").val());
	formData.append('leagueid',$(".leagues").val());//赛事
    formData.append('teamid',$(".team").val());
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
    console.log($("#sex").val())
    $.ajax({
        url:"../../v1/manager/player",
        type:"post",
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
        	if (data.resultcode==1000) {
        		window.parent.alertFn('新增成功');
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
$('#jerseynumber').keyup(function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
$('#height').keyup(function(){
	var reg=/[^(\d||.)]*/g;
	$(this).val($(this).val().replace(reg,''));
})
$('#weight').keyup(function(){
	var reg=/[^(\d||.)]*/g;
	$(this).val($(this).val().replace(reg,''));
})