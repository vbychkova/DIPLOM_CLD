function state(x, y, label) {
    const cell = new joint.shapes.fsa.State({
        position: {x: x, y: y},
        size: {width: setSize(label), height: 9},
        attrs: {text: {text: label}}
    });
    graph.addCell(cell);
    return cell;
}

function loop(x, y, label, link) {
    const cell = new joint.shapes.fsa.Loop({
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
    const cell = new joint.shapes.fsa.Arrow({
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