var datatype = "";
$(document).ready(function () {
    var date = new Date();
    datatype = getQueryString('datatype');
    $("#datatype").text(dataview[datatype]+date.getFullYear());
    if(datatype == 'A_league'){
        $(".competition").removeClass("color");
        $(".competition").eq(1).addClass("color");
    }else if(datatype == 'B_league'){
        $(".competition").removeClass("color");
            $(".competition").eq(2).addClass("color");
    }else if(datatype == 'super_league'){
        $(".competition").removeClass("color");
            $(".competition").eq(0).addClass("color");
    }else{
        $(".competition").removeClass("color");
        $(".onanther").addClass("color");
    }
    $("title").text("同道DATA "+dataview[datatype]+date.getFullYear()+" 数据");
    $.getJSON("json/"+datatype+"/index.json", function (data) {
        //初始化轮次
        var lun_html = "";
        for(var i = data.length - 1; i >= 0; i--){
            lun_html += '<li value="group_' + i + '">' + data[i].group + '</li>';
        }
        $("#game_lun").html(lun_html);
        $("#game_lun").find("li").eq(0).addClass("listcolor");
        $(".datelun").html($("#game_lun li:eq(0)").html());

        //初始化比赛
        var games = data[data.length - 1]["games"];
        fillGames(games);
        initGameClick();
        fillData($("#game_list li:eq(0)").attr("value"))

        //轮次点击事件
        $("#game_lun li").click(function () {
            $(".datelun_logo").css("background-image", "url('./image/icon_dropdown.gif')");
            $(".datealllun").hide();
            $("#game_lun li").removeClass("listcolor")
            $(this).addClass("listcolor")
            $(".datelun").html($(this).html());
            //$(".navlist li").removeClass("navcolor");
            //$("#summary_a").addClass("navcolor");
            var gameId = $(this).attr("value").replace('group_','')
            fillGames(data[parseInt(gameId)]["games"]);
            initGameClick();
            $("#game_list li").eq(0).click();
        });
    })
    /**
     * 给比赛添加点击事件
     */
    function initGameClick() {
        $("#game_list li").click(function () {
            $(".datetime_logo").css("background-image", "url('./image/icon_dropdown.gif')");
            $(".dateall").hide();
            $("#game_list li").removeClass("listcolor")
            $(this).addClass("listcolor")
            var text = $(this).html();
            $(".datetime").html(text);
            $(".navlist li").removeClass("navcolor");
            $("#summary_a").addClass("navcolor");
            var gameId = $(this).attr("value")
            fillData(gameId)
        });
    }
    /**
     * 填入比赛选项
     * @param games
     */
    function fillGames(games){
        var games_html = "";
        for (var i = games.length - 1; i >= 0; i--) {
            var game = games[i];
            if (game.status == "1"){
                games_html += '<li value=' + game.id + '>' + game.homeTeam + "  vs  " + game.awayTeam + '</li>';
            } else {
                console.log("game " + game.id + " is not finished")
            }
        }
        $("#game_list").html(games_html);
        $("#game_list").find("li").eq(0).addClass("listcolor");
        $(".datetime").html($("#game_list li:eq(0)").html());
    }
    function fillData(gameId) {
        document.getElementById("fream_content").src = "summary.html?gameId=" + gameId;
        $("#summary_a").attr("href", "summary.html?gameId=" + gameId)
        $("#hot_zone_a").attr("href", "hot_zone.html?gameId=" + gameId)
        $("#shot_a").attr("href", "shot.html?gameId=" + gameId)
        $("#pass_a").attr("href", "pass.html?gameId=" + gameId)
        $("#crosses_a").attr("href", "crosses.html?gameId=" + gameId)
        $("#defense_a").attr("href", "defense.html?gameId=" + gameId)

        $.ajaxSettings.async = false;
        $.getJSON("json/"+datatype+"/" + gameId + "/summary.json", function (data) {
            $("#home_team_name").html(data["主场球队"]["球队名称"])
            $("#away_team_name").html(data["客场球队"]["球队名称"])
            $("#game_score").html(data["比分"])
            $("#game_scores").html(data["日期"])
            $("#home_team_logo").attr("src", getTeamLogo(data["主场球队"]["球队名称"]))
            $("#away_team_logo").attr("src", getTeamLogo(data["客场球队"]["球队名称"]))
        })
    }

    function getTeamLogo(name) {
        var logo = "";
        $.ajaxSettings.async = false;
        $.getJSON("json/"+datatype+"/team.json", function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == name) {
                    logo = data[i].logo;
                }
            }
        })
        if(datatype=='cfa_cup'){
            var logo_file = 'super_league';
        }else{
            var logo_file = datatype;
        }
        return "image/"+logo_file+"_team_logo/" + logo + ".png";
    }

    $("#game_select").html()

    $(".nav").click(function (event) {
        $(".datetime_logo").css("background-image", "url('./image/icon_dropdown.gif')");
        $(".dateall").hide();
        var div = $(".navshow");
        if (div.hasClass("dest")) {
            div.removeClass("dest").animate({left: 0}, 800);
        } else {
            div.addClass("dest").animate({left: -750}, 800);
        }
        $(document).one("click", function () {//对document绑定一个影藏Div方法
            div.addClass("dest").animate({left: -750}, 800);
        });
        IframeOnClick.track(document.getElementById("fream_content"), function () {
            div.addClass("dest").animate({left: -750}, 800);
        });
        event = event || window.event;
        event.stopPropagation();
    })
    $(".datetime").click(function () {
        $(".dateall").slideToggle(100, function () {
            if ($(this).is(':hidden')) {
                $(".datetime_logo").css("background-image", "url('./image/icon_dropdown.gif')");
            } else {
                $(".datetime_logo").css("background-image", "url('./image/icon_dropup.gif')");
            }
        });
        $(".datealllun").hide();
    })
    $(".datelun").click(function () {
        $(".datealllun").slideToggle(100, function () {
            if ($(this).is(':hidden')) {
                $(".datelun_logo").css("background-image", "url('./image/icon_dropdown.gif')");
            } else {
                $(".datelun_logo").css("background-image", "url('./image/icon_dropup.gif')");
            }
        });
        $(".dateall").hide();
    })
    $(".competition").click(function(){
        /*$(".competition").removeClass("color");
        $(this).addClass("color");*/
        if($(this).index()==2){
            $(this).children('a').attr("href","index.html?datatype=B_league");
        }else if($(this).index()==1){
            $(this).children('a').attr("href","index.html?datatype=A_league");
        }else{
            $(this).children('a').attr("href","index.html?datatype=super_league");
        }
    })
    $(".navlist li").click(function () {
        $(".navlist li").removeClass("navcolor");
        $(this).addClass("navcolor");
        $(".dateall").hide();
        var href = $(this).attr("href")
        document.getElementById("fream_content").src = href;
        $(".navshow").addClass("dest").animate({left: -750}, 800);
    })
    $(".onanther").click(function(){
        $(".anther").slideToggle()
    })
    $(".competitions").click(function(){
        if($(this).index()==1){
            $(this).children('a').attr("href","index.html?datatype=cfa_cup");
        }else{
            $(this).children('a').attr("href","index.html?datatype=europe_cup");
        }
        $(".competition").removeClass("color");
        $(".onanther").addClass("color");
    })
})

var IframeOnClick = {
    resolution: 200,
    iframes: [],
    interval: null,
    Iframe: function () {
        this.element = arguments[0];
        this.cb = arguments[1];
        this.hasTracked = false;
    },
    track: function (element, cb) {
        if (this.iframes.length > 0) {
            return;
        }
        this.iframes.push(new this.Iframe(element, cb));
        if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function () {
                _this.checkClick();
            }, this.resolution);
        }
    },
    checkClick: function () {
        if (document.activeElement) {
            var activeElement = document.activeElement;
            for (var i in this.iframes) {
                if (activeElement === this.iframes[i].element) { // user is in this Iframe
                    if (this.iframes[i].hasTracked == false) {
                        this.iframes[i].cb.apply(window, []);
                        this.iframes[i].hasTracked = true;
                    }
                } else {
                    this.iframes[i].hasTracked = false;
                }
            }
        }
    }
};