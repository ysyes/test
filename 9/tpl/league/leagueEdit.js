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
//输入框限制编码
$("input.code").keyup(function () {
	this.value=this.value.replace(/[^0-9a-zA-Z]/g,'');
})
//晋降级限制
$("input.numberLimit").keyup(function () {
	if (this.value.length==1) {
		this.value=this.value.replace(/[^1-9]/g,'');
	} else{
		this.value=this.value.replace(/[^0-9]/g,'');
	}
})
//杯赛限制
$("input.middle").keyup(function () {
	if (this.value.substr(-1)=="，") {
		this.value=this.value.substring(0,this.value.length-1) + ",";
	}
	if (this.value.substr(-2,1)==","&&this.value.substr(-1)==",") {
		this.value=this.value.substring(0,this.value.length-1);
	}
	this.value=this.value.replace(/[^1-9,]/g,'');
})
//父级赛事列表
function parentFn(name) {
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/leagues",
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				var options='<option value="">父级赛事</option>';
				for (i in data.leagues) {
					options +='<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>';
				}
				$(".parentid").html(options);
				$(".parentid").val(name);
			} else{
				console.log(data.msg);
			}
		}
	});
}

//获取url参数
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
//获取编辑内容
$.ajax({
	type:"get",
	url:"../../v1/manager/league/"+urlId("page"),
	async:true,
	success:function (data) {
		if (data.resultcode==1000) {
			for (i in data.leagues) {
				if (data.leagues[i].id==urlId("id")) {
					//写入父级赛事
					parentFn(data.leagues[i].parentid);
					//写入参数
					$(".name").val(data.leagues[i].name);
					$(".code").val(data.leagues[i].code);
					$(".type").val(data.leagues[i].type);
					$(".top").val(data.leagues[i].top);
					$(".middle").val(data.leagues[i].middle);
					$(".lower").val(data.leagues[i].lower);
					//图片
					if (data.leagues[i].logo!=undefined&&data.leagues[i].logo!="") {
						$(".showLogo img").attr("src",data.leagues[i].logo);
					}
				}
			}
		}else if(data.resultcode==998){
			//未登录
		}
	},
	error:function () {
		console.log("请求错误");
	}
});

//点击提交
$(".button .submit").click(function () {
	var formData=new FormData();
	formData.append('id',urlId("id"));
	formData.append('parentid',$(".parentid option:checked").val());
    formData.append('name',$(".name").val());
    formData.append('code',$(".code").val());
    formData.append('type',$(".type option:checked").val());
    formData.append('top',$(".top").val());
    //杯赛限制，最后为，时去掉
    if ($(".middle").val().substr(-1)==",") {
    	$(".middle").val($(".middle").val().slice(0,-1));
    }
    formData.append('middle',$(".middle").val());
    formData.append('lower',$(".lower").val());
    //logo上传
    if ($("#logo")[0].files[0]!=""&&$("#logo")[0].files[0]!=undefined) {
    	formData.append('logo',$("#logo")[0].files[0]);
    }
    if ($(".name").val()==""||$(".code").val()=="") {
    	window.parent.alertFn("赛事名称或编码为空");
    } else{
	    $.ajax({
	        url:"../../v1/manager/league/update",
	        type:"post",
	        data:formData,
	        processData:false,
	        contentType:false, 
	        success:function(data){
	        	if (data.resultcode==1000) {
	        		//alert(data.msg);
	        		window.parent.alertFn(data.msg);
	        		//返回列表页
	        		window.location.href='league.html';
	        	} else if (data.resultcode == 998) {
					//登录失败
	        		window.parent.alertFn('登录失效，请重新登录');
	                window.parent.returnLogin();
				}  else{
					//alert(data.msg);
	        		window.parent.alertFn(data.msg);
	        	}
	        },
	        error:function () {
	        	console.log("请求错误");
	        }
	    })
	}
})

