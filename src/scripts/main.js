require(['PQ_canvas'], function (canvas) {
    document.querySelector(".container").addEventListener('click', function () {
        canvas.draw();
    });
});