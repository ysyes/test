var dataview = {"europe_cup":"欧洲杯","B_league":"中乙","A_league":"中甲","super_league":"中超","cfa_cup":"足协杯"};
var data_range = ["15'","30'","45'","60'","75'","90'","105'","120'"];
var range = ["15'","30'","45'","60'","75'","90'"];
function extractURLParam(param) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == param) {
            return sParameterName[1];
        }
    }
    return ""
}
/*
 * 根据参数名称获取链接参数
 * @param name
 * @returns {null}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.parent.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    else{
        return 'super_league';
    }
}
function defaultGameId() {
    maxGameId = 0;
    $.ajaxSettings.async = false;
    $.getJSON("json/europe_cup/index.json", function (data) {
        data.forEach(function (game) {
        	//下面这行有BUG，game下获取不到id,应改为game.game.id
            if (game.id > maxGameId && game.status == "1") {
                maxGameId = game.id
            }
        })
    })
    return maxGameId
}
/*
 * 字符串过长加换行
 * @param str
 * @param n
 * @returns {*}
 */
function insertEnter(str, n) {
    var len = str.length;
    var strTemp = '';
    if (len > n) {
        strTemp = str.substring(0, n);
        str = str.substring(n, len);
        return strTemp + '\n' + insertEnter(str, n);
    } else {
        return str;
    }
}