"use strict";

function undoRedoAction(evtObj) {
    if (evtObj.keyCode === 90 && evtObj.ctrlKey) {
        commandManager.undo();
        setHistory();
    }

    if (evtObj.keyCode === 88 && evtObj.ctrlKey) {
        commandManager.redo();
        setHistory();
    }
}

function deleteLinkAction(currElement) {
    currElement.remove();
    setHistory();
}

function saveLink(currElement) {
    const clickedType = $('.select').toArray().filter(getClickedButton)[0].id;
    const clickedTime = $('.inTime')[0].checked ? 1 : 0;
    const fullTypeOfLink = Number(clickedType) + Number(clickedTime);
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
        title: "Текст переменной",
        value: textLabel,
        callback: function (result) {
            if (result) {
                currElement.attr(".text/text", result);
                currElement.resize(setSize(result), 9);
                setHistory();
            }
        }
    })
}

function createBox(x, y) {
    bootbox.prompt({
        title: 'Текст переменной',
        value: "Новая переменная",
        callback: function (result) {
            if (result) {
                state(x, y, result);
                setHistory();
            }

        }
    });
}

function createCycle(x, y) {
    bootbox.dialog({
        message: "<p>Управление циклами:</p>" +
            " <div class=\"form-group\">\n" +
            "  <label for=\"selectCycleCreate\">Тип связи:</label>\n" +
            "  <select class=\"form-control\" id=\"selectCycleCreate\">\n" +
            "    <option value='1'>Балансирующий цикл по часовой</option>\n" +
            "    <option value='2'>Балансирующий цикл против часовой</option>\n" +
            "    <option value='3'>Усиливающий цикл по часовой</option>\n" +
            "    <option value='4'>Усиливающий цикл против часовой</option>\n" +
            "  </select>\n" +
            "</div> ",
        buttons: {
            createCycle: {
                label: "Создать цикл",
                className: 'btn-success',
                callback: function () {
                    const selectedOption = $('#selectCycleCreate').val();
                    createCycleByType(x, y, selectedOption);
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
    const selectedOption = $('#selectCycleChange').val();
    graph.removeCells(currElement);
    changeNumeration(textLabel);
    changeCounters(textLabel);
    createCycleByType(position.x, position.y, selectedOption);
}

function deleteCycle(currElement, textLabel) {
    graph.removeCells(currElement);
    changeNumeration(textLabel);
    changeCounters(textLabel);
    setHistory();
}