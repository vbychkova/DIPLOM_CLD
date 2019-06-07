"use strict";
const slider = document.getElementById('historyRange');
const box = document.getElementById("box");

slider.onchange = function () {
    box.value = slider.value;
    const historyValue = historyOfGraph[slider.value - 1];
    graph.fromJSON(historyValue.status);
    $("#commentValue").val(historyValue.comment);
};

$("#watchHistory").on('click', function () {
    saveCurrentGraph();
    $("#paper").addClass("disabledPaper");
    $('#watchButtons').css("display", "none");
    $('#stopHistory').css("display", "inline");
    if (historyOfGraph.length !== 0) {
        $('#comment').css("display", "inline");
        $("#commentValue")[0].value = historyOfGraph[historyOfGraph.length - 1].comment;
    }

    $("#historyRange")
        .css("display", "inline")
        .attr("max", historyOfGraph.length)
        .val(historyOfGraph.length);
    $("#box")
        .css("display", "block")
        .val(historyOfGraph.length);
});

$("#stopHistory").on('click', function () {
    $("#paper").removeClass("disabledPaper");
    exitFromHistoryBlock();
    rollBackGraph();
});

$("#watchCycles").on('click', function () {
    saveCurrentGraph();
    $("#paper").addClass("disabledPaper");
    $('#watchButtons').css("display", "none");
    $('#stopCycles').css("display", "block");
    $('#cycles').css("display", "block");
    buildSelectionForTheCycles();
});

$("#stopCycles").on('click', function () {
    $("#paper").removeClass("disabledPaper");
    exitFromCycleBlock();
    rollBackGraph();
});


$('#cycles').on('change', function () {
    const value = this.value;
    rollBackGraph();
    if (value !== 'none') {
        showCycle(value);
    }
});

function openNav() {
    document.getElementById("comment").style.display = "none";
    document.getElementById("sidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("comment").style.display = "inline";
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

$('#commentValue').bind('input propertychange', function () {
    $('#saveComment').css("display", "inline-block");
});

$('#saveComment').click(function () {
    const historyValue = historyOfGraph[slider.value - 1];
    const comment = $('#commentValue')[0].value;
    historyValue.comment = comment;
    $('#saveComment').css("display", "none");
});

$('#paperWrapper').click(function () {
    const paperElement = $("#paper");
    if (paperElement.hasClass("disabledPaper")) {
        paperElement.removeClass("disabledPaper");
        exitFromHistoryBlock();
        exitFromCycleBlock();
        rollBackGraph();
    }

});