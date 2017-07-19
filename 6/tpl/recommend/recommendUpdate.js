/**
 * Created by admin on 2016/11/10.
 */
var id=window.location.href.split('=')[1];
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
			$(".name").html("<option>--所有联赛--</option>"+options)
		}else if(data.resultcode==998){
			window.parent.returnLogin();
	    }else{
			alert(data.msg);
		}
	}
});

//球队下拉列表
$('.name').change(function(){
	if($(this).val()==''){
		$('select[name="teamcode"]').html('');
		$('select[name="teamcode"]').append('<option value="">--全部球队--</option>');
	}
	$.ajax({
		type:"get",
		url:"../../v1/menu/team/"+$('.name').val(),
		async:true,
		success:function (data) {
			if (data.resultcode == 1000) {
				var options = '';
				for (i in data.leagues) {
					options += '<option value="'+data.leagues[i].code+'">'+data.leagues[i].name+'</option>';
				}
				$(".teamL").html(options);
				$(".teamR").html(options);
			} else{
				alert(data.msg);
			}
		}
	});
})
function load(){
    $.ajax({
        url:'../../v1/recommand/update/init/'+id,
        type:'GET',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                console.log(data);
                var me=data;
                $('select[name="leaguecode"]').val(data.leaguecode);
                console.log($('.name').val())
                $.ajax({
                	type:"get",
                	url:"../../v1/menu/team/"+$('.name').val(),
                	async:true,
                	success:function (data) {
                		if (data.resultcode == 1000) {
                			var options = '';
                			for (i in data.leagues) {
                				options += '<option value="'+data.leagues[i].code+'">'+data.leagues[i].name+'</option>';
                			}
                			$(".teamL").html(options);
                			$(".teamR").html(options);
                			$('select[name="teamacode"]').val(me.teamacode);
                            $('select[name="teambcode"]').val(me.teambcode);
                		} else{
                			alert(data.msg);
                		}
                	}
                });
                $('input[name="gametime"]').val(data.gametime);
                $('textarea[name="strengthcontenta"]').val(data.strengthcontenta);
                $('textarea[name="strengthcontentb"]').val(data.strengthcontentb);
                $('span.left').html(data.strengtha);
                $('input[type="range"]').val(data.strengtha);
                $('span.right').html(data.strengthb);
                $('textarea[name="injurycontenta"]').val(data.injurycontenta);
                $('textarea[name="injurycontentb"]').val(data.injurycontentb);
            }else if(data.resultcode==998){
                window.parent.returnLogin();
            }
        }
    })
}
//进度条显示比分
$('input[type="range"]').on('mousedown',function(){
	$(this).on('mousemove',function(){
		$('span.left').html($(this).val());
		$('span.right').html(100-parseInt($('span.left').html()))
	})
})
load();
//表单提交
$('button.submit').click(function(e){
    e.preventDefault();
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    obj.strengtha=$('span.left').html();
    obj.strengthb=$('span.right').html();
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/recommand/update/'+id,
        type:'POST',
        data:obj,
        contentType:'application/json',
        datatype:'json',
        success:function(data){
            if(data.resultcode==1000){
                if(confirm('修改成功')){
                    window.location = 'recommend.html';
                }
            }else if(data.resultcode==998){
                window.parent.returnLogin();
            }else if(data.resultcode==1999){
                alert(data.msg);
            }
        }
    })
})