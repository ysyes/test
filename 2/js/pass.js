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
    var ss = $.getJSON("json/"+datatype+"/" + gameid + "/pass.json", function (data) {
        drawPassTable(data);
        //drawData(data);
    })
    if(ss.status==404){
        $("#pass_data").html("<p style='font-size: 0.5rem;text-align: center;color: #5e5e5e; '>暂无数据</p>");
    }
}

function drawPassTable(data) {
    var datatype = ["传球","数据", "距离", "禁区", "直塞球","一次触球后传球"];
    for (var i = 0; i < datatype.length; i++) {
        var title = datatype[i];
        var typename = [];//data.主场数据[datatype];
        var homedata = [];
        var awaydata = [];
        var homedata1 = [];
        var awaydata1 = [];
        var legend = [data.主场数据.球队名称, data.客场数据.球队名称];
        //var types =data.主场数据[datatype[i]];
        for(var key in data.主场数据[datatype[i]]){//
            typename.push(key);
            if ((key.indexOf("率") > 0 ||key.indexOf("%") > 0)&& isNaN(data.主场数据[datatype[i]][key])) {
                var hh = parseInt(data.主场数据[datatype[i]][key].replace("%","")).toFixed(2);
                var aa = parseInt(data.客场数据[datatype[i]][key].replace("%","")).toFixed(2);
                homedata.push(hh * -1);
                awaydata.push(aa);
                homedata1.push(hh * -1);
                awaydata1.push(aa);
            } else {
                var hh = data.主场数据[datatype[i]][key];
                var aa = data.客场数据[datatype[i]][key];
                homedata.push(hh * -1);
                awaydata.push(aa);
                homedata1.push(hh * -1);
                awaydata1.push(aa);
            }
            //homedata.push(data.主场数据[datatype[i]][key]*-1);
            //awaydata.push(data.客场数据[datatype[i]][key]);
            //homedata1.push(data.主场数据[datatype[i]][key]*-1);
            //awaydata1.push(data.客场数据[datatype[i]][key]);

        }
        typename = typename.reverse();
        homedata = homedata.reverse();
        awaydata = awaydata.reverse();
        homedata1 = homedata1.reverse();
        awaydata1 = awaydata1.reverse();
        drawPassBar(legend,title,typename,homedata,awaydata,homedata1,awaydata1,i);
    }
}

/**
 *
 * @param title
 * @param homedata
 * @param awaydata
 * @param i
 */
function drawPassBar(legend,title, typename, homedata, awaydata, homedata1, awaydata1, i) {

    var id_str = "bar_" + i;
    var div = "<div id=" + id_str + " style='width: 100%;height: 6rem;'></div>";
    $("#pass_data").append(div);

    var temp_min = Math.min.apply(null, homedata);
    var temp_max = Math.max.apply(null, awaydata);
    var max = Math.max.apply(null, [temp_min*-1,temp_max]);

    for(var i = 0;i < typename.length; i++){
        if (typename[i].indexOf("率")> 0){
            homedata[i]*= max/100;
            awaydata[i]*= max/100;
        }
    }
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById(id_str));
    var option = {
        title: {
            text: title
        },
        legend: {
            left:"40%",
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
                axisTick:{show: false},
                max:max+max*0.3,
                min:(max+max*0.3)*-1
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick:{show: false},
                axisLabel: {
                    interval:0,
                    /*rotate:20,*/
                    formatter: function (str) {
                        return insertEnter(str,6);
                    }
                },
                data:typename
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
                            if(p.name.indexOf("率") > 0||p.name.indexOf("%") > 0){
                                return homedata1[p.dataIndex]*-1+"%";
                            }else{
                                return homedata1[p.dataIndex]*-1;
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
                            if(p.name.indexOf("率") > 0||p.name.indexOf("%") > 0){
                                return awaydata1[p.dataIndex]+"%";
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