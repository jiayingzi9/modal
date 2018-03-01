;(function ($) {
    $.fn.model = function(options) {
        var def = {
            marginTop:'',
            width:'350px',
            moveElement: "", //移动的div
            btnElement: "" ,//出发移动的按钮
            openBtn: "",
            closeDivBtn: "",
            $viewWidth : document.documentElement.clientWidth || document.body.clientWidth,//网页可见区域宽
            $viewHeight : document.documentElement.clientHeight || document.body.clientHeight,//网页可见区域高

        };
        var ops = $.extend(def,options || {});
        var $moveDiv = $(ops.moveElement);
        var $btnDiv = $(ops.btnElement);
        var $openBtn = $(ops.openBtn);


        var $divHeight = $moveDiv.outerHeight();//模态的高度
        var $divWidth = $moveDiv.outerWidth();//模态的宽度
        //模态框的宽,高
        var marginTop=ops.marginTop
        $moveDiv.css({
             "margin-top":marginTop,
            "width":ops.width,
            // "margin-left":(-$divWidth/2+"px"),
            // "left":(ops.$viewWidth/2.5 + "px")
        });
        //设置模态框居中
        $(window).resize(function(){
            $('.move').css({
                position:'absolute',
                left: ($(window).width() - $('.move').outerWidth())/2,
            });
        });
        //初始化函数
        $(window).resize();
        //设置模态框定位

        $btnDiv.mousedown(function(e){
            if(e.which == 1 ){
                var isMove = true;
                e = e || window.event;
                document.body.setCapture
                var abs_x = event.pageX - $('.move').offset().left;//鼠标按下当前位置
                var abs_y = event.pageY - $('.move').offset().top;
                //计算body的宽度
                var body_width = parseInt($('body').css('width'));
                //计算容器的宽度
                var modal_width = parseInt($moveDiv.css('width'));
                //计算body的高度
                var body_height = parseInt($(window).height());
                //计算容器的高度
                var modal_height = parseInt($moveDiv.css('height'));
                //计算body与容器的宽度差
                var differ_width = body_width - modal_width;
                //计算body与容器的高度度差
                var differ_height =  body_height - modal_height;


                $(document).mousemove(function(e) {

                    var leftx=event.pageX - abs_x;//鼠标的移动位置
                    var lefty=event.pageY - abs_y;
                    var marginTop=parseFloat(ops.marginTop);
                    if (isMove) {
                        var obj = $('.move');
                        if(leftx<0){
                            leftx=0;
                        }
                        if(lefty<0){
                            lefty=0;
                        }
                        if(leftx >= differ_width){
                            leftx = differ_width;
                        }
                        if(lefty>= differ_height){
                            lefty=differ_height;
                        }
                        obj.css({'left':leftx-5, 'top':lefty-marginTop-5});//left
                    }

                }).mouseup(function() {
                    $(document).unbind();
                    isMove = false;
                });
            }
        });

        //
        var $bgDiv = "<div class='bgDiv'></div>";
        $openBtn.hover(function(){
            $(this).toggleClass("openBtn-hover");
        });

        $openBtn.mousedown(function(e){
            $moveDiv.fadeIn(1000);
            if(e.which == 1 ){
                $(this).addClass("openBtn-down");
            }
        });
        $openBtn.mouseup(function(e){
            if(e.which == 1 ){
                $(this).removeClass("openBtn-down");
                $("body").append($bgDiv);
                $(".bgDiv").css({"width":"100%","height":"100%"});
                $(".bgDiv").fadeIn();
            };
            function closeDiv(event){
                $moveDiv.fadeOut(500);
                $(".bgDiv").fadeOut();
                var t = function(){
                    $('.bgDiv').stop(true,true).remove()
                }
                setTimeout(t,600);
                return false;
            };
            var SignOut = [".bgDiv",ops.closeDivBtn];
            for(i=0;i<SignOut.length;i++){
                $(SignOut[i]).bind("click",function(){closeDiv()});
            };
        });

    }
})(jQuery);