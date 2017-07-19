var gameid = defaultGameId();
var datatype = "";
$(document).ready(function () {
    if (extractURLParam("gameId") != "") {
        gameid = extractURLParam("gameId")
    }
    datatype = getQueryString('datatype');
    //console.log("gameid = " + gameid+";datatype="+datatype);
    showData(gameid,datatype);
});
function showData(gameid,datatype) {
    var ss = $.getJSON("json/"+datatype+"/" + gameid + "/shot.json", function (data) {
        drawShotTable(data);
        clickShow(data);
        //drawData(data);
    })
    if (ss.status == 404) {
        $("#shot_data").html("<p style='font-size: 0.5rem;text-align: center;color: #5e5e5e; '>暂无数据</p>");
    }
}
/**
 * li点击事件
 * @param data
 */
function clickShow(data) {
    $("#shot_submit").click(function () {
        $("#shot_data").html("");
        drawShotTable(data);
        $("#shot_submit").addClass("borderb");
        $("#field_submit").removeClass("borderb");
    });
    $("#field_submit").click(function () {
        $("#shot_data").html("");
        drawShotField(data.主场数据);
        drawShotField(data.客场数据);
        $("#field_submit").addClass("borderb");
        $("#shot_submit").removeClass("borderb");
    });
}
/**
 * 为条形图准备数据
 * @param data
 */
function drawShotTable1(data) {
    var datatype = ["数据", "禁区内", "禁区外", "点球", "任意球 & 角球"];
    var types1 = ["一次触球射门成功率%", "一次触球射门", "封堵", "射偏率%", "射偏", "射门成功率", "射正率%", "射正", "射门", "进球数"];
    var types2 = ["进球", "射门", "射门成功率%", "射正", "射正率%"];
    //var types =["进球","射门","射门成功率%","射正","射正率%"];
    var types3 = ["进球", "射门", "射正"];
    //var types =["进球","射门","射正"];
    var typename = [types1, types2, types2, types3, types3];
    for (var i = 0; i < datatype.length; i++) {
        var title = datatype[i];
        var homedata = [];
        var awaydata = [];
        var homedata1 = [];
        var awaydata1 = [];
        var mid_data = data.中间对比[title];
        for (var j = 0; j < typename[i].length; j++) {
            var hd = data.中间对比[title][typename[i][j]][0].replace("%", "");
            homedata.push(parseFloat(hd) * -1);
            homedata1.push(parseFloat(hd) * -1);
            var ad = data.中间对比[title][typename[i][j]][1].replace("%", "");
            awaydata.push(parseFloat(ad));
            awaydata1.push(parseFloat(ad));
        }
        drawShotBar(data, title, typename[i], homedata, awaydata, homedata1, awaydata1, i);
    }
}
/**
 * 为条形图准备数据
 * @param data
 */
function drawShotTable(data) {
    var i = 0;
    for (var datakey in data.中间对比) {
        var title = datakey;
        var homedata = [];
        var awaydata = [];
        var homedata1 = [];
        var awaydata1 = [];
        var typename = [];
        var mid_data = data.中间对比[datakey];
        for(var key in mid_data){
            typename.push(key);
            var hd = parseFloat(mid_data[key][0].replace("%", "")).toFixed(2);
            homedata.push(parseFloat(hd) * -1);
            homedata1.push(parseFloat(hd) * -1);
            var ad = parseFloat(mid_data[key][1].replace("%", "")).toFixed(2);
            awaydata.push(parseFloat(ad));
            awaydata1.push(parseFloat(ad));
        }
        drawShotBar(data, title, typename, homedata, awaydata, homedata1, awaydata1, i);
        i++;
    }
}
/**
 * 画柱状图
 * @param title
 * @param homedata
 * @param awaydata
 * @param i
 */
function drawShotBar(data, title, typename, homedata, awaydata, homedata1, awaydata1, i) {
    var id_str = "bar_" + i;
    var div = "<div id=" + id_str + " style='width: 100%;height: 7rem;'></div>";
    var temp_min = Math.min.apply(null, homedata);
    var temp_max = Math.max.apply(null, awaydata);
    var max = Math.max.apply(null, [temp_min * -1, temp_max]);
    $("#shot_data").css("height", "36rem");
    //alert(max+"===="+min);
    $("#shot_data").append(div);
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById(id_str));
    var option = {
        title: {
            text: title
        },
        legend: {
            left: "40%",
            data: [data.主场数据.球队名称, data.客场数据.球队名称]
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
                name: data.主场数据.球队名称,
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
                name: data.客场数据.球队名称,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: function (p) {
                            if (p.name.indexOf("率") > 0 || p.name.indexOf("%") > 0) {
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
 * 画射击散点图
 * @param data
 */
function drawShotField(data) {

    var div_ss = "<p style='font-size: 0.4rem;'>"+data.球队名称+"</p><div id='"+data.球队名称.replace(" ","_")+"' class='field'></div>";
    $("#shot_data").append(div_ss);
    $(".field").append("<div class='arrow'></div>");
    var width =  parseInt($(".field").css("width").replace("px",""));//375;
    var height = parseInt($(".field").css("height").replace("px",""));//386;
    $("#shot_data").css("height", "18rem");
    var svg = d3.select("#"+data.球队名称.replace(" ","_")).append("svg")
        .attr("width",width )
        .attr("height", height);
    var goal = getCircle(data.射门.Goal,"blue",width,height);
    var ontarget = getCircle(data.射门.OnTarget,"red",width,height);
    var other = getCircle(data.射门.Other,"pink",width,height);
    var tips =  [
        {"x_axis":305/375*width,"y_axis":(295/386)*height+(0*25/386*height),"radius":5,"color":"blue"},
        {"x_axis":305/375*width,"y_axis":(295/386)*height+(1*25/386*height),"radius":5,"color":"red"},
        {"x_axis":305/375*width,"y_axis":(295/386)*height+(2*25/386*height),"radius":5,"color":"pink"}
    ];
    var datalist = goal.concat(ontarget);
    datalist = datalist.concat(other);
    datalist = datalist.concat(tips);
    svg.append("rect")
        .attr("x", 295/375*width)
        .attr("y", 285/386*height)
        .attr("width",70/375*width)
        .attr("height", 80/386*height)
        .attr("fill","#F5F5F5")
        .attr("stroke-width",1)//边框
        .attr("stroke","#C0C0C0");
    svg.selectAll("circle")
        .data(datalist)
        .enter()
        .append("circle")
        .attr("cx", function (d) {return d.x_axis;})
        .attr("cy", function (d) {return d.y_axis;})
        .attr("r", function (d) {return d.radius;})
        .style("fill", function (d) {return d.color;});
    var texts = ["得分","射正","其他"];
    svg.selectAll("colortext")
        .data(texts)
        .enter()
        .append("text")
        .attr("x",  320/375*width)
        .attr("y", function (text,i) { return 300/386*height+(i*25/386*height) })
        .text(function (text) { return text });

}
/**
 * 为画点准备数据
 * @param goal
 * @param color
 * @returns {Array}
 */
function getCircle(goal, color,width,height) {
    var datalist = [];
    for (var i = 0; i < goal.length; i++) {
        var x_axis = (goal[i].split(":")[0])*width/68;
        var y_axis = (105-goal[i].split(":")[1])*height/104*8/5;
        datalist.push({"x_axis": x_axis, "y_axis": y_axis, "radius": 5, "color": color});
    }
    return datalist;
}