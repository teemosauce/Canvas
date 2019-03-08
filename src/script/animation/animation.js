~(function () {

    require(['PQ_util', "jquery"], function (util, $) {
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

            return (!(viewport.right < bound.left || viewport.left > bound.right || viewport.bottom < bound.top || viewport.top > bound.bottom));
        }

        function lazyLoad() {
            var viewport = getViewport();
            $(".screen span").each(function (i, item) {
                var $item = $(item);

                if (!$item.hasClass("on")) {
                    var isIn = inViewport(item, viewport);

                    if (isIn) {
                        $item.addClass("on")
                    }
                }
            })
        }

        lazyLoad();

        window.onscroll = util.throttle(function (e) {
            lazyLoad();
        })
    });

})();