require(["jquery"], function ($) {
    $("ul.catalogs li a").each(function (i, item) {
        $(item).before("<span class=first-letter>" + item.text.substr(0, 1) + "</span>")
    })
})