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
    const selectedOption = $('.select').toArray().filter(getClickedRadioButton)[0].id;
    setTypeOfLink(currElement, selectedOption);
    setHistory();
}

function deleteBlock(currElement) {
    graph.removeLinks(currElement);
    graph.removeCells(currElement);
    setHistory();
}

function changeTextOfBlock(currElement,textLabel) {
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

function createLoop(x, y) {
    bootbox.dialog({
        message: "<p>Управление циклами:</p>" +
            " <div class=\"form-group\">\n" +
            "  <label for=\"selectLoopCreate\">Тип связи:</label>\n" +
            "  <select class=\"form-control\" id=\"selectLoopCreate\">\n" +
            "    <option value='1'>Балансирующий цикл по часовой</option>\n" +
            "    <option value='2'>Балансирующий цикл против часовой</option>\n" +
            "    <option value='3'>Усиливающий цикл по часовой</option>\n" +
            "    <option value='4'>Усиливающий цикл против часовой</option>\n" +
            "  </select>\n" +
            "</div> ",
        buttons: {
            createLoop: {
                label: "Создать цикл",
                className: 'btn-success',
                callback: function () {
                    const selectedOption = $('#selectLoopCreate').val();
                    createLoopSecondStep(x, y, selectedOption);
                }
            }
        }
    });
}

function createLoopSecondStep(x, y, selectedOption) {

    switch (selectedOption) {
        case BALANCE_LOOP_CLOCKWISE:
            loop(x, y, BALANCE_LOOP_PREFIX + " " + balanceLoopCounter, CLOCKWISE_LINK);
            balanceLoopCounter++;
            break;

        case BALANCE_LOOP_COUNTERCLOCKWISE:
            loop(x, y, BALANCE_LOOP_PREFIX + " " + balanceLoopCounter, COUNTERCLOCKWISE_LINK);
            balanceLoopCounter++;
            break;

        case REINFORCEMENT_LOOP_CLOCKWISE:
            loop(x, y, REINFORCEMENT_LOOP_PREFIX + " " + reinforcementLoopCounter, CLOCKWISE_LINK);
            reinforcementLoopCounter++;
            break;

        case REINFORCEMENT_LOOP_COUNTERCLOCKWISE:
            loop(x, y, REINFORCEMENT_LOOP_PREFIX + " " + reinforcementLoopCounter, COUNTERCLOCKWISE_LINK);
            reinforcementLoopCounter++;
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

function saveCycle(currElement,textLabel) {
    const position = currElement.get('position');
    const selectedOption = $('#selectLoopChange').val();
    graph.removeCells(currElement);
    changeNumeration(textLabel);
    changeCounters(textLabel);
    createLoopSecondStep(position.x, position.y, selectedOption);
}

function deleteCycle(currElement,textLabel) {
    graph.removeCells(currElement);
    changeNumeration(textLabel);
    changeCounters(textLabel);
    setHistory();
}