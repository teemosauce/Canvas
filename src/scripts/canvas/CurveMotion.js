define(function () {
    'use strict';

    // 两次坐标点之间的曲线运动
    function CurveMotion(point, context, lineW, fillStyle) {
        this.nIndex = 0;
        this.p = point;
        this.totalLength = compute(1, point);
        this.context = context;
        this.lineW = lineW;
        this.fillStyle = fillStyle;
        this.cubeActive = false; // 是否到达连接点

        this.canW = context.canvas.width;
        this.canH = context.canvas.height;
    }

    return CurveMotion

});