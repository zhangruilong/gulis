// JavaScript Document
//返回空
function typeNullFoString(obj){
	if(obj == null || typeof(obj) == "undefined"){
		return '';
	} else {
		return obj;
	}
}
//取参数
function GetQueryString(paramName){
	var LocString=String(window.document.location.href);
	var rs=new RegExp("(^|)"+paramName+"=([^\&]*)(\&|$)","gi").exec(LocString),tmp;
	if(tmp=rs)return tmp[2];
	return "没有这个参数";
}

// 首页滚动横幅
var currentindex = 1;
$("#flashBg").css("background-color", $("#flash1").attr("name"));
function changeflash(i) {
	if($("#flash" + i).length == 0){
		i = 1;
	}
	currentindex = i;
	for (var j = 1; j <= 5; j++) {// 此处的5代表你想要添加的幻灯片的数量与下面的5相呼应
		if (j == i) {
			$("#flash" + j).fadeIn("normal");
			$("#flash" + j).css("display", "block");
			$("#f" + j).removeClass();
			$("#f" + j).addClass("dq");
			$("#flashBg").css("background-color", $("#flash" + j).attr("name"));
		} else {
			$("#flash" + j).css("display", "none");
			$("#f" + j).removeClass();
			$("#f" + j).addClass("no");
		}
	}
}
function startAm() {
	timerID = setInterval("timer_tick()", 5000);// 5000代表间隔时间设置
}
function stopAm() {
	clearInterval(timerID);
}
function timer_tick() {
	currentindex = currentindex >= 5 ? 1 : currentindex + 1;// 此处的5代表幻灯片循环遍历的次数
	changeflash(currentindex);
}

$(document).ready(function() {
	$(".flash_bar div").mouseover(function() {
		stopAm();
	}).mouseout(function() {
		startAm();
	});
	startAm();
});


/* 返回顶部 */

var vh = $(window).height();
// <!--返回顶部-->
$(".goTopBtn").css("display", "none");
var initTop = $(window).height() - jQuery(".UpTop").height() - 20;
jQuery(".UpTop").css({
	"top" : initTop + "px"
});
$(window).scroll(
		function() {
			var sc = $(window).scrollTop();
			var rwidth = $(window).width();
			if (sc > 0) {
				$(".goTopBtn").css("display", "block");
				$(".goTopBtn").css("left", (rwidth - 66) + "px");
				var fH = $("#footBot").offset().top;
				var sfH = fH - vh - sc;
				var sTop = $(window).height() - jQuery(".UpTop").height() - 20;
				jQuery(".UpTop").css({
					"top" : sTop + "px"
				});
				if (sfH <= 0) {
					var s = $(window).height()
							- [ jQuery("#footBot").offset().top
									- jQuery(document).scrollTop() ];
					sTop = $(window).height() - s - jQuery(".UpTop").height()
							- 20;
					jQuery(".UpTop").css({
						"top" : sTop + "px"
					});
				}
			} else {
				$(".goTopBtn").css("display", "none");
			}
		});
$("#goTopBtn").click(function() {
	var sc = $(window).scrollTop();
	$('body,html').animate({
		scrollTop : 0
	}, 500);
});
