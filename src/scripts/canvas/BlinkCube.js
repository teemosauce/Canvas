define(function () {
    'use strict';
    // 运行元素是否闪烁
    function BlinkCube(point, size, context, curSize) {
        this.size = size;
        this.curSize = curSize;
        this.oriSize = curSize;
        this.context = context;
        this.point = point;
        this.isABack = false;
        this.cubeActive = false; // 是否到达连接点
    }

    BlinkCube.prototype = {
        draw: function () {
            this.context.save();
            this.context.beginPath();
            this.context.fillStyle = "rgba(3,104,193,1)";
            this.context.shadowBlur = 20;
            this.context.shadowColor = "rgba(0,180,255,1)";
            this.context.fillRect(this.point[0] - this.curSize / 2, this.point[1] - this.curSize / 2, this.curSize, this.curSize);

            this.context.closePath();
            this.context.fill();
            this.context.restore();
        },
        update: function () {
            if (this.isABack) {
                if (this.curSize > this.oriSize) {
                    this.curSize -= .05;
                    this.draw();
                } else {
                    if (this.curSize < this.size) {
                        this.curSize += .1;
                        this.draw();
                    }
                }
            } else {
                this.isABack = true;
                this.draw();
            }
        },
        reset: function () {
            this.isABack = false;
            this.curSize = this.oriSize;
        }
    }

    return BlinkCube;
});