;(function($){
	//edit by liuxc for AutoOrient with mobile^_^.20160621
	var AutoOrient = (function(){
		function putoOrient(element, options){
			var me = this;
			me.settings = $.extend(true, $.fn.AutoOrient.defaults, options||{}); 
			me.element = element;
			me.init();
		}
		putoOrient.prototype = {
			init : function(){
				var me = this;
				//alert(navigator.userAgent);
				me.force = me.settings.force;
				me.scale = me.settings.scale;
				me.orign = me.settings.origin;
				me.bindOrint();
				me.orientFunc();
			},
			run : function(){
				console.log("run");
			},
			isIos : function(){
				if((/iphone|ipad/i).test(navigator.userAgent));
				{
					return true;
				}	
			},
			isAndroid: function(){
				return (/android|linux/i).test(navigator.userAgent);
			},
			bindOrint : function(){
				var me = this;
				$(window).on('orientationchange', function(event) {
					me.orientFunc();
				});
				// if(me.isIos()){
				// 	window.addEventListener("orientationchange", me.orientFunc, false); 
				// }
			},
			orientFunc : function(){
				var me = this;
				var orientation = "";
				var viewportmeta = document.querySelector('meta[name="viewport"]');
				// alert(window.orientation);
				if (window.orientation == 90 || window.orientation == -90) {
		            //Andriod\ios横屏
		            if(me.isAndroid()||me.isIos())	
		            	orientation = 'landscape';
		        }else if (window.orientation == 0 || window.orientation == 180) {
		            	//ipad、iphoneAndriod竖屏
		            	if(me.isAndroid()||me.isIos())	
		            		orientation = 'portrait';
		            }
	           	// console.log(orientation);
	           	if(orientation ==='landscape'){
	           		me.element.addClass("landscape").removeClass('portrait');
	           		me.element.css("transform","rotate(0deg)");	
	           		if(viewportmeta){
	           			viewportmeta.content = 'width=1200,user-scalable=yes';
	           		}           		
	           	}else if((orientation ==='portrait' )|| me.force){
	           		me.element.addClass("portrait").removeClass('landscape');
	           		var mtransform = "rotate(90deg) scale("+me.scale+","+me.scale+")";
	           		var mtransition = "all "+ me.settings.animationtime+" ease "+me.settings.animationdelay;
	           		if(viewportmeta){
	           			viewportmeta.content = 'width=device-width, minimum-scale=0.2, maximum-scale=1.0, initial-scale=0.4';
	           		}
	           		me.element.css("transform-origin","350px 450px").css("transform",mtransform).css("transition",mtransition);
	           	}

	           }
	       };
		return putoOrient; //this is return AutoOrient func;
	})();
	$.fn.AutoOrient = function(options){
		return this.each(function(){
			var me = $(this);
			instance = me.data("AutoOrient");
			if(instance){
				instance["init"]();
			}
			if(!instance){
				me.data("AutoOrient" , instance);
				instance = new AutoOrient(me, options);
			}
			if($.type(options)=="string"){
				return instance['options']();
			}
		});
	};
	$.fn.AutoOrient.defaults = {
		force: false, //强制使用横屏
		scale: 1.2,
		origin:"350px 450px",
		animationtime:"100ms",
		delaytime:"100ms"
	};

})(jQuery)