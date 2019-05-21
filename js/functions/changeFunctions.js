var slider = document.getElementById('historyRange');
var box = document.getElementById("box");


slider.onchange = function () {
    box.value = slider.value;
    graph.fromJSON(historyOfGraph[slider.value])
};

$("#watchHistory").on('click', function () {
    $("#paper").addClass("disabledPaper");
    $('#watchLoops').css("display", "none");
    $('#watchHistory').css("display", "none");
    $('#historyRange').css("display", "block");
    $('#box').css("display", "block");
    $('#stopHistory').css("display", "inline");

});

$("#stopHistory").on('click', function () {
    $("#paper").removeClass("disabledPaper");
    $("#historyRange").attr("value", historyOfGraph.length - 1);
    $("#box").attr("value", historyOfGraph.length - 1);
    $('#watchHistory').css("display", "inline-block");
    $('#watchLoops').css("display", "inline-block");
    $('#historyRange').css("display", "none");
    $('#box').css("display", "none");
    $('#stopHistory').css("display", "none");
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1])
});

$("#watchLoops").on('click', function () {
    $("#paper").addClass("disabledPaper");
    $('#watchLoops').css("display", "none");
    $('#watchHistory').css("display", "none");
    $('#stopLoops').css("display", "block");
    $('#loops').css("display", "block");
    for (i = 0; i < graphlib.alg.findCycles(graph.toGraphLib()).length; i++) {
        console.log(graphlib.alg.findCycles(graph.toGraphLib()));
        $('#loops').append('<option class="loop" value="' + (i) + '">' + (i + 1) + '</option>');
    }

});

$("#stopLoops").on('click', function () {
    $("#paper").removeClass("disabledPaper");
    $('#watchLoops').css("display", "inline-block");
    $('#watchHistory').css("display", "inline-block");
    $('#stopLoops').css("display", "none");
    $('#loops').css("display", "none");
    $(".loop").remove();
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1])
});

$('#loops').on('change', function () {
    var value = this.value;
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1])
    if (value !== 'none') {
        var cycles = graphlib.alg.findCycles(graph.toGraphLib());
        console.log(cycles);
        var elements = cycles[value];
        elements.push(elements[0]);
        console.log(elements);
        var links = graph.getLinks();
        var neededLinks = findLinks(elements, links);
        console.log(neededLinks.length);
        var otherLinks = getLinksToGreyColor(links, neededLinks);
        console.log(otherLinks.length);
        otherLinks.forEach(function (elem) {
            elem.attr('.marker-target/fill', GREY);
            elem.attr('.marker-target/stroke', GREY);
            elem.attr('.marker-target/d', 'M 10 0 L 0 5 L 10 10 z');

            elem.attr('.connection/fill', 'none');
            elem.attr('.connection/stroke-width', '1');
            elem.attr('.connection/stroke', GREY);
            elem.attr('.connection/opacity', '0.4');
        });
    }
});

function findLinks(elements, links) {
    var neededLinks = [];
    for (var i = 0; i < elements.length - 1; i++) {
        var start = elements[i];
        var end = elements[i + 1];
        console.log(start);
        console.log(end);
        for (var k = 0; k < links.length; k++) {
            var link = links[k];
            console.log(link.getSourceElement().id);
            console.log(link.getTargetElement().id);
            if ((link.getSourceElement().id === end && link.getTargetElement().id === start)) {
                neededLinks.push(link.id);
                break;
            }
        }
    }
    return neededLinks;
}

function getLinksToGreyColor(links, neededLinks) {
    console.log(neededLinks);
    var otherLinks = [];
    links.forEach(function (link) {
        console.log(link);
        if (!neededLinks.includes(link.id)) {
            otherLinks.push(link);
        }
    });
    return otherLinks;


}




