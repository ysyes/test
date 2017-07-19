//loading接收数据成功后
setTimeout(function () {
	$("#loading").hide();
	//加载第一页动画
	firstPage(true);
},2000)
//获取playercode;
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
$.ajax({
	type:"get",
	//url:"v1/tongdao/index/player/"+urlId('playercode'),
	url:"v1/tongdao/index/player/100003",
	async:true,
	success:function (data) {
		console.log(data);
		if (data.resultcode==1000) {
			//第一页数据
			var headerMain = ["birthday","age","height","weight","positions","jerseynumber","teamname"]
			$("#first header .imgLogo").css("background","url("+data.headurl+")");
			$("#first .headerMain h3").html(data.name);
			for (var i = 0 ; i < $("#first .headerMain span").length; i++) {
				$("#first .headerMain span").eq(i).html(data.headerMain[i]);
			}
		} else{
			
		}
	}
});