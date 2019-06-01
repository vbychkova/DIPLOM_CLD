"use strict";
const slider = document.getElementById('historyRange');
const box = document.getElementById("box");

slider.onchange = function () {
    box.value = slider.value;
    graph.fromJSON(historyOfGraph[slider.value])
};

$("#watchHistory").on('click', function () {
    $("#paper").addClass("disabledPaper");
    $('#watchLoops').css("display", "none");
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
    $('#watchLoops').css("display", "inline-block");
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1])
});

$("#watchLoops").on('click', function () {
    $("#paper").addClass("disabledPaper");
    $('#watchLoops').css("display", "none");
    $('#watchHistory').css("display", "none");
    $('#stopLoops').css("display", "block");
    $('#loops').css("display", "block");
    buildSelectionForTheCycles();
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
    const value = this.value;
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1]);
    if (value !== 'none') {
        showCycle(value);
    }
});