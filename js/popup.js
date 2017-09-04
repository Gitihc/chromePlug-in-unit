var superVideoInterface = [];
$(function () {
    initSuperVideo();
    $("#btnOptions").bind("click", function () {
        window.open(chrome.extension.getURL('options.html'));
    })
    document.oncontextmenu = function () {
        return false;
    }
})

function initSuperVideo() {
    superVideoInterface = $.parseJSON(window.localStorage.getItem('superVideoInterface'));
    if (superVideoInterface) {
        var html = "";
        for (var i = 0; i < superVideoInterface.length; i++) {
            var service = superVideoInterface[i];
            html += '<li class="menu-item" idx=' + service.idx + ' title=' + service.url + '>service' + (i >= 10 ? (i + 1) : "0" + (i + 1)) + '</li>';
        }
        $("#services_list").html("");
        $("#services_list").html(html);
        bindEvent();
    } else {
        $("#services_list").html("无可用服务器！");
    }
}
function bindEvent() {
    $(".menu-item").mousedown(function (e) {
        if (3 == e.which) { //右键
            rightMouseClick(e);
        } else if (1 == e.which) {  //左键
            leftMouseClick(e);
        }
    })
}
function leftMouseClick(e) {
    var serviceUrl = $(e.currentTarget).attr("title");
    if (serviceUrl.length > 0) {
        chrome.tabs.getSelected(null, function (tab) {
            var curTabUrl = tab.url;
            var url = serviceUrl + curTabUrl;
            chrome.tabs.create({ url: url });
        });
    }
}
function rightMouseClick(e) {
    var that = $(e.currentTarget);
    var title = $(that).html();
    var idx = $(that).attr("idx");
    if (confirm("真的要删除【" + title + "】吗？")) {
        deleteItem(parseInt(idx));
        initSuperVideo();
    }
}
function deleteItem(idx) {
    superVideoInterface = $.parseJSON(window.localStorage.getItem('superVideoInterface'));
    var v = "";
    if (superVideoInterface) {
        for (var i = 0; i < superVideoInterface.length; i++) {
            var obj = superVideoInterface[i];
            if (obj.idx == idx) {
                superVideoInterface.pop(obj);
                break;
            }
        }
        window.localStorage.setItem('superVideoInterface', JSON.stringify(superVideoInterface));
    }
}


