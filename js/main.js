let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let Canvaswidth = canvas.width;
let Canvasheight = canvas.height;

let figures = [ ];
let lastClickedFigure = null;
let isMouseDown = false;



    
    addCircle();
    drawFigure();

    let board = new Board(7,6);
    board.buildBoard();
    board.drawBoard();


    function addCircle() {
        let initialY = 50;
    
    
        let supermanImg = new Image();
        supermanImg.src = 'images/supermann.png';
    
        let batmanImg = new Image();
        batmanImg.src = 'images/batmann.png';
    
        for (let i = 0; i < 5; i++) {
            let posX = 20;
            let posY = initialY + i * 60;
            let circle = new Circle(posX, posY, 20, supermanImg, ctx);
            figures.push(circle);
        }
    
        for (let i = 0; i < 5; i++) {
            let posX = Canvaswidth - 30;
            let posY = initialY + i * 60;
            let circle = new Circle(posX, posY, 20, batmanImg, ctx);
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
        board.drawBoard();
    }
}

function onMouseUp(e) {
    isMouseDown = false;
}




//