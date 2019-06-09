const graph = new joint.dia.Graph;
let historyOfGraph = [];
let zoom;
let bufferFlag = false;
let balanceCycleCounter = 1;
let reinforcementCycleCounter = 1;
const width = $(window).width() - 60;
const height = $(window).height() - 120;
let currentCycles=[];
bootbox.setDefaults({
    locale: "ru"
});
const paper = new joint.dia.Paper({
    el: $('#paper'),
    width: width,
    height: height,
    gridSize: 1,
    model: graph,
    defaultLink: function () {
        const link = new joint.shapes.fsa.Arrow({

            attrs: {
                '.marker-target': {
                    fill: RED,
                    stroke: RED,
                    d: 'M 10 2 L 0 5 L 10 7 z'
                },

                '.connection': {
                    'fill': 'none',
                    'stroke-width': '1',
                    'stroke': RED,
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
                                    text: '+',
                                    'class': 'labels',
                                    'font-weight': 'bold',
                                    "font-size": "15",
                                    fill: RED, 'font-family': 'sans-serif'
                                }
                        }
                },
                {
                    position: 0.5,
                    attrs:
                        {
                            text:
                                {
                                    text: '',
                                    'class': 'labels',
                                    "font-size": "15",
                                    fill: RED,
                                    'font-family': 'system-ui'
                                }
                        }
                }
            ]

        });
        link.on('change:source change:target', function (link) {
            if (link.get('source').id && link.get('target').id && link.get('source').id !== link.get('target').id) {
                setHistory();
            }
        });
        return link;
    }
});

const commandManager = new joint.dia.CommandManager({graph: graph});

createDataPalette(10, height - 40);

createElementPalette(10, 30);

createCleanPalette(10, 180);


