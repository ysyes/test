/**
 * Created by admin on 2016/10/31.
 */
$('button.submit').click(function(){
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
//    obj.text=obj.editorValue;
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/notice',
        type:'POST',
        data:obj,
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
            	if(confirm('添加成功')){
               	 window.location = 'hdgl.html';
               }
            }else if(data.resultcode==1999){
            	alert(data.msg);
            }else if(data.resultcode==998){
                window.parent.returnLogin();
            }
        }
    })
})