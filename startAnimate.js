//用于进场动感相册效果

    function GetQueryString(name) {
       
       if(window.location.search){
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);          
          if (r!=null) return (r[2]); return null;
       }
       if(!window.location.search)
       {
          var reg = new RegExp("[\?&/]" + name + "[/=]([^./]*)","i");
          r = window.location.pathname.substr(1).match(reg);
       }
       if (r!=null) return (r[1]); return null;
    }
    $(function(){
       //取出参数值，isshow是否插放进场动画，如果不为0则强制播放。
       var isshow = GetQueryString("isshow");
       console.log("isshow:"+isshow);
        if(isshow==0){
            $(".startAnimate").remove();
            return;
        }
        function next() {
               $(".startAnimate").dequeue("slidelist");
        }
        var imglength = $(".startAnimate img").length;
        if(!imglength){      
          $(".startAnimate").remove();      
          return false;
        }
        var arry = [];        
        var animateTime = Math.ceil(12000 / imglength) ;
        $(".startAnimate img").each(function (i, e) {
               var $this = $(this);
               var i = i+1;
               console.log(i+":"+imglength);
               var k = function () {                    
                   $this.animate({width:"110%",height:"110%"}, animateTime, function(){                       
                       $(".startAnimate").find("img").eq(i).show().siblings().hide(); 
                       if(i < imglength){
                            $(".startAnimate img")
                            next(); //回调函数执行队列调出下一个动作
                       }else{
                            $(".startAnimate").fadeOut().remove();
                       }
                   })
               }
               arry.push(k) //遍历生成函数数组
           })
           $(".startAnimate").queue("slidelist", arry);
            next();
    });