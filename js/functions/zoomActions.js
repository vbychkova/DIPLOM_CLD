paper.on('blank:pointerdown', function () {
    zoom.enablePan();
});
paper.on('cell:pointerup blank:pointerup', function () {
    zoom.disablePan();
});