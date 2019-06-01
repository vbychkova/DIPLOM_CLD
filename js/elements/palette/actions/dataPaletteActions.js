$(document).on('click', '.downloadButton', function () {
    bootbox.prompt("Введите имя файла для сохранения",
        function(result){
            if (result) {
                var obj = graph.toJSON();
                var elements=[];
                elements.push(obj);
                elements.push({rLoop:reinforcementLoopCounter,bLoop:balanceLoopCounter});
                elements.push({history: historyOfGraph});
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elements));
                var elem=$("<a></a>")
                    .attr("class","downloadHref")
                    .attr("href",dataStr)
                    .attr("download",result + ".json")
                    .css("display","none");
                $("body").append(elem);
                $(".downloadHref")[0].click();
                $(".downloadHref")[0].remove();
            }
        });

});

$(document).on('click', '.uploadButton', function () {
    var elem=$("<input/>")
        .attr("name","uploadInput")
        .attr("type","file")
        .attr("class","uploadInput")
        .css("display","none");
    $("body").append(elem);
    elem.click();
});


$(document).on('change', '.uploadInput', function () {
    var elem=$(".uploadInput")[0];
    var files=elem.files;
    if (files.length == 1) {

        var fr = new FileReader();

        fr.onload = function (e) {
            try {
                var result = JSON.parse(e.target.result);
                var formatted = JSON.stringify(result[0]);
                graph.fromJSON(JSON.parse(formatted));
                balanceLoopCounter=result[1].bLoop;
                reinforcementLoopCounter=result[1].rLoop;
                historyOfGraph=result[2].history;
                $('#historyRange').css("display","block");
                $('#box').css("display","block");
                $("#historyRange").attr("max",historyOfGraph.length-1);
                $("#historyRange").attr("value",historyOfGraph.length-1);
                $("#box").attr("value",historyOfGraph.length-1);
                $('#historyRange').css("display","none");
                $('#box').css("display","none");
            }
            catch (e) {
                console.log(e);
                bootbox.alert("Загрузка возможна только с json файлов");
                elem.remove();
            }

        };

        fr.readAsText(files.item(0));
    }

    elem.remove();
});
