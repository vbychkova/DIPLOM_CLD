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