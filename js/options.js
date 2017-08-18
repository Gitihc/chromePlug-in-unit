$(function () {
    initPage();
})

function initPage() {
    superVideoInterface = $.parseJSON(window.localStorage.getItem('superVideoInterface'));
    var v = "";
    if (superVideoInterface) {
        for (var i = 0; i < superVideoInterface.length; i++) {
            var obj = superVideoInterface[i];
            v += obj.url + "\n";
        }
    }
    $("#txtService").val(v);

    $("#txtService").change(function () {
        var v = $(this).val();
        console.log(v);
        var service = v.toString().split("\n");
        var superVideoInterface = [];
        for (var i = 0; i < service.length; i++) {
            var s = service[i];
            var obj = {
                idx: (i + 1),
                url: s
            }
            superVideoInterface.push(obj);
        }
        window.localStorage.setItem('superVideoInterface', JSON.stringify(superVideoInterface));
    });
}



