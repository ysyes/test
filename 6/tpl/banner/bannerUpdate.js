/**
 * Created by admin on 2016/11/10.
 */
function previewImage(file) {
    var MAXWIDTH = 280;
    var MAXHEIGHT = 162;
    var div = document.getElementById('preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
//                  img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {top: 0, left: 0, width: width, height: height};
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
var id=window.location.href.split('=')[1];
console.log(id);
function load(){
    $.ajax({
        url:'../../v1/rotateplay/update/init/'+id,
        type:'GET',
        contentType:'application/json',
        success:function(data){
            if(data.resultcode==1000){
                $('input[name="title"]').val(data.title);
                $('#imghead').attr('src',data.img);
                $('#ueditor_0').contents().find('body.view').html(data.text);
            }else if(data.resultcode==998){
                window.parent.returnLogin();
            }
        }
    })
}
load();
//TODO form表单提交
$('button.submit').click(function(e){
    e.preventDefault();
    var data=$('form').serializeArray();
    for(var i= 0,obj={};i<data.length;i++){
        var name=data[i].name;
        var value=data[i].value;
        obj[name]=value;
    }
    if($('#preview img').attr('src')==undefined){
        obj.img='';
    }else{
        obj.img=$('#preview img').attr('src');
    }
    if(obj.editorValue==undefined){
    	obj.text=$('#ueditor_0').contents().find('body.view').html();
    }else{
        obj.text=obj.editorValue;
    }
    console.log(obj)
    obj=JSON.stringify(obj);
    $.ajax({
        url:'../../v1/rotateplay/update/'+id,
        type:'POST',
        data:obj,
        contentType:'application/json',
        datatype:'json',
        success:function(data){
            console.log(data.msg)
            if(data.resultcode==1000){
                if(confirm('修改成功')){
                    window.location = 'banner.html';
                }
            }else if(data.resultcode==998){
                window.parent.returnLogin();
            }else{
                alert(data.msg);
            }
        }
    })
})