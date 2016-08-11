/*$(document).ready(function() {

	$("#pay_topbar_container").load("index_topbar_page.html",function(){
		bind_topbar_event();
	});

    $("#pay_navgationbar_container").load("index_navgationbar_page.html",function(){
    	bind_navgationbar_event();
	    //navgationbar加载完之后，再加载logobar
	    $("#pay_logobar_container").load("index_logobar_page.html",function(){
	    	
	    	bind_logobar_event();
	    });
    });
        //});
    $("#pay_bottom_container").load("index_bottom_page.html",function(){
    	bind_bottom_container_event();
    });
    bind_pay_event();
});*/

//绑定topbar事件
/*function bind_topbar_event(){
	$("#index_login_button").click(function(){
		window.location="login.html";
	});
	$("#index_register_button").click(function(){
		window.location="register.html";
	});
	$("#user_accountinfo").click(function(){
		window.location="information.html";
	});
	$("#topbar_userinfo").click(function(){
		window.location="information.html";
	});
	$("#topbar_receive_address").click(function(){
		window.location="information.html";
	});
	$("#topbar_collect").click(function(){
		window.location="information.html";
	});
	$("#topbar_jifen").click(function(){
		window.location="information.html";
	});
	$("#topbar_comment").click(function(){
		window.location="information.html";
	});
	$("#topbar_order").click(function(){
		window.location="information.html";
	});
	$("#topbar_tuikuan").click(function(){
		alert("暂未开通");
		return;
	});
	$("#topbar_tuihuo").click(function(){
		alert("暂未开通");
		return;
	});
	$("#topbar_tuanjuan").click(function(){
		alert("暂未开通");
		return;
	});
	$("#topbar_bangdingshouji").click(function(){
		alert("暂未开通");
		return;
	});
	$("#topbar_email_order").click(function(){
		window.location="about.html";
	});
	$("#topbar_collect_net").click(function(){
		alert("暂未开通");
		return;
	});
	$("#topbar_question").click(function(){
		window.location="about.html";
	});
}*/



//绑定logobar事件
/*function bind_logobar_event(){
	$("#logo_index_img").click(function(){
		window.location="index.html";
	});
	$("#zshlewm_index_img").click(function(){
		window.open("download.html");
	});
}*/



//绑定navgationbar事件
/*function bind_navgationbar_event(){
	$("#index_button").click(function(){
		window.location="index.html";
	});
	$("#new_button").click(function(){
		window.location="news.html";
	});
	$("#food_button").click(function(){
		window.location="food.html";
	});
	$("#entertainment_button").click(function(){
		window.location="entertainment.html";
	});
	$("#hotel_button").click(function(){
		window.location="hotel.html";
	});
	$("#shopping_button").click(function(){
		window.location="shopping.html";
	});
	$("#life_button").click(function(){
		window.location="life.html";
	});
	$("#index_search_button").click(function(){
		window.location="food.html";
	});
}

function bind_bottom_container_event(){
	$("#about_us_button").click(function(){
		window.location="about.html?select=abount";
	});
	$("#question_button").click(function(){
		window.location="about.html?select=question";
	});
	$("#promised_button").click(function(){
		window.location="about.html?select=promised";
	});
	$("#mail_setting_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#mail_order_button").click(function(){
		window.location="about.html?select=mailorder";
	});
	$("#QQ_space_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#RSS_order_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#commodity_cooperation_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#operator_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#open_API_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#friendly_link_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#contact_us_button").click(function(){
		window.location="about.html?select=contactus";
	});
	$("#user_protocol_button").click(function(){
		window.location="about.html?select=protocol";
	});
	$("#talent_recruit_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#media_report_button").click(function(){
		window.location="about.html?select=mediareport";
	});
	$("#online_customer_service_button").click(function(){
		alert("暂未开通");
		return false;
	});
	$("#integral_exchange_button").click(function(){
		alert("暂未开通");
		return false;
	});
}*/

/*function bind_pay_event(){
	toggleAnimate();
	var status=checkToggleStatus();
	changePayOnLineImg(status);
	$("#online_pay_button").click(function(){
		if(status==false){
			status=true;
		}else{
			status=false;
		}
		changePayOnLineImg(status);
	});
	$("#pay_next_button").click(function(){
		window.location="payOk.html";
	});
	toggleRightAnimate();
	$("#toggle_one").click(function(){
		var result=checkToggleRightAnimate($(this).next(".buybrzfbzlinea"));
		if(result){
			
			$(this).find("img").attr("src","images/icon.jpg");
		}else{
			$(this).find("img").attr("src","images/jticon2.jpg");
			
		}
	});
	$("#toggle_two").click(function(){
		var result=checkToggleRightAnimate($(this).next(".buybrzfbzlinea"));
		if(result){
			
			$(this).find("img").attr("src","images/icon.jpg");
		}else{
			$(this).find("img").attr("src","images/jticon2.jpg");
			
		}
	});
	$("#toggle_three").click(function(){
		var result=checkToggleRightAnimate($(this).next(".buybrzfbzlinea"));
		if(result){
			
			$(this).find("img").attr("src","images/icon.jpg");
		}else{
			$(this).find("img").attr("src","images/jticon2.jpg");
			
		}
	});
	$("#toggle_four").click(function(){
		var result=checkToggleRightAnimate($(this).next(".buybrzfbzlinea"));
		if(result){
			
			$(this).find("img").attr("src","images/icon.jpg");
		}else{
			$(this).find("img").attr("src","images/jticon2.jpg");
			
		}
	});
}
*/

//折叠效果动画
function toggleAnimate(){
	$(function(){
   		$("#online_pay_button").toggle(function(){
     		$(".payzffsblock3").animate({height: 'toggle', opacity: 'toggle'}, "1000");},function(){$(".payzffsblock3").animate({height: 'toggle', opacity: 'toggle'}, "1000");
   		});
	});
}

//右侧折叠动画
function toggleRightAnimate(){
	$(function(){
   		$("#toggle_one").toggle(function(){
     		$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");},function(){$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");
   		});
   		$("#toggle_two").toggle(function(){
     		$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");},function(){$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");
   		});
   		$("#toggle_three").toggle(function(){
     		$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");},function(){$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");
   		});
   		$("#toggle_four").toggle(function(){
     		$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");},function(){$(this).next(".buybrzfbzlinea").animate({height: 'toggle', opacity: 'toggle'}, "2000");
   		});
	});
}

function checkToggleStatus(){
	if($(".payzffsblock3").is(":hidden")){
		return false;
	}else{
		//$("#online_pay_bank_img").attr("src","images/jticon2.jpg");
		return true;
	}
}

function checkToggleRightAnimate(obj){
	if(obj.is(":hidden")){
		return false;
	}
	return true;
}

//根据status状态改变网上银行支付img
function changePayOnLineImg(status){
	if(status==true){
		$("#online_pay_bank_img").attr("src","images/jticon2.jpg");
	}else{
		$("#online_pay_bank_img").attr("src","images/jticon.jpg");
	}
}
