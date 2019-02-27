define(function (require, factory) {
    'use strict';
    return {
        getWindowWidth: function () {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        },

        loadImage: function (src, options) {
            var opts = $.extend({
                loader: "pureImage"
            }, options);

            if (opts.loader === "pureImage") {
                var image = new Image();
                image.src = src;
            } else if (opts.loader === "bgImage") {
                $("<div>").css({
                    width: 0,
                    height: 0,
                    overflow: "hidden",
                    "background-image": "url(" + src + ")"
                }).appendTo("body")
            }
        },

        isPhone: function () {
            var userAgent = navigator.userAgent;
            return !(!/AppleWebKit.*Mobile/i.test(userAgent) && !/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
                userAgent) || /iPad/i.test(userAgent))
        },

        isSupportTouchEvent: function () {
            var userAgent = navigator.userAgent.toLowerCase();
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
        },

        getBrowserType: function () {
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("Opera") > -1) {
                return "opera";
            }

            if (userAgent.indexOf("Firefox") > -1) {
                return "firefox";
            }

            if (userAgent.indexOf("Chrome") > -1) {
                return "chrome";
            }

            if (userAgent.indexOf("Safari") > -1) {
                return "safari";
            }

            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
                return "ie";
            }
            return "unknown"
        }
    }
});