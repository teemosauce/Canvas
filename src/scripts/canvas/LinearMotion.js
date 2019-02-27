define(function () {
    'use strict';
    // 两次坐标点之间的直线运动
    function LinearMotion(x1, y1, x2, y2, context, lineW, fillStyle) {
        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        this.detalX = this.x2 - this.x1;
        this.detalY = this.y2 - this.y1;

        this.angle = Math.atan2(this.detalY, this.detalX);

        this.x = x1;
        this.y = y1;

        this.context = context;

        this.cubeActive = false; // 是否到达连接点
        this.lineW = lineW;
        this.canW = this.context.canvas.width;
        this.canH = this.context.canvas.height;

        this.fillStyle = fillStyle;
    }

    LinearMotion.prototype = {
        draw: function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.lineW, 0, 2 * Math.PI);

            this.context.fillStyle = this.fillStyle;
            this.context.fill();
        },
        update: function () {
            if (!this.cubeActive) {
                this.dis = Math.sqrt(Math.pow(this.x2 - this.x, 2) + Math.pow(this.y2 - this.y, 2));

                if (this.dis > this.speed) {
                    this.x += this.speedX;
                    this.y += this.speedY;
                } else {
                    this.cubeActive = true;
                }
                this.draw()
            }
        },
        reset: function () {
            this.x = this.x1;
            this.y = this.y1;
            this.cubeActive = false;
        }
    }

    return LinearMotion;
});