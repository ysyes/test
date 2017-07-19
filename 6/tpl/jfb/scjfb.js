/**
 * Created by admin on 2016/11/2.
 */
$('div.content div.upload button').click(function(e){
    e.preventDefault();
});
function list(){
	$.ajax({
		url:'../../v1/menu/league',
		type:'GET',
		contentType:'application/json',
        dataType:'json',
		success:function(data){
			if(data.resultcode==1000){
				console.log(data)
				$(data.leagues).each(function(){
					$('select[name="leaguecode"]').append('<option value='+this.code+'>'+this.name+'</option>')
				})
			}else if(data.resultcode==998){
                window.parent.returnLogin();
		    }
			
		}
	});
}
list();
//设置赛事日期为今年
var date=new Date().getFullYear();
$('input.date').val(date);
$('div.button input.submit').click(function(e){
    e.preventDefault();
//    var data=$('form').serializeArray();
//    for(var i= 0,obj={};i<data.length;i++){
//        var name=data[i].name;
//        var value=data[i].value;
//        obj[name]=value;
//    }
//    obj.scoreexcel=$('input[name="scoreexcel"]').val();
//    if(obj.scoreexcel==''){
//    	alert("导入文件不能为空");
//    }
//    obj=JSON.stringify(obj);
//    console.log(obj);
    var formData=new FormData();
    formData.append('scoreexcel',$('input[name="scoreexcel"]')[0].files[0]);
    formData.append('leagueyear',$('input[name="leagueyear"]').val());
    $.ajax({
        url:"../../v1/score",
        data:formData,
//        enctype:"multipart/form-data",
        processData:false,
        type:'POST',
        dataType:'json',
        contentType:false,
        success:function(data){
        	if(data.resultcode==1000){
                if(confirm('添加成功')){
                	 window.location = 'jfb.html';
                }
            }else if(data.resultcode==998){
                window.parent.returnLogin();
            }else if(data.resultcode==1999){
            	alert(data.msg);
            }
        }
    })
})