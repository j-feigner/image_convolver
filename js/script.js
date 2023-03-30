window.onload = main;

function main() {
    var originalCanvas = document.querySelector("#original-image");
    var octx = originalCanvas.getContext("2d");
    setCanvasBitmap(originalCanvas);

    var image = new Image(4, 4);
    image.src="./images/color_sample.png";
    image.onload = () => {
        octx.imageSmoothingEnabled = false;
        octx.drawImage(image, 0, 0, originalCanvas.width, originalCanvas.height);
        var data = octx.getImageData(0, 0);
        var stop = 0;
    }
}

function setCanvasBitmap(canvas, w = canvas.offsetWidth, h = canvas.offsetHeight) {
    canvas.width = w;
    canvas.height = h;
}