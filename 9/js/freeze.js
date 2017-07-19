function freeze(name,id,me){
    $.ajax({
        url:'../../v1/manager/'+name+'/updatestatus/'+id,
        type:'get',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                if($(me).html()=='冻结'){
                    $(me).html('激活').addClass('able');
                    $(me).parents('tr').find('td').addClass('gray');
                }else{
                    $(me).html('冻结').removeClass('able');
                    $(me).parents('tr').find('td').removeClass('gray');
                }
            }else if(data.resultcode == 998) {
                window.parent.alertFn('登录失效，请重新登录');
                window.parent.returnLogin();
            }else{
                window.parent.alertFn(data.msg);
            }
        }
    })
}
