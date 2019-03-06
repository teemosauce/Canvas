require(["PQ_util", "PQ_animationFrame"], function (util, frame) {
    // 固定footer在底部位置
    var fun = function () {
        util.fixFooter();
    }
    fun();
    window.onresize = util.throttle(fun, 16);

    // var rect = document.getElementsByClassName("rect")[0];
    // if (rect) {
    //     rect.style.display = "none";
    //     var back = false;
    //     var moved = util.throttle(function () {
    //         if (!back) {
    //             if (rect.offsetLeft <= rect.offsetParent.offsetWidth) {
    //                 rect.style.left = rect.offsetLeft + 5 + "px"
    //             } else {
    //                 back = true;
    //             }
    //         } else {
    //             if (rect.offsetLeft >= 0) {
    //                 rect.style.left = rect.offsetLeft - 5 + "px"
    //             } else {
    //                 back = false;
    //             }
    //         }
    //     }, 16);
    //     var start = setInterval(moved, 0)

    //     rect.addEventListener('click', function () {
    //         if (start) {
    //             clearInterval(start);
    //             start = null;
    //         } else {
    //             start = setInterval(moved, 0)
    //         }
    //     })
    // }

})