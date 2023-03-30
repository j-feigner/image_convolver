window.onload = main;

function main() {
    var originalCanvas = document.querySelector("#original-image");
    var octx = originalCanvas.getContext("2d");
    setCanvasBitmap(originalCanvas, 200, 200);

    var image = new Image(200, 200);
    image.src="./images/sample_200x200.png";
    image.onload = () => {
        octx.drawImage(image, 0, 0);
    }
}

function setCanvasBitmap(canvas, w = canvas.offsetWidth, h = canvas.offsetHeight) {
    canvas.width = w;
    canvas.height = h;
}