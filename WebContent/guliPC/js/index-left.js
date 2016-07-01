var navH = $(".sp-Title").eq(0).offset().top;
var vh = $(window).height();
if (navH <= vh) {
	$(".site-left-menu").show();
	$(".site-left-menu").find("a").eq(0).addClass("current");
	$(".site-left-menu").css({
		"position" : "fixed",
		"top" : navH
	});
} else {
	$(".site-left-menu").hide();
}

$(window).scroll(function(){
	var sc=$(window).scrollTop();
	var tempH = sc+vh;
	if(tempH>=navH){ 
		$(".sp-Title").eq(0).attr("_sh", "y");
		var tempT = navH - sc;
		if (tempT<0) {
			tempT = 0;
		}
		$(".site-left-menu").show(); 
		$(".site-left-menu").css({"position":"fixed","top":tempT+"px"});
		
		var titles = $(".sp-Title");
		var tempArr = [];
		for (var i=0;i<titles.length;i++) {
			var item = $(titles).eq(i);
			var ih = item.offset().top;
			var oH = ih-sc;
			if (oH<=0)
				tempArr.push(i);
		}
		if (tempArr!=null && tempArr.length>0) {
			$(".site-left-menu").find("a").removeClass("current");
			$(".site-left-menu").find("a").eq(tempArr[tempArr.length-1]).addClass("current");
		}
	}else { 
		$(".site-left-menu").hide(); 
	}
	if(sc>0){
		var fH = $("#footBot").offset().top;
		var sfH = fH-vh-sc;
		if (sfH<=0) {
			var s = $(window).height()-[jQuery("#footBot").offset().top-jQuery(document).scrollTop()];
			var rTop = $(window).height()-s-jQuery(".rightSide").height()-20;
			jQuery(".rightSide").css({"top": rTop+"px"});
		}
	}
});
/*向下滚动固定右侧边栏*/
$(document).ready(function() {
    // Pin #1
    var pin = new $.Zebra_Pin($('#pin1'), {
            top_spacing: 10,
            contain: true
        }),
        $container = $('.pin1-container'),
        additional_height = -100;

    $('button').bind('click', function() {
        additional_height = additional_height * -1;
        $container.css('height', '+=' + additional_height);
        pin.update();
    });

    // Pin #2
    new $.Zebra_Pin($('#pin2'), {
        top_spacing: 10
    });

    // Pin #3
    new $.Zebra_Pin($('#pin3'), {
        hard: true
    });

});