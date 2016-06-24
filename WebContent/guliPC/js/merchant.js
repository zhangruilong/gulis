var merchantManaged = function() {
//	var mapDetail=null;
	return {
		init : function() {
			jQuery('.location').find('a:contains(首页)').attr('href',ctx+'/index.html');
			jQuery('.location').find('a:contains(美食)').attr('href',ctx+'/food.html');
			jQuery('.location').find('a:contains(娱乐)').attr('href',ctx+'/fun.html');
			jQuery('.location').find('a:contains(酒店)').attr('href',ctx+'/hotel.html');
			jQuery('.location').find('a:contains(生活)').attr('href',ctx+'/life.html');
			jQuery('.location').find('a:contains(丽人)').attr('href',ctx+'/s/?w=丽人&categoryId='+jQuery('.location').find('a:contains(丽人)').attr('categoryid'));
			jQuery('.location').find('a:contains(旅游)').attr('href',ctx+'/s/?w=旅游&categoryId='+jQuery('.location').find('a:contains(旅游)').attr('categoryid'));
			
			jQuery(".location").find("a:eq(2)").attr('href',ctx+'/s/?w='+jQuery(".location").find("a:eq(2)").text());
//			mapDetail = new BMap.Map("mapMaxDetail"); // 创建Map实例
			var MapIdHidden = $("#MapIdHidden").val();
			if (MapIdHidden != null && MapIdHidden != "") {
				var map = new BMap.Map("merchantMapDisplay",{enableMapClick:false}); // 创建Map实例div
				var mapArray = MapIdHidden.split(",");
				if (mapArray.length == 2) {
					var point = new BMap.Point(mapArray[0], mapArray[1]); // 创建点坐标
					map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别。
					map.clearOverlays(); // 清除地图上所有覆盖物
					var marker = new BMap.Marker(new BMap.Point(mapArray[0],
							mapArray[1]));
					map.addOverlay(marker); // 添加标注
					marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
//					map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
					map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL}));  //右上角，仅包含平移和缩放按钮					
				}
			}
		if($("#merchantPicture").val()!='null' && $("#merchantPicture").val()!='' && $("#merchantPicture").val()!=null){
			var merchantPictureLenght=$("#merchantPicture").val().split(",").length;
			if(merchantPictureLenght>0){
				$("#showMerchantPicture").text("查看全"+merchantPictureLenght+"张图片");
			}else{
				$("#showMerchantPicture").text("");
			}
		}
		merchantManaged.setListener();
		},
		setListener:function(){
			/*查看商家详细图片*/
			$("#showMerchantPicture").click(function(){
				var merchantPictures=$("#merchantPicture").val();
				$(".diaporama1").html("");
				if (merchantPictures != null) {
					
					var pictureArray = new Array();
					pictureArray = merchantPictures.split(",");
					for (var i = 0; i < pictureArray.length; i++) {
						$(".diaporama1").append("<li style='height:100%;width:100%;'> <img alt='' title='' width='100%' height='100%' onerror=\"this.src='"+ctx+"/images/default-loading.gif'\" src='"+imgCtx+pictureArray[i]+"' /></li>");
					}
				}
				$(".diaporama1").jDiaporama({
					animationSpeed: "slow",
					delay:2
				});
				Reveal.center($('#showMerchantPictureDialog'));
			});
			/*查看商铺完整地图*/
			$("#showDetailCompleteMerchant").click(function(){
				 Reveal.center($('#showDetailCompleteMerchantMap'));
				$("#showDetailCompleteMerchantMap h3:first").text($("#merchantName").text());
				var MapIdHidden = $("#MapIdHidden").val();
			var mapDetail = new BMap.Map("mapMaxDetail",{enableMapClick:false}); // 创建Map实例
				if (MapIdHidden != null && MapIdHidden != "") {
					var mapArrayDetail = MapIdHidden.split(",");
					if (mapArrayDetail.length == 2) {
						var pointDetail = new BMap.Point(mapArrayDetail[0], mapArrayDetail[1]); // 创建点坐标
						mapDetail.centerAndZoom(pointDetail,16); // 初始化地图,设置中心点坐标和地图级别。
						mapDetail.clearOverlays(); // 清除地图上所有覆盖物
						var markerDetail = new BMap.Marker(new BMap.Point(mapArrayDetail[0],mapArrayDetail[1]));
						mapDetail.enableScrollWheelZoom(); // 启用滚轮放大缩小
						mapDetail.addOverlay(markerDetail); // 添加标注
						markerDetail.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
						mapDetail.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
					}
				}
				$("#showDetailCompleteMerchantMap .modal-footer").text("注：地图位置坐标仅供参考，具体情况以实际道路标识信息为准信息纠错");
			$("#showDetailCompleteMerchantMap").css("opacity","1").css("visibility","visible");
			});
			$("#routeDetail").click(function(){
				var merchantName=$("#merchantName").text();
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
			
			$("#infoShowHideShow").click(function(){
					$("#infoShowHideShowSpan").hide();
					$("#infoShowHidenHideSpan").show();
			});
			$("#infoShowHidenHide").click(function(){
				$("#infoShowHidenHideSpan").hide();
				$("#infoShowHideShowSpan").show();
		});
			$("#infoShowHideShow").mousemove(function(){
				$(this).css("cursor","pointer");
			});
			$("#infoShowHideShow").mouseout(function(){
				$(this).css("cursor","default");
			});
			
			$("#infoShowHidenHide").mousemove(function(){
				$(this).css("cursor","pointer");
			});
			$("#infoShowHidenHide").mouseout(function(){
				$(this).css("cursor","default");
			});
		}
	};
}();