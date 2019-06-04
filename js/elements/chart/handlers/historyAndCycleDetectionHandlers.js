"use strict";
const slider = document.getElementById('historyRange');
const box = document.getElementById("box");

slider.onchange = function () {
    box.value = slider.value;
    const historyValue=historyOfGraph[slider.value-1];
    graph.fromJSON(historyValue.status);
    $("#commentValue").val(historyValue.comment);
};

$("#watchHistory").on('click', function () {
    $("#paper").addClass("disabledPaper");
    $('#watchCycles').css("display", "none");
    $('#watchHistory').css("display", "none");
    $('#stopHistory').css("display", "inline");
    if(historyOfGraph.length !== 0){
        $('#comment').css("display", "inline");
        $("#commentValue")[0].value=historyOfGraph[historyOfGraph.length-1].comment;
    }

    $("#historyRange")
        .css("display", "block")
        .attr("max", historyOfGraph.length)
        .val(historyOfGraph.length);
    $("#box")
        .css("display", "block")
        .val(historyOfGraph.length);
});

$("#stopHistory").on('click', function () {
    $("#paper").removeClass("disabledPaper");
    $("#historyRange")
        .val(historyOfGraph.length)
        .css("display", "none");
    $("#box")
        .val(historyOfGraph.length)
        .css("display", "none");
    $('#stopHistory').css("display", "none");
    $('#watchHistory').css("display", "inline-block");
    $('#watchCycles').css("display", "inline-block");
    closeNav();
    $('#comment').css("display", "none");
    $("#commentValue")[0].value="";
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1].status)
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
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1].status)
});


$('#cycles').on('change', function () {
    const value = this.value;
    graph.fromJSON(historyOfGraph[historyOfGraph.length - 1].status);
    if (value !== 'none') {
        showCycle(value);
    }
});

function openNav() {
    document.getElementById("comment").style.display="none";
    document.getElementById("sidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("comment").style.display="inline";
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

$('#commentValue').bind('input propertychange', function() {
    $('#saveComment').css("display", "inline-block");
});

$('#saveComment').click(function () {
    const historyValue=historyOfGraph[slider.value-1];
    const comment= $('#commentValue')[0].value;
    historyValue.comment=comment;
    $('#saveComment').css("display", "none");
});