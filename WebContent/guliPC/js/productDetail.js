jQuery(document).ready(function() {
	//商品详情页导航定位
	var dealH = jQuery(".deal-Menu").eq(0).offset().top;
	var dh = jQuery(".deal-Menu").height();
	$(window).scroll(function(){
		var goodsSc = jQuery(document).scrollTop();
		var offset = dealH-goodsSc;
		if (offset<=0) {
			jQuery(".deal-Menu").children(".deal-menu-buy").eq(0).show();
			jQuery(".deal-Menu").addClass("deal-Menu-Top").end()
							.css({"position":"fixed", "top":0});
		} else {
			jQuery(".deal-Menu").children(".deal-menu-buy").eq(0).hide();
			jQuery(".deal-Menu").removeClass("deal-Menu-Top").end()
							.css({"position":"relative"});
		}
		var menuArr = [];
		var menus = jQuery("div[_dt='menu']");
		for (var i=0;i<menus.length;i++) {
			var currentTop = Math.floor(jQuery(menus[i]).offset().top);
			var menuOffset = currentTop-goodsSc-dh;
			if (jQuery(menus[i]).attr("id")=="deal-sj-xiangxi") {
				//alert(currentTop+"-"+goodsSc+"-"+dh);
			}
			if (menuOffset<=0) {
				menuArr.push(i);
			}
		}
		if (menuArr!=null && menuArr.length>0) {
			$(".deal-Menu").find("li").removeClass("current");
			$(".deal-Menu").find("li").eq(menuArr[menuArr.length-1]).addClass("current");
		}
	});
	
	$(".deal-Menu").find("a").click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
		        && location.hostname == this.hostname) {
			var $target = $(this.hash);
		    $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
		    if ($target.length) {
		    	var targetOffset = $target.offset().top;
		        $('html,body').animate({scrollTop: targetOffset-dh}, 200);
		        return false;
		    }
		}
	});
	
	jQuery(".deal-nav-qg").live("click", function(){
		jQuery("#to_shopping").click();
	});
	jQuery(".deal-nav-joinCart").live("click", function(){
		jQuery("#add_shoppingcard_button").click();
	});
			var  prodcut = function () {
				
				var fnUserCallback = function(data){//页面提交回调函数
						    
				};
			    return {
			        //main function to initiate the module
			        init: function (){
			        	prodcut.setListener();
        				jQuery("#add_shoppingcard_button").live('click',function(){
        					var userId=jQuery("#userIds").text();
        					 if(userId==null||userId==""){
        						 var redirectUrl =window.location.href;
        						 window.location.href= ctx+"/user/login.html?redirectUrl="+redirectUrl;
        					 }
        					 else{
        						 jQuery.ajax({
     			                    "type": "GET",
     			                    "async":false,
     			                    "url": ctx+"/addGwcSp.html?goodsno="+$(this).attr('goods_no')+"&orderno="+(Number(jQuery('input[name="orderNumber"]').val())==0?1:Number(jQuery('input[name="orderNumber"]').val()))+"&now=" + new Date().getTime(), 
     			        		    "success":function(data) {
     			        		    	jQuery("#shoppingCart").text(data);
     			        		    	$.ajax({
     			        		            "type": "GET",
     			        		            "async":false,
     			        		            "url": ctx+"/getGwcHeaderInfo?now=" + new Date().getTime(), 
     			        		            "success": function(datals){
     			        		            	$("#headerShoppingCart").html("");
     			        		            	if(datals.length>0){
     			        		            		$("#headerShoppingCart").append("<h3>最近加入购物车商品：</h3>");
         			        		        		$.each(datals, function (i, item) {
         			        		                    $("#headerShoppingCart").append("<div style='display:none;' id='headShopcartid"+i+"'>"+item.id+"</div>"+
         			        		                    		"<dl class='cart-goods-info'><dt><div class='cart-top-img'>" +
         			        		                    		"<a href=" + ctx+"/product.html?goodsno="+ item.goodsNo +" title='"+ item.title +"' target='_blank'><img src="+ imgCtx + item.image + " alt=''/></a></div>" +
         			        		                    		"<div class='cart-top-text'><a href=" + ctx +"/product.html?goodsno="+ item.goodsNo +" title='"+ item.title +"' target='_blank'>"+ item.title + "</a></div>" +
         			        		                    		"<i class='delete deleteShopcart' title='删除' id='headDelete"+i+"'></i> <span class='cart-top-price'>￥<strong>"	+item.unitPrice+"</strong></span></dt>"
         			        		                    		);
         			        		                });
         			        			           	$("#headerShoppingCart").append("<dd><span class=''>购物车里共有<q>"+data+"</q>件商品" +
         			        		        				"</span> <input type='button' value='去付款' class='yellow' id='headPay'>	</dd>"
         			        		        		);
     			        		            	}else{
     			        		            		$("#headerShoppingCart").append("<div class='cartNoGoods'><i class='TopCartIco'></i>再去逛逛吧，还什么都没有</div>");
     			        		            	}
     			        		            }
     			        		        });
     			        		    	Reveal.center($('#addShoppingCartSuccess'));
     			        		    }
        						 
     			                });
        						 
        						 $("#headPay").click(function() {
        	        					window.location.href=ctx+"/gwc.html" ;//传参数
        	        				});
        	        				
        	        				$(".deleteShopcart").click(function() {
        	        					var deleteindex=$(this).attr("id");//获取checkbox的id
        	        					deleteindex=deleteindex.substring(10,deleteindex.length);
        	        				    var id=$("#headShopcartid"+deleteindex).text();
        	        					$.ajax({
        	        						type : 'post',
        	        						url : ctx + '/delGwcSp',
        	        						dataType : 'json',
        	        						data : {"ids":id},
        	        						success : function(data) {
        	        							location.reload();
        	        						}
        	        					}); 
        	        					
        	        				});	
        					 };
						});
        				
        				
        				jQuery("#shopping_popup_window_close").click(function(){
        					jQuery.modal.close();
        					return false;
        				});
        				
        				jQuery("#collect_popup_window_close").click(function(){
        					jQuery.modal.close();
        					return false;
        				});
        				
        				jQuery("#popup_window_shoppingcard_pay").click(function(){
        					 window.location.href= ctx+"/gwc.html";
        				});
        				jQuery("#to_shopping").live('click',function(){
        					var userId=jQuery("#userIds").text();
        					if(userId==null||userId==""){
        						var redirectUrl =window.location.href;
        						 window.location.href= ctx+"/user/login.html?redirectUrl="+redirectUrl;
           					 }else{
           						var huodongId=jQuery(this).attr('huodong_id');
           						if(huodongId==null||huodongId==""){
           							window.location.href= ctx+"/buy_now.html?sp_bh="+jQuery(this).attr('goods_no')+"&sp_sl="+(Number(jQuery('input[name="orderNumber"]').val())==0?1:Number(jQuery('input[name="orderNumber"]').val()));
           						}else {
           							window.location.href= ctx+"/buyNow.html?goodsno="+jQuery(this).attr('goods_no')+'&huodongId='+huodongId+"&orderno="+(Number(jQuery('input[name="orderNumber"]').val())==0?1:Number(jQuery('input[name="orderNumber"]').val()));
           						}
    			        		
           					 }
						});
        				
//        				jQuery("[_type='evaluate']").live('click',function(){
//        					var userId=jQuery("#userIds").text();
//        					if(userId==null||userId==""){
//           					 	window.location.href= ctx+"/user/login.html";
//           					 }else{
//    			        		window.location.href= ctx+"/user/userevaluatepage.html";
//           					 }
//						});
        				
        				jQuery(".detcrtlbjbblock").live('click',function(){
        					window.location.href= ctx+"/product.html?goodsno="+jQuery(this).attr('goods_no');
						});

        				jQuery("#add_collect_info").live('click',function(){
        					var goodsId = $('#add_collect_goods_id').val(); 
        					var userId=jQuery("#userIds").text();
       					    if(userId==null||userId==""){
       					    	var redirectUrl =window.location.href;
       						 window.location.href= ctx+"/user/login.html?redirectUrl="+redirectUrl;
       					    } else {
       					    	jQuery.ajax({
        		                    "dataType": 'json',
        		                    "type": "GET",
        		                    "url": ctx+"/user/addStoreInfo/"+goodsId,
        		        		    "success":function(data) {
        		        		    	if(data.type=="error"){
        		        		    		var message = data.message;
        		        		    		if(null != message && '' != message){
        		        		    			$("#add_collect_message span").html(message);
        		        		    		} else {
        		        		    			$("#add_collect_message span").html("收藏失败！");
        		        		    		}
        		        		    	} else {
        		        		    		$("#add_collect_message span").html("收藏成功！");
        		        		    	}
//        		        		    	jQuery("#J-favorite-dialog").modal('show');
        		        		    	Reveal.center($('#J-favorite-dialog'));

        		        		    }
        		                });
       					    }
    		        		
						});
        				
        				jQuery(".item-plus").click(function(){
        					var max=jQuery(this).attr("max");
        					var limit=$("#limitAmount").text();
        					var j=jQuery('input[name="orderNumber"]').val();
        					if(limit!=null&&limit>0){
        						if(limit<=j){
        						  jQuery('input[name="orderNumber"]').attr("disabled",true);
        						   return false;
        						}
        					}
        					if(max==""||Number(jQuery('input[name="orderNumber"]').val())<Number(max)){
        						jQuery('input[name="orderNumber"]').val(Number(jQuery('input[name="orderNumber"]').val())+1);
        					}
        					if(max!=""&&Number(jQuery('input[name="orderNumber"]').val())==Number(max)){
        						jQuery(".order-number-msg").attr('style',"");
        					}
        				});
        				
        				jQuery(".minus").click(function(){
        					var max=jQuery(this).attr("max");
        					var st=jQuery('input[name="orderNumber"]').attr("disabled");
        					if(st==true||st=='disabled'){
        						jQuery('input[name="orderNumber"]').attr("disabled",false);
        					}
        					if(jQuery('input[name="orderNumber"]').val()>1)
        					jQuery('input[name="orderNumber"]').val(Number(jQuery('input[name="orderNumber"]').val())-1);
        					if(max==""||Number(jQuery('input[name="orderNumber"]').val())<Number(max)){
        						jQuery(".order-number-msg").attr('style',"display: none;");
        					}
        				});
        				
        				jQuery('input[name="orderNumber"]').blur(function(){
        					var max=jQuery(this).attr("max");
        					var limit=$("#limitAmount").text();
        					var j=jQuery('input[name="orderNumber"]').val();
        					if(limit!=null&&limit>0){
        						if(parseInt(limit) <= parseInt(j)){
        						  jQuery('input[name="orderNumber"]').attr("disabled",true);
        						  jQuery('input[name="orderNumber"]').val(limit);
        						   return false;
        						}
        					}
        					if(jQuery('input[name="orderNumber"]').val()&&Number(jQuery('input[name="orderNumber"]').val())>0){
        						if(max!=""&&Number(jQuery('input[name="orderNumber"]').val())>=Number(max)){
            						jQuery(".order-number-msg").attr('style',"");
            						jQuery('input[name="orderNumber"]').val(max);
            					}else{
            						jQuery(".order-number-msg").attr('style',"display: none;");
            					}
        					}else{
        						jQuery('input[name="orderNumber"]').val(1);
        					}
        				});
        				
			        },setListener:function(){
			        	$("[name=routeDetail]").click(function(){
			        		Reveal.center($('#routeDetailHiddenDialog'));
							var merchantName=$(this).attr("value");
							$("#jiaChe [name=word2]").val(merchantName);
							$("#gongJiao [name=word2]").val(merchantName);
							$("#destination").text(merchantName);
							$("[name=word]").val("");
							Reveal.center($('#myModal'));
						});
						 $("input[name=chuxingtype]").click(function(){
							 	var chuxingtype=$(this).val();
							 	if('nav'==chuxingtype){
							 		$("#jiaChe [name=word]").val("");
							 		$("#jiaChe").show();
							 		$("#gongJiao").hide();				 		
							 	}else if('bus'==chuxingtype){
							 		$("#gongJiao [name=word]").val("");
							 		$("#gongJiao").show();
							 		$("#jiaChe").hide();
							 	}
						 });
						 $("#btnQueryChuXing").click(function(){
								var chuxingtype=$("[name=luxian]:hidden").attr("id");
							 	if('gongJiao'==chuxingtype){
							 		$("#jiaChe form").submit();
							 	}else if('jiaChe'==chuxingtype){
							 		$("#gongJiao form").submit();
							 	}
						 });
			        	
			        }
			    };
			
			}();
			//页面初始化
			prodcut.init();
			
			jQuery('.location').find('a:contains(首页)').attr('href',ctx+'/index.html');
			jQuery('.location').find('a:contains(美食)').attr('href',ctx+'/food.html');
			jQuery('.location').find('a:contains(娱乐)').attr('href',ctx+'/fun.html');
			jQuery('.location').find('a:contains(酒店)').attr('href',ctx+'/hotel.html');
			jQuery('.location').find('a:contains(生活)').attr('href',ctx+'/life.html');
			jQuery('.location').find('a:contains(丽人)').attr('href',ctx+'/s/?w=丽人&categoryId='+jQuery('.location').find('a:contains(丽人)').attr('categoryid'));
			jQuery('.location').find('a:contains(旅游)').attr('href',ctx+'/s/?w=旅游&categoryId='+jQuery('.location').find('a:contains(旅游)').attr('categoryid'));
			
			jQuery("#footCate").attr('href',ctx+'/s/?w='+jQuery("#footCate").text());
			
});