function createDataPalette(x, y) {
    const svg = document.getElementsByTagName('svg')[0];
    const rectangle = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rectangle.setAttribute("x", x);
    rectangle.setAttribute("y", y);
    rectangle.setAttribute("width", DATA_RECTANGLE_WIDTH);
    rectangle.setAttribute("height", DATA_RECTANGLE_HEIGHT);
    rectangle.style.stroke = BORDER_COLOR;
    rectangle.style.strokeWidth = "2px";
    rectangle.style.fill = "none";

    const uploadImage = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    uploadImage.setAttribute("x", x + 2);
    uploadImage.setAttribute("y", y + 2);
    uploadImage.setAttribute("width", DATA_RECTANGLE_IMAGE_SIZE);
    uploadImage.setAttribute("height", DATA_RECTANGLE_IMAGE_SIZE);
    uploadImage.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "images/upload.svg");
    uploadImage.setAttribute("class", "uploadButton");

    const downloadImage = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    downloadImage.setAttribute("x", x + 6 + DATA_RECTANGLE_IMAGE_SIZE);
    downloadImage.setAttribute("y", y + 2);
    downloadImage.setAttribute("width", DATA_RECTANGLE_IMAGE_SIZE);
    downloadImage.setAttribute("height", DATA_RECTANGLE_IMAGE_SIZE);
    downloadImage.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "images/download.svg");
    downloadImage.setAttribute("class", "downloadButton");

    svg.appendChild(rectangle);
    svg.appendChild(downloadImage);
    svg.appendChild(uploadImage);
}

function createElementPalette(x, y) {
    const svg = document.getElementsByTagName('svg')[0];
    const rectangle = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rectangle.setAttribute("x", x);
    rectangle.setAttribute("y", y);
    rectangle.setAttribute("width", ELEMENT_RECTANGLE_WIDTH);
    rectangle.setAttribute("height", ELEMENT_RECTANGLE_HEIGHT);
    rectangle.style.stroke = BORDER_COLOR;
    rectangle.style.strokeWidth = "2px";
    rectangle.style.fill = "none";

    const rectangleElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    rectangleElement.setAttribute("x", x + 2);
    rectangleElement.setAttribute("y", y + 4);
    rectangleElement.setAttribute("width", DATA_RECTANGLE_IMAGE_SIZE);
    rectangleElement.setAttribute("height", DATA_RECTANGLE_IMAGE_SIZE);
    rectangleElement.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "images/rectangle.svg");
    rectangleElement.setAttribute("class", "rectangleElement");

    const linkElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    linkElement.setAttribute("x", x + 2);
    linkElement.setAttribute("y", y + 8 + DATA_RECTANGLE_IMAGE_SIZE);
    linkElement.setAttribute("width", DATA_RECTANGLE_IMAGE_SIZE);
    linkElement.setAttribute("height", DATA_RECTANGLE_IMAGE_SIZE);
    linkElement.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "images/link.svg");
    linkElement.setAttribute("class", "linkElement");

    const loopElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    loopElement.setAttribute("x", x + 2);
    loopElement.setAttribute("y", y + 12 + DATA_RECTANGLE_IMAGE_SIZE * 2);
    loopElement.setAttribute("width", DATA_RECTANGLE_IMAGE_SIZE);
    loopElement.setAttribute("height", DATA_RECTANGLE_IMAGE_SIZE);
    loopElement.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "images/loop.svg");
    loopElement.setAttribute("class", "loopElement");

    const refresh = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    refresh.setAttribute("x", x + 2);
    refresh.setAttribute("y", y + 16 + DATA_RECTANGLE_IMAGE_SIZE * 3);
    refresh.setAttribute("width", DATA_RECTANGLE_IMAGE_SIZE);
    refresh.setAttribute("height", DATA_RECTANGLE_IMAGE_SIZE);
    refresh.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "images/refresh.svg");
    refresh.setAttribute("class", "refreshElement");

    svg.appendChild(rectangleElement);
    svg.appendChild(linkElement);
    svg.appendChild(loopElement);
    svg.appendChild(refresh);
    svg.appendChild(rectangle);
}

function createCleanPalette(x, y) {
    const svg = document.getElementsByTagName('svg')[0];
    const rectangle = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rectangle.setAttribute("x", x);
    rectangle.setAttribute("y", y);
    rectangle.setAttribute("width", CLEAR_RECTANGLE_WIDTH);
    rectangle.setAttribute("height", CLEAR_RECTANGLE_HEIGHT);
    rectangle.style.stroke = BORDER_COLOR;
    rectangle.style.strokeWidth = "2px";
    rectangle.style.fill = "none";

    const clearElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    clearElement.setAttribute("x", x + 4);
    clearElement.setAttribute("y", y + 4);
    clearElement.setAttribute("width", DATA_RECTANGLE_IMAGE_SIZE);
    clearElement.setAttribute("height", DATA_RECTANGLE_IMAGE_SIZE);
    clearElement.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "images/clear.svg");
    clearElement.setAttribute("class", "clearElement");

    svg.appendChild(clearElement);
    svg.appendChild(rectangle);
}