function recognizeCycleType(elements) {
    elements.push(elements[0]);
    const count = countLinksForRecognizeCycleType(elements);
    const minusCount = count["-"];
    if (minusCount % 2 === 0 || minusCount === 0) {
        return REINFORCEMENT_CYCLE_PREFIX;
    } else {
        return BALANCE_CYCLE_PREFIX;
    }
}

function findCycles() {
    const allCells = graph.getElements();
    const cGraph = new Graph();
    allCells.forEach(elem => {
        const id = elem.id;
        cGraph.nodes.push(id);
        const arrows = [];
        const outboundLinks = graph.getConnectedLinks(elem, {outbound: true});
        outboundLinks.forEach(link => {
            arrows.push(link.get("target").id);
        });
        cGraph.arrows.set(id, arrows);
    });
    const cycles = cGraph.findCycles();
    const cyclesCleared = [];
    cycles.forEach(cycle => {
        let isExists = false;
        for (let i = 0; i < cyclesCleared.length; i++) {
            const cycleSorted = sort(cycle);
            const cycleToCheckSorted = sort(cyclesCleared[i]);
            if (equals(cycleSorted, cycleToCheckSorted)) {
                isExists = true;
            }
        }
        if (!isExists) {
            cyclesCleared.push(cycle);
        }
    });
    currentCycles=cyclesCleared;
}

function sort(arr) {
    return arr.concat().sort();
}

function equals(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function findLinks(elements) {
    const neededLinks = [];
    for (let i = 0; i < elements.length - 1; i++) {
        const start = graph.getCell(elements[i]);
        const end = graph.getCell(elements[i + 1]);
        const outboundLinks = graph.getConnectedLinks(start, {outbound: true});
        const inboundLinks = graph.getConnectedLinks(end, {inbound: true});
        outboundLinks.forEach(link => {
            const linkToAdd = inboundLinks.filter(outLink => outLink.id === link.id);
            linkToAdd.forEach(add => neededLinks.push(add.id));
        })
    }
    return neededLinks;
}

function countLinksForRecognizeCycleType(elements) {
    let plusCount = 0;
    let minusCount = 0;
    const links = findLinks(elements);
    links.forEach(id => {
        const link = graph.getCell(id);
        const type = getSelectedLinkType(link);
        if (type === POSITIVE_BY_TIME_LINK_VALUE || type === POSITIVE_LINK_VALUE) {
            plusCount++;
        } else {
            minusCount++;
        }
    });
    return {"+": plusCount, "-": minusCount};
}

function getLinksToGreyColor(links, neededLinks) {
    const otherLinks = [];
    links.forEach(function (link) {
        if (!neededLinks.includes(link.id)) {
            otherLinks.push(link);
        }
    });
    return otherLinks;
}