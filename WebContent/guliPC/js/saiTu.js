var saiTuManager = function() {
	return {
		init : function() {
			saiTuManager.setListener();
		},setListener:function(){
			/*大图左边单击向左翻*/
			$("[name='saiTuDisplay']").on("click"," [target='leftSaiTu']",function(){
				//更新下面的
				$.each($(this).next().find("[class='p1']:visible"),function(key,value){//显示正在显示的大图 
					$(value).prev("div").show().siblings().hide();
				});
				//更新本行小图
				$.each($(this).parents("[name='commentLI']").find("[name='commentPictureList'] .printCurr"),function(key,value){
					$(value).prev("dd").attr("class","printCurr").siblings().removeAttr("class");
				});
			});
			/*大图右边单击向右翻*/
			$("[name='saiTuDisplay']").on("click"," [target='rightSaiTu']",function(){
				//更新下面大图
				$.each($(this).prev().find("[class='p1']:visible"),function(key,value){//显示正在显示的大图
					$(value).next("div").show().siblings().hide();
				});
				//更新本行小图
				$.each($(this).parents("[name='commentLI']").find("[name='commentPictureList'] .printCurr"),function(key,value){
					$(value).next("dd").attr("class","printCurr").siblings().removeAttr("class");
				});
			});
			
			$("[name='commentPictureList']").on("click"," img",function(){
				var currentSrc=$(this).attr("src");
				var img=$(this).parents("dd");
				$(this).parents("dd").attr("class","printCurr").siblings().removeAttr("class");
				var displayPictureStatue="";
				//获取已经选择的 大图的src
				$.each($(this).parents("[name='commentLI']").find("[name='saiTuDisplay'] .p1"),function(key, value){
					if($(value).css("display")=="block"){
						displayPictureStatue=$(value).find("img").attr("src");
					}
				});
				$.each($(this).parents("[name='commentLI']").find("[name='saiTuDisplay'] img[src='"+$(this).attr("src")+"']"),function(key,value){
					var p1State=$(value).parents("[name='saiTuDisplay']").css("display");
					if(displayPictureStatue==currentSrc && p1State=="block"){
						$(this).parents("[name='saiTuDisplay']").hide();
						$(img).removeAttr("class");
					}else{
						$(this).parents("[name='saiTuDisplay']").show();				
						$(value).parents(".p1").show().siblings().hide();
					}
				});
			});
		}
	};
}();


//评论晒图多张滚动
//var Speed_1 = 0; // 速度(毫秒)
//var Space_1 = 20; // 每次移动(px)
//var PageWidth_1 = 900; // 翻页宽度
//var interval_1 = 500000; // 翻页间隔时间
//var fill_1 = 1; // 整体移位
//var MoveLock_1 = false;
//var MoveTimeObj_1;
//var MoveWay_1 = "right";
//var Comp_1 = 0;
//var AutoPlayObj_1 = null;
/**
 * 
 * @param objName
 * @returns
 */
//function GetObj(objName) {
//	if (document.getElementById) {
//		return eval('document.getElementById("' + objName + '")');
//	} else {
//		return eval('document.all.' + objName);
//	}
//}
//function AutoPlay_1() {
//	clearInterval(AutoPlayObj_1);
//	AutoPlayObj_1 = setInterval('ISL_GoDown_1();ISL_StopDown_1();', interval_1);
//}
///*鼠标按键被按*/
//function ISL_GoUp_1() {
//	if (MoveLock_1)
//		return;
//	clearInterval(AutoPlayObj_1);
//	MoveLock_1 = true;
//	MoveWay_1 = "left";
//	MoveTimeObj_1 = setInterval('ISL_ScrUp_1();', Speed_1);
//}
///*鼠标经过时*/
//function ISL_StopUp_1() {
//	if (MoveWay_1 == "right") {
//		return
//	}
//	;
//	clearInterval(MoveTimeObj_1);
//	if ((GetObj('ISL_Cont_1').scrollLeft - fill_1) % PageWidth_1 != 0) {
//		Comp_1 = fill_1 - (GetObj('ISL_Cont_1').scrollLeft % PageWidth_1);
//		CompScr_1();
//	} else {
//		MoveLock_1 = false;
//	}
//	AutoPlay_1();
//}
///**
// * 
// */
//function ISL_ScrUp_1() {
//	if (GetObj('ISL_Cont_1').scrollLeft <= 0) {
//		GetObj('ISL_Cont_1').scrollLeft = GetObj('ISL_Cont_1').scrollLeft
//				+ GetObj('List1_1').offsetWidth;
//	}
//	GetObj('ISL_Cont_1').scrollLeft -= Space_1;
//}
///**
// * 
// */
//function ISL_GoDown_1() {
//	clearInterval(MoveTimeObj_1);
//	if (MoveLock_1)
//		return;
//	clearInterval(AutoPlayObj_1);
//	MoveLock_1 = true;
//	MoveWay_1 = "right";
//	ISL_ScrDown_1();
//	MoveTimeObj_1 = setInterval('ISL_ScrDown_1()', Speed_1);
//}
///*鼠标离开*/
//function ISL_StopDown_1() {
//	if (MoveWay_1 == "left") {
//		return
//	}
//	;
//	clearInterval(MoveTimeObj_1);
//	if (GetObj('ISL_Cont_1').scrollLeft % PageWidth_1
//			- (fill_1 >= 0 ? fill_1 : fill_1 + 1) != 0) {
//		Comp_1 = PageWidth_1 - GetObj('ISL_Cont_1').scrollLeft % PageWidth_1
//				+ fill_1;
//		CompScr_1();
//	} else {
//		MoveLock_1 = false;
//	}
//	AutoPlay_1();
//}
///**
// * 
// */
//function ISL_ScrDown_1() {
//	if (GetObj('ISL_Cont_1').scrollLeft >= GetObj('List1_1').scrollWidth) {
//		GetObj('ISL_Cont_1').scrollLeft = GetObj('ISL_Cont_1').scrollLeft
//				- GetObj('List1_1').scrollWidth;
//	}
//	GetObj('ISL_Cont_1').scrollLeft += Space_1;
//}
///**
// * 
// */
//function CompScr_1() {
//	if (Comp_1 == 0) {
//		MoveLock_1 = false;
//		return
//	}
//	var num, TempSpeed = Speed_1, TempSpace = Space_1;
//	if (Math.abs(Comp_1) < PageWidth_1 / 2) {
//		TempSpace = Math.round(Math.abs(Comp_1 / Space_1));
//		if (TempSpace < 1) {
//			TempSpace = 1;
//		}
//	}
//	if (Comp_1 < 0) {
//		if (Comp_1 < -TempSpace) {
//			Comp_1 += TempSpace;
//			num = TempSpace;
//		} else {
//			num = -Comp_1;
//			Comp_1 = 0;
//		}
//		GetObj('ISL_Cont_1').scrollLeft -= num;
//		setTimeout('CompScr_1()', TempSpeed);
//	} else {
//		if (Comp_1 > TempSpace) {
//			Comp_1 -= TempSpace;
//			num = TempSpace;
//		} else {
//			num = Comp_1;
//			Comp_1 = 0;
//		}
//		GetObj('ISL_Cont_1').scrollLeft += num;
//		setTimeout('CompScr_1()', TempSpeed);
//	}
//}
///**
// * 
// */
//function picrun_ini() {
//	GetObj("List2_1").innerHTML = GetObj("List1_1").innerHTML;
//	GetObj('ISL_Cont_1').scrollLeft = fill_1 >= 0 ? fill_1
//			: GetObj('List1_1').scrollWidth - Math.abs(fill_1);
//	GetObj("ISL_Cont_1").onmouseover = function() {
//		clearInterval(AutoPlayObj_1);
//	};
//	GetObj("ISL_Cont_1").onmouseout = function() {
//		AutoPlay_1();
//	};
//	AutoPlay_1();
//}