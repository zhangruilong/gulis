$(document).ready(function(){
	$("#skeyword").val('搜索');
	$("#skeyword").focus(function(){
		$(this).val('');
	});
	$("#search_bu").bind("click",function(){
		if($("#skeyword").val()==''){
			alert("搜索内容不能为空");
			return false;
		}
	});

})

//首页滚动横幅
var currentindex=1;
$("#flashBg").css("background-color",$("#flash1").attr("name"));
function changeflash(i) {	
currentindex=i;
for (j=1;j<=5;j++){//此处的5代表你想要添加的幻灯片的数量与下面的5相呼应
	if (j==i) 
	{$("#flash"+j).fadeIn("normal");
	$("#flash"+j).css("display","block");
	$("#f"+j).removeClass();
	$("#f"+j).addClass("dq");
	$("#flashBg").css("background-color",$("#flash"+j).attr("name"));
	}
	else
	{$("#flash"+j).css("display","none");
	$("#f"+j).removeClass();
	$("#f"+j).addClass("no");}
}}
function startAm(){
timerID = setInterval("timer_tick()",5000);//5000代表间隔时间设置
}
function stopAm(){
clearInterval(timerID);
}
function timer_tick() {
    currentindex=currentindex>=5?1:currentindex+1;//此处的5代表幻灯片循环遍历的次数
	changeflash(currentindex);}
$(document).ready(function(){
$(".flash_bar div").mouseover(function(){stopAm();}).mouseout(function(){startAm();});
startAm();
});



//五洲卡滚动横幅
var wzk_currentindex=1;
$("#flashBg").css("background-color",$("#wzk-flash").attr("name"));
function wzk_changeflash(i) {	
	wzk_currentindex = i;
	for (var j = 1; j <= 4; j++){//此处的4代表你想要添加的幻灯片的数量与下面的4相呼应
		if (j == i){
			$("#wzk_flash"+j).fadeIn("normal");
			$("#wzk_flash"+j).css("display","block");
			$("#wzk_"+j).removeClass();
			$("#wzk_"+j).addClass("dq");
			$("#flashBg").css("background-color",$("#wzk_flash"+j).attr("name"));
		} else {
			$("#wzk_flash"+j).css("display","none");
			$("#wzk_"+j).removeClass();
			$("#wzk_"+j).addClass("no");
		}
	}
}
function wzk_startAm(){
	timerID = setInterval("wzk_timer_tick()",5000);//5000代表间隔时间设置
}
function wzk_stopAm(){
	clearInterval(timerID);
}
function wzk_timer_tick() {
	wzk_currentindex = wzk_currentindex >= 4 ? 1 : wzk_currentindex + 1;//此处的5代表幻灯片循环遍历的次数
    wzk_changeflash(wzk_currentindex);
}
$(document).ready(function(){
	$(".wzk_flash_bar div").mouseover(
			function(){
				wzk_stopAm();
	}).mouseout(
			function(){
				wzk_startAm();
			}
	);
	wzk_startAm();
}
);


/*点击后添加样式 标签*/
$(function(){
	    var $div_li =$(".navMenu li");
	    $div_li.click(function(){
			$(this).addClass("selected")            //当前<li>元素高亮
				   .siblings().removeClass("selected");  //去掉其他同辈<li>元素的高亮
		});
});

/*筛选点击后添加样式 标签*/
$(function(){
	    var $div_li =$(".flbbblock span");
	    $div_li.click(function(){
			$(this).addClass("selected")            //当前<span>元素高亮
				   .siblings().removeClass("selected");  //去掉其他同辈<span>元素的高亮
		})
})

//商家特卖类别切换
$(function(){		
	//设计案例切换
	$('.title-list li').mouseover(function(){
		var liindex = $('.title-list li').index(this);
		$(this).addClass('on').siblings().removeClass('on');
		$('.product-wrap div.productTab').eq(liindex).fadeIn(150).siblings('div.productTab').hide();
		var liWidth = $('.title-list li').width();
		$('.switchTab .title-list p').stop(false,true).animate({'left' : liindex * liWidth + 'px'},300);
	});
	
	//设计案例hover效果
	$('.product-wrap .productTab li').hover(function(){
		$(this).css("border-color","#FFFFFF"); //鼠标滑过边框样式
		$(this).find('p > a').css('color','#ff6600');
	},function(){
		$(this).css("border-color","#FFFFFF");
		$(this).find('p > a').css('color','#666666');
	});
	});