document.onkeydown = function KeyPress(e) {
    const evtObj = window.event ? event : e;
    undoRedoAction(evtObj);
};

$(document).on('click', '.labels', function () {
    const elemId = $(this).parent()[0].getAttribute("model-id");
    const currElement = graph.getCell(elemId);
    const type = getSelectedLinkType(currElement);
    const checked = getStatusOfRadioButtonsInLinkMenu(type);
    bootbox.dialog({
        message: "<p>Управление Связями</p> " +
            " <div class=\"form-group\">\n" +
            " Тип связи:\n" +
            "<div class=\"radio\">\n" +
            "  <label><input type=\"radio\" name=\"optradio\" class='select' id='1' " + checked[0] + ">Положительная связь</label>\n" +
            "</div>\n" +
            "<div class=\"radio\">\n" +
            "  <label><input type=\"radio\" name=\"optradio\" class='select' id='3' " + checked[1] + ">Отрицательная связь</label>\n" +
            "</div>\n" +
            "<div class=\"checkbox\">\n" +
            "  <label><input type=\"checkbox\" name=\"inTime\" class=\"inTime\" " + checked[2] + ">Cвязь проявляющаяся со временем</label>\n" +
            "</div>" +
            "</div> ",
        buttons: {
            positive: {
                label: "Удалить связь",
                className: 'btn-danger deleteLink',
                callback: function () {
                    deleteLinkAction(currElement);
                }
            },
            changeTypeOfLink: {
                label: "Сохранить",
                className: 'btn-primary',
                callback: function () {
                    saveLink(currElement);
                }
            }

        }
    });
    $("#selectLink").val(getSelectedLinkType(currElement));
});

$('.select').click(function () {
    const elem = $(this);
    const elems = $('.select').toArray();
    elems.forEach(function (element) {
        if (element.id !== elem) {
            element.checked = false;
        }
    })
});


$(document).on('dblclick', '.text', function () {
    const textLabel = $(this).text();
    const elemId = $(this).parent().parent()[0].getAttribute("model-id");
    const currElement = graph.getCell(elemId);
    bootbox.dialog({
        message: "<p>Что вы хотите сделать?</p>",
        buttons: {
            changeText: {
                label: "Изменить текст",
                className: 'btn-info',
                callback: function () {
                    changeTextOfBlock(currElement, textLabel)
                }
            },
            deleteElement: {
                label: "Удалить",
                className: 'btn-danger',
                callback: function () {
                    deleteBlock(currElement)
                }
            }
        }
    });
});


paper.on('blank:pointerdblclick', function (evt, x, y) {
    const classOfTarget = evt.target.getAttribute("class");
    if (classOfTarget !== 'svg-pan-zoom-control-element' && classOfTarget !== 'svg-pan-zoom-control-background') {
        createBox(x, y);
    }
});

paper.on('blank:pointerclick', function (evt, x, y) {
    const svg = document.getElementsByTagName('svg')[0];
    const classSVG = svg.getAttribute("class");
    const classOfTarget = evt.target.getAttribute("class");

    if (classOfTarget !== 'rectangleElement' && classOfTarget !== 'linkElement'
        && classOfTarget !== 'cycleElement' && classOfTarget !== 'refreshElement' && classOfTarget !== 'clearElement') {
        switch (classSVG) {
            case 'rectangleAdd':
                createBox(x, y);
                break;
			case 'cycleAdd':
                createCycleByType(x, y,BALANCE_CYCLE_CLOCKWISE);
                break;

        }
    }

});


$(document).on('click', '.text', function () {
    const svg = document.getElementsByTagName('svg')[0];
    const classSVG = svg.getAttribute("class");
    const elemId = $(this).parent().parent()[0].getAttribute("model-id");
    if (classSVG === 'linkAdd') {
        if (!bufferFlag) {
            connectLink(elemId);
            bufferFlag = true;
        } else {
            bufferFlag = false;
        }
    }
});


$(document).on('dblclick', '.index', function () {
    const textLabel = $(this).text();
    const elemId = $(this).parent().parent()[0].getAttribute("model-id");
    const currElement = graph.getCell(elemId);
    const type = getSelectedCycleType(currElement,textLabel);
    const checked = getStatusOfRadioButtonsInCycleMenu(type);
    bootbox.dialog({
        message: "<p>Выберите тип цикла:</p>" +
            "<div class=\"radio\">\n" +
            "  <label><input type=\"radio\" name=\"optradio\" class='select' id='1' " + checked[0] + ">Балансирующий цикл</label>\n" +
            "</div>\n" +
            "<div class=\"radio\">\n" +
            "  <label><input type=\"radio\" name=\"optradio\" class='select' id='3' " + checked[1] + ">Усиливающий цикл</label>\n" +
            "</div>\n" +
            "<div class=\"checkbox\">\n" +
            "  <label><input type=\"checkbox\" name=\"inTime\" class=\"inTime\" " + checked[2] + "> Направление 'Против часовой'</label>\n" +
            "</div>",
        buttons: {
            deleteCycle: {
                label: "Удалить цикл",
                className: 'btn-danger deleteLink',
                callback: function () {
                    deleteCycle(currElement, textLabel);
                }
            },
            updateCycle: {
                label: "Сохранить",
                className: 'btn-primary',
                callback: function () {
                    saveCycle(currElement, textLabel);
                }
            }

        }
    });
    $("#selectCycleChange").val(getSelectedCycleType(currElement, textLabel));
});