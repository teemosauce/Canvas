define([
    'PQ_animationFrame', 'PQ_MotionDraw'
], function (animationFrame, MotionDraw) {
    // 'use strict';

    var startAnim = animationFrame.requestAnimation(),
        cancelAnim = animationFrame.cancelAnimation()

    var queues = []
    function task() {
        var option = options[options.currentAnim];
        var drawer = option.drawer;
        if (!drawer) {
            drawer = new MotionDraw(option);
            option.drawer = drawer;
        }
        drawer.update();
        queues[options.currentAnim] = startAnim(task);
    }

    // function startRun() {
    //     var option = options[options.currentAnim];
    //     var drawer = option.drawer;
    //     if (!drawer) {
    //         console.log(option);
    //         drawer = new MotionDraw(option);
    //         option.drawer = drawer;
    //     }
    //     drawer.update();
    //     option.timer = startAnim(startRun);
    // }

    function stopRun() {
        cancelAnim(queues[options.currentAnim]);
        queues[options.currentAnim] = null;
    }

    function onDraw() {
        if (queues[options.currentAnim]) {
            stopRun()
        } else {
            task();
        }
    }

    var options;

    function init(_options) {
        if (!Array.isArray(_options)) {
            _options = [_options];
        }
        options = _options;
        options.forEach(function(option, i) {
            var container = document.querySelector(option.wrap);
            option.wrap = container.querySelector('.wrap-canvas');

            console.log(container)
            container.addEventListener('click', function() {
                options.currentAnim = i;
                onDraw();
            });
        });
    }

    return {
        init: init
    }
});