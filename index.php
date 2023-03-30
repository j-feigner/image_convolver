<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Image Convolver</title>
        <link rel="stylesheet" href="./css/style.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Proza+Libre&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="./css/style.css">
    </head>
    <body>
        <div id="site-wrapper">
            <div id="images-container">
                <canvas id="original-image"></canvas>
                <canvas id="convolved-image"></canvas>
            </div>
            <button id="submit-button">Apply Kernel</button>
        </div>
        <script src="./js/script.js"></script>
    </body>
</html>