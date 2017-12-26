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
            showInLegend: true
        }
    },
    series: [{
        type: 'pie',
        name: '传球',
        data: [
            ['传球成功',   6],
            ['传球失败',   4]
        ]
    }],
    colors:['#000','#fcc800'],
    credits:{
        enabled:false
    }
}
var two={
    title: {
        text: ''
    },
    chart:{
        backgroundColor: '#f4f2f0',
        margin:0,
        zoomType:'xy',
        marginBottom:20
    },
    xAxis: {
        categories: ['向前传球', '横向传球', '向后传球'],
        lineWidth:0,
        tickLength:0,
        crosshair:true,
        labels:{
            padding:0,
            y:15,
            style:{
                textOverflow:'none',
                fontSize:'10px'
            }
        }
    },
    yAxis: [{
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
    },{
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
        gridLineWidth:0,
        opposite:true
    }],
    legend:{
        enabled:false
    },
    plotOptions: {
    },
    series: [{
        type: 'column',
        data: [100, 60, 40],
        borderWidth:0,
        dataLabels:{
            enabled:true,
            inside:true,
            style:{
                fontWeight:'normal',
                textOutline:'{0 0px #fff}',
                fontSize:'10px',
                color:'#000'
            },
            verticalAlign:'bottom'
        },
        yAxis:1,
        color:'#fcc800',
        maxPointWidth:30
    },{
        type: 'line',
        data: [50, 30, 20],
        dataLabels:{
            enabled:true,
            format:"{y}%",
            color:'#000',
            style:{
                fontWeight:'normal',
                textOutline:'{0 0px #fff}',
                fontSize:'10px'
            },
            y:6
        },
        marker: {
            radius:0
        },
        color:'#000'
    }],
    credits:{
        enabled:false
    }
}

var three={
    title: {
        text: ''
    },
    chart:{
        backgroundColor: '#f4f2f0',
        margin:0,
        zoomType:'xy',
        marginBottom:20
    },
    xAxis: {
        categories: ['向前传球', '横向传球', '向后传球'],
        lineWidth:0,
        tickLength:0,
        crosshair:true,
        labels:{
            padding:0,
            y:15,
            style:{
                textOverflow:'none',
                fontSize:'10px'
            }
        }
    },
    yAxis: [{
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
    },{
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
        gridLineWidth:0,
        opposite:true
    }],
    legend:{
        enabled:false
    },
    plotOptions: {
    },
    series: [{
        type: 'column',
        data: [100, 60, 40],
        borderWidth:0,
        dataLabels:{
            enabled:true,
            inside:true,
            style:{
                fontWeight:'normal',
                textOutline:'{0 0px #fff}',
                fontSize:'10px',
                color:'#000'
            },
            verticalAlign:'bottom'
        },
        yAxis:1,
        color:'#fcc800',
        maxPointWidth:30
    },{
        type: 'line',
        data: [50, 30, 20],
        dataLabels:{
            enabled:true,
            format:"{y}%",
            color:'#000',
            style:{
                fontWeight:'normal',
                textOutline:'{0 0px #fff}',
                fontSize:'10px'
            },
            y:6,
        },
        marker: {
            radius:0
        },
        color:'#000'
    }],
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
            showInLegend: true
        }
    },
    series: [{
        type: 'pie',
        name: '进攻',
        data: [
            ['一次触球传球',   45.0],
            ['多次触球传球',   26.8]
        ]
    }],
    colors:['#000','#fcc800'],
    credits:{
        enabled:false
    }
}
var six={
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
        categories: ['传球/向进攻三区传球','向进攻三区传球/成功'],
        lineWidth:0,
        // lineColor:'#f4f2f0',
        tickLength:0,
        labels:{
            padding:0,
            y:15,
            style:{
                textOverflow:'none',
                fontSize:'10px'
            }
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
            maxPointWidth:34
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
        categories: ['传球/在进攻三区传球','在进攻三区传球/成功'],
        lineWidth:0,
        // lineColor:'#f4f2f0',
        tickLength:0,
        labels:{
            padding:0,
            y:15,
            style:{
                textOverflow:'none',
                fontSize:'10px'
            }
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
            maxPointWidth:34
        }
    },
    series: [ {
        name: '总数',
        data: [24, 15]
    },{
        name: '成功',
        data: [9, 6]
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