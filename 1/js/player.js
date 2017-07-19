//获取URL的?后面的内容并分割成数组
var urlArr = window.location.search.slice(1).split("&");
console.log(urlArr)//china&menjiang&wulei1

//判断如果不为空，获取JSON数据
if (urlArr[0]) {
	
$.getJSON("json/" + urlArr[0] + ".json",function (data) {
	//获取球员的intro并写入
	var intro = data[urlArr[1]][urlArr[2]].intro;
	console.log(intro.name);
	$(".header a").attr("href","index.html?" + urlArr[0]);
	$(".header span").html(intro.name + "个人数据");
	$(".personal img").attr("src",intro.headImg);
	$(".personal_right h2").html(intro.name);
	var personal_main = "<ul><li>位置 : " + intro.weizhi + "</li><li>身高 : " + 
	intro.height + "cm</li><li>国籍 : " + intro.nationality + "</li><li>俱乐部 : " + 
	intro.club + "</li></ul><ul><li>年龄 : " + intro.year + "岁</li><li>体重 : " + 
	intro.weight + "kg</li></ul>";
	$(".personal_main").html(personal_main);
	$(".times span").html(intro.time);
	
	//获取球员的进攻数据并写入
	var jingong = data[urlArr[1]][urlArr[2]].jingong;
	var jg_lef = '<li>进球 ： ' + jingong.jinqiu + '球</li><li class="bac_gray">射门 ： ' + jingong.shemen + '脚</li><li> 射正 ： ' + jingong.shezheng + '脚</li><li class="bac_gray">助攻 ： ' + jingong.zhugong + '次</li>'
	var jg_rig = '<li>威胁球 ： ' + jingong.weixie + '球</li><li class="bac_gray">传球数 ： ' + jingong.chuanqiu + '次</li><li>突破数 ： ' + jingong.tupo + '次</li>	<li class="bac_gray">被侵犯 ： ' + jingong.beiqinfan + '次</li>';
	$(".jg_lef").html(jg_lef);
	$(".jg_rig").html(jg_rig);
	
	//获取球员的防守数据并写入
	var fangshou = data[urlArr[1]][urlArr[2]].fangshou;
	var fs_lef = '<li>抢断 ： ' + fangshou.qiangduan + '次</li>	<li class="bac_gray">解围 ： ' + fangshou.jiewei + '次</li>	<li>封堵 ： ' + fangshou.fengdu + '次</li><li class="bac_gray">拦截 ： ' + fangshou.lanjie + '次</li>';
	var fs_rig = '<li>犯规 ： ' + fangshou.fangui + '次</li><li class="bac_gray">黄牌 ： ' + fangshou.huangpai + '张</li><li>红牌 ： ' + fangshou.hongpai + '张</li><li class="bac_gray">空中球抢断 ： ' + fangshou.kongzhong + '次</li>';
	$(".fs_lef").html(fs_lef);
	$(".fs_rig").html(fs_rig);
})
}