let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let Canvaswidth = canvas.width;
let Canvasheight = canvas.height;

let figures = [ ];
let lastClickedFigure = null;
let isMouseDown = false;

let CANT_FIG = 10;

function addFigure() {
    
    addCircle();
    drawFigure();
}

function addCircle() {
    let posX = Math.round(Math.random() * Canvaswidth);
    let posY = Math.round(Math.random() * Canvasheight);
    let color = randomRGBA();

    let circle = new Circle(posX, posY, 10, color, ctx);
    figures.push(circle);

}

function drawFigure() {
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}


function addFigures () {
    addFigure();
    if(figures.length < CANT_FIG) {
        setTimeout(addFigures, 400)
    }
}

setTimeout(() => {
    addFigures();
},400);