window.onload = main;

function main() {
    var originalCanvas = document.querySelector("#original-image");
    var octx = originalCanvas.getContext("2d");
    setCanvasBitmap(originalCanvas);

    var kernelCanvas = document.querySelector("#convolved-image");
    var kctx = kernelCanvas.getContext("2d");
    setCanvasBitmap(kernelCanvas);

    var image = new Image(1000, 1000);
    image.src="./images/sample_1000x1000.png";
    image.onload = () => {
        // Create temporary canvas context for manipulating image data
        let ctx = document.createElement("canvas").getContext("2d");
        setCanvasBitmap(ctx.canvas, image.width, image.height);

        // Get image data from original image
        ctx.drawImage(image, 0, 0);
        var idata = ctx.getImageData(0, 0, image.width, image.height);

        // Draw original image to left canvas
        octx.imageSmoothingEnabled = false;
        octx.drawImage(ctx.canvas, 0, 0, originalCanvas.width, originalCanvas.height);

        // Apply kernel transformation, paint into temp canvas
        var smoothed = smoothImage(idata);
        ctx.putImageData(smoothed, 0, 0);

        idata.data.forEach((x, i) => {
            if(smoothed.data[i] != x) {
                console.log(i);
            }
        })

        // Draw to right canvas
        kctx.imageSmoothingEnabled = false;
        kctx.drawImage(ctx.canvas, 0, 0, kernelCanvas.width, kernelCanvas.height);
    }
}

function smoothImage(data) {
    const kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
    const kernelOrigin = [1, 1];
    const kernelDivisor = 9;

    return convolve(data, kernel, kernelOrigin, kernelDivisor);
}

function convolve(image, kernel, kOrigin, kDivisor) {
    var imageCopy = new ImageData(image.width, image.height);
    // Loop through 4-channel image data array ([r, g, b, a, r, g, b, a, r...])
    var kernelSums = [0, 0, 0];
    var pixel = 0; // pixel counter
    for(var i = 0; i < image.data.length; i += 4) {
        // Coordinate location of current pixel
        var x = pixel % image.width;
        var y = Math.floor(pixel / image.width);

        // Loop through kernel and sum channel values at each neighbor location
        kernelSums = [0, 0, 0]; // Reset sums
        for(var kRow = 0; kRow < kernel.length; kRow++) {
            for(var kCol = 0; kCol < kernel[kRow].length; kCol++) {
                // Find (dx, dy) from kernel origin 
                var dx = kCol - kOrigin[0];
                var dy = kRow - kOrigin[1];

                // Find corresponding pixel x,y in source image
                var neighborX = x + dx;
                var neighborY = y + dy;

                // Check if neighbor pixel is OOB
                if(neighborX < 0 || neighborX >= image.width ||
                    neighborY < 0 || neighborY >= image.height) {
                    continue;
                }

                // If in bounds of image, assign to value of neighbor
                var pixelIndex = (neighborY * image.width * 4) + (neighborX * 4);
                kernelSums[0] += (image.data[pixelIndex + 0] * kernel[kRow][kCol]); // r
                kernelSums[1] += (image.data[pixelIndex + 1] * kernel[kRow][kCol]); // g
                kernelSums[2] += (image.data[pixelIndex + 2] * kernel[kRow][kCol]); // b
            }
        }
        imageCopy.data[i + 0] = kernelSums[0] / kDivisor; // r
        imageCopy.data[i + 1] = kernelSums[1] / kDivisor; // g
        imageCopy.data[i + 2] = kernelSums[2] / kDivisor; // b
        imageCopy.data[i + 3] = image.data[i + 3];        // a

        pixel++;
    }

    return imageCopy;
}

function setCanvasBitmap(canvas, w = canvas.offsetWidth, h = canvas.offsetHeight) {
    canvas.width = w;
    canvas.height = h;
}