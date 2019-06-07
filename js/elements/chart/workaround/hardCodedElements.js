stateForWorkaround(width/2, 0);

setTimeout(function () {
    graph.clear();
},500);

function getLabel(x) {
    let value="";
    for(let i=0;i<x/3;i++){
        value+=" ";
    }
    value+="\n";
    return value;
}

function stateForWorkaround(x, y) {
    const label=getLabel(x);
    const cell = new joint.shapes.fsa.State({
        position: {x: x, y: y},
        size: {width: setSize(label), height: 9},
        attrs: {text: {text: label}}
    });
    graph.addCell(cell);
}



