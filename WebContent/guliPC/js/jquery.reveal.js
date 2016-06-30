// JavaScript Document
//这是一个弹窗脚本
var Reveal = function(){
	return {
		center : function(obj) {
			jQuery("body").append(jQuery("<div class='reveal-modal-bg'></div>"));
			jQuery(".reveal-modal-bg").show();
			obj.show();
			obj = obj.parent();
			var screenWidth = $(window).width();
			var screenHeight = $(window).height();  //当前浏览器窗口的 宽高
	        var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度
	        var objLeft = (screenWidth - obj.width())/2 ;
	        var objTop = (screenHeight - obj.height())/2+scrolltop;
							
	        obj.css({left: Math.ceil(objLeft) + 'px', top: objTop + 'px','display': 'block'});
	        //浏览器窗口大小改变时
	        $(window).resize(function() {
	            screenWidth = $(window).width();
	            screenHeight = $(window).height();
	            scrolltop = $(document).scrollTop();
	            objLeft = (screenWidth - obj.width())/2 ;
	            objTop = (screenHeight - obj.height())/2 + scrolltop;
	            obj.css({left: Math.ceil(objLeft) + 'px', top: objTop + 'px'});
	           
	        });
	        //浏览器有滚动条时的操作、
		  $(window).scroll(function() {
			  screenWidth = $(window).width();
			  screenHeight = $(window).height();
			  scrolltop = $(document).scrollTop();
			 
			  objLeft = (screenWidth - obj.width())/2 ;
			  objTop = (screenHeight - obj.height())/2 + scrolltop;
			  obj.css({left: Math.ceil(objLeft) + 'px', top: objTop + 'px'});
		  });
		  Reveal.check(obj, $('.close-reveal-modal'), $('.btn2'));
		},
		check : function(obj, obj1, obj2) {
			jQuery("[_type='_close']").live("click", function(){
				Reveal.close($('.reveal-modal-bg'), $('.pop-box'));
			})
//			obj1.click(function() {
////	            obj.hide();
//	            Reveal.close($('.reveal-modal-bg'), $('.pop-box'));
//	        });
//	        obj2.click(function() {
//	        	Reveal.close($('.reveal-modal-bg'), $('.pop-box'));
//	        }) ;
		},
		close : function(obj1, obj2) {
			obj1.remove();
	        obj2.hide();
		}
	};
}();
/*$(document).ready(function() {
    $('#add_shoppingcard_button').click(function() {       
        $('.reveal-modal-bg').css({'display': 'block'});
        $('#masdsad1').show();
        center($('.pop-box'));
        check($('.pop-box'), $('.close-reveal-modal'), $('.btn2'));
    });
    // 居中
    function center(obj) {
       
        var screenWidth = $(window).width();
		var screenHeight = $(window).height();  //当前浏览器窗口的 宽高
        var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度
        var objLeft = (screenWidth - obj.width())/2 ;
        var objTop = (screenHeight - obj.height())/2+scrolltop;
						
        obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
        //浏览器窗口大小改变时
        $(window).resize(function() {
            screenWidth = $(window).width();
            screenHeight = $(window).height();
            scrolltop = $(document).scrollTop();
            objLeft = (screenWidth - obj.width())/2 ;
            objTop = (screenHeight - obj.height())/2 + scrolltop;
            obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
           
        });
        //浏览器有滚动条时的操作、
	  $(window).scroll(function() {
		  screenWidth = $(window).width();
		  screenHeight = $(window).height();
		  scrolltop = $(document).scrollTop();
		 
		  objLeft = (screenWidth - obj.width())/2 ;
		  objTop = (screenHeight - obj.height())/2 + scrolltop;
		  obj.css({left: objLeft + 'px', top: objTop + 'px'});
	  });
       
    }
    //确定取消的操作
    function check(obj, obj1, obj2) {
        obj1.click(function() {
            obj.hide();
            closed($('.reveal-modal-bg'), $('.pop-box'));
        });
        obj2.click(function() {
            closed($('.reveal-modal-bg'), $('.pop-box'));
        }) ;
    }
    // 隐藏 的操作
    function closed(obj1, obj2) {
        obj1.hide();
        obj2.hide();
    }
   
});*/