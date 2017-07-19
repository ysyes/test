//获取URL的?后面的内容并分割成数组
var urlArr = window.location.search.slice(1).split("&");
console.log(urlArr)//china&menjiang&wulei1

//判断如果不为空，获取JSON数据
if (urlArr[0]) {
	
	$.getJSON("json/" + urlArr[0] + ".json",function (data) {
		//获取门将球员的intro并写入
		var intro = data[urlArr[1]][urlArr[2]].intro;
		console.log(intro.name);
		$(".header a").attr("href","index.html?" + urlArr[0]);
		$(".header span").html(intro.name + "个人数据");
		$(".personal img").attr("src",intro.headImg);
		$(".personal_right h2").html(intro.name);
		var personal_main = "<ul><li>位置 : 门将</li><li>身高 : " + 
		intro.height + "cm</li><li>国籍 : " + intro.nationality + "</li><li>俱乐部 : " + 
		intro.club + "</li></ul><ul><li>年龄 : " + intro.year + "岁</li><li>体重 : " + 
		intro.weight + "kg</li></ul>";
		$(".personal_main").html(personal_main);
		$(".times span").html(intro.time);
		
		//获取门将的数据data
		var data = data[urlArr[1]][urlArr[2]].data;
		var jg_lef = '<li>扑救 ： ' + data.pujiu + '次</li>	<li class="bac_gray">失球 ： ' + 
		data.shiqiu + '次</li><li> 零封 ： ' + data.lingfeng + '分钟</li><li class="bac_gray"></li>';
		var jg_rig = '<li>传球 ： ' + data.chuanqiu + '次</li><li class="bac_gray">黄牌 ： ' + data.huangpai + '张</li><li>红牌 ： ' + data.hongpai + '张</li><li class="bac_gray"></li>';
		$(".jg_lef").html(jg_lef);
		$(".jg_rig").html(jg_rig);
	})
}

