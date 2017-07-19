//联赛下拉列表
$.ajax({
	type:"get",
	url:"../../v1/menu/league",
	async:true,
	success:function (data) {
		console.log(data);
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
	}$.ajax({
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
//进度条显示比分
$('input[type="range"]').on('mousedown',function(){
	$(this).on('mousemove',function(){
		$('span.left').html($(this).val());
		$('span.right').html(100-parseInt($('span.left').html()))
	})
})
//比赛时间显示为当时
var date=new Date().toLocaleString();
$('input#date').val(date.replace(/\//g,'-').split('上午')[0]+date.replace(/\//g,'-').split('上午')[1]);
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
        url:'../../v1/recommand',
        type:'POST',
        data:obj,
        contentType:'application/json',
        datatype:'json',
        success:function(data){
            if(data.resultcode==1000){
                if(confirm('发表成功')){
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