require.config({
    baseUrl: "/",
    paths: {
        PQ_BlinkCube: 'script/canvas/BlinkCube.js?noext',
        PQ_CurveMotion: 'script/canvas/CurveMotion.js?noext',
        PQ_LinearMotion: 'script/canvas/LinearMotion.js?noext',
        PQ_MotionDraw: 'script/canvas/MotionDraw.js?noext',
        PQ_canvas: 'script/canvas/canvas.js?noext',

        PQ_animationFrame: 'script/helper/animationFrame.js?noext',
        PQ_storage: 'script/helper/storage.js?noext',
        PQ_util: 'script/helper/util.js?noext',

        PQ_ColorLump: 'script/waterfall/colorlump.js?noext',

        jquery: 'script/vendor/jquery/jquery-3.3.1.min.js?noext',

    },

    shim: {
        jquery: {
            exports: '$'
        }
    }
})