define([
    'PQ_animationFrame',
    'PQ_MotionDraw'
], function (animationFrame, MotionDraw) {
    'use strict';
    var wraper = document.getElementsByClassName("wrap-canvas")[0];
    var testLines = [
        [
            [
                [752, 155],
                [836, 240], 1.9, 0
            ],
            [
                [836, 240],
                [1029, 46], 1.9, 0
            ]
        ],
        [
            [
                [1138, 155],
                [1055, 71], 1.9, 0
            ],
            [
                [1055, 71],
                [862, 266], 1.9, 0
            ]
        ]
    ];

    var options = {
        "lines": testLines,
        "w": 1920,
        "h": 500,
        "wrap": wraper,
        "thinLineWidth": 1,
        "thickLineWidth": 1.9,
        "opacity": 0.89,
        "fillStyle": "rgba(0,215,255,1)",
        "speedLine": 1.5,
        "speedCurve": 1.5,
        "isCubeA": false
    };

    var startAnim = animationFrame.requestAnimation(),
        cancelAnim = animationFrame.cancelAnimation()

    function draw() {

        var draw = new MotionDraw(options);

        var timer;

        function task() {
            draw.update();
            timer = startAnim(task);
        }
        timer || task();
    }

    return {
        draw: draw
    }
});