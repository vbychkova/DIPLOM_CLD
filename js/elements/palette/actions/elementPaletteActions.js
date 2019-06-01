$(document).on('click', '.rectangleElement', function () {
    const svg = document.getElementsByTagName('svg')[0];
    svg.setAttribute("class", "rectangleAdd");
});

$(document).on('click', '.linkElement', function () {
    const svg = document.getElementsByTagName('svg')[0];
    svg.setAttribute("class", "linkAdd");
});

$(document).on('click', '.loopElement', function () {
    const svg = document.getElementsByTagName('svg')[0];
    svg.setAttribute("class", "loopAdd");
});

$(document).on('click', '.refreshElement', function () {
    deleteCursor();
});

$('svg').on("contextmenu", function (e) {
    deleteCursor();
});


function deleteCursor() {
    const svg = document.getElementsByTagName('svg')[0];
    svg.removeAttribute("class");
}