const space1 = state(180, 390, '');
const space2 = state(600, 400, '');
linkForWorkaround(space1, space2, WHITE_SPACE);

setTimeout(function () {
    graph.clear();
},1);

function linkForWorkaround(source, target, color) {
    const cell = new joint.shapes.fsa.Arrow({
        source: {id: source.id},
        target: {id: target.id},
        labels: [{
            attrs: {text: {text: '', 'fill': color}}
        },
            {
                attrs: {text: {text: '', 'fill': color}}
            }
        ],
        attrs: {
            '.marker-target': {
                fill: color,
                stroke: color,
            },
            '.connection': {
                'fill': 'none',
                'stroke': color,
            }
        }
    });
    graph.addCell(cell);
    return cell;
}

