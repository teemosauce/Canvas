define(function () {
    'use strict';
    /**
     * 两个坐标点的直线运动类
     * @param {起始位置 x坐标} x1 
     * @param {起始位置 y坐标} y1 
     * @param {结束位置 x坐标} x2 
     * @param {结束位置 y坐标} y2 
     * @param {画布绘画对象} context 
     * @param {元素的宽度} lineW 
     * @param {填充颜色} fillStyle 
     */
    function LinearMotion(x1, y1, x2, y2, context, lineW, fillStyle) {
        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        this.detalX = this.x2 - this.x1;
        this.detalY = this.y2 - this.y1;

        this.angle = Math.atan2(this.detalY, this.detalX); //计算两个点之间相对于坐标系的夹角

        this.x = x1;
        this.y = y1;

        this.context = context;

        this.cubeActive = false; // 是否已到达
        this.lineW = lineW;
        this.canW = this.context.canvas.width;
        this.canH = this.context.canvas.height;

        this.fillStyle = fillStyle;
    }

    LinearMotion.prototype = {
        /**
         * 根据位置信息绘制
         */
        draw: function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.lineW, 0, 2 * Math.PI);

            this.context.fillStyle = this.fillStyle;
            this.context.fill();
        },
        /**
         * 更新位置信息
         */
        update: function () {
            if (!this.cubeActive) {
                // 计算剩余距离
                this.dis = Math.sqrt(Math.pow(this.x2 - this.x, 2) + Math.pow(this.y2 - this.y, 2));

                if (this.dis > this.speed) {
                    // 剩余距离仍旧大于速度
                    this.x += this.speedX;
                    this.y += this.speedY;
                } else {
                    this.cubeActive = true;
                }
                this.draw()
            }
        },
        /**
         * 重置位置信息
         */
        reset: function () {
            this.x = this.x1;
            this.y = this.y1;
            this.cubeActive = false;
        }
    }

    return LinearMotion;
});