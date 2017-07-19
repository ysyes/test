//停用启用样式切换
$('#box table tbody').on('click','td a:first-child',function(e){
    e.preventDefault();
    var privateid=$(this).parents('tr').attr('privateid');
    var me=this;
    if($(this).html()=='停用'){
        var obj=JSON.stringify({status:0})
        $.ajax({
            url:'../../v1/manager/partner/'+partnerid+'/private/'+privateid,
            type:'put',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('启用')
                    $(me).parents('tr').find('td').addClass('gray');
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    }else{
        var obj=JSON.stringify({status:1})
        $.ajax({
            url:'../../v1/manager/partner/'+partnerid+'/private/'+privateid,
            type:'put',
            data:obj,
            contentType:'application/json',
            success:function(data){
                if(data.resultcode==1000){
                    $(me).html('停用')
                    $(me).parents('tr').find('td').removeClass('gray');
                } else if (data.resultcode == 998) {
                    window.parent.alertFn('登录失效，请重新登录');
                    window.parent.returnLogin();
                }else{
                    window.parent.alertFn(data.msg);
                }
            }
        })
    }
})
//赛事下拉筛选
$.ajax({
	type:"get",
	url:"../../v1/manager/common/league",
	async:true,
	success:function (data) {
		if (data.resultcode == 1000) {
			var options = '';
			for (i in data.leagues) {
				options += '<option value="'+data.leagues[i].id+'">'+data.leagues[i].name+'</option>';
			}
			$("header div select.leagueid").append(options);
		}else if (data.resultcode == 998) {
			window.parent.alertFn('登录失效，请重新登录');
			window.parent.returnLogin();
		}else if (data.resultcode == 999) {
			$('#box table tbody').html('<tr><td colspan="9">没有查询到符合条件的数据</td></tr>')
		}else{
			window.parent.alertFn(data.msg);
		}
	}
});
//列表加载
var href=window.location.href;
var partnerid=href.split('=')[1];
//新增按钮加partnerid
$('#box header>a').attr('href','partnerMatchAdd.html?partnerid='+partnerid);
//列表加载
load(0,0);
function load(leagueyear,leagueid){
    $.ajax({
        url:'../../v1/manager/partner/'+partnerid+'/private/'+leagueyear+'/'+leagueid,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $('#box table tbody').html('');
                $(data.privates).each(function(){
                    if(this.status==1){
                        $('#box table tbody').append("<tr privateid="+this.id+"><td>"+this.leagueyear+"</td><td>"+this.leaguename+"</td><td>"+noneFn(this.groupname)+"</td><td>"+this.teamname+"</td><td>"+this.starttime+"</td><td>"+this.endtime+"</td><td><a href=''>停用</a><a href='partnerMatchAdd.html?partnerid="+partnerid+"&private="+this.id+"'>编辑</a></td></tr>");
                    }else{
                        $('#box table tbody').append("<tr privateid="+this.id+"><td class='gray'>"+this.leagueyear+"</td><td class='gray'>"+this.leaguename+"</td><td class='gray'>"+noneFn(this.groupname)+"</td><td class='gray'>"+this.teamname+"</td><td class='gray'>"+this.starttime+"</td><td class='gray'>"+this.endtime+"</td><td class='gray'><a href=''>启用</a><a href='partnerMatchAdd.html?partnerid="+partnerid+"&private="+this.id+"'>编辑</a></td></tr>");
                    }
                })
            }else if(data.resultcode==999){
                $('#box table tbody').html('<tr><td colspan="7">没有查询到符合条件的数据</td></tr>');
            } else if (data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            } else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
function noneFn(name) {
	if (name==undefined||name=="") {
		return "-"
	} else{
		return name;
	}
}
//改变筛选加载列表
$("header div select.leagueyear").change(function () {
	var leagueyear = $("header div select.leagueyear option:checked").val();
	var leagueid = $("header div select.leagueid option:checked").val();
	load(leagueyear,leagueid);
})
$("header div select.leagueid").change(function () {
	var leagueyear = $("header div select.leagueyear option:checked").val();
	var leagueid = $("header div select.leagueid option:checked").val();
	load(leagueyear,leagueid);
})
