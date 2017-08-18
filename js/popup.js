var superVideoInterface = [];
$(function () {
    initSuperVideo();
    //    $("#btn1").on("click", function () {
    //        chrome.tabs.getSelected(null, function (tab) {
    //            var url = tab.url;
    //            chrome.tabs.create({ url: url });
    //        });
    //    })

    $("#btnOptions").bind("click", function () {
        window.open(chrome.extension.getURL('options.html'));
    })
})

function initSuperVideo() {
    superVideoInterface = $.parseJSON(window.localStorage.getItem('superVideoInterface'));
    if (superVideoInterface) {
        var html = "";
        for (var i = 0; i < superVideoInterface.length; i++) {
            var service = superVideoInterface[i];
            html += '<li class="menu-item" title=' + service.url + '>service' + service.idx + '</li>';
        }
        $("#services_list").html("");
        $("#services_list").html(html);
        bindEvent();
    } else {
        $("#services_list").html("无可用服务器！");
    }
}

function bindEvent() {
    $(".menu-item").click(function () {
        var serviceUrl = $(this).attr("title");
        if (serviceUrl.length > 0) {
            chrome.tabs.getSelected(null, function (tab) {
                var curTabUrl = tab.url;
                var url = serviceUrl + curTabUrl;
                chrome.tabs.create({ url: url });
            });
        }
    });
}


