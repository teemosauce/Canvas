define(function () {
    'use strict';

    function requestAnimation() {
        var prefixItems = ['webkit', 'moz', 'ms', 'o'];
        var request = window.requestAnimationFrame;

        for (var i = 0, len = prefixItems.length; i < len && !request; i++) {
            var prefix = prefixItems[i];
            request = request || window[prefix + "RequestAnimationFrame"];
        }

        if (!request) {
            var timeline = 0;
            request = function (callback) {
                var now = new Date().getTime();
                var delay = Math.max(0, 16 - (now - timeline));

                timeline = now + delay;
                return window.setTimeout(function () {
                    callback(timeline);
                }, delay);
            }
        }

        return request
    }

    function cancelAnimation() {

        var prefixItems = ['webkit', 'moz', 'ms', 'o'];
        var cancel = window.cancelAnimationFrame;

        for (var i = 0, len = prefixItems.length; i < len && !cancel; i++) {
            var prefix = prefixItems[i];
            cancel = cancel || window[prefix + "CancelAnimationFrame"] || window[prefix + "CancelRequestAnimationFrame"];
        }

        if (!cancel) {
            cancel = function (timer) {
                window.clearTimeout(timer);
            }
        }

        return cancel
    }

    return {
        requestAnimation: requestAnimation,
        cancelAnimation: cancelAnimation
    }
});