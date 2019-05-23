function setSize(label) {
    var size = 10 * label.length;

    if (size < 20) {
        size = 20;
    }

    return size;
}

function customizeLinks(element, color, type, time) {
    element.label(0, {attrs: {text: {text: type, fill: color}}});
    element.label(1, {attrs: {text: {text: time, fill: color}}});
    element.attr('.marker-target/fill', color);
    element.attr('.marker-target/stroke', color);
    element.attr('.connection/stroke', color);
}

function setSelectedLinkType(element) {
    var sign=element.label(0).attrs.text.text;
    var timeFlag=element.label(1).attrs.text.text;
    if(sign=="+"){
        if(timeFlag=="∥"){
            return POSITIVE_BY_TIME_LINK_VALUE;
        }
        return POSITIVE_LINK_VALUE;
    }

    if(sign==" – "){
        if(timeFlag=="∥"){
            return NEGATIVE_BY_TIME_LINK_VALUE;
        }
        return NEGATIVE_LINK_VALUE;
    }

    return POSITIVE_LINK_VALUE;
}

function setSelectedLoopType(element,text) {
    if(text.startsWith(BALANCE_LOOP_PREFIX)){
        if(element.attr("image/xlink:href")==CLOCKWISE_LINK){
            return BALANCE_LOOP_CLOCKWISE;
        }
        return BALANCE_LOOP_COUNTERCLOCKWISE;
    }

    if(text.startsWith(REINFORCEMENT_LOOP_PREFIX)){
        if(element.attr("image/xlink:href")==CLOCKWISE_LINK){
            return REINFORCEMENT_LOOP_CLOCKWISE;
        }
        return REINFORCEMENT_LOOP_COUNTERCLOCKWISE;
    }
}
