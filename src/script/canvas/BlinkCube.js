define(function () {
    'use strict';
    /**
     * 拐点标志
     * 
     * @param {当前坐标} point 
     * @param {默认大小} size 
     * @param {画布绘画对象} context 
     * @param {经过后的大小} curSize 
     */
    function BlinkCube(point, size, context, curSize) {
        this.size = size;
        this.curSize = curSize;
        this.oriSize = curSize;
        this.context = context;
        this.point = point;
        this.isABack = false;
        this.cubeActive = false; // 是否到达
    }

    BlinkCube.prototype = {
        /**
         * 绘制
         */
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
        /**
         * 更新位置信息
         */
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
        /**
         * 重置位置信息
         */
        reset: function () {
            this.isABack = false;
            this.curSize = this.oriSize;
        }
    }

    return BlinkCube;
});