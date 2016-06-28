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
//搜索框
$(document).ready(function() {
	$("#skeyword").val('搜索');
	$("#skeyword").focus(function() {
		$(this).val('');
	});
	$("#search_bu").bind("click", function() {
		if ($("#skeyword").val() == '') {
			alert("搜索内容不能为空");
			return false;
		}
	});

});

// 商家特卖类别,评价Tab切换
$(function() {
	// 设计案例切换
	$('.title-list li').click(
			function() {
				var liindex = $('.title-list li').index(this);
				$(this).addClass('on').siblings().removeClass('on');
				$('.product-wrap div.productTab').eq(liindex).fadeIn(150)
						.siblings('div.productTab').hide();
				var liWidth = $('.title-list li').width();
				$('.switchTab .title-list p').stop(false, true).animate({
					'left' : liindex * liWidth + 'px'
				}, 300);
			});

	// 设计案例hover效果
	$('.product-wrap .order-payWay li').click(function() {
		$(this).css("border-color", "#FFFFFF"); // 鼠标滑过边框样式
		$(this).find('p > a').css('color', '#ff6600');
	}, function() {
		// $(this).css("border-color","#FECB38");
		$(this).addClass("orSelected").siblings().removeClass("orSelected");
		$(this).find('p > a').css('color', '#666666');
	});
});

// 点击评论弹出评论框
function anli_sort() {
	if ($(".sort_c1").is(":visible") == false) {
		// $("#sort_nav").attr("class","sort_nav_cur");
		$(".sort_c1").show(400);
	} else {
		// $("#sort_nav").attr("class","sort_nav");
		$(".sort_c1").hide(400);
	}
}

// 主导航菜单二级菜单显示
$(function() {
	$(".mainMenu-l").find("li").hover(function() {
		$(this).children(".mainMenu-z").show();
	}, function() {
		$(this).children(".mainMenu-z").hide();
	});
});

$(function() {
	$(".navMenu-all").hover(function() {
		// menu_show();
		$(".menu_sh").fadeIn(300);
	}, function() {
		$(".menu_sh").fadeOut(300);
	});
});

function menu_show() {
	if ($(".menu_sh").is(":visible") == false) {
		$(".menu_sh").show();
	} else {
		$(".menu_sh").hide();
	}
}

// 二维码关闭
function codeClose() {
	if ($(".site-qrCode").is(":visible") == false) {
		$(".site-qrCode").show();
	} else {
		$(".site-qrCode").hide();
	}
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

// 点击添加新地址
function add_address() {
	if ($(".addressNew").is(":visible") == false) {
		$(".addressNew").show(100);
	} else {
		$(".addressNew").hide(100);
	}
}

/* 首页导航点击选择后 */
$(function() {
	var $div_li = $(".navMenu li");
	$div_li.click(function() {
		$(this).addClass("selected") // 当前<li>元素高亮
		.siblings().removeClass("selected"); // 去掉其他同辈<li>元素的高亮
	});
});

/* 用户中心左侧导航点击后 标签 */
$(function() {
	var $menu_h = $(".Umenu-area dd");
	$menu_h.click(function() {
		$(this).addClass("selected").siblings().removeClass("selected");
	});
});

/* 支付选择点击后 标签 */
$(function() {
	var $wz_pay = $(".wz_pay span");
	$wz_pay.click(function() {
		$(this).addClass("orSelected").siblings().removeClass("orSelected");
	});
});
/* 支付选择点击后 标签 */
$(function() {
	var $wz_pay = $(".order-payWay li");
	$wz_pay.click(function() {
		$(this).addClass("orSelected").siblings().removeClass("orSelected");
	});
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
					// var rTop =
					// $(window).height()-s-jQuery(".rightSide").height()-20;
					// jQuery(".rightSide").css({"top": rTop+"px"});
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

var isMemberLogin = false;
function isLogin(url) {
	if (isMemberLogin) {
		window.location.href = url;
	}

	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"async" : false,
		"url" : ctx + '/member/islogin?now=' + new Date().getTime(),
		"data" : {},
		"success" : function(dto) {
			if (dto.type != 'success') {

				window.location.href = ctx + '/user/login.html?redirectUrl='
						+ url;
				return;
			}
			isMemberLogin = true;
			window.location.href = url;

		}
	});

}

// 评论晒图多张滚动
var Speed_1 = 0; // 速度(毫秒)
var Space_1 = 20; // 每次移动(px)
var PageWidth_1 = 900; // 翻页宽度
var interval_1 = 500000; // 翻页间隔时间
var fill_1 = 1; // 整体移位
var MoveLock_1 = false;
var MoveTimeObj_1;
var MoveWay_1 = "right";
var Comp_1 = 0;
var AutoPlayObj_1 = null;
function GetObj(objName) {
	if (document.getElementById) {
		return eval('document.getElementById("' + objName + '")')
	} else {
		return eval('document.all.' + objName)
	}
}
function AutoPlay_1() {
	clearInterval(AutoPlayObj_1);
	AutoPlayObj_1 = setInterval('ISL_GoDown_1();ISL_StopDown_1();', interval_1)
}
function ISL_GoUp_1() {
	if (MoveLock_1)
		return;
	clearInterval(AutoPlayObj_1);
	MoveLock_1 = true;
	MoveWay_1 = "left";
	MoveTimeObj_1 = setInterval('ISL_ScrUp_1();', Speed_1);
}
function ISL_StopUp_1() {
	if (MoveWay_1 == "right") {
		return
	}
	;
	clearInterval(MoveTimeObj_1);
	if ((GetObj('ISL_Cont_1').scrollLeft - fill_1) % PageWidth_1 != 0) {
		Comp_1 = fill_1 - (GetObj('ISL_Cont_1').scrollLeft % PageWidth_1);
		CompScr_1()
	} else {
		MoveLock_1 = false
	}
	AutoPlay_1()
}
function ISL_ScrUp_1() {
	if (GetObj('ISL_Cont_1').scrollLeft <= 0) {
		GetObj('ISL_Cont_1').scrollLeft = GetObj('ISL_Cont_1').scrollLeft
				+ GetObj('List1_1').offsetWidth
	}
	GetObj('ISL_Cont_1').scrollLeft -= Space_1
}
function ISL_GoDown_1() {
	clearInterval(MoveTimeObj_1);
	if (MoveLock_1)
		return;
	clearInterval(AutoPlayObj_1);
	MoveLock_1 = true;
	MoveWay_1 = "right";
	ISL_ScrDown_1();
	MoveTimeObj_1 = setInterval('ISL_ScrDown_1()', Speed_1)
}
function ISL_StopDown_1() {
	if (MoveWay_1 == "left") {
		return
	}
	;
	clearInterval(MoveTimeObj_1);
	if (GetObj('ISL_Cont_1').scrollLeft % PageWidth_1
			- (fill_1 >= 0 ? fill_1 : fill_1 + 1) != 0) {
		Comp_1 = PageWidth_1 - GetObj('ISL_Cont_1').scrollLeft % PageWidth_1
				+ fill_1;
		CompScr_1()
	} else {
		MoveLock_1 = false
	}
	AutoPlay_1()
}
function ISL_ScrDown_1() {
	if (GetObj('ISL_Cont_1').scrollLeft >= GetObj('List1_1').scrollWidth) {
		GetObj('ISL_Cont_1').scrollLeft = GetObj('ISL_Cont_1').scrollLeft
				- GetObj('List1_1').scrollWidth
	}
	GetObj('ISL_Cont_1').scrollLeft += Space_1
}
function CompScr_1() {
	if (Comp_1 == 0) {
		MoveLock_1 = false;
		return
	}
	var num, TempSpeed = Speed_1, TempSpace = Space_1;
	if (Math.abs(Comp_1) < PageWidth_1 / 2) {
		TempSpace = Math.round(Math.abs(Comp_1 / Space_1));
		if (TempSpace < 1) {
			TempSpace = 1
		}
	}
	if (Comp_1 < 0) {
		if (Comp_1 < -TempSpace) {
			Comp_1 += TempSpace;
			num = TempSpace
		} else {
			num = -Comp_1;
			Comp_1 = 0
		}
		GetObj('ISL_Cont_1').scrollLeft -= num;
		setTimeout('CompScr_1()', TempSpeed)
	} else {
		if (Comp_1 > TempSpace) {
			Comp_1 -= TempSpace;
			num = TempSpace
		} else {
			num = Comp_1;
			Comp_1 = 0
		}
		GetObj('ISL_Cont_1').scrollLeft += num;
		setTimeout('CompScr_1()', TempSpeed)
	}
}
function picrun_ini() {
	GetObj("List2_1").innerHTML = GetObj("List1_1").innerHTML;
	GetObj('ISL_Cont_1').scrollLeft = fill_1 >= 0 ? fill_1
			: GetObj('List1_1').scrollWidth - Math.abs(fill_1);
	GetObj("ISL_Cont_1").onmouseover = function() {
		clearInterval(AutoPlayObj_1)
	}
	GetObj("ISL_Cont_1").onmouseout = function() {
		AutoPlay_1()
	}
	AutoPlay_1();
}
