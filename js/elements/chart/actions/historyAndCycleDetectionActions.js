function buildSelectionForTheCycles() {
    findCycles();
    let rIndex = 1;
    let bIndex = 1;
    for (let i = 0; i < currentCycles.length; i++) {
        const type = recognizeCycleType(currentCycles[i]);
        if (type === REINFORCEMENT_CYCLE_PREFIX) {
            $('#cycles').append('<option class="cycle" value="' + (i) + '">R ' + (rIndex) + '</option>');
            rIndex++;
        } else {
            $('#cycles').append('<option class="cycle" value="' + (i) + '">B ' + (bIndex) + '</option>');
            bIndex++;
        }
    }
}

function showCycle(value) {
    const elements = currentCycles[value];
    elements.push(elements[0]);
    const links = graph.getLinks();
    const neededLinks = findLinks(elements);
    const otherLinks = getLinksToGreyColor(links, neededLinks);
    otherLinks.forEach(function (elem) {
        elem.attr('.marker-target/fill', GREY)
            .attr('.marker-target/stroke', GREY)
            .attr('.connection/stroke', GREY)
            .label(0, {attrs: {text: {fill: GREY}}})
            .label(1, {attrs: {text: {fill: GREY}}});
    });
}