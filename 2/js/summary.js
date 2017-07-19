var datatype = "";
var gameid = defaultGameId();
$(document).ready(function () {
    if (extractURLParam("gameId") != "") {
        gameid = extractURLParam("gameId")
    }
    datatype = getQueryString("datatype");
    //console.log("gameid = " + gameid+";datatype="+datatype);
    showData(gameid, datatype);
});

function showData(gameid, datatype) {
    var ss = $.getJSON("json/" + datatype + "/" + gameid + "/summary.json", function (data) {
        if (data) {
            clickShow(data);
            drawSummaryBar(data);
        }
    })
    if (ss.status == 404) {
        $("#data_div").html("<p style='font-size: 0.5rem;text-align: center;color: #5e5e5e; '>暂无数据</p>");
    }

}
var tip = ["shot", "control", "pass", "cross", "steal"];
var models1 = ["射门", "控球率", "传球", "传中", "抢断"];
var models2 = ["射正", "禁区", "传球成功率", "传中成功率", "犯规"];
var models3 = ["射正比率", "30米内", "直塞球", "突破", "黄", "红"];
var bar_laber = ["射门", "禁区", "进攻30码"];
var bar_laber1 = ["对方禁区内的技术统计(射门，传球，传中，过人等数据)",
    "", "对方30米内的技术统计"];

function clickShow(data) {
    $("#data_submit").click(function () {
        $("#data_div").html("");
        drawSummaryBar(data);
        $("#data_submit").addClass("borderb");
        $("#control_submit").removeClass("borderb");
        $("#other_submit").removeClass("borderb");
        //drawTable(data);
        //drawData(data);
    });
    $("#control_submit").click(function () {
        $("#data_div").html("");
        $("#data_submit").removeClass("borderb");
        $("#control_submit").addClass("borderb");
        $("#other_submit").removeClass("borderb");
        drawControl(data);
    });
    $("#other_submit").click(function () {
        $("#data_div").html("");
        $("#data_submit").removeClass("borderb");
        $("#control_submit").removeClass("borderb");
        $("#other_submit").addClass("borderb");
        for (var i = 0; i < bar_laber.length; i++) {
            drawOther(data, bar_laber[i], i);
        }
    });
}
function drawSummaryBar(data) {
    var ydata = ["黄", "红", "犯规", "抢断", "突破", "直塞球", "传中", "禁区", "射正", "射门"];
    var xdata1 = [];
    var xdata2 = [];
    for (var i = 0; i < ydata.length; i++) {
        xdata1.push((data.主场球队[ydata[i]] * -1).toFixed(0));
        xdata2.push(data.客场球队[ydata[i]].toFixed(0));
    }
    var temp_min = Math.min.apply(null, xdata1);
    var temp_max = Math.max.apply(null, xdata2);
    var max = Math.max.apply(null, [temp_min * -1, temp_max]);

    $("#data_div").css("height", "7rem");

    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById('data_div'));
    var option = {
        legend: {
            data: [data.主场球队.球队名称, data.客场球队.球队名称]
        },
        grid: {
            left: '0.5%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {show: false},
                max: max + max * 0.3,
                min: (max + max * 0.3) * -1
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: ydata
            }
        ],
        series: [
            {
                name: data.主场球队.球队名称,
                type: 'bar',
                stack: '总量',
                barWidth: 12,
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        formatter: function (params, b, c) {
                            //console.log(params);
                            return params.value * -1.0;
                        }
                    }
                },
                data: xdata1
            },
            {
                name: data.客场球队.球队名称,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                },
                data: xdata2
            }
        ]
    };
    myChart.setOption(option);// 为echarts对象加载数据
    //window.onresize = myChart.resize;

}
/**
 * 区分比率和数字
 * @param data
 * @returns {*}
 */
function check(data) {
    if (!isNaN(data)) {
        if (data > 100) {
            return 27 / 100 * data;
        } else {
            return 27 / 10 * data;
        }
    } else {
        return 27 / 10 * parseInt(data.replace("%", ""));
    }
}
/**
 * 控球率显示
 * @param data
 */
function drawControl(data) {
    $("#data_div").css("height", "7rem");
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById('data_div'));
    var data1 = data.主场球队.得分情况.控球率;
    var data1_new = [];
    var data2 = data.客场球队.得分情况.控球率;
    var data2_new = [];
    for(var i = 0; i < data1.length; i++){
        data1_new.push(parseFloat(data1[i]).toFixed(2));
        data2_new.push(parseFloat(data2[i]).toFixed(2));
    }
    var option = {
        title: {
            text: '控球率',
        },
        legend: {
            data: [data.主场球队.球队名称, data.客场球队.球队名称]
        },
        //calculable : true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: data_range//data.主场球队.得分情况.分数范围
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: data.主场球队.球队名称,
                type: 'line',
                data: data1_new,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, position: 'top'
                        }
                    }
                }
            },
            {
                name: data.客场球队.球队名称,
                type: 'line',
                data: data2_new,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, position: 'bottom'
                        }
                    }
                }
            }
        ]
    };
    // 为echarts对象加载数据
    myChart.setOption(option);
}
/**
 * 射门，禁区和球门30m显示
 * @param data
 */
function drawOther(data, title, i) {
    var id_str = "bar_" + i;
    var div = "<div id=" + id_str + " style='width: 100%;height: 6rem;'></div>";
    $("#data_div").append(div);
    $("#data_div").css("height", "18rem");
    /*$("#data_div").css("height","18rem");*/
    var homedata = data.主场球队.得分情况[title];
    var awaydata = data.客场球队.得分情况[title];
    var temp_max1 = Math.max.apply(null, homedata);
    var temp_max2 = Math.max.apply(null, awaydata);
    var max = Math.max.apply(null, [temp_max1, temp_max2]);

    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById(id_str));
    var option = {
        title: {
            text: title,
        },
        legend: {
            data: [data.主场球队.球队名称, data.客场球队.球队名称]
        },
        //calculable : true,
        xAxis: [
            {
                type: 'category',
                data: data_range//data.主场球队.得分情况.分数范围
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: max + max * 0.3
            }
        ],
        series: [
            {
                name: data.主场球队.球队名称,
                type: 'bar',
                data: homedata,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
            },
            {
                name: data.客场球队.球队名称,
                type: 'bar',
                data: awaydata,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
            }
        ]
    };
    // 为echarts对象加载数据
    myChart.setOption(option);

}