//rem布局
function rem() {
    var html = document.getElementsByTagName("html")[0];
    html.style.fontSize = window.innerWidth/50 + "px";
}
rem();
window.onresize = function () {
    rem();
}
//TODO 点赞
$('#pinglun ul').on('click','p.dianzan a',function(e){
    //e.preventDefault();
    var href=$(this).attr('href');
    var target= e.target;
    if(target.nodeName==='IMG'){
        var imgUrl=$(target).attr('src');
        if(imgUrl.indexOf('orange')===-1){
            $(target).next().css('color','#e26c03');
            $(target).next().html((parseInt($(target).next().html())+1));
            $(target).attr('src','images/icon_zan_orange.png');
        }else{
            $(target).next().css('color','#a5a5a5');
            $(target).next().html((parseInt($(target).next().html())-1));
            $(target).attr('src','images/icon_zan.png');
        }
    }else if(target.nodeName==='SPAN'){
        var imgUrl=$(target).prev().attr('src');
        if(imgUrl.indexOf('orange')===-1){
            $(target).css('color','#e26c03');
            $(target).prev().html((parseInt($(target).next().html())+1));
            $(target).prev().attr('src','images/icon_zan_orange.png');
        }else{
            $(target).css('color','#a5a5a5');
            $(target).prev().html((parseInt($(target).next().html())-1));
            $(target).prev().attr('src','images/icon_zan.png');
        }
    }else if(target.nodeName==='A'){
        e.preventDefault();
        var imgUrl=$(target).children('img').attr('src');
        if(imgUrl.indexOf('orange')===-1){
            $(target).children('span').css('color','#e26c03');
            $(target).children('span').html((parseInt($(target).children('span').html())+1));
            $(target).children('img').attr('src','images/icon_zan_orange.png');
        }else{
            $(target).children('span').css('color','#a5a5a5');
            $(target).children('span').html((parseInt($(target).children('span').html())-1));
            $(target).children('img').attr('src','images/icon_zan.png');
        }
    }
})

var page=1;
//获取newId和userCode;
var main = {};
var arr = window.location.href.split("?")[1].split("&");
for (var i = 0; i < arr.length ; i++) {
	main[arr[i].split("=")[0]] = arr[i].split("=")[1];
}
var newid = main.id;
var userCode = "";
if (main.usercode != undefined && main.usercode != "") {
	userCode = main.usercode;
}

console.log(newid);
console.log(userCode);

function request(idx){
    $.ajax({
    	//测试用
        //url:"v1/news/h5/1/recommend/" + idx,
        url:'v1/news/h5/'+newid+'/recommend/'+idx,
        type:'GET',
        dataType:'JSON',
        headers:{"cfadata-usercode":userCode},
        success:function(data){
        	console.log(data);
            if(data.resultcode==1000){
                if(idx<=data.totalpage){
                    jiazaipinglun(data);
                    if (idx==data.totalpage) {
                    	$('p.more img').attr('src','images/news_icon_nomore.png');
                    }
                }
            }else{
                $('p.more img').attr('src','images/news_icon_nomore.png');
            }
        }
    });
}
//TODO 点击加载更多
$('#pinglun p.more').click(function(){
    page++;
    request(page);
});
//TODO 交互
function data(){
    $.ajax({
       	//测试数据
      	//url:"v1/news/h5/1",

        url:'v1/news/h5/'+newid,
        type:'GET',
        dataType:'JSON',
        headers:{"cfadata-usercode":userCode},
        success:function(data){
        	console.log(data);
            if(data.resultcode==1000){
            	//这里报undefined
            	console.log(data.contentdetail);
                $('#main p.title').html(data.content);
                $('#main p.resource span.time').html(data.createtime);
                $('#main p.resource span.source').html(data.title);
                $('#main div.content').html("");
                $('#main div.content').html(data.contentdetail);
                $('#pinglun ul').html("");
                if (data.totalpage == 1) {
                	$('p.more img').attr('src','images/news_icon_nomore.png');
                }
                jiazaipinglun(data);
                //显示加载更多按钮
                $(".hide").show();
                //设置图片宽度
                imgwidth();
            }
        }
    })
}
function jiazaipinglun(data){
    $(data.comments).each(function(){
        var dianzan='';
        if(this.goodself==1){
            dianzan='<p class="dianzan dianzaned"><a href="http://www.51dongcai.com?act=dz&commentid='+this.id+'"><img src="images/icon_zan_orange.png" alt=""/><span>'
            +this.goodnum+'</span></a></p>';
        }else{
            dianzan='<p class="dianzan"><a href="http://www.51dongcai.com?act=dz&commentid='+this.id+'"><img src="images/icon_zan.png"/><span>'
            +this.goodnum+'</span></a></p>';
        }
        var src='';
        if(this.logo!='' && this.logo != undefined){
            src=this.logo;
        }else{
            src='images/touxiang.png';
        }
        if(this.subcomment){
            $('#pinglun ul').append('<li commentid="'+this.id+'"><a href="http://www.51dongcai.com?act=pl&commentid='
        	+this.id+'&username='+this.username+'"><div><img src="'+src+'" /></div><div><p class="username"><span>'
            +this.username+'</span><b>回复</b><span>'+this.subcomment.username+'</span></p><p class="date">'+this.createtime+'</p><p class="content1">'
            +this.content+'</p></p></div></a>'
            +dianzan+'<p class="content2">'+this.subcomment.content+'</p></li>')
        }else{
            $('#pinglun ul').append('<li commentid="'+this.id+'"><a href="http://www.51dongcai.com?act=pl&commentid='+this.id+'&username='+this.username+
            '"><div><img src="'+src+'" /></div><div><p class="username"><span>'+this.username+'</span></p><p class="date">'
            +this.createtime+'</p><p class="content">'+this.content+'</p></div></a>'+dianzan+'</li>');
        }
    })
}
data();

//设置图片最大宽度
function imgwidth() {
	$("#main .content img").css("max-width","100%");
}


//回跳到评论顶部
function returnTop(){
	var commentTop = $("#pinglun").offset().top;
	console.log("评论的高度"+commentTop);
	window.scrollTo(0,commentTop);
}

