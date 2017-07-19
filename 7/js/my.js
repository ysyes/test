var myChart0 = echarts.init(document.getElementById('item1'));
option = {
   
    tooltip: {
        trigger: 'axis'
    },
    legend: {
    	bottom:"3%",
        data:['青少年球员']
    },
    grid: {
        left: '1%',
        right: '1%',
        bottom: '10%',
        containLabel: true
    },
    toolbox: {
    	show:false,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
          type : 'category',
            boundaryGap : false,
            axisLine: {onZero: false},
            data : ['2008','2009','2010','2011','2012','2013','2014','2015','2016']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'青少年球员',
            type:'line',
           // stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210,210,210]
        }

    ]
};
myChart0.setOption(option);


//------------------------------------

// 基于准备好的dom，初始化echarts实例

// 指定图表的配置项和数据
var myChart1 = echarts.init(document.getElementById('chinamap'));
var constCount = '球员数量，教练数量';
function randomData() {
    return Math.round(Math.random()*1000);
}
function randomData1() {
    return Math.round(Math.random()*200);
}

option = {
    title: {
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
 	legend: {
        orient: 'vertical',
        left: 'left',
        top:"5%",
        data:['球员数量','教练数量']
    },
    visualMap: {
        min: 0,
        max: 2000,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],           // 文本，默认为数值文本
        calculable: true
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '球员数量',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {name: '北京',value: (randomData()) },
                {name: '天津',value: (randomData()) },
                {name: '上海',value: (randomData()) },
                {name: '重庆',value: (randomData()) },
                {name: '河北',value: (randomData()) },
                {name: '河南',value: (randomData()) },
                {name: '云南',value: (randomData()) },
                {name: '辽宁',value: (randomData()) },
                {name: '黑龙江',value: (randomData()) },
                {name: '湖南',value: (randomData()) },
                {name: '安徽',value: (randomData()) },
                {name: '山东',value: (randomData()) },
                {name: '新疆',value: (randomData()) },
                {name: '江苏',value: (randomData()) },
                {name: '浙江',value: (randomData()) },
                {name: '江西',value: (randomData()) },
                {name: '湖北',value: (randomData()) },
                {name: '广西',value: (randomData()) },
                {name: '甘肃',value: (randomData()) },
                {name: '山西',value: (randomData()) },
                {name: '内蒙古',value: (randomData()) },
                {name: '陕西',value: (randomData()) },
                {name: '吉林',value: (randomData()) },
                {name: '福建',value: (randomData()) },
                {name: '贵州',value: (randomData()) },
                {name: '广东',value: (randomData()) },
                {name: '青海',value: (randomData()) },
                {name: '西藏',value: (randomData()) },
                {name: '四川',value: (randomData()) },
                {name: '宁夏',value: (randomData()) },
                {name: '海南',value: (randomData()) },
                {name: '台湾',value: (randomData()) },
                {name: '香港',value: (randomData()) },
                {name: '澳门',value: (randomData()) }
            ]
        }
    	 ,
        {
            name: '教练数量',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {name: '北京',value: (randomData1()) },
                {name: '天津',value: (randomData1()) },
                {name: '上海',value: (randomData1()) },
                {name: '重庆',value: (randomData1()) },
                {name: '河北',value: (randomData1()) },
                {name: '河南',value: (randomData1()) },
                {name: '云南',value: (randomData1()) },
                {name: '辽宁',value: (randomData1()) },
                {name: '黑龙江',value: (randomData1()) },
                {name: '湖南',value: (randomData1()) },
                {name: '安徽',value: (randomData1()) },
                {name: '山东',value: (randomData1()) },
                {name: '新疆',value: (randomData1()) },
                {name: '江苏',value: (randomData1()) },
                {name: '浙江',value: (randomData1()) },
                {name: '江西',value: (randomData1()) },
                {name: '湖北',value: (randomData1()) },
                {name: '广西',value: (randomData1()) },
                {name: '甘肃',value: (randomData1()) },
                {name: '山西',value: (randomData1()) },
                {name: '内蒙古',value: (randomData1()) },
                {name: '陕西',value: (randomData1()) },
                {name: '吉林',value: (randomData1()) },
                {name: '福建',value: (randomData1()) },
                {name: '贵州',value: (randomData1()) },
                {name: '广东',value: (randomData1()) },
                {name: '青海',value: (randomData1()) },
                {name: '西藏',value: (randomData1()) },
                {name: '四川',value: (randomData1()) },
                {name: '宁夏',value: (randomData1()) },
                {name: '海南',value: (randomData1()) },
                {name: '台湾',value: (randomData1()) },
                {name: '香港',value: (randomData1()) },
                {name: '澳门',value: (randomData1()) }
            ]
        } 
    ]
};
myChart1.setOption(option);




/*年龄柱状图*/
var myChartold = echarts.init(document.getElementById('item-old'));
option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['总数', '海外受训','国字号经历','其他']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['12岁','13岁','14岁','15岁','16岁-17岁','18岁-19岁','20岁-21岁']
    },
    series: [
        {
            name: '总数',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220,267,320, 302, 301, 334,310 ]
        },
        {
            name: '海外受训',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [90,100,120, 132, 101, 134,150]
        },
        {
            name: '国字号经历',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220,200,160, 182, 191, 234,260]
        },
        {
            name: '其他',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [100,120,150, 212,100, 201, 154]
        }
     
    ]
};
myChartold.setOption(option);
//人员
var myChartple = echarts.init(document.getElementById('itemple'));
option = {
	title: {
        text:'青少年年龄比例',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['12岁','13岁','14岁','15岁','16岁-17岁','18岁-19岁','20岁-21岁']
    },
    series: [
        {
            name:'青少年年龄比例',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
            	{value:135, name:'12岁'},
            	{value:135, name:'13岁'},
            	{value:135, name:'14岁'},
            	{value:135, name:'15岁'},
                {value:335, name:'16岁-17岁'},
                {value:310, name:'18岁-19岁'},
                {value:234, name:'20岁-21岁'}
            ]
        }
    ]
};

myChartple.setOption(option);