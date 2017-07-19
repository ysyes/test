//上传图片预览
function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById('image').src = evt.target.result;
		image = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}
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
teamWrite();
//编辑写入
function teamWrite() {
	//编辑数据写入
	$("#teamName").val(urlId("name"));
	$("#teamCode").val(urlId("code"));
	$("#teamtype").val(urlId("type"));
	$("#sex").val(urlId("sex"));
	if(urlId('logo')=='undefined'){
		$(".showLogo img").prop("src","../../img/teamlogo.png");
	}else{
		$(".showLogo img").prop("src",urlId("logo"));
	}
	//洲
	var continentTime= setInterval(function () {
		$("#continent").val(urlId("continent"));
		if ($("#continent option:checked").val() == urlId("continent")) {
			continentFn();
			clearInterval(continentTime);
		}
	},10)
	//国家
	var countryTime= setInterval(function () {
		$("#country").val(urlId("country"));
		if ($("#country option:checked").val() == urlId("country")) {
			countryFn();
			clearInterval(countryTime);
		}
	},100)
	//省市
	if (urlId("area")!=""&&urlId("area")!=undefined&&urlId("area")!='undefined') {
		var cityTime= setInterval(function () {
			console.log(urlId("area"));
			$("#city").val(urlId("area"));
			if ($("#city option:checked").val() == urlId("area")) {
				clearInterval(cityTime);
			}
		},200)
	}
}
//提交数据请求
function teamAjax() {
	var formData=new FormData();
    formData.append('name',$("#teamName").val());
    formData.append('code',$("#teamCode").val());
    formData.append('continent',$("#continent option:checked").val());
    formData.append('country',$("#country option:checked").val());
    formData.append('area',$("#city option:checked").val()||"");
    formData.append('type',$("#teamtype option:checked").val());
    formData.append('sex',$("#sex option:checked").val());
    formData.append('id',urlId("teamid"));
    //logo上传
    formData.append('logo',$(".logoUpload input")[0].files[0]||"");
    $.ajax({
        url:"../../v1/manager/team/edit",
        type:"post",
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
        	if (data.resultcode==1000) {
				window.parent.alertFn("编辑成功");
        		window.location.href="team.html";
        	}else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}  else{
        		window.parent.alertFn(data.msg);
        	}
        }
    })
}
//点击提交数据
$(".button .submit").click(function () {
	teamAjax();	
})