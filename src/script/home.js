require(["jquery"], function (jquery) {
    var $ = jquery;
    $("ul.catalogs li a").each(function (i, item) {
        $(item).before("<span class=first-letter>" + item.text.substr(0, 1) + "</span>")
    })
})