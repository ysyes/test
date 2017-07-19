
//选择录入类型
var chooseName="import/teams";
$(".chooseName li").click(function () {
	$(this).addClass("checked").siblings().removeClass();
	//改变提示信息
	$("#tips h2").html('上传至'+$(this).html()+"?");
	if ($(this).html() == "球员") {
		chooseName="import/players";
	} else{
		chooseName="import/teams";
	}
	console.log(chooseName);
});

//点击提交弹出确认
$(".button .submit").click(function () {
	if ($(".excel input").val()!=undefined&&$(".excel input").val()!="") {
		$("#back").show();
		$("#tips").show();
	}else{
		window.parent.alertFn('请上传Excel')
	}
	$('#tips li:first-child span').html($('.leagueteams option:checked').html());
	$('#tips li:nth-child(2) span').html($('.leagues option:checked').html());
	$('#tips li:nth-child(3) span').html($('.groups option:checked').html());
	$('#tips li:nth-child(4) span').html($('.session option:checked').html());
})
//取消
$("#tips .close").click(function () {
	$("#back").hide();
	$("#tips").hide();
})
$('.excel input').change(function(){
	$('#box .excel span').html($('input[type="file"]').val()).css('color','#333');
})
//确认提交
$("#affirm").click(function () {
	$("#tips").hide();
	$("#loading").show();
	var leagueid = $(".leagues option:checked").val();
	var leagueyear = $(".leagueteams option:checked").val();
	var session = $(".session").val();
	var groupid = $(".groups option:checked").val();
	var formData=new FormData();
    formData.append('excelfile',$(".excel input")[0].files[0]);
    $.ajax({
        url:"../../v1/manager/"+chooseName+"/"+leagueid+"/"+leagueyear+"/"+groupid+"/"+session,
        data:formData,
        processData:false,
        type:'POST',
        dataType:'json',
        contentType:false,
        success:function(data){
        	if (data.resultcode==1000) {
        		$("#loading").hide();
        		$("#back").hide();
        		window.parent.alertFn("提交成功");
        	}  else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			} else{
				$("#back").hide();
				$("#loading").hide();
        		window.parent.alertFn(data.msg);
        	}
        }
    })
})

//赛季赛事分组联动
$.ajax({
	type:"get",
	url:"../../v1/manager/common/leagueplan",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			$(".leagueteams").val('2016');
			var leagues="";
			var groups="";
			var gamesession="";
			var arr=[];
			$(data.leagueteams).each(function(){
				if(this.leagueyear==2016){
					$(this.leagues).each(function(){
						leagues+="<option value='"+this.id+"'>"+this.name+"</option>";
						if(this.id==1){
							$(this.groups).each(function(){
								groups+="<option value='"+this.id+"'>"+this.name+"</option>";
								if(this.id==1){
									$(this.gamesessions).each(function(){
										arr.push(this.gamesession)

									})
								}
							})
						}
					})
				}
			})
			arr=repeat(arr);
			for(var i=0;i<arr.length;i++){
				gamesession+='<option value="'+arr[i]+'">'+arr[i]+'</option>';
			}
			$('select.leagues').html(leagues);
			$('select.groups').html(groups);
			$('select.session').html(gamesession);
		} else if (data.resultcode == 998) {
			window.parent.alertFn('登录失效，请重新登录');
			window.parent.returnLogin();
		}else{
			window.parent.alertFn(data.msg);
		}
	}
});
$('select.leagueteams').change(function(){
	var leagueyear=$('select.leagueteams').val();
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/leagueplan",
		async:true,
		success:function (data) {
			if (data.resultcode == 1000) {
				var leagues="";
				var groups="";
				var gamesession="";
				var arr=[];
				$(data.leagueteams).each(function(){
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							leagues+="<option value='"+this.id+"'>"+this.name+"</option>";	
							if(this.id==1){
								$(this.groups).each(function(){
									groups+="<option value='"+this.id+"'>"+this.name+"</option>";
									$(this.gamesessions).each(function(){
										arr.push(this.gamesession)
									})
								})
							}
						})
					}
				})
				arr=repeat(arr);
				for(var i=0;i<arr.length;i++){
					gamesession+='<option value='+arr[i]+'>'+arr[i]+'</option>';
				}
				$('select.leagues').html(leagues);
				$('select.groups').html(groups);
				$('select.session').html(gamesession);
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	});
})
$('select.leagues').change(function(){
	var leagueyear=$('select.leagueteams').val();
	var leagues=$('select.leagues').val();
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/leagueplan",
		async:true,
		success:function (data) {
			if (data.resultcode == 1000) {
				var groups="";
				$(data.leagueteams).each(function(){
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							if(this.id==leagues){
								$(this.groups).each(function(){
									groups+="<option value='"+this.id+"'>"+this.name+"</option>";
								})
							}
						})
					}
				})
				$('select.groups').html(groups);
				var groupsval=$('select.groups').val();
				$.ajax({
					type:"get",
					url:"../../v1/manager/common/leagueplan",
					async:true,
					success:function (data) {
						if (data.resultcode == 1000) {
							var arr=[];
							var gamesession="";
							$(data.leagueteams).each(function(){
								if(this.leagueyear==leagueyear){
									$(this.leagues).each(function(){
										if(this.id==leagues){
											$(this.groups).each(function(){
												if(this.id==groupsval){
													$(this.gamesessions).each(function(){
														arr.push(this.gamesession);
													})
												}
											})
										}
									})
								}
							})
							arr=repeat(arr);
							for(var i=0;i<arr.length;i++){
								gamesession+='<option value='+arr[i]+'>'+arr[i]+'</option>';
							}
							$('select.session').html(gamesession);
						} else if (data.resultcode == 998) {
							window.parent.alertFn('登录失效，请重新登录');
							window.parent.returnLogin();
						}else{
							window.parent.alertFn(data.msg);
						}
					}
				});
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	});
})
$('select.groups').change(function(){
	var leagueyear=$('select.leagueteams').val();
	var leagues=$('select.leagues').val();
	var groups=$('select.groups').val();
	$.ajax({
		type:"get",
		url:"../../v1/manager/common/leagueplan",
		async:true,
		success:function (data) {
			if (data.resultcode == 1000) {
				var gamesession="";
				var arr=[];
				$(data.leagueteams).each(function(){
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							if(this.id==leagues){
								$(this.groups).each(function(){
									if(this.id==groups){
										$(this.gamesessions).each(function(){
											arr.push(this.gamesession)
										})
									}
								})
							}
						})
					}
				})
				arr=repeat(arr);
				for(var i=0;i<arr.length;i++){
					gamesession+='<option value='+arr[i]+'>'+arr[i]+'</option>';
				}
				$('select.session').html(gamesession);
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}else{
				window.parent.alertFn(data.msg);
			}
		}
	});
})
function repeat(arr){
	for(var i= 0,hash={};i<arr.length;i++){
		if(arr[i] in hash){
			continue;
		}else{
			hash[arr[i]]=1;
		}
	}
	var arr2=[];
	for(var key in hash){
		if(hash[key]==1){
			arr2.push(key)
		}
	}
	return arr2;
}