$(document).on('click', '.clearElement', function () {
    bootbox.confirm({
        message: "Вы действительно хотите очистить холст?",
        buttons: {
            confirm: {
                label: 'Да',
                className: 'btn-success'
            },
            cancel: {
                label: 'Нет',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                graph.clear();
                balanceLoopCounter = 1;
                reinforcementLoopCounter = 1;
                bufferFlag = false;
                historyOfGraph = [];
                $("#historyRange")
                    .attr("max", 0)
                    .attr("value", 0);
                $("#box").attr("value", 0);
            }
        }
    });

});