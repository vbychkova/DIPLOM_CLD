"use strict";
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
    for (var i = 0; i < findCycles().length; i++) {
        $('#loops').append('<option class="loop" value="' + (i) + '">' + (i + 1) + '</option>');
    }

});

function findCycles() {
    var allCells = graph.getElements();
    var cGraph = new Graph();
    allCells.forEach(elem => {
        var id = elem.id;
        cGraph.nodes.push(id);
        var arrows = [];

        var outboundLinks = graph.getConnectedLinks(elem, {outbound: true});
        outboundLinks.forEach(link => {
            arrows.push(link.get("target").id);
        });
        cGraph.arrows.set(id, arrows);
    });
    var cycles = cGraph.findCircuits();
    var cyclesCleared = [];
    cycles.forEach(cycle => {
        var isExists = false;
        for (var i = 0; i < cyclesCleared.length; i++) {
            var cycleSorted = sort(cycle);
            var cycleToCheckSorted = sort(cyclesCleared[i]);
            if (equals(cycleSorted, cycleToCheckSorted)) {
                isExists = true;
            }
        }
        if (!isExists) {
            cyclesCleared.push(cycle);
        }
    });
    return cyclesCleared;
}


function sort(arr) {
    return arr.concat().sort();
}

function equals(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

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
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1]);
    if (value !== 'none') {
        var cycles = findCycles();
        var elements = cycles[value];
        elements.push(elements[0]);
        var links = graph.getLinks();
        var neededLinks = findLinks(elements);
        var otherLinks = getLinksToGreyColor(links, neededLinks);
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

function findLinks(elements) {
    var neededLinks = [];
    for (var i = 0; i < elements.length - 1; i++) {
        var start = graph.getCell(elements[i]);
        var end = graph.getCell(elements[i + 1]);
        var outboundLinks = graph.getConnectedLinks(start, {outbound: true});
        var inboundLinks = graph.getConnectedLinks(end, {inbound: true});
        outboundLinks.forEach(link => {
            var linkToAdd = inboundLinks.filter(outLink => outLink.id === link.id);
            linkToAdd.forEach(add => neededLinks.push(add.id));
        })
    }

    return neededLinks;
}

function getLinksToGreyColor(links, neededLinks) {
    var otherLinks = [];
    links.forEach(function (link) {
        if (!neededLinks.includes(link.id)) {
            otherLinks.push(link);
        }
    });
    return otherLinks;


}




