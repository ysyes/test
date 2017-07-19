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

//获取page和leaguesid;
function urlId(name){
	var main = {};
	var urlSplit = window.location.href.split("?")[1];
	if(urlSplit!=""&&urlSplit!=undefined){
		var arr = urlSplit.split("&");
		for (var i = 0; i < arr.length ; i++) {
			main[arr[i].split("=")[0]] = arr[i].split("=")[1];
		}
	}
	return main[name];
}
//判断是否是编辑选项
if (urlId("leaguesid")!=""&&urlId("leaguesid")!=undefined) {
	//证明是编辑，修改标题
	$("#box header h3").html("赛事编辑");
	//写入数据
	competitonWrite(urlId("page"),urlId("leaguesid"))
}
//写入数据函数
function competitonWrite(page,leaguesid) {
	$.ajax({
		type:"get",
		url:"../../v1/manager/league/"+page,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				for (i in data.leagues) {
					if (data.leagues[i].id == leaguesid) {
						$("#teamName").val(data.leagues[i].name);
						$("#teamCode").val(data.leagues[i].code);
						$("#sex").val(data.leagues[i].sex);
						$("#type").val(data.leagues[i].type);
						$("#continent").val(data.leagues[i].continent);
						$('#top').val(data.leagues[i].top);
						$('#middle').val(data.leagues[i].middle);
						$('#lower').val(data.leagues[i].lower);
						//洲国联动事件
//						continentFn();
						country(data.leagues[i].continent);
						//写入国家
						countryTimeFn();
						var countrys=data.leagues[i].country || "";
						function countryTimeFn() {
							setTimeout(function () {
								$("#country").val(countrys);
								if ($("#country option:checked").val() != countrys) {
									countryTimeFn();
								}
							},100)
						}
						
						$(".showLogo img").prop("src",data.leagues[i].logo);
					}
				}
			}  else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
				window.parent.alertFn(data.msg);
			}
		}
	});
}


//新增数据请求
function competitonAjax() {
	var formData=new FormData();
    formData.append('name',$("#teamName").val());
    formData.append('code',$("#teamCode").val());
    formData.append('sex',$("#sex option:checked").val());
    formData.append('type',$("#type option:checked").val());
    formData.append('country',$("#country").val());
    formData.append('continent',$("#continent").val());
    formData.append('top',$("#top").val());
    formData.append('middle',$("#middle").val());
    formData.append('lower',$("#lower").val());
    //logo上传
   if ($(".logoUpload input")[0].files[0]!=""&&$(".logoUpload input")[0].files[0]!=undefined) {
    	formData.append('logo',$(".logoUpload input")[0].files[0]);
    }
    $.ajax({
        url:"../../v1/manager/league",
        type:"post",
        data:formData,
        processData:false,
        contentType:false, 
        success:function(data){
        	if (data.resultcode==1000) {
        		window.parent.alertFn('新增赛事成功');
        		window.location.href="league.html";
        	} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}  else{
        		window.parent.alertFn(data.msg);
        	}
        },
        error:function () {
        	window.parent.alertFn("请求错误");
        }
    })
}

//编辑数据请求
function competitonEditAjax() {
	var formData=new FormData();
    formData.append('name',$("#teamName").val());
    formData.append('code',$("#teamCode").val());
    formData.append('sex',$("#sex option:checked").val());
    formData.append('type',$("#type option:checked").val());
    formData.append('leagueid',urlId("leaguesid"));
    formData.append('country',$("#country").val());
    formData.append('continent',$("#continent").val());
    formData.append('top',$("#top").val());
    formData.append('middle',$("#middle").val());
    formData.append('lower',$("#lower").val());
    //logo上传
    if ($(".logoUpload input")[0].files[0]!=""&&$(".logoUpload input")[0].files[0]!=undefined) {
    	formData.append('logo',$(".logoUpload input")[0].files[0]);
    }
    $.ajax({
        url:"../../v1/manager/league/edit",
        type:"post",
        data:formData,
        processData:false,
        contentType:false, 
        success:function(data){
        	if (data.resultcode==1000) {
        		window.parent.alertFn('编辑赛事成功');
        		window.location.href="league.html";
        	} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}  else{
        		window.parent.alertFn(data.msg);
        	}
        },
        error:function () {
        	window.parent.alertFn("请求错误");
        }
    })
}
$(".button .submit").click(function () {
	if (urlId("leaguesid")!=""&&urlId("leaguesid")!=undefined) {
		competitonEditAjax();
	}else{
		competitonAjax();
	}
})
//升级名额，降级名额，杯赛名额字符输入限制
$('#top').on('keyup',function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
$('#lower').on('keyup',function(){
	var reg=/[^\d]*/g;
	$(this).val($(this).val().replace(reg,''));
})
$('#middle').on('keyup',function(){
	var reg=/[^\d||,||，]*/g;
	$(this).val($(this).val().replace(reg,''));
	$(this).val($(this).val().replace(/，/,','));
})