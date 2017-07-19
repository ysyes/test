option = {
    tooltip: {},
    legend: {
    	left:"80%",
        data: ['张小白', '吴天纱']
    },
    radar: {
        // shape: 'circle',
        indicator: [
           { name: '射门', max: 20},
           { name: '射正率', max: 100},
           { name: '射正', max: 20},
           { name: '传球', max: 50},
           { name: '传球成功', max: 50},
           { name: '成功率', max: 100},
            { name: '威胁球', max: 50},
           { name: '向前传球', max: 100},
           { name: '全场传球', max: 100},
           { name: '传中', max: 100},
           { name: '控球率', max: 100},
           { name: '拦截', max: 50},
           { name: '抢断', max: 50},
           { name: '解围', max: 50},
           { name: '封堵', max: 50},
           { name: '补救', max: 50},
           { name: '跑动距离', max: 25000}
         
        
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [7, 80, 14, 20, 44, 34,10, 20, 35, 50, 19,43, 10, 8, 35, 10, 19000],
                name : '张小白'
            },
             {
                value : [14, 75, 8, 40, 20, 60, 5, 80, 31, 42, 21,20, 14, 2, 31,2, 21000],
                name : '吴天纱'
            }
        ]
    }]
};

var echartComparise = echarts.init(document.getElementById('echart-comparise'))
echartComparise.setOption(option)