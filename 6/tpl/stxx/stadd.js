/**
 * Created by admin on 2016/11/4.
 */
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
$('select[name="leaguecode"]').change(function(){
	if($(this).val()==''){
		$('select[name="teamcode"]').html('');
		$('select[name="teamcode"]').append('<option value="">--全部球队--</option>');
	}else{
	$.ajax({
		url:'../../v1/menu/team/'+$('select[name="leaguecode"]').val(),
		type:'GET',
		contentType:'application/json',
        dataType:'json',
		success:function(data){
			if(data.resultcode==1000){
				$('select[name="teamcode"]').html('');
				$(data.leagues).each(function(){
					$('select[name="teamcode"]').append('<option value='+this.code+'>'+this.name+'</option>');
				})
			}else if(data.resultcode==998){
				window.parent.returnLogin();
		    }
			
		}
	});}
})
list();
$('button.submit').click(function(e){
    e.preventDefault();
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }

    obj.text=obj.editorValue;
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/injury',
        type:'POST',
        data:obj,
        contentType:'application/json',
        datatype:'json',
        success:function(data){
        	console.log(data.msg)
            if(data.resultcode==1000){
                if(confirm('添加成功')){
                	 window.location = 'stxx.html';
                }
            }else if(data.resultcode==998){
				window.parent.returnLogin();
            }else if(data.resultcode==1999){
            	alert(data.msg);
            }
        }
    })
})