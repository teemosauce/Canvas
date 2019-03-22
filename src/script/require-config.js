require.config({
    baseUrl: "/",
    paths: {
        PQ_BlinkCube: 'script/comet/BlinkCube.js?noext',
        PQ_CurveMotion: 'script/comet/CurveMotion.js?noext',
        PQ_LinearMotion: 'script/comet/LinearMotion.js?noext',
        PQ_Cometer: 'script/comet/Cometer.js?noext',
        PQ_comet: 'script/comet/index.js?noext',

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