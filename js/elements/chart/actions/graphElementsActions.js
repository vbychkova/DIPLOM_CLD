"use strict";

function undoRedoAction(evtObj) {
    if (evtObj.keyCode === 90 && evtObj.ctrlKey) {
        commandManager.undo();
        setHistory();
    }

    if (evtObj.keyCode === 89 && evtObj.ctrlKey) {
        commandManager.redo();
        setHistory();
    }
}

function deleteLinkAction(currElement) {
    currElement.remove();
    setHistory();
}

function saveLink(currElement) {
    const fullTypeOfLink = getFullType();
    setTypeOfLink(currElement, fullTypeOfLink.toString());
    setHistory();
}

function deleteBlock(currElement) {
    graph.removeLinks(currElement);
    graph.removeCells(currElement);
    setHistory();
}

function changeTextOfBlock(currElement, textLabel) {
    bootbox.prompt({
        title: "Название переменной",
        value: textLabel,
        callback: function (result) {
            if (result) {
                const text = result.trim();
                if (text) {
                    currElement.attr(".text/text", text);
                    currElement.resize(setSize(text), 9);
                    setHistory();
                }
            }
        }
    })
}

function createBox(x, y) {
    bootbox.prompt({
        title: 'Название переменной',
        value: "",
        callback: function (result) {
            if (result) {
                const text = result.trim();
                if (text) {
                    state(x, y, text);
                    setHistory();
                }
            }
        }
    });
}

function createCycleByType(x, y, selectedOption) {
    switch (selectedOption) {
        case BALANCE_CYCLE_CLOCKWISE:
            cycle(x, y, BALANCE_CYCLE_PREFIX + " " + balanceCycleCounter, CLOCKWISE_LINK);
            balanceCycleCounter++;
            break;

        case BALANCE_CYCLE_COUNTERCLOCKWISE:
            cycle(x, y, BALANCE_CYCLE_PREFIX + " " + balanceCycleCounter, COUNTERCLOCKWISE_LINK);
            balanceCycleCounter++;
            break;

        case REINFORCEMENT_CYCLE_CLOCKWISE:
            cycle(x, y, REINFORCEMENT_CYCLE_PREFIX + " " + reinforcementCycleCounter, CLOCKWISE_LINK);
            reinforcementCycleCounter++;
            break;

        case REINFORCEMENT_CYCLE_COUNTERCLOCKWISE:
            cycle(x, y, REINFORCEMENT_CYCLE_PREFIX + " " + reinforcementCycleCounter, COUNTERCLOCKWISE_LINK);
            reinforcementCycleCounter++;
            break;
    }
}

function connectLink(elemId) {
    const linkView = paper.getDefaultLink()
        .set({
            'source': {id: elemId},
            'target': {id: elemId}
        })
        .addTo(paper.model)
        .findView(paper);

    linkView.startArrowheadMove('target');

    $(document).on({
        'mousemove.linker': onDrag,
        'mouseup.linker': onDragEnd
    }, {
        view: linkView,
        paper: paper
    });
}

function saveCycle(currElement, textLabel) {
    const position = currElement.get('position');
    const fullTypeOfCycle = getFullType();
    graph.removeCells(currElement);
    changeNumeration(textLabel);
    changeCounters(textLabel);
    createCycleByType(position.x, position.y, fullTypeOfCycle.toString());
}

function deleteCycle(currElement, textLabel) {
    graph.removeCells(currElement);
    changeNumeration(textLabel);
    changeCounters(textLabel);
    setHistory();
}