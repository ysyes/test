//上传图片预览
function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		$(file).parents("div.logoUpload").find("img").attr("src",evt.target.result)
		//document.getElementById('image').src = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}
//赛事下拉列表
function leagueFn(name){
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
				$(".league").val(name);
			} else{
				console.log(data.msg)
			}
		}
	});
}

//编码输入限制
$("input.code").keyup(function () {
	this.value=this.value.replace(/[^0-9a-zA-Z]/g,'');
})
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
	url:"../../v1/manager/team/"+urlId("leagueid")+"/"+urlId("page"),
	async:true,
	success:function (data) {
		if (data.resultcode==1000) {
			for (i in data.teams) {
				if (data.teams[i].id==urlId("id")) {
					//写入赛事
					leagueFn(data.teams[i].leagueid);
					//写入参数
					$(".name").val(data.teams[i].name);
					$(".code").val(data.teams[i].code);
					//图片
					if (data.teams[i].logourl!=undefined&&data.teams[i].logourl!="") {
						$(".showLogo img").attr("src",data.teams[i].logourl);
					}
					//场馆
					if (data.teams[i].stadium!=undefined&&data.teams[i].stadium!="") {
						$(".stadium img").attr("src",data.teams[i].stadium);
					}
				}
			}
		}else if(data.resultcode==998){
			//未登录
			window.parent.alertFn('登录失效，请重新登录');
            window.parent.returnLogin();
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
    if ($(".name").val()==""||$(".code").val()=="") {
    	window.parent.alertFn("球队名称或编码为空");
    } else{
	    $.ajax({
	        url:"../../v1/manager/team/update",
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
				}  else{
	        		window.parent.alertFn(data.msg);
	        	}
	        },
	        error:function () {
	        	console.log("请求错误");
	        }
	    })
	}
})