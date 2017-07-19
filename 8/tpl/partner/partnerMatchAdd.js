/**
 * Created by admin on 2016/11/20.
 */
var href=window.location.href.split('?')[1];
var partnerid=href.split('&')[0].split('=')[1];
//var privateid=href.split('&')[1].split('=')[1];
$('div.button a').attr('href','partnerMatch.html?partnerid='+partnerid);

//赛季、赛事、分组、球队联查开始
//赛季
$('select[name="leagueyear"]').change(function(){
	var leagueyear=$('select[name="leagueyear"]').val();
	$.ajax({
		url:'../../v1/manager/common/leagueteam',
		type:'get',
		contenType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				$('select[name="leagueid"]').html('');
				$('select[name="groupid"]').html('');
				$('select[name="teamid"]').html('');
				$(data.leagueteams).each(function(){
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							$('select[name="leagueid"]').append('<option value='+this.id+'>'+this.name+'</option>');
							
							$(this.groups).each(function(){
								$('select[name="groupid"]').append('<option value='+this.id+'>'+this.name+'</option>');
								
								$(this.teams).each(function(){
									$('select[name="teamid"]').append('<option value='+this.id+'>'+this.name+'</option>');
								})
							})
						})
					}
				})
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}

		}
	});
})
//赛事
$('select[name="leagueid"]').change(function(){
	var leagueyear=$('select[name="leagueyear"]').val();
	var leagueid=$('select[name="leagueid"]').val();
	$.ajax({
		url:'../../v1/manager/common/leagueteam',
		type:'get',
		contenType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				$('select[name="groupid"]').html('<option value="0">所有分组</option>');
				$('select[name="teamid"]').html('<option value="0">所有球队</option>');
				$(data.leagueteams).each(function(){
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							if(this.id==leagueid){
								$(this.groups).each(function(){
									$('select[name="groupid"]').append('<option value='+this.id+'>'+this.name+'</option>');
									$(this.teams).each(function(){
										$('select[name="teamid"]').append('<option value='+this.id+'>'+this.name+'</option>');
									})
								})
							}
						})
					}
				})
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}
		}
	});
})
//分组
$('select[name="groupid"]').change(function(){
	var leagueyear=$('select[name="leagueyear"]').val();
	var leagueid=$('select[name="leagueid"]').val();
	var groupid=$('select[name="groupid"]').val();
	$.ajax({
		url:'../../v1/manager/common/leagueteam',
		type:'get',
		contenType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				$('select[name="teamid"]').html('<option value="0">所有球队</option>');
				$(data.leagueteams).each(function(){
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							if(this.id==leagueid){
								$(this.groups).each(function(){
									if(this.id==groupid){
										$(this.teams).each(function(){
											$('select[name="teamid"]').append('<option value='+this.id+'>'+this.name+'</option>');
										})
									}
								})
							}
						})
					}
				})
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}
		}
	});
})

//赛季、赛事、分组、球队联查结束

if(href.split('&')[1]!==undefined){
	//合作伙伴-赛事编辑
	var privateid=href.split('&')[1].split('=')[1];
    $('#box header h3').html('合作伙伴<span>>></span>赛事编辑');
    $.ajax({
        url:'../../v1/manager/partner/'+partnerid+'/private/0',
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $(data.privates).each(function(){
                    if(this.id==privateid){
                    	var me=this;
                        $.ajax({
                    		url:'../../v1/manager/common/leagueteam',
                    		type:'get',
                    		contenType:'application/json',
                    		success:function(data){
                    			if(data.resultcode==1000){
                    				$(data.leagueteams).each(function(){
                    					$('select[name="leagueyear"]').val(me.leagueyear);
                    					var leagueyear=$('select[name="leagueyear"]').val();
                    					if(this.leagueyear==leagueyear){
                    						$(this.leagues).each(function(){
                    							$('select[name="leagueid"]').append('<option value='+this.id+'>'+this.name+'</option>');
            									if(this.id==me.leagueid){
	                    							$('select[name="leagueid"]').val(me.leagueid);
	                    							$(this.groups).each(function(){
                        								$('select[name="groupid"]').append('<option value='+this.id+'>'+this.name+'</option>').val(me.groupid);
	                    								if(this.id==me.groupid){   	
	                    									$(this.teams).each(function(){
	                    										$('select[name="teamid"]').append('<option value='+this.id+'>'+this.name+'</option>');
	                    										if(this.id==me.teamid){
		                        									$('select[name="teamid"]').val(me.teamid);
	                            								}
	                        								});
	                    								}
	                    							})
            									}
                							})
                    					}
                    				})
                    			}
                    		}
                    	});
                        $('input[name="starttime"]').val(this.starttime);
                        $('input[name="endtime"]').val(this.endtime);
                    }
                })
            } else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}
		}
    })
    $('.main .button button.submit').click(function(){
        var data = $('form').serializeArray();
        for (var i = 0, obj = {}; i < data.length; i++) {
            var name = data[i].name;
            var value = data[i].value;
            obj[name] = value;
        }
        obj.status=1;
        obj = JSON.stringify(obj);
        $.ajax({
            url:'../../v1/manager/partner/'+partnerid+'/private/'+privateid,
            data:obj,
            type:'put',
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    window.parent.alertFn('编辑成功');
                    window.location='partnerMatch.html?partnerid='+partnerid;
                } else if (data.resultcode == 998) {
					window.parent.alertFn('登录失效，请重新登录');
					window.parent.returnLogin();
				} else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    })
}else{
	//默认开始时间为今天，默认结束时间为明天
	var date=new Date();
	var y=date.getFullYear();
	var M=date.getMonth()+1;
	var d=date.getDate();
	M=M<10?('0'+M):M;
	d=d<10?('0'+d):d;
	$('input.date').val(y+'-'+M+'-'+d);
	$('input[name="endtime"]').val(y+'-'+M+'-'+(d+1));
	$.ajax({
		url:'../../v1/manager/common/leagueteam',
		type:'get',
		contenType:'application/json',
		success:function(data){
			if(data.resultcode==1000){
				$('select[name="leagueid"]').html('');
				$('select[name="groupid"]').html('<option value="0">所有分组</option>');
				$('select[name="teamid"]').html('<option value="0">所有球队</option>');
				$(data.leagueteams).each(function(){
					$('input[name="leagueyear"]').val('2016');
					var leagueyear=2016;
					if(this.leagueyear==leagueyear){
						$(this.leagues).each(function(){
							$('select[name="leagueid"]').append('<option value='+this.id+'>'+this.name+'</option>');
							$('select[name="leagueid"]').val('1');
							if(this.id=='1'){
								$(this.groups).each(function(){
									$('select[name="groupid"]').append('<option value='+this.id+'>'+this.name+'</option>');
									$('select[name="groupid"]').val('0');
//									if(this.id==1){
//										$(this.teams).each(function(){
//											$('select[name="teamid"]').append('<option value='+this.id+'>'+this.name+'</option>');
//										})
//									}
									
								})
							}
							
						})
					}
				})
			} else if (data.resultcode == 998) {
				window.parent.alertFn('登录失效，请重新登录');
				window.parent.returnLogin();
			}
		}
	});
	//form表单提交
    $('.main .button button.submit').click(function(){
        var data = $('form').serializeArray();
        for (var i = 0, obj = {}; i < data.length; i++) {
            var name = data[i].name;
            var value = data[i].value;
            obj[name] = value;
        }
        obj = JSON.stringify(obj);
        $.ajax({
            url:'../../v1/manager/partner/'+partnerid+'/private',
            data:obj,
            type:'post',
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    window.parent.alertFn('新增成功');
                    window.location='partnerMatch.html?partnerid='+partnerid;
                } else if (data.resultcode == 998) {
					window.parent.alertFn('登录失效，请重新登录');
					window.parent.returnLogin();
				} else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    })
}
