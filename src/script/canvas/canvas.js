define([
    'PQ_animationFrame', 'PQ_MotionDraw'
], function (animationFrame, MotionDraw) {
    // 'use strict';

    var startAnim = animationFrame.requestAnimation(),
        cancelAnim = animationFrame.cancelAnimation()

    function startRun() {
        var option = options[options.currentAnim];
        var drawer = option.drawer;
        if (!drawer) {
            console.log(option);
            drawer = new MotionDraw(option);
            option.drawer = drawer;
        }
        drawer.update();
        option.timer = startAnim(startRun);
    }

    function stopRun() {
        cancelAnim(options[options.currentAnim].timer);
        options[options.currentAnim].timer = null;
    }

    function onDraw() {
        if (options[options.currentAnim].timer) {
            stopRun()
        } else {
            startRun();
        }
    }

    var options;

    function init(_options) {
        if (!Array.isArray(_options)) {
            _options = [_options];
        }
        console.log(_options)
        _options = [_options[0]]
        console.log(_options)
        options = _options;
        options.forEach((option, i) => {
            option.wrap = document.querySelector(option.wrap);

            option.wrap.addEventListener('click', e => {
                options.currentAnim = i;
                onDraw();
            });
        });
    }

    return {
        init: init
    }
});