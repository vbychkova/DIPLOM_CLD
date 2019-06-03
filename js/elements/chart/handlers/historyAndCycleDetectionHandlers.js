"use strict";
const slider = document.getElementById('historyRange');
const box = document.getElementById("box");

slider.onchange = function () {
    box.value = slider.value;
    graph.fromJSON(historyOfGraph[slider.value])
};

$("#watchHistory").on('click', function () {
    $("#paper").addClass("disabledPaper");
    $('#watchCycles').css("display", "none");
    $('#watchHistory').css("display", "none");
    $('#stopHistory').css("display", "inline");
    $("#historyRange")
        .css("display", "block")
        .attr("max", historyOfGraph.length - 1)
        .val(historyOfGraph.length - 1);
    $("#box")
        .css("display", "block")
        .val(historyOfGraph.length - 1);
});

$("#stopHistory").on('click', function () {
    $("#paper").removeClass("disabledPaper");
    $("#historyRange")
        .val(historyOfGraph.length - 1)
        .css("display", "none");
    $("#box")
        .val(historyOfGraph.length - 1)
        .css("display", "none");
    $('#stopHistory').css("display", "none");
    $('#watchHistory').css("display", "inline-block");
    $('#watchCycles').css("display", "inline-block");
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1])
});

$("#watchCycles").on('click', function () {
    $("#paper").addClass("disabledPaper");
    $('#watchCycles').css("display", "none");
    $('#watchHistory').css("display", "none");
    $('#stopCycles').css("display", "block");
    $('#cycles').css("display", "block");
    buildSelectionForTheCycles();
});

$("#stopCycles").on('click', function () {
    $("#paper").removeClass("disabledPaper");
    $('#watchCycles').css("display", "inline-block");
    $('#watchHistory').css("display", "inline-block");
    $('#stopCycles').css("display", "none");
    $('#cycles').css("display", "none");
    $(".cycle").remove();
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1])
});


$('#cycles').on('change', function () {
    const value = this.value;
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1]);
    if (value !== 'none') {
        showCycle(value);
    }
});