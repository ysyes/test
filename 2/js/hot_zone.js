gameId = defaultGameId()
var datatype = "";
$(document).ready(function() {
    datatype = getQueryString('datatype');
    var type = extractURLParam("type")
    showSelected(type)
    if (extractURLParam("gameId") != "") {
        gameId = extractURLParam("gameId")
    }
    var typeKey = ""
    var endColor
    //console.log("type = " + type);
    if (type == "offense") {
        typeKey = "进攻热区"
        endColor = [139, 58, 58]
    } else if (type == "defend"){
        typeKey = "防守热区"
        endColor = [0, 0 , 180]
    } else {
        typeKey = "综合热区"
        endColor = [0, 255, 0]
    }
    var ss = $.getJSON("json/"+datatype+"/" + gameId + "/hot_zone.json", function(data){
        drawData(data, "home", typeKey, endColor);
        drawData(data, "away", typeKey, endColor);
    })
    if(ss.status == 404) {
        $("#hot_main").html("<p style='font-size: 0.5rem;text-align: center;color: #5e5e5e; '>暂无数据</p>");
    }
});

function clickTab(button) {
    var type = $(button).attr("name")
    window.location.href = "hot_zone.html?gameId=" + gameId + "&type=" + type;
}

function showSelected(button) {
    if (button != "offense" && button != "defend") {
        button = "total"
    }
    $("#" + button).addClass("borderb")
}

ns = "http://www.w3.org/2000/svg"
svg_top = 49.827
svg_left = 97.096
svg_width = 328.274 * 2
svg_height = 493.141
grid_x_num = 6
grid_y_num = 4
grid_width = svg_width / grid_x_num
grid_height = svg_height / grid_y_num

function drawData(data, team, typeKey, endColor){
    var svgId
    var labelId
    var teamKey
    var endColor
    if (team == "home") {
        svgId = "home_svg"
        labelId = "home_team"
        teamKey = "主场球队"
    } else {
        svgId = "away_svg"
        labelId = "away_team"
        teamKey = "客场球队"
    }

    var svg = document.getElementById(svgId)
    document.getElementById(labelId).innerHTML = data[teamKey]["球队名称"]

    var i = 0
    var j = 0
    for (i = 0; i < grid_x_num; i++) {
        for (j = 0; j < grid_y_num; j++) {
            drawRect(svg, data, teamKey, typeKey, endColor, i, j)
        }
    }
}

function drawRect(svg, data, teamKey, typeKey, endColor, i, j) {
    var gradient = calGradient(data[teamKey][typeKey])

    var rect = document.createElementNS(ns, "rect")
    rect.setAttributeNS(null, "x", svg_left + i * grid_width)
    rect.setAttributeNS(null, "y", svg_top + j * grid_height)
    rect.setAttributeNS(null, "width", grid_width)
    rect.setAttributeNS(null, "height", grid_height)
    rect.setAttributeNS(null, "opacity", 0.5)

    percentText = data[teamKey][typeKey]["" + (j * grid_x_num + i + 1)]
    rectFill = makeColor([255, 255, 255], endColor, gradient,
        parseFloat(percentText.replace("%", "")))
    rect.style.fill = rectFill

    text = document.createElementNS(ns, "text")
    text.setAttributeNS(null, "x", svg_left + i * grid_width + grid_width / 2)
    text.setAttributeNS(null, "y", svg_top + j * grid_height + grid_height / 2)
    text.setAttributeNS(null, "alignment-baseline", "middle")
    text.setAttributeNS(null, "text-anchor", "middle")
    text.setAttribute("style","font-size:2rem;");
    var textNode = document.createTextNode(percentText);
    text.appendChild(textNode)
    svg.appendChild(rect)
    svg.appendChild(text)
}

function calGradient(json) {
    min = 100.0
    max = 0.0
    for (key in json) {
        percentage = parseFloat(json[key].replace("%", ""))
        if (percentage > max) {
            max = percentage
        }
        if (percentage < min) {
            min = percentage
        }
    }
    return (max - min) > 0.0 ? (max - min) : 100.0
}

function makeColor(startColor, endColor, gradient, index) {
    colorR = startColor[0] + (endColor[0] - startColor[0]) / 10 * index
    colorG = startColor[1] + (endColor[1] - startColor[1]) / 10 * index
    colorB = startColor[2] + (endColor[2] - startColor[2]) / 10 * index
    return "rgb(" + parseInt(colorR) + "," + parseInt(colorG) + "," + parseInt(colorB) + ")"
}