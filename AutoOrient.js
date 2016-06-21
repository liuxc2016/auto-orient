;(function($){
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
				return (/ipphone|ipad/i).test(navigator.userAgent);
			},
			isAndroid: function(){
				return (/android|linux/i).test(navigator.userAgent);
			},
			bindOrint : function(){
				var me = this;
				$(window).on('orientationchange', function(event) {
	              	me.orientFunc();
	            });
			},
			orientFunc : function(){
				var me = this;
				var orientation = "";

				if (window.orientation == 90 || window.orientation == -90) {
		            //ipad、iphone竖屏；Andriod横屏
		            if(me.isAndroid())	
		            	orientation = 'landscape';
		            if(me.isIos())
		            	orientation = 'portrait';
	            }else if (window.orientation == 0 || window.orientation == 180) {
		            	//ipad、iphone横屏；Andriod竖屏
		           	if(me.isAndroid())	
		            	orientation = 'portrait';
		            if(me.isIos())
		            	orientation = 'landscape';
	           	}
	           	// console.log(orientation);
	           	if(orientation ==='landscape'){
	           		me.element.addClass("landscape").removeClass('portrait');
	            	me.element.css("transform","rotate(0deg)");
	           	}else if((orientation ==='portrait' )|| me.force){
	           		me.element.addClass("portrait").removeClass('landscape');
	            	var mtransform = "rotate(90deg) scale("+me.scale+","+me.scale+")";
	            	me.element.css("transform-origin","350px 450px").css("transform",mtransform).css("transition","all .5s ease .1s");
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
		scale: 1.1,
		origin:"350px 450px"
	};

})(jQuery)