//第一页
$("#shezheng").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#00a0e9',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal'
});

$("#chuanqiu").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#ea68a2',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal'
});

$("#qiangduan").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#cfa972',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal'
});

//第三页
$("#thirdShemen").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#00a0e9',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal',
    unit:'分'
});

$("#thirdChuanqiu").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#ea68a2',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal',
    unit:'分'
});

$("#thirdDingwei").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#b55de0',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal',
    unit:'分'
});

$("#thirdJishu").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#22ac38',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal',
    unit:'分'
});

$("#thirdFangshou").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#cfa972',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal',
    unit:'分'
});

$("#thirdMengjiang").radialIndicator({
	radius:window.innerWidth*9.52/54,
	barColor: '#ffa800',
    barWidth: window.innerWidth*2.38/80,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:window.innerWidth/10,
    fontWeight:'normal',
    unit:'分'
});

//第四页
$("#forthAll").radialIndicator({
	radius:window.innerWidth*9.52/27,
	barColor: { 
		0: '#f37660',
        100: '#f02b45'
    },
    barWidth: window.innerWidth*2.38/54,
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'#04e4cc',
    barBgColor:'rgba(255,255,255,0.2)',
    fontSize:window.innerWidth/6.5,
    fontWeight:'normal',
    unit:'分',
    fontTop:window.innerWidth/2.2
});
//加载第一页
function firstPage(start){
	if (start) {
		$('#shezheng').data('radialIndicator').animate(63);
		$('#chuanqiu').data('radialIndicator').animate(70);
		$('#qiangduan').data('radialIndicator').animate(60);
	} else{
		$('#shezheng').data('radialIndicator').animate(0);
		$('#chuanqiu').data('radialIndicator').animate(0);
		$('#qiangduan').data('radialIndicator').animate(0);
	}
}
//加载第三页
function thirdPage(start){
	if (start) {
		$('#thirdShemen').data('radialIndicator').animate(60);
		$('#thirdChuanqiu').data('radialIndicator').animate(67);
		$('#thirdDingwei').data('radialIndicator').animate(70);
		$('#thirdJishu').data('radialIndicator').animate(59);
		$('#thirdFangshou').data('radialIndicator').animate(86);
		$('#thirdMengjiang').data('radialIndicator').animate(63);
	} else{
		$('#thirdShemen').data('radialIndicator').animate(0);
		$('#thirdChuanqiu').data('radialIndicator').animate(0);
		$('#thirdDingwei').data('radialIndicator').animate(0);
		$('#thirdJishu').data('radialIndicator').animate(0);
		$('#thirdFangshou').data('radialIndicator').animate(0);
		$('#thirdMengjiang').data('radialIndicator').animate(0);
	}
}
//加载第四页
function forthPage(start){
	if (start) {
		$('#forthAll').data('radialIndicator').animate(78);
		//$('#chuanqiu').data('radialIndicator').animate(70);
		//$('#qiangduan').data('radialIndicator').animate(60);
	} else{
		$('#forthAll').data('radialIndicator').animate(0);
		//$('#chuanqiu').data('radialIndicator').animate(0);
		//$('#qiangduan').data('radialIndicator').animate(0);
	}
}