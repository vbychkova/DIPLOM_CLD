window.onload = function() {
    zoom = window.panZoom = svgPanZoom('#v-2', {
        viewportSelector: '.joint-viewport',
        zoomEnabled: true,
        controlIconsEnabled: true,
        dblClickZoomEnabled:false,
        fit: 1,
        center: 1,
        minZoom: 0,
        maxZoom:10,
        panEnabled: false,
        eventsListenerElement: document.querySelector('.svg-pan-zoom_viewport .joint-viewport')
    });

    $(window).resize(function(){
        zoom.resize();
        zoom.fit();
        zoom.center();
    })
};

