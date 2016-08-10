/*$(document).ready(function() {

	$("#shoppingcard_topbar_container").load("index_topbar_page.html",function(){
		bind_topbar_event();
	});

    $("#shoppingcard_navgationbar_container").load("index_navgationbar_page.html",function(){
    	bind_navgationbar_event();
	    //navgationbar加载完之后，再加载logobar
	    $("#shoppingcard_logobar_container").load("index_logobar_page.html",function(){
	    	
	    	bind_logobar_event();
	    });
    });
        //});
    $("#shoppingcard_bottom_container").load("index_bottom_page.html",function(){
    	bind_bottom_container_event();
    });
    bind_shoppingcard_event();
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

function bind_shoppingcard_event(){

	$(".recue").click(function(){
		var amount=$(this).parent().find(".amount_input").val();
		if(!checkInteger(amount)){
			alert("请输入有效的购买件数");
			return;
		}
		if(amount==0){
			alert("请输入至少一件数量");
			return;
		}
		if(parseInt(amount)==1){
			return;
		}
		var newamount=parseInt(amount)-1;
		$(this).parent().find(".amount_input").val(newamount);
	});
	$(".add").click(function(){
		var amount=$(this).parent().find(".amount_input").val();
		if(!checkInteger(amount)){
			alert("请输入有效的购买件数");
			return;
		}
		if(amount==0){
			alert("请输入至少一件数量");
			return;
		}
		var newamount=parseInt(amount)+1;
		$(this).parent().find(".amount_input").val(newamount);
	});
	$(".shoppingcard_delete").click(function(){
		$(this).parent().parent().attr("style","display:none;");
	});
	$("#shopping_card_submit_order_button").click(function(){
		var checkbox1=$("#checkbox1").attr("checked");
		if(checkbox1=="checked"){
			var amountone=$("#input_one").val();
			if(!checkInteger(amountone)){
				alert("请输入有效的购买件数");
				return;
			}
			if(amountone==0){
				alert("请输入至少一件数量");
				return;
			}
		}else{
			var amountone=$("#input_one").val();
			if(amountone!=""){
				alert("请选择要购买的物品");
				return;
			}
		}
		var checkbox2=$("#checkbox2").attr("checked");
		if(checkbox2=="checked"){
			var amounttwo=$("#input_two").val();
			if(!checkInteger(amounttwo)){
			alert("请输入有效的购买件数");
			return;
			}
			if(amounttwo==0){
				alert("请输入至少一件数量");
				return;
			}
		}else{
			var amounttwo=$("#input_two").val();
			if(amounttwo != ""){
				alert("请选择要购买的物品");
				return;
			}
		}
		if(checkbox1!="checked"&&checkbox2!="checked"){
			alert("请选择要购买的物品");
			return;
		}
		window.location="pay.html";
		
	});

	
		
		

	$(".buybltjddltline2").click(function(){
		
		$('#bindnewphone-modal-content').modal();
		return false;
	});
	$("#bindnewphone_popup_window_close").click(function(){
		jQuery.modal.close();
		return false;
	});
	$("#all_checkbox").click(function(){
		
		if($(this).attr("checked")=="checked"){
			$("input[type=checkbox][name=CheckboxGroup1]").each(function(){
				$(this).attr("checked",true);
			});
		}else{
			$("input[type=checkbox][name=CheckboxGroup1]").each(function(){
				$(this).attr("checked",false);
			});
		}
	});
	$(".detcrtlbjbbimg").click(function(){
		window.location="details.html";
	});
	$(".detcrtlbjbbcline1").click(function(){
		window.location="details.html";
	});

	$(".detcrtlbjbbimg").hover(function(){$(this).next(".detcrtlbjbbcon").find(".detcrtlbjbbcline1").attr("style","color:#B81202;");},
		function(){$(this).next(".detcrtlbjbbcon").find(".detcrtlbjbbcline1").removeAttr("style");});
	
	$(".detcrtlbjbbcline1").hover(function(){$(this).attr("style","color:#B81202;");},
		function(){$(this).removeAttr("style");});
}

//判断是否是正整数
function checkInteger(result){
	var type="^[0-9]*[1-9][0-9]*$";
	var re=new RegExp(type);
	if(result.match(re)==null){
		return false;
	}
	return true;
}