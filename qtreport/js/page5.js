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
                distance:-15,
                style:{
                    fontWeight:'normal',
                    fontSize:'7px',
                    textOutline: "0px 0px contrast",
                    lineHeight:'7px'
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
            ['传中',   15],
            ['直塞',       16],
            ['角球',       16],
            ['任意球',    8],
            ['界外球',     6],
            ['其他',   5]
        ]
    }],
    colors:['#000','#6d6d6d','#ccc','#d88c11','#ebd2a6','#fcc800'],
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
                distance:-15,
                style:{
                    fontWeight:'normal',
                    fontSize:'7px',
                    textOutline: "0px 0px contrast",
                    lineHeight:'7px'
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
            ['传中',   45.0],
            ['直塞',       26.8],
            ['角球',       26.8],
            ['任意球',    8.5],
            ['界外球',     6.2],
            ['其他',   0.7]
        ]
    }],
    colors:['#000','#6d6d6d','#ccc','#d88c11','#ebd2a6','#fcc800'],
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
            ['失败',   45.0],
            ['成功',       26.8]
        ]
    }],
    colors:['#000','#fcc800'],
    credits:{
        enabled:false
    }
}

var five={
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
            ['突破成功',   45.0],
            ['突破失败',       26.8]
        ]
    }],
    colors:['#000','#fcc800'],
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
            ['直塞成功',   15.0],
            ['直塞失败',   26.8]
        ]
    }],
    colors:['#000','#fcc800'],
    credits:{
        enabled:false
    }
}
var four={
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
        categories: ['左脚传中','右脚传中'],
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
                    textOutline:'none'
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