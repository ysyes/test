var gameid = defaultGameId();
var datatype = "";
$(document).ready(function () {
    if (extractURLParam("gameId") != "") {
        gameid = extractURLParam("gameId")
    }
    datatype = getQueryString('datatype');
    //console.log("gameid = " + gameid+";datatype="+datatype);
    showData(gameid, datatype);
});
function showData(gameid, datatype) {
    var ss = $.getJSON("json/" + datatype + "/" + gameid + "/defense.json", function (data) {
        drawDefenseBarData(data);
        clickShow(data);
    })
    if (ss.status == 404) {
        $("#defense_data").html("<p style='font-size: 0.5rem;text-align: center;color: #5e5e5e; '>暂无数据</p>");
    }
}
/**
 * li点击事件
 * @param data
 */
function clickShow(data) {
    $("#defense_submit").click(function () {
        $("#defense_data").html("");
        drawDefenseBarData(data);
        $("#defense_submit").addClass("borderb");
        $("#area_submit").removeClass("borderb");
    });
    $("#area_submit").click(function () {
        $("#defense_data").html("");
        drawDefenseLineData(data);
        $("#area_submit").addClass("borderb");
        $("#defense_submit").removeClass("borderb");
    });
}
/**
 * 为条形图准备数据
 * @param data
 */
function drawDefenseBarData(data) {
    var datatype = ["抢断", "防守", "争抢球权", "空中争抢"];
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
                var hh = parseFloat(data.主场数据[datatype[i]][key].replace("%", ""));
                var aa = parseFloat(data.客场数据[datatype[i]][key].replace("%", ""));
                homedata.push(hh * -1);
                awaydata.push(aa);
                homedata1.push(hh * -1);
                awaydata1.push(aa);
            } else {
                homedata.push(parseFloat(data.主场数据[datatype[i]][key] * -1).toFixed(2));
                awaydata.push(parseFloat(data.客场数据[datatype[i]][key]).toFixed(2));
                homedata1.push(parseFloat(data.主场数据[datatype[i]][key] * -1).toFixed(2));
                awaydata1.push(parseFloat(data.客场数据[datatype[i]][key]).toFixed(2));
                /*if (checkNum(data.主场数据[datatype[i]][key])) {
                    homedata.push((data.主场数据[datatype[i]][key] * -1).toFixed(2));
                    homedata1.push((data.主场数据[datatype[i]][key] * -1).toFixed(2));
                } else if (checkNum(data.客场数据[datatype[i]][key])) {
                    awaydata.push(data.客场数据[datatype[i]][key].toFixed(2));
                    awaydata1.push(data.客场数据[datatype[i]][key].toFixed(2));
                } else {
                    homedata.push(data.主场数据[datatype[i]][key] * -1);
                    awaydata.push(data.客场数据[datatype[i]][key]);
                    homedata1.push(data.主场数据[datatype[i]][key] * -1);
                    awaydata1.push(data.客场数据[datatype[i]][key]);
                }*/
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
    var div = "<div id=" + id_str + " style='width: 100%;height: 6rem;'></div>";
    $("#defense_data").append(div);
    $("#defense_data").css("height", "25rem");
    var temp_min = Math.min.apply(null, homedata);
    var temp_max = Math.max.apply(null, awaydata);
    var max = Math.max.apply(null, [temp_min * -1, temp_max]);

    for (var i = 0; i < typename.length; i++) {
        if (typename[i].indexOf("率") > 0 ||typename[i].indexOf("%") > 0) {
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
                            if (p.name.indexOf("率") > 0 || p.name.indexOf("%") > 0 ) {
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
                            if (p.name.indexOf("率") > 0 || p.name.indexOf("%") > 0 ) {
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
/**
 * 判断数据是否为小数
 * @param c
 * @returns {boolean}
 */
function checkNum(c) {
    var r = /^[1-9]?[0-9]*\.[0-9]*$/;
    return r.test(c);
}
/**
 * 为线性图准备数据
 * @param data
 */
function drawDefenseLineData(data) {
    var datatype = ["抢断", "犯规", "30m内", "禁区", "射门"];
    var legend = [data.主场数据.球队名称, data.客场数据.球队名称];
    var typename = range;
    for (var i = 0; i < datatype.length; i++) {
        var title = datatype[i];
        var homedata = data.主场数据.得分情况[datatype[i]];
        var awaydata = data.客场数据.得分情况[datatype[i]];
        drawDefenseLine(legend, title, typename, homedata, awaydata, i);
    }
}
function drawDefenseLine(legend, title, typename, homedata, awaydata, i) {
    var id_str = "bar_" + i;
    var div = "<div id=" + id_str + " style='width: 100%;height: 6rem;'></div>";
    $("#defense_data").append(div);
    $("#defense_data").css("height", "31rem");
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById(id_str));
    var option = {
        title: {
            text: title
        },
        legend: {
            data: legend
        },
        //calculable : true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: typename
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: legend[0],
                type: 'line',
                data: homedata,
                itemStyle: {
                    normal: {
                        label: {show: true, position: 'top'}
                    }
                }
            },
            {
                name: legend[1],
                type: 'line',
                data: awaydata,
                itemStyle: {
                    normal: {
                        label: {show: true, position: 'bottom'}
                    }
                }
            }
        ]
    };
    myChart.setOption(option);// 为echarts对象加载数据
}
