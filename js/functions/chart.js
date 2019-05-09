var graph = new joint.dia.Graph;

var historyOfGraph = [];
var zoom;
var bufferFlag = false;
var balanceLoopCounter = 1;
var reinforcementLoopCounter = 1;
var width = $(window).width() - 60;
var height = $(window).height() - 100;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: width,
    height: height,
    gridSize: 1,
    model: graph,
    defaultLink: function () {
        var link = new joint.dia.Link({

            attrs: {
                '.marker-target': {
                    fill: GREY,
                    stroke: GREY,
                    d: 'M 10 0 L 0 5 L 10 10 z'
                },

                '.connection': {
                    'fill': 'none',
                    'stroke-width': '1',
                    'stroke': GREY,
                    'opacity': '0.4'

                }

            },
            smooth: true,
            labels: [
                {
                    position: 0.8, attrs:
                        {
                            text:
                                {
                                    text: '   ',
                                    'class': 'labels',
                                    'font-weight': 'bold',
                                    "font-size": "25",
                                    fill: WHITE_SPACE, 'font-family': 'sans-serif'
                                }
                        }
                },
                {
                    position: 0.5,
                    attrs:
                        {
                            text:
                                {
                                    text: ''
                                }
                        }
                }
            ]

        });
        link.on('change:source change:target', function (link) {
            if (link.get('source').id && link.get('target').id && link.get('source').id!==link.get('target').id) {
                setHistory();
            }
        });
        return link;
    }
});

var commandManager = new joint.dia.CommandManager({graph: graph});

createDataPalette(10, height - 40);

createElementPalette(10, 30);

createCleanPalette(10, 180);

function findLoops(g) {
    return _.filter(tarjan(g), function(cmpt) {
        return cmpt.length > 1 || (cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]));
    });
}

