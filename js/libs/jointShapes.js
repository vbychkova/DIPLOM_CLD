joint.shapes.basic.Rect.define('fsa.State', {
        attrs: {
            rect: {
                'stroke': 'none',
                'stroke-width': 5,
                magnet: true
            },
            text: {
                'font-size': '9'
            }
        }
    },
    {
        markup: '<g class="rotatable"><g class="scalable"><rect/></g><text class="text"/></g>'
    }
);


joint.dia.Link.define('fsa.Arrow', {
        smooth: true,

        labels: [
            {
                position: 0.8,
                attrs:
                    {
                        text:
                            {
                                text: '   ',
                                'font-family': 'sans-serif',
                                'font-weight': 'bold',
                                "font-size": "15"
                            }
                    }
            }
            ,
            {
                position: 0.5,
                attrs:
                    {
                        text:
                            {
                                text: '',
                                'font-family': 'sans-serif',
                                "font-size": "15"
                            }
                    }
            }
        ]
    }
);

joint.shapes.basic.Rect.define('fsa.Cycle', {
        size: {width:25,height:25},
        attrs: {
            rect: {
                'stroke': 'none'
            },
            image :{
                width : 25,
                height : 25
            },
            text: {
                'font-size': '6'
            }
        }
    },
    {
        markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text class="index"/></g>'
    }
);