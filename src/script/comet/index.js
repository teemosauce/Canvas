define([
    'PQ_animationFrame', 'PQ_Cometer', 'PQ_util'
], function (animationFrame, Cometer, util) {
    // 'use strict';

    var requestAnimation = animationFrame.requestAnimation(),
        cancelAnimation = animationFrame.cancelAnimation();

    /**
     * 任务对象
     * @param {当前任务参数} option 
     * @param {任务标识} i 
     */
    function Task(option) {
        this.option = option;
        this.requestId = 0;
        this.key = util.uuid();
        option.task = this;
        console.log("任务" + this.key + "实例化");
    }

    Task.prototype = {

        getKey: function () {
            return this.key;
        },

        startAnimation: function () {
            var args = arguments;
            var option = this.option;
            var cometer = option.cometer;
            if (!cometer) {
                cometer = new Cometer(option);
                option.cometer = cometer;
            }
            cometer.update();
            var _this = this;
            this.requestId = requestAnimation(function () {
                _this.startAnimation.apply(_this, args);
            });
        },

        stopAnimation: function () {
            if (this.requestId) {
                cancelAnimation(this.requestId);
                this.requestId = 0;
            }
        },

        isRunning: function () {
            return !!this.requestId;
        }
    }

    function toggleAnim(option) {
        var task = option.task || new Task(option);
        if (task.isRunning()) {
            task.stopAnimation();
        } else {
            task.startAnimation();
        }

        console.log(task)
    }

    return {
        init: function (_options) {
            if (!Array.isArray(_options)) {
                _options = [_options];
            }
            options = _options;
            options.forEach(function (option, i) {
                var container = document.querySelector(option.wrap);
                option.wrap = container.querySelector('.wrap-canvas');

                container.addEventListener('click', function () {
                    toggleAnim(option);
                });
            });
        }
    }
});