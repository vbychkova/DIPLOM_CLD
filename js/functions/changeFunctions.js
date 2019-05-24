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

function findCycles(){
    var allCells=graph.getElements();
    console.log(allCells);
    var points=[];
    var statuses={};
    allCells.forEach(elem=>{
        var outboundLinks = graph.getConnectedLinks(elem, { outbound: true });
        var children=[];
        outboundLinks.forEach(link=>{
            children.push(link.get("target"));
        });
        points.push({element: elem,children:children});
        statuses[elem.id]=0;
    });
    var cycles=[];
    findCyclesRecursive(points[0],[],cycles,statuses,points);
    return cycles;
}

function findCyclesRecursive(point,cycle,cycles,statuses,points){
    statuses[point.element.id]=1;
    point.children.forEach(child=>{
        var childStatus=statuses[child.id];
        cycle.push(point.element);
        console.log(childStatus);
        if(childStatus===0){
            var newPoint=points.filter(p=>child.id===p.element.id)[0];
            findCyclesRecursive(newPoint,cycle,cycles,statuses,points);
        }
        if(childStatus===1){
            cycles.push(cycle);
        }
    });
    statuses[point.element.id]=2;
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
        console.log(cycles);
        var elements = cycles[value];
        elements.push(elements[0]);
        console.log(elements);
        var links = graph.getLinks();
        var neededLinks = findLinks(elements);
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

function findLinks(elements) {
    var neededLinks = [];
    for (var i = 0; i < elements.length-1; i++) {
        var start = graph.getCell(elements[i]);
        var end = graph.getCell(elements[i + 1]);
        var outboundLinks = graph.getConnectedLinks(end, { outbound: true });
        var inboundLinks = graph.getConnectedLinks(start, { inbound:true });
        outboundLinks.forEach(link=>{
            var linkToAdd=inboundLinks.filter(outLink=>outLink.id===link.id);
            linkToAdd.forEach(add =>  neededLinks.push(add.id));
            console.log(neededLinks);
        })
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




