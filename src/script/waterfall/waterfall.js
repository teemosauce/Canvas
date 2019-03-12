require(["jquery", "PQ_util", "PQ_ColorLump"], function ($, util, ColorLump) {
    //container宽度 计算能放下多少列布局
    var width = 350;
    var textNum = 1;

    function reflow() {
        textNum = 1;
        var gap = 10;
        var $container = $(".site-content .container");
        var maxWidth = $container.width() - util.getScrollbarWidth();
        var num = Math.floor(maxWidth / width)
        if (num * (gap + width) > maxWidth) {
            num = num - 1
        }

        gap = (maxWidth - width * num) / num

        initLayout(num, width, gap);
    }

    $(window).resize(util.throttle(function () {
        reflow()
    }))
    reflow()

    /**
     * 
     * @param {多少列} n 
     * @param {每列宽度} width 
     * @param {列之间的间距} gap 
     */
    function initLayout(n, width, gap) {
        var $container = $(".site-content .container").empty();
        for (var i = 1; i <= n; i++) {
            var $column = $("<div class=column>").css({
                width: width + "px"
            })

            if (i == 1) {
                $column.css({
                    marginLeft: gap / 2
                })
            } else {
                $column.css({
                    marginLeft: gap
                })
            }
            $container.append($column)
        }

        for (var i = 0; i < 10; i++) {
            addOne()
        }
    }

    function getColumn() {
        var $min, $max;
        $(".site-content .container .column").each(function (i, item) {
            var $item = $(item);
            if (!$min) {
                $min = $item
            }
            if (!$max) {
                $max = $item
            }
            if (($min.data("columnHeight") || 0) > ($item.data("columnHeight") || 0)) {
                $min = $item
            }

            if (($max.data("columnHeight") || 0) < ($item.data("columnHeight") || 0)) {
                $max = $item
            }
        })
        return {
            $min: $min,
            $max: $max
        };
    }

    function addOne() {
        var column = getColumn()
        var $minColumn = column.$min

        var elem = new ColorLump({
            text: textNum++,
            className: 'colorlump'
        });
        var top = parseFloat($minColumn.data("columnHeight") || 0);
        top += 10;

        var $elem = elem.getElement().css('top', top + "px")

        var columnHeight = top + elem.getHeight();
        $minColumn.append($elem).data("columnHeight", columnHeight).css('minHeight', columnHeight + 'px');
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
        var column = getColumn()
        var $minColumn = column.$min
        var top = parseFloat($minColumn.data("columnHeight"))

        if (viewport.bottom >= top) {
            console.log("瀑布流加载")
            for (var i = 0; i < 5; i++) {
                addOne()
            }
        }
    }))
})