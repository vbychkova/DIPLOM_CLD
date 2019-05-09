$(document).on('click', '.rectangleElement', function () {
    var svg = document.getElementsByTagName('svg')[0];
    svg.setAttribute("class","rectangleAdd");
});

$(document).on('click', '.linkElement', function () {
    var svg = document.getElementsByTagName('svg')[0];
    svg.setAttribute("class","linkAdd");
});

$(document).on('click', '.loopElement', function () {
    var svg = document.getElementsByTagName('svg')[0];
    svg.setAttribute("class","loopAdd");
});

$(document).on('click', '.refreshElement', function () {
   deleteCursor();
});

$('svg').on("contextmenu", function(e)
{
   deleteCursor();
});


function deleteCursor() {
    var svg = document.getElementsByTagName('svg')[0];
    svg.removeAttribute("class");
}