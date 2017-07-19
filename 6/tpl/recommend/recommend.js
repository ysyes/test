//联赛下拉列表
$.ajax({
	type:"get",
	url:"../../v1/menu/league",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			var options = '';
			for (i in data.leagues) {
				options += '<option value="'+data.leagues[i].code+'">'+data.leagues[i].name+'</option>';
			}
			$(".name").append(options)
		}else if(data.resultcode==998){
			window.parent.returnLogin();
	    }else{
			console.log(data.msg);
		}
	}
});
//进入默认加载第一项
load();
function load(){
	var leaguecode =$("select.name").val();
	var status = $("select.star").val();
	var time = $(".player").val();
	var saveData=JSON.stringify({leaguecode:leaguecode,status:status,date:time});
	$.ajax({
		type:"post",
		url:"../../v1/recommand/1",
		async:true,
		data:saveData,
		contentType:'application/json',
		success:function (data) {
			doresponse(data);
			showpages(data);
		}
	});
}
function doresponse(data){
	if (data.resultcode == 1000) {
		var tr='';
		for (i in data.recommands) {
			tr += ' <tr><td>'+ data.recommands[i].name +'</td><td>'+ data.recommands[i].teams +
			'</td><td>'+ data.recommands[i].gametime +'</td><td>'+ returscore(data.recommands[i].score) +
			'</td><td>'+ data.recommands[i].status +'</td><td><a href="recommendUpdate.html?id='+data.recommands[i].id+'" class="able">编辑</a></td></tr>'
		}
		$(".table1 tbody").html(tr);
	} else if(data.resultcode==999){
		$(".table1 tbody").html('<tr><td colspan="6" style="text-align:center;">没有查询到符合条件的数据</td></tr>');
		$('.page').hide()
	}else if(data.resultcode==998){
		window.parent.returnLogin();
    }
}
function showpages(data){
    var pages=data.totalpage;
    $('.page ul').html('');
    if(data.totalpage==1||data.totalpage==undefined){
    	$('.page').hide();
    }else{
    	$('.page').show();
    	var frag=document.createDocumentFragment();
	    for(var i=1;i<=pages;i++){
	        if(i==1){
	            $(frag).append('<li class="active">'+i+'</li>')
	        }else{
	            $(frag).append('<li>'+i+'</li>');
	        }
	    }
	    $('.page ul').append('<li class="disable">上一页</li>');
	    $('.page ul').append(frag);
	    $('.page ul').append('<li>下一页</li>');
    }
    
}
//点击搜索
$(".show .title li i").click(function () {
	var leaguecode =$("select.name").val();
	var status = $("select.star").val();
	var time = $(".player").val();
	var saveData=JSON.stringify({leaguecode:leaguecode,status:status,date:time});
	$.ajax({
		type:"post",
		url:"../../v1/recommand/1",
		async:true,
		data:saveData,
		contentType:'application/json',
		success:function (data) {
			doresponse(data);
			showpages(data);
			page=1;
		}
	});
})
//TODO 分页加载显示
var page=1;
$('.page').on('click','ul li',function(){
    var length=$('.page li').length;
    var leaguecode =$("select.name").val();
	var status = $("select.star").val();
	var time = $(".player").val();
	var obj=JSON.stringify({leaguecode:leaguecode,status:status,date:time});
    if(($(this).index('.page li')+1)>=length){
        page++;
        $.ajax({
            url:'../../v1/recommand/'+page,
            type:'POST',
            data:obj,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                if(page<=data.totalpage){
                    doresponse(data);
                }
            }
        })
    }else if($(this).index('.page li')===0){
        page--;
        $.ajax({
            url:'../../v1/recommand/'+page,
            type:'POST',
            data:obj,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                if(page>=1){
                    doresponse(data);
                }
            }
        })
    }else{
        page=$(this).html();
        $.ajax({
            url:'../../v1/recommand/'+page,
            type:'POST',
            data:obj,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                doresponse(data);
            }
        })
    }
})

//没有返回--
function returscore(name) {
	if (name != '' && name != undefined) {
		return name;
	} else{
		return "-";
	}
}
