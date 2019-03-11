define(["PQ_util", "jquery"], function (util, $) {
    'use strict';

    function ColorLump(options) {
        options = options || {}
        var clsName = options.className || ''
        this.key = util.uuid()
        this.element = $('<div id=' + this.key + '>').addClass(clsName).text(options.text || '')
        this.element.append('<div class=mycolor><div>')

        this.refresh()
    }

    ColorLump.prototype = {
        getElement: function () {
            return this.element
        },

        getHeight: function () {
            return this.height
        },

        refresh: function () {
            this.color = util.getRGBColor()
            this.height = Math.floor(Math.random() * 500 + 100)
            this.element.css({
                backgroundColor: this.color,
                height: this.height + "px",
                lineHeight: this.height + "px"
            }).find('.mycolor').text(this.color)
        }
    }

    return ColorLump
});