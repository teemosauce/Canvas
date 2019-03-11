require(["jquery", "PQ_util", "PQ_ColorLump"], function ($, util, ColorLump) {



    //container宽度 计算能放下多少列布局

    var minMargin = 10;
    var width = 350;

    function flow() {
        var $container = $(".site-content .container");
        var maxWidth = $container.width();
        var num = Math.floor(maxWidth / width)
        if ((num - 1) * minMargin + width * num > maxWidth) {
            num = num - 1
        }

        minMargin = (maxWidth - width * num) / (num - 1)

        initLayout(num, width, minMargin);
    }

    // $(window).resize(util.throttle(function () {
    //     flow()
    // }))

    flow()

    function initLayout(n, width, left) {
        var $container = $(".site-content .container").empty();
        var columns = []
        for (var i = 1; i <= n; i++) {
            var $column = $("<div class=column>").css({
                width: width + "px"
            })

            if (i !== 1) {
                $column.css({
                    marginLeft: left
                })
            }
            columns.push($column)
            $container.append($column)
        }
    }

    var textNum = 1;
    var n = $(".site-content .container .column").length;
    for (var i = 0; i < 500; i++) {
        var index = i % n;


        var $column = $(".site-content .container .column").eq(index);
        var elem = new ColorLump({
            text: textNum++,
            className: 'colorlump'
        });
        var top = parseFloat($column.data("top") || 0);
        console.log(top)
        $column.append(elem.getElement().css({
            top: top + "px"
        })).data("top", top + + elem.getHeight())
    }

    // function getViewport() {
    //     var $win = $(window)
    //     var viewport = {
    //         top: $win.scrollTop(),
    //         left: $win.scrollLeft()
    //     }

    //     viewport.right = viewport.left + $win.width();
    //     viewport.bottom = viewport.top + $win.height();

    //     return viewport;
    // }

    // function inViewport(item, viewport) {

    //     var $item = $(item);
    //     var bound = $item.offset();

    //     bound.right = bound.left + $item.width();
    //     bound.bottom = bound.top + $item.height();

    //     return !(viewport.right < bound.left || viewport.left > bound.right || viewport.bottom < bound.top || viewport.top > bound.bottom);
    // }

    // $(window).scroll(util.throttle(function (e) {
    //     var viewport = getViewport();

    //     var $footer = $(".site-footer")
    //     var isIn = inViewport($footer, viewport);
    //     if (isIn) {
    //         for (var i = 0; i < 4; i++) {
    //             $(".site-content .container").append(new ColorLump({
    //                 text: textNum++,
    //                 className: 'colorlump'
    //             }).getElement())
    //         }
    //     }
    // }))
})