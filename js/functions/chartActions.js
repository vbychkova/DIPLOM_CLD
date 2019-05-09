document.onkeydown = function KeyPress(e) {
    var evtObj = window.event ? event : e;
    if (evtObj.keyCode == 90 && evtObj.ctrlKey) {
        commandManager.undo();
        setHistory();
    }

    if (evtObj.keyCode == 88 && evtObj.ctrlKey) {
        commandManager.redo();
        setHistory();
    }
};

$(document).on('click', '.labels', function () {
    var elemId = $(this).parent()[0].getAttribute("model-id");
    var currElement = graph.getCell(elemId);

    bootbox.dialog({
        message: "<p>Управление Связями</p> " +
            " <div class=\"form-group\">\n" +
            "  <label for=\"selectLink\">Тип связи:</label>\n" +
            "  <select class=\"form-control\" id=\"selectLink\">\n" +
            "    <option value='1'>Положительная связь</option>\n" +
            "    <option value='2'>Положительная связь проявляющаяся со временем</option>\n" +
            "    <option value='3'>Отрицательная связь</option>\n" +
            "    <option value='4'>Отрицательная связь проявляющаяся со временем</option>\n" +
            "  </select>\n" +
            "</div> ",

        buttons: {

            changeTypeOfLink: {
                label: "Изменить тип связи",
                className: 'btn-primary',
                callback: function () {
                    var selectedOption = $('#selectLink').val();
                    setTypeOfLink(currElement, selectedOption)
                    setHistory();
                }
            },
            positive: {
                label: "Удалить связь",
                className: 'btn-danger',
                callback: function () {
                    currElement.remove();
                    setHistory();
                }
            }

        }
    });
    $("#selectLink").val(setSelectedLinkType(currElement));
});

function setTypeOfLink(element, selectedOption) {
    switch (selectedOption) {
        case POSITIVE_LINK_VALUE:
            customizeLinks(element, RED, '+', '');
            break;

        case POSITIVE_BY_TIME_LINK_VALUE:
            customizeLinks(element, RED, '+', '||');
            break;

        case NEGATIVE_LINK_VALUE:
            customizeLinks(element, BLUE, ' – ', '');
            break;

        case NEGATIVE_BY_TIME_LINK_VALUE:
            customizeLinks(element, BLUE, ' – ', '||');
            break;
    }
}


$(document).on('dblclick', '.text', function () {
    var textLabel = $(this).text();
    var elemId = $(this).parent().parent()[0].getAttribute("model-id");
    var currElement = graph.getCell(elemId);
    bootbox.dialog({
        message: "<p>Что вы хотите сделать?</p>",
        buttons: {
            changeText: {
                label: "Изменить текст",
                className: 'btn-info',
                callback: function () {

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
            },
            deleteElement: {
                label: "Удалить",
                className: 'btn-danger',
                callback: function () {
                    graph.removeLinks(currElement);
                    graph.removeCells(currElement);
                    setHistory();
                }
            }
        }
    });


});


paper.on('blank:pointerdblclick', function (evt, x, y) {
    var classOfTarget = evt.target.getAttribute("class");
    if (classOfTarget != 'svg-pan-zoom-control-element' && classOfTarget != 'svg-pan-zoom-control-background') {
        createBox(x, y);
    }
});

paper.on('blank:pointerclick', function (evt, x, y) {
    var svg = document.getElementsByTagName('svg')[0];
    var classSVG = svg.getAttribute("class");
    var classOfTarget = evt.target.getAttribute("class");

    if (classOfTarget != 'rectangleElement' && classOfTarget != 'linkElement'
        && classOfTarget != 'loopElement' && classOfTarget != 'refreshElement' && classOfTarget != 'clearElement') {
        switch (classSVG) {
            case 'rectangleAdd':
                createBox(x, y);
                break;

            case 'loopAdd':
                createLoop(x, y);
                break;

        }
    }

});

function setHistory() {
    historyOfGraph.push(graph.toJSON());
    $("#historyRange").attr("max",historyOfGraph.length-1);
    $("#historyRange").attr("value",historyOfGraph.length-1);
    $("#box").attr("value",historyOfGraph.length-1);
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
                    var selectedOption = $('#selectLoopCreate').val();
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


$(document).on('click', '.text', function () {
    var svg = document.getElementsByTagName('svg')[0];
    var classSVG = svg.getAttribute("class");
    var elemId = $(this).parent().parent()[0].getAttribute("model-id");

    if (classSVG == 'linkAdd') {
        if (!bufferFlag) {
            var linkView = paper.getDefaultLink()
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


            function onDrag(evt) {
                var p = evt.data.paper.snapToGrid({
                    x: evt.clientX,
                    y: evt.clientY
                });
                evt.data.view.pointermove(evt, p.x, p.y);
            }

            function onDragEnd(evt) {

                evt.data.view.pointerup(evt);
                $(document).off('.linker');
            }

            bufferFlag = true;
        } else {
            bufferFlag = false;
        }
    }
});


$(document).on('dblclick', '.index', function () {
    var textLabel = $(this).text();
    var elemId = $(this).parent().parent()[0].getAttribute("model-id");
    var currElement = graph.getCell(elemId);
    bootbox.dialog({
        message: "<p>Выберите тип цикла:</p>" +
            " <div class=\"form-group\">\n" +
            "  <select class=\"form-control\" id=\"selectLoopChange\">\n" +
            "    <option value='1'>Балансирующий цикл по часовой</option>\n" +
            "    <option value='2'>Балансирующий цикл против часовой</option>\n" +
            "    <option value='3'>Усиливающий цикл по часовой</option>\n" +
            "    <option value='4'>Усиливающий цикл против часовой</option>\n" +
            "  </select>\n" +
            "</div> ",
        buttons: {
            updateLoop: {
                label: "Изменить цикл",
                className: 'btn-success',
                callback: function () {
                    var position = currElement.get('position');
                    var selectedOption = $('#selectLoopChange').val();
                    graph.removeCells(currElement);
                    changeNumeration(textLabel);
                    changeCounters(textLabel);

                    createLoopSecondStep(position.x, position.y, selectedOption);

                }
            },
            deleteLoop: {
                label: "Удалить",
                className: 'btn-danger',
                callback: function () {
                    graph.removeCells(currElement);
                    changeNumeration(textLabel);
                    changeCounters(textLabel);
                    setHistory();

                }
            }
        }
    });
    $("#selectLoopChange").val(setSelectedLoopType(currElement, textLabel));
});

function changeNumeration(textLabel) {
    var elements = [];
    graph.getElements().forEach(elem => {
        var textVal = elem.attributes.attrs.text.text.charAt(0);
        if (textVal !== undefined && textVal == textLabel.charAt(0)) {
            elements.push(elem);
        }
    });

    elements
        .filter(e => parseInt(e.attributes.attrs.text.text.substr(2)) > parseInt(textLabel.substr(2)))
        .forEach(function (e) {
            var label = e.attributes.attrs.text.text;
            var prefix = label.charAt(0);
            var num = parseInt(label.substr(2));
            num--;
            e.attr(".index/text", prefix + " " + num);
        });
}

function changeCounters(label) {
    if (label.charAt(0) == REINFORCEMENT_LOOP_PREFIX) {
        reinforcementLoopCounter--;
    } else {
        balanceLoopCounter--;
    }

}


function state(x, y, label) {

    var cell = new joint.shapes.fsa.State({
        position: {x: x, y: y},
        size: {width: setSize(label), height: 9},
        attrs: {text: {text: label}}
    });
    graph.addCell(cell);
    return cell;
}

function loop(x, y, label, link) {

    var cell = new joint.shapes.fsa.Loop({
        position: {x: x, y: y},
        attrs: {
            image: {"xlink:href": link},
            text: {text: label}
        }
    });

    graph.addCell(cell);
    setHistory();
    return cell;
}

function link(source, target, color, label, time) {
    var cell = new joint.shapes.fsa.Arrow({
        source: {id: source.id},
        target: {id: target.id},
        labels: [{
            attrs: {text: {text: label || '', 'fill': color}}
        },
            {
                attrs: {text: {text: time, 'fill': color}}
            }
        ],
        attrs: {
            '.marker-target': {
                fill: color,
                stroke: color,
                d: 'M 10 0 L 0 5 L 10 10 z'
            },
            'stroke-width': 2
            ,
            '.connection': {
                'fill': 'none',
                'stroke-width': '1',
                'stroke': color,
                'opacity': '0.4'
            }
        }
    });
    graph.addCell(cell);
    setHistory();
    return cell;
}


