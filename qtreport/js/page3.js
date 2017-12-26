var first={
    chart: {
        backgroundColor: '#f4f2f0',
        margin:0,
        type:'bar',
        marginLeft:60
    },
    title: {
        text: ''
    },
    legend:{
        squareSymbol: true,
        layout:"vertical",
        verticalAlign:'middle',
        align:'left',
        symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
        padding:0,
        itemStyle:{
            'color':'#252525',
            'fontWeight':'normal',
            'fontSize':'9px'
        }
    },
    tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth:0,
            dataLabels: {
                enabled: true,
                distance:-20,
                style:{
                    fontWeight:'normal',
                    fontSize:'8px',
                    textOutline: "0px 0px contrast",
                    lineHeight:'10px'
                },
                format:"{point.percentage:.1f}%<br>({y})"
            },
            showInLegend: true,
            animation:false
        }
    },
    series: [{
        type: 'pie',
        name: '射门',
        data: [
            ['射进',   45.0],
            ['射失',   26.8]
        ]
    }],
    colors:['#000','#fcc800'],
    credits:{
        enabled:false
    }
}
var two={
    chart: {
        backgroundColor: '#f4f2f0',
        margin:0,
        type:'bar',
        marginLeft:60
    },
    title: {
        text: ''
    },
    legend:{
        squareSymbol: true,
        layout:"vertical",
        verticalAlign:'middle',
        align:'left',
        symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
        padding:0,
        itemStyle:{
            'color':'#252525',
            'fontWeight':'normal',
            'fontSize':'9px'
        }
    },
    tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth:0,
            dataLabels: {
                enabled: true,
                distance:-20,
                style:{
                    fontWeight:'normal',
                    fontSize:'8px',
                    textOutline: "0px 0px contrast",
                    lineHeight:'10px'
                },
                format:"{point.percentage:.1f}%<br>({y})"
            },
            showInLegend: true,
            animation:false
        }
    },
    series: [{
        type: 'pie',
        name: '进攻',
        data: [
            ['射正',   45.0],
            ['射偏',       26.8],
            ['射门被封堵',       26.8]
        ]
    }],
    colors:['#000','#6d6d6d','#fcc800'],
    credits:{
        enabled:false
    }
}

var three={
    chart: {
        backgroundColor: '#f4f2f0',
        margin:0,
        type:'bar',
        marginLeft:60
    },
    title: {
        text: ''
    },
    legend:{
        squareSymbol: true,
        layout:"vertical",
        verticalAlign:'middle',
        align:'left',
        symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
        padding:0,
        itemStyle:{
            'color':'#252525',
            'fontWeight':'normal',
            'fontSize':'9px'
        }
    },
    tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth:0,
            dataLabels: {
                enabled: true,
                distance:-20,
                style:{
                    fontWeight:'normal',
                    fontSize:'8px',
                    textOutline: "0px 0px contrast",
                    lineHeight:'10px'
                },
                format:"{point.percentage:.1f}%<br>({y})"
            },
            showInLegend: true,
            animation:false
        }
    },
    series: [{
        type: 'pie',
        name: '进攻',
        data: [
            ['禁区内(不含定)',   45.0],
            ['禁区外(不含定)',       26.8],
            ['定位球',       26.8]
        ]
    }],

    colors:['#000','#6d6d6d','#fcc800'],
    credits:{
        enabled:false
    }
}

var four={
    chart: {
        backgroundColor: '#f4f2f0',
        margin:0,
        type:'bar',
        marginLeft:60
    },
    title: {
        text: ''
    },
    legend:{
        squareSymbol: true,
        layout:"vertical",
        verticalAlign:'middle',
        align:'left',
        symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
        padding:0,
        itemStyle:{
            'color':'#252525',
            'fontWeight':'normal',
            'fontSize':'9px'
        }
    },
    tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth:0,
            dataLabels: {
                enabled: true,
                distance:-18,
                style:{
                    fontWeight:'normal',
                    fontSize:'8px',
                    textOutline: "0px 0px contrast",
                    lineHeight:'10px'
                },
                format:"{point.percentage:.1f}%<br>({y})"
            },
            showInLegend: true,
            animation:false
        }
    },
    series: [{
        type: 'pie',
        name: '进攻',
        data: [
            ['左脚',   45.0],
            ['右脚',       26.8],
            ['头球',       26.8],
            ['其他',       26.8]
        ]
    }],
    colors:['#000','#6d6d6d','#ccc','#fcc800'],
    credits:{
        enabled:false
    }
}
var six={
    chart: {
        backgroundColor: '#f4f2f0',
        margin:0,
        type:'bar',
        marginLeft:60
    },
    title: {
        text: ''
    },
    legend:{
        squareSymbol: true,
        layout:"vertical",
        verticalAlign:'middle',
        align:'left',
        symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
        padding:0,
        itemStyle:{
            'color':'#252525',
            'fontWeight':'normal',
            'fontSize':'9px'
        }
    },
    tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth:0,
            dataLabels: {
                enabled: true,
                distance:-20,
                style:{
                    fontWeight:'normal',
                    fontSize:'8px',
                    textOutline: "0px 0px contrast",
                    lineHeight:'10px'
                },
                format:"{point.percentage:.1f}%<br>({y})"
            },
            showInLegend: true,
            animation:false
        }
    },
    series: [{
        type: 'pie',
        name: '进攻',
        data: [
            ['点球进球',   15.0],
            ['点球外进球',   26.8]
        ]
    }],
    colors:['#000','#fcc800'],
    credits:{
        enabled:false
    }
}
var five={
    chart: {
        type: 'column',
        backgroundColor: '#f4f2f0',
        margin:0,
        marginLeft:40,
        marginBottom:20

    },
    credits:{
        enabled:false
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['一次触球','多次触球'],
        lineWidth:0,
        // lineColor:'#f4f2f0',
        tickLength:0,
        labels:{
            padding:0,
            y:15
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        },
        labels:{
            enabled:false
        },
        gridLineWidth:0
    },
    legend: {
        squareSymbol: true,
        layout:"vertical",
        verticalAlign:'middle',
        align:'left',
        symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
        padding:0,
        itemStyle:{
            'color':'#252525',
            'fontWeight':'normal',
            'fontSize':'9px'
        }
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y;
        }
    },
    plotOptions: {
        column: {
            grouping:false,
            borderWidth:0,
            dataLabels: {
                enabled: true,
                color:'#000',
                shadow:false,
                y:7,
                style:{
                    fontSize:'10px',
                    fontWeight:'normal',
                    textOutline: "0px 0px contrast"
                },
                padding:2,
                allowOverlap:false
            },
            maxPointWidth:34,
            animation:false
        }
    },
    series: [ {
        name: '总数',
        data: [7, 5]
    },{
        name: '成功',
        data: [5, 3]
    }],
    colors:['#fcc800','#000']
}
$(function () {
    $('.first').highcharts(first);
    $('.two').highcharts(two);
    $('.three').highcharts(three);
    $('.four').highcharts(four);
    $('.five').highcharts(five);
    $('.six').highcharts(six);
});