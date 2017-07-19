/**
 * Created by admin on 2016/11/2.
 */
$('.page').on('click','ul li',function(){
    var length=$('.page li').length;
    if(($(this).index('.page li')+1)>=length){
        $('.page li:first-child').removeClass('disable');
        var index=$('.page li.active').index('.page li')+2;
        if(index===length){
            $('.page li:last-child').addClass('disable');
        }else{
            $('.page li.active').removeClass('active');
            $('.page li:nth-child('+index+')').addClass('active');
            if(index===length-1){
                $('.page li:last-child').addClass('disable');
            }
        }
    }else if($(this).index('.page li')===0){
        $('.page li:last-child').removeClass('disable');
        var index=$('.page li.active').index('.page li');
        if(index===1){
            $('.page li:first-child').addClass('disable');
        }else{
            $('.page li.active').removeClass('active');
            $('.page li:nth-child('+index+')').addClass('active');
            if(index===2){
                $('.page li:first-child').addClass('disable');
            }
        }
    }else if($(this).html()=='...'){
    	
    }else{
        $('.page li.active').removeClass('active');
        $(this).addClass('active');
        var index=$(this).index('.page li');
        if(index===length-2){
            $('.page li:first-child').removeClass('disable');
            $('.page li:last-child').addClass('disable');

        }else if(index===1){
            $('.page li:last-child').removeClass('disable');
            $('.page li:first-child').addClass('disable');
        }else{
            $('.page li:last-child').removeClass('disable');
            $('.page li:first-child').removeClass('disable');
        }
    }
})