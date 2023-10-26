let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let Canvaswidth = canvas.width;
let Canvasheight = canvas.height;

let figures = [ ];
let lastClickedFigure = null;
let isMouseDown = false;

    
    addCircle();
    drawFigure();


    function addCircle() {
        let initialY = 50; // altura para las fichas
    
        for (let i = 0; i < 5; i++) {
            let posX = 20; 
            let posY = initialY + i * 40;  //espaciado entre fichas
            let color = 'red';
    
            let circle = new Circle(posX, posY, 10, color, ctx);
            figures.push(circle);
        }
    
        for (let i = 0; i < 5; i++) {
            let posX = Canvaswidth - 30; // me lo manda para el lado derecho
            let posY = initialY + i * 40; //espaciado entre fichas
            let color = 'black';
    
            let circle = new Circle(posX, posY, 10, color, ctx);
            figures.push(circle);
        }
    
        drawFigure();
    }
    

function drawFigure() {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) { 
        figures[i].draw();
    }
}

function clearCanvas() {
    ctx.fillStyle = '#003950'
    ctx.fillRect(0,0, Canvaswidth, Canvasheight);
}

function findClickedFigure(x,y) {
    for(let i = 0; i < figures.length; i++) { //recorro figuras
        const element = figures[i];  //me las traigo
        if(element.isPointInside(x,y)) {
            return element;
        }

    }
}




//eventos

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousemove', onMouseMove);


function onMouseDown(e) {
    isMouseDown = true;

    if(lastClickedFigure != null) {  //cuando se clickea afuera deja de resaltar
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null
        
    }

    let clickFigure = findClickedFigure(e.layerX, e.layerY);
    if (clickFigure != null) {
        clickFigure.setResaltado(true);
        lastClickedFigure = clickFigure;
    }
    drawFigure;

    
}

function onMouseMove(e) {  //movimiento al hacer click en la figura
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        drawFigure();
    }
}

function onMouseUp(e) {
    isMouseDown = false;
}