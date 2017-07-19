var totalpage=1;
//页码加载项
function pageAdd(totalpage){
	console.log(totalpage);
	if(totalpage==1){
		$('.tcdPageCode').hide();
	}else{
		$('.tcdPageCode').show();
		$("#tcdPageCode").Page({
			totalPages: totalpage,//分页总数
			liNums: 7,//分页的数字按钮数(建议取奇数)
			activeClass: 'activP', //active 类样式定义
			callBack : function(page){
				//console.log(page);
				listFn(page);
			}
		});
	}
}
//pageAdd(9);
//初始化列表加载
listFn(1);
//改变select
$(".header select").change(function () {
	totalpage=1;
	pageAdd(1);
	//加载列表
	listFn(1);
})
//手机号输入
$(".header .select input").keyup(function (event) {
	totalpage=1;
	pageAdd(1);
	//回车搜索
//	if(event.keyCode==13){
//		listFn(1);
//	}
	this.value=this.value.replace(/\D/g,'');
	listFn(1);
})
//搜索按钮
$(".header i").click(function () {
	totalpage=1;
	pageAdd(1);
	//加载列表
	listFn(1);
})

//加载用户列表
function listFn(page) {
	var channelid = $(".header select option:checked").val();
	var mobile=$(".header input").val();
	if(mobile == "") {
		mobile = "m";
	}
	$.ajax({
		type:"get",
		url:"../../v1/manager/user/"+channelid+"/"+mobile+"/"+page,
		async:true,
		success:function (data) {
			if (data.resultcode==1000) {
				if (totalpage!=data.totalpage){
					totalpage=data.totalpage;
					pageAdd(data.totalpage);	
				}
				var tr='';
				for (i in data.users) {
					//判断激活、冻结
					if (data.users[i].status==0) {
						tr += '<tr class="disabled" data-id="'+
						data.users[i].id+'"><td>'+
						panduan(data.users[i].name)+'</td><td>'+
	                    data.users[i].nickname+'</td><td>'+
	                    panduan(data.users[i].hostname)+'</td><td>'+
	                    data.users[i].createtime+'</td><td>'+
	                    ["自家平台","微信","QQ"][data.users[i].src]+'</td><td>'+
	                    data.users[i].channelname+'</td><td>'+
	                    panduan(data.users[i].mobile)+'</td><td><span>开言</span><span>激活</span><span>重置密码</span></td></tr>';
					}else{
						tr += '<tr data-id="'+
						data.users[i].id+'"><td>'+
						panduan(data.users[i].name)+'</td><td>'+
	                    data.users[i].nickname+'</td><td>'+
	                    panduan(data.users[i].hostname)+'</td><td>'+
	                    data.users[i].createtime+'</td><td>'+
	                    ["自家平台","微信","QQ"][data.users[i].src]+'</td><td>'+
	                    data.users[i].channelname+'</td><td>'+
	                    panduan(data.users[i].mobile)+'</td><td>'+
	                    talkFn(data.users[i].status)+'<span>冻结</span><span>重置密码</span></td></tr>';
					}
				}
				//写入页面
				$("tbody").html(tr);
			}else if (data.resultcode==999) {
				//未数据
				$("tbody").html('<tr><td colspan="8">没有查询到符合条件的数据</td></tr>');
				pageAdd(1);
			}else if(data.resultcode==998){
				//未登录
				window.parent.alertFn(data.msg);
				window.parent.alertFn('登录失效，请重新登录');
	            window.parent.returnLogin();
			}
		},
		error:function () {
			console.log("请求错误");
		}
	});
}

//列表禁言开言
function talkFn(status) {
	if (status==1) {
		return '<span>禁言</span>';
	} else{
		return '<span class="disabled">开言</span>';
	}
}

//修改密码弹框显示
$('#box div.content tbody').on('click','tr td span:nth-child(3)',function(){
    $('#updatePassWord').show();
    //写入昵称
    $(".updatePassWord h3").html($(this).parents("tr").children("td").eq(1).html());
    //写入id
    $(".updatePassWord").attr("data-id",$(this).parents("tr").attr("data-id"));
    //清空密码输入框
    $(".updatePassWord .newpassword").val("");
    $(".updatePassWord .relpassword").val("");
})
//弹框取消
$('#updatePassWord button.gray').click(function(){
    $('#updatePassWord').hide();
})
//弹框关闭
$('#updatePassWord p.tishi span').click(function(){
    $('#updatePassWord').hide();
})
//修改密码
$('#updatePassWord button.red').click(function(){
    var newpassword = $(".updatePassWord .newpassword").val();
    var relpassword = $(".updatePassWord .relpassword").val();
    var id = $(".updatePassWord").attr("data-id");
    //长度大于等于6位
    if (newpassword.length>=6) {
    	//两次输入密码相同
    	if (newpassword==relpassword) {
    		$.ajax({
    			type:"post",
    			url:"../../v1/manager/user/updatepassword/"+id,
    			async:true,
    			data:JSON.stringify({newpassword:relpassword}),
    			contentType:'application/json',
    			success:function (data) {
    				if (data.resultcode==1000) {
    					//关闭弹窗
    					$('#updatePassWord').hide();
    					window.parent.alertFn(data.msg);
    				}else if(data.resultcode==998){
    					//未登录
    					window.parent.alertFn('登录失效，请重新登录');
	                	window.parent.returnLogin();
    				} else{
    					window.parent.alertFn(data.msg);
    				}
    			},
    			error:function () {
    				console.log("请求错误");
    			}
    		});
    	} else{
    		window.parent.alertFn('两次输入密码不同');
    	}
    } else{
    	window.parent.alertFn('密码长度不符（6-20位）');
    }
})
//禁言
$("tbody").on("click","td span:nth-child(1)",function () {
	var id = $(this).parents("tr").attr("data-id");
	var thisBtn=$(this);
	//样式改变
	if ($(this).attr("class")=="disabled") {
		$.ajax({
			type:"get",
			url:"../../v1/manager/user/updatestatus/"+id+"/1",
			async:true,
			success:function (data) {
				if (data.resultcode==1000) {
					//成功
					thisBtn.html("禁言");
					thisBtn.removeClass();
				}else if (data.resultcode == 998) {
	                window.parent.alertFn('登录失效，请重新登录');
	                window.parent.returnLogin();
	            } else{
	                window.parent.alertFn(data.msg);
	            }
			},
			error:function () {
				console.log("请求错误");
			}
		});
	} else{
		if ($(this).parents("tr").attr("class")!='disabled') {
			$.ajax({
				type:"get",
				url:"../../v1/manager/user/updatestatus/"+id+"/2",
				async:true,
				success:function (data) {
					if (data.resultcode==1000) {
						//成功
						thisBtn.html("开言");
						thisBtn.addClass("disabled");
					}else if (data.resultcode == 998) {
		                window.parent.alertFn('登录失效，请重新登录');
		                window.parent.returnLogin();
		            } else{
		                window.parent.alertFn(data.msg);
		            }
				},
				error:function () {
					console.log("请求错误");
				}
			});
		}
	}
})
//冻结激活
$("tbody").on("click","td span:nth-child(2)",function () {
	var id = $(this).parents("tr").attr("data-id");
	var thisBtn=$(this);
	if ($(this).html()=="冻结") {
		$.ajax({
			type:"get",
			url:"../../v1/manager/user/updatestatus/"+id+"/0",
			async:true,
			success:function (data) {
				if (data.resultcode==1000) {
					//成功
					thisBtn.html("激活");
					thisBtn.prev().removeClass();
					thisBtn.prev().html("开言");
					thisBtn.parents("tr").addClass("disabled");
				}else if (data.resultcode == 998) {
	                window.parent.alertFn('登录失效，请重新登录');
	                window.parent.returnLogin();
	            } else{
	                window.parent.alertFn(data.msg);
	            }
			},
			error:function () {
				console.log("请求错误");
			}
		});
	} else{
		$.ajax({
			type:"get",
			url:"../../v1/manager/user/updatestatus/"+id+"/1",
			async:true,
			success:function (data) {
				if (data.resultcode==1000) {
					//成功
					thisBtn.html("冻结");
					thisBtn.parents("tr").removeClass();
					thisBtn.prev().html("禁言")
				}else if (data.resultcode == 998) {
	                window.parent.alertFn('登录失效，请重新登录');
	                window.parent.returnLogin();
	            } else{
	                window.parent.alertFn(data.msg);
	            }
			},
			error:function () {
				console.log("请求错误");
			}
		});
	}
})
//判断返回数据是否为空
function panduan(x){
	return x==""||x==undefined?'-':x;
}
