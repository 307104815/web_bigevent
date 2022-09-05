$(function() {
    //节流阀
    var flag = true;
    //显示隐藏电梯导航
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };

    }
    //页面滚动模块
    $(window).scroll(function() {
        toggleTool();
        //页面滚动到某个区域，左侧单体导航小li相应添加和删除current类名
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    });
    // 点击导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        //当每次点击小li，就要计算出页面要去往的位置
        var current = $(".floor .w").eq($(this).index()).offset().top;
        //页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        //点击之后，让当前的小li，添加current类名，姐妹移除类名
        $(this).addClass("current").siblings().removeClass("current");
    })
})