~ function () {
    var rect = document.querySelector("#rect")

    var rectHeightInfo = document.querySelector("#rect-height-info")
    var contents = []
    if (rect) {
        contents.push("clientHeight: " + rect.clientHeight + "   (内容区高度 + padding的高度)");

        contents.push("offsetHeight: " + rect.offsetHeight + "  (内容区高度 + padding的高度 + border的高度)");

        contents.push("scrollHeight: " + rect.scrollHeight + "  (内容区高度 + padding的高度 + 内容多出的偏移高度))");

        contents.push("offsetTop: " + rect.offsetTop + "  (内容偏移高度))");
    }
    rectHeightInfo.innerHTML = contents.join("<br/>")

}()