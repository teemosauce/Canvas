define([
    'PQ_LinearMotion',
    'PQ_CurveMotion',
    'PQ_BlinkCube'
], function (LinearMotion, CurveMotion, BlinkCube) {
    'use strict';

    // 创建画布
    function createCanvas(width, height, className, parent) {
        // console.log(width, height, className, parent);
        var elem = document.createElement("canvas");
        parent.appendChild(elem);
        elem.className = className;
        elem.width = width;
        elem.height = height;
        return elem;
    }

    // 清空画布2
    function clearLayer2(context) {
        context.beginPath();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    // 清空画布1
    function clearLayer1(context, alpha, width, height) {
        context.globalCompositeOperation = "destination-in";
        context.fillStyle = "hsla(180, 100%, 50%," + alpha + ")";
        context.beginPath();
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = "source-over";
    }

    function MotionDraw(option) {
        var lines = option.lines || []; // 所有运动路线
        var width = option.w || 0; // 画布宽度
        var height = option.h || 0; // 画布高度
        var wrap = option.wrap; // 包装元素
        var opacity = option.opacity || .89; // 透明度
        var fillStyle = option.fillStyle || "rgba(0,215,255,1)"; // 运动元素样式
        var isCubeA = option.isCubeA || false; // 到达连接点是否提示
        var speedLine = option.speedLine || 2; // 直线速度
        var speedCurve = option.speedCurve || 2; //曲线速度
        
        // 画布1负责绘制流动效果
        // 画布2负责绘制流动经过的拐点标志
        
        var canvas2, context2;
        var canvas1 = createCanvas(width, height, "layer1", wrap);
        var context1 = canvas1.getContext("2d");

        if (isCubeA) {
            canvas2 = createCanvas(width, height, "layer2", wrap);
            context2 = canvas2.getContext("2d");
        }

        var motionPoints = []; // 保存所有运动元素的集合
        lines.forEach(function (paths, i) {
            motionPoints[i] = [];

            paths.forEach(function (path, j) {
                var motioner, len = path.length;
                switch (len) {
                    case 4:
                        motioner = new LinearMotion(path[0][0], path[0][1], path[1][0], path[1][1], context1, path[2], fillStyle);
                        motioner.name = "line";

                        if (path[3] > 0) {
                            motioner.blinkCube = new BlinkCube(path[1], path[3] + 1, context2, path[3]);
                        }

                        motioner.speed = speedLine;
                        motioner.speedX = speedLine * Math.cos(motioner.angle); // 水平距离/斜线距离 = 水平速度/斜线速度 = cosα
                        motioner.speedY = speedLine * Math.sin(motioner.angle);// 垂直距离/斜线距离 = 垂直速度/斜线速度 = sinα
                        break;
                    case 6:
                        break;
                    default:
                        console.log("输入数据有误");
                        break;
                }

                motionPoints[i].push(motioner);
            });
        });

        motionPoints.forEach(function (point, i) {
            point.len = point.length; // 保存每个点运动路线的条数
            point.curIndex = 0; // 当前为起始线路 0
        })

        // console.log(motionPoints)

        this.active = true;
        this.motionPoints = motionPoints;
        this.context1 = context1;
        this.context2 = context2;
        this.opacity = opacity;
        this.w = width;
        this.h = height;
        this.canvas1 = canvas1;
        this.canvas2 = canvas2;

        this.motionPoints.finishedNum = motionPoints.length;

        this.motionPoints.reset = function (drawer) {
            drawer.motionPoints.forEach(function (point) {
                point.forEach(function (motioner) {
                    motioner.reset();
                    motioner.blinkCube && motioner.blinkCube.reset();
                })
                point.curIndex = 0;
            })
            drawer.motionPoints.finishedNum = drawer.motionPoints.length;
        }

        // this.canvas1.style.display = "none";
    }

    MotionDraw.prototype = {
        update: function () {
            var len = this.motionPoints.length,
                _this = this;
            if (_this.active) {
                _this.canvas1.style.display = "block";
                _this.canvas2 && (_this.canvas2.style.display = "block");

                if (len > 0 && _this.context2) {
                    clearLayer2(_this.context2)
                }

                clearLayer1(_this.context1, _this.opacity, _this.w, _this.h);

                // console.log(_this.motionPoints);
                _this.motionPoints.forEach(function (point, i) {
                    if (point.curIndex < point.len) {
                        var motioner = point[point.curIndex];

                        var nextIndex = 0;
                        if (point.curIndex - 1 > 0) {
                            nextIndex = point.curIndex - 1;
                        } else {
                            nextIndex = 0;
                        }
                        var nextMotioner = point[nextIndex];

                        motioner.update();
                        // 开启闪烁 是当前点还是下一个点

                        nextMotioner.cubeActive && nextMotioner.blinkCube && nextMotioner.blinkCube.update();

                        motioner.cubeActive && (point.curIndex === point.len - 1) && _this.motionPoints.finishedNum--;

                        motioner.cubeActive && (point.curIndex < point.len) && point.curIndex++;

                        (0 === _this.motionPoints.finishedNum) && _this.motionPoints.reset(_this);
                    }
                });

            }
        }
    }

    return MotionDraw
});