//TODO 文本编辑器
//KindEditor.ready(function (K) {
//    window.editor = K.create('#editor_id',
//        {
//            resizeType: 1,
//            allowPreviewEmoticons: false,
//            allowImageUpload: true,
//            uploadJson: '../v1/comment/photoUpload',
////            allowFileManager: true,
//            items: [
//                    'preview', 'undo', 'redo', 'italic', 'underline', 'bold', 'fontsize' , 'forecolor',
//'image', 'media'
//                ]
//        });
//   
//});
initkindEditor();
//初始化富文本
function initkindEditor() {
    KindEditor.ready(function (K) {
        var editor = K.create('#editor_id', {
            allowFileManager: true,
            themeType: "simple",
            uploadJson: '../../v1/photoUpload',
            resizeType: 1,
            pasteType: 2,
            syncType: "",
            filterMode: true,
            allowPreviewEmoticons: false,
            allowImageUpload: true,
            items: [
                    'preview', 'undo', 'redo', 'italic', 'underline', 'bold', 'fontsize' , 'forecolor',
'image', 'media'
               ],
            afterCreate: function () {
                this.sync();
            },
            afterBlur: function () {
                this.sync();
            },
            afterChange: function () {
               //富文本输入区域的改变事件，一般用来编写统计字数等判断
                 K('.word_count1').html("最多20000个字符,已输入" + this.count() + "个字符");
            },
            afterUpload:function(url){
              //上传图片后的代码
            },
            allowFileManager: false,
            allowFlashUpload: false,
            allowMediaUpload: false,
            allowFileUpload: false
        });
		var options = {
		        cssPath: '/css/index.css',
		        filterMode: true
		    };
		    var editor = K.create('textarea[name="text"]', options);
		    html = editor.html();
		    editor.sync();
		    html = document.getElementById('editor_id').value;
		    $("#editor_id").val(html);
    });
}