var gameid = defaultGameId();
var datatype = "";
$(document).ready(function () {
    if (extractURLParam("gameId") != "") {
        gameid = extractURLParam("gameId")
    }
    datatype = getQueryString('datatype');
    console.log("gameid = " + gameid + ";datatype=" + datatype);
    showData(gameid, datatype);
});
function showData(gameid, datatype) {
    var ss = $.getJSON("json/" + datatype + "/" + gameid + "/crosses.json", function (data) {
        var datatype = ["传中", "从右边线", "从左边线", "定位球"];
        drawDefenseBarData(data, datatype);
        clickShow(data);
    })
    if (ss.status == 404) {
        $("#crosses_data").html("<p style='font-size: 0.5rem;text-align: center;color: #5e5e5e; '>暂无数据</p>");
    }
}
/**
 * li点击事件
 * @param data
 */
function clickShow(data) {
    $("#crosses_submit").click(function () {
        $("#crosses_data").html("");
        var datatype = ["传中", "从右边线", "从左边线", "定位球"];
        drawDefenseBarData(data, datatype);
        $("#crosses_submit").addClass("borderb");
        $("#break_submit").removeClass("borderb");
    });
    $("#break_submit").click(function () {
        $("#crosses_data").html("");
        var datatype = ["突破", "左边线", "中央", "右边线"];
        drawDefenseBarData(data, datatype);
        $("#break_submit").addClass("borderb");
        $("#crosses_submit").removeClass("borderb");
    });
}
/**
 * 为条形图准备数据
 * @param data
 */
function drawDefenseBarData(data, datatype) {
    //var datatype = ["传中", "从右边线","从左边线","定位球"];
    for (var i = 0; i < datatype.length; i++) {
        var title = datatype[i];
        var typename = [];//data.主场数据[datatype];
        var homedata = [];
        var awaydata = [];
        var homedata1 = [];
        var awaydata1 = [];
        var legend = [data.主场数据.球队名称, data.客场数据.球队名称];
        for (var key in data.主场数据[datatype[i]]) {
            typename.push(key);
            if ((key.indexOf("率") > 0 || key.indexOf("%") > 0) && isNaN(data.主场数据[datatype[i]][key])) {
                var hh = parseFloat(data.主场数据[datatype[i]][key].replace("%","")).toFixed(2);
                var aa = parseFloat(data.客场数据[datatype[i]][key].replace("%","")).toFixed(2);
                homedata.push(hh * -1);
                awaydata.push(aa);
                homedata1.push(hh * -1);
                awaydata1.push(aa);
            } else {
                var hh = parseFloat(data.主场数据[datatype[i]][key]).toFixed(2);
                var aa = parseFloat(data.客场数据[datatype[i]][key]).toFixed(2);
                homedata.push(hh * -1);
                awaydata.push(aa);
                homedata1.push(hh * -1);
                awaydata1.push(aa);
            }
        }
        typename = typename.reverse();
        homedata = homedata.reverse();
        awaydata = awaydata.reverse();
        homedata1 = homedata1.reverse();
        awaydata1 = awaydata1.reverse();
        drawDefenseBar(legend, title, typename, homedata, awaydata, homedata1, awaydata1, i);
    }
}
/**
 * 画条形图
 * @param title
 * @param homedata
 * @param awaydata
 * @param i
 */
function drawDefenseBar(legend, title, typename, homedata, awaydata, homedata1, awaydata1, i) {
    var id_str = "bar_" + i;
    var div = "<div id=" + id_str + " style='width: 100%;height: 5rem;'></div>";
    $("#crosses_data").append(div);
    var temp_min = Math.min.apply(null, homedata);
    var temp_max = Math.max.apply(null, awaydata);
    var max = Math.max.apply(null, [temp_min * -1, temp_max]);

    for (var i = 0; i < typename.length; i++) {
        if (typename[i].indexOf("率") > 0||typename[i].indexOf("%") > 0) {
            homedata[i] *= max / 100;
            awaydata[i] *= max / 100;
        }
    }
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById(id_str));
    var option = {
        title: {
            text: title
        },
        legend: {
            left: "40%",
            data: legend
        },
        grid: {
            left: '0.5%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                /*splitLine:{show:false},*/
                axisLine: {show: false},
                axisLabel: {show: false},
                axisTick: {show: false},
                max: max + max * 0.3,
                min: (max + max * 0.3) * -1
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                axisLabel: {
                    interval: 0,
                    margin: 15,
                    /*rotate:20,*/
                    formatter: function (str) {
                        return insertEnter(str, 6);
                    }
                },
                data: typename
            }
        ],
        series: [
            {
                name: legend[0],
                type: 'bar',
                stack: '总量',
                barWidth: 12,
                label: {
                    normal: {
                        show: true, position: 'left',
                        formatter: function (p) {
                            if (p.name.indexOf("率") > 0 ||p.name.indexOf("%") > 0) {
                                return homedata1[p.dataIndex] * -1 + "%";
                            } else {
                                return homedata1[p.dataIndex] * -1;
                            }
                        }
                    }
                },
                data: homedata
            },
            {
                name: legend[1],
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: function (p) {
                            if (p.name.indexOf("率") > 0 ||p.name.indexOf("%") > 0) {
                                return awaydata1[p.dataIndex] + "%";
                            }
                        }
                    }
                },
                data: awaydata
            }
        ]
    };
    myChart.setOption(option);// 为echarts对象加载数据
}
