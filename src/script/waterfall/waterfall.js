require(["jquery", "PQ_util", "PQ_ColorLump"], function ($, util, ColorLump) {
    //container宽度 计算能放下多少列布局
    var width = 350;
    function reflow() {
        textNum = 1;
        var gap = 10;

        var $container = $(".site-content .container");
        var maxWidth = $container.width() - 20;
        var num = Math.floor(maxWidth / width)
        if ((num - 1) * gap + width * num > maxWidth) {
            num = num - 1
        }

        gap = (maxWidth - width * num) / (num - 1)

        initLayout(num, width, gap);
    }

    $(window).resize(util.throttle(function () {
        reflow()
    }))

    reflow()

    function initLayout(n, width, gap) {
        var $container = $(".site-content .container").empty();
        var columns = []
        for (var i = 1; i <= n; i++) {
            var $column = $("<div class=column>").css({
                width: width + "px"
            })

            if (i !== 1) {
                $column.css({
                    marginLeft: gap
                })
            }
            columns.push($column)
            $container.append($column)
        }

        for (var i = 0; i < 100; i++) {
            addOne()
        }

        util.fixFooter();
    }

    function getNextColumn() {
        var $item;
        $(".site-content .container .column").each(function (i, item) {
            if (!$item) {
                $item = $(item)
            }
            if (($item.data("top") || 0) > ($(item).data("top") || 0)) {
                $item = $(item)
            }
        })
        return $item;
    }

    var textNum = 1;

    function addOne() {
        var $nextColumn = getNextColumn()

        var elem = new ColorLump({
            text: textNum++,
            className: 'colorlump'
        });
        var top = parseFloat($nextColumn.data("top") || 0);
        $nextColumn.append(elem.getElement().css({
            top: top + "px"
        })).data("top", top + +elem.getHeight())
    }

    function getViewport() {
        var $win = $(window)
        var viewport = {
            top: $win.scrollTop(),
            left: $win.scrollLeft()
        }

        viewport.right = viewport.left + $win.width();
        viewport.bottom = viewport.top + $win.height();

        return viewport;
    }

    function inViewport(item, viewport) {

        var $item = $(item);
        var bound = $item.offset();

        bound.right = bound.left + $item.width();
        bound.bottom = bound.top + $item.height();

        return !(viewport.right < bound.left || viewport.left > bound.right || viewport.bottom < bound.top || viewport.top > bound.bottom);
    }

    $(window).scroll(util.throttle(function (e) {
        var viewport = getViewport();

        var $footer = $(".site-footer")
        var isIn = inViewport($footer, viewport);
        if (isIn) {
            for (var i = 0; i < 5; i++) {
                addOne()
            }
        }
    }))
})