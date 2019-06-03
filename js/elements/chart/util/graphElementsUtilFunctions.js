function measureText(pText, pFontSize, pStyle) {
    let lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    const lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}

function setSize(label) {
    let zoomValue=1;
    if(zoom!==undefined){
        zoomValue=zoom.getSizes().realZoom;
    }
    let size = measureText(label, 9, 'arial').width*(1/zoomValue);
    if (size < 20) {
        size = 20;
    }
    return size;
}

function customizeLinks(element, color, type, time) {
    element
        .label(0, {attrs: {text: {text: type, fill: color}}})
        .label(1, {attrs: {text: {text: time, fill: color}}})
        .attr('.marker-target/fill', color)
        .attr('.marker-target/stroke', color)
        .attr('.connection/stroke', color);
}

function getSelectedLinkType(element) {
    const sign = element.label(0).attrs.text.text;
    const timeFlag = element.label(1).attrs.text.text;
    if (sign === "+") {
        if (timeFlag === "∥") {
            return POSITIVE_BY_TIME_LINK_VALUE;
        }
        return POSITIVE_LINK_VALUE;
    }
    if (sign === " – ") {
        if (timeFlag === "∥") {
            return NEGATIVE_BY_TIME_LINK_VALUE;
        }
        return NEGATIVE_LINK_VALUE;
    }
    return POSITIVE_LINK_VALUE;
}

function getSelectedCycleType(element, text) {
    if (text.startsWith(BALANCE_CYCLE_PREFIX)) {
        if (element.attr("image/xlink:href") === CLOCKWISE_LINK) {
            return BALANCE_CYCLE_CLOCKWISE;
        }
        return BALANCE_CYCLE_COUNTERCLOCKWISE;
    }
    if (text.startsWith(REINFORCEMENT_CYCLE_PREFIX)) {
        if (element.attr("image/xlink:href") === CLOCKWISE_LINK) {
            return REINFORCEMENT_CYCLE_CLOCKWISE;
        }
        return REINFORCEMENT_CYCLE_COUNTERCLOCKWISE;
    }
}

function getClickedButton(value) {
    return value.checked;
}

function getStatusOfRadioButtonsInLinkMenu(type) {
    const elems = ['', '', ''];
    if (type === POSITIVE_LINK_VALUE || type === POSITIVE_BY_TIME_LINK_VALUE) {
        elems[0] = 'checked';
    }
    if (type === NEGATIVE_LINK_VALUE || type === NEGATIVE_BY_TIME_LINK_VALUE) {
        elems[1] = 'checked';
    }
    if (type === POSITIVE_BY_TIME_LINK_VALUE || type === NEGATIVE_BY_TIME_LINK_VALUE) {
        elems[2] = 'checked';
    }
    return elems;
}

function getStatusOfRadioButtonsInCycleMenu(type) {
    const elems = ['', '', ''];
    if (type === BALANCE_CYCLE_CLOCKWISE || type === BALANCE_CYCLE_COUNTERCLOCKWISE) {
        elems[0] = 'checked';
    }
    if (type === REINFORCEMENT_CYCLE_CLOCKWISE || type === REINFORCEMENT_CYCLE_COUNTERCLOCKWISE) {
        elems[1] = 'checked';
    }
    if (type === BALANCE_CYCLE_COUNTERCLOCKWISE || type === REINFORCEMENT_CYCLE_COUNTERCLOCKWISE) {
        elems[2] = 'checked';
    }
    return elems;
}

function setTypeOfLink(element, selectedOption) {
    switch (selectedOption) {
        case POSITIVE_LINK_VALUE:
            customizeLinks(element, RED, '+', '');
            break;
        case POSITIVE_BY_TIME_LINK_VALUE:
            customizeLinks(element, RED, '+', '∥');
            break;
        case NEGATIVE_LINK_VALUE:
            customizeLinks(element, BLUE, ' – ', '');
            break;
        case NEGATIVE_BY_TIME_LINK_VALUE:
            customizeLinks(element, BLUE, ' – ', '∥');
            break;
    }
}

function changeNumeration(textLabel) {
    const elements = [];
    graph.getElements().forEach(elem => {
        const textVal = elem.attributes.attrs.text.text.charAt(0);
        if (textVal !== undefined && textVal == textLabel.charAt(0)) {
            elements.push(elem);
        }
    });
    elements
        .filter(e => parseInt(e.attributes.attrs.text.text.substr(2)) > parseInt(textLabel.substr(2)))
        .forEach(function (e) {
            const label = e.attributes.attrs.text.text;
            const prefix = label.charAt(0);
            let num = parseInt(label.substr(2));
            num--;
            e.attr(".index/text", prefix + " " + num);
        });
}

function changeCounters(label) {
    if (label.charAt(0) === REINFORCEMENT_CYCLE_PREFIX) {
        reinforcementCycleCounter--;
    } else {
        balanceCycleCounter--;
    }
}

function setHistory() {
    historyOfGraph.push({status: graph.toJSON(),comment: ''});
}

function onDrag(evt) {
    const p = evt.data.paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
    });
    evt.data.view.pointermove(evt, p.x, p.y);
}

function onDragEnd(evt) {

    evt.data.view.pointerup(evt);
    $(document).off('.linker');
}

function getFullType() {
    const clickedType = $('.select').toArray().filter(getClickedButton)[0].id;
    const clickedTime = $('.inTime')[0].checked ? 1 : 0;
    const fullTypeOfCycle = Number(clickedType) + Number(clickedTime);
    return fullTypeOfCycle;
}