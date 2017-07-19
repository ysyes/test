//nav用swiper添加滑动效果
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5.5,
    paginationClickable: true,
    freeMode: true
});

//获取URL的?后面的内容并分割成数组
var url = window.location.search.slice(1)
if (url) {
	team(url);
}else{
	//数据初始化China
	team("China");
}

var teamArr = ["China","Iran","Korea","Japan","Thai","China","Iran","Korea","Japan","Thai"]
//点击切换国家队名并加载本国数据
$(".swiper-slide").click(function () {
	console.log(this.innerText);
	$(".team").html(this.innerText + "队球员列表");
	var idx = $(".swiper-slide").index(this);
	console.log(idx);
	//加载本国的数据
	team(teamArr[idx])
})


//获取国家数据的函数
function team(teams) {
	//请求本地JSON数据
	$.getJSON("json/" + teams + ".json",function (data) {
		$("#main ul").html("");
		//获取改变banner
		$(".banner img")[0].src = data.teamImg;
		
		//获取门将信息，创建列表
		var menjiang = data.menjiang;
		for (var i in menjiang) {
			var li = '<li><a href="goalkeeper.html?' + teams + '&menjiang&' + i
			+ '"><div class="headimg"><img src="' + menjiang[i].intro.headImg
			+ '"/></div><span>' + menjiang[i].intro.name + '</span></a></li>';
			$("#menJiang").append(li);
		}
		
		//获取前锋信息，创建列表
		var qianfeng = data.qianfeng;
		for (var i in qianfeng) {
			var li = '<li><a href="player.html?' + teams + '&qianfeng&' + i
			+ '"><div class="headimg"><img src="' + qianfeng[i].intro.headImg
			+ '"/></div><span>' + qianfeng[i].intro.name + '</span></a></li>';
			$("#qianFeng").append(li);
		}
		
		//获取中场信息，创建列表
		var qianwei = data.qianwei;
		for (var i in qianwei) {
			var li = '<li><a href="player.html?' + teams + '&qianwei&' + i
			+ '"><div class="headimg"><img src="' + qianwei[i].intro.headImg
			+ '"/></div><span>' + qianwei[i].intro.name + '</span></a></li>';
			$("#zhongChang").append(li);
		}
		
		//获取后卫信息，创建列表
		var houwei = data.houwei;
		for (var i in houwei) {
			var li = '<li><a href="player.html?' + teams + '&houwei&' + i
			+ '"><div class="headimg"><img src="' + houwei[i].intro.headImg
			+ '"/></div><span>' + houwei[i].intro.name + '</span></a></li>';
			$("#houWei").append(li);
		}
	})
	
}
