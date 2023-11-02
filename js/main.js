let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let Canvaswidth = canvas.width;
let Canvasheight = canvas.height;

let figures = [ ];
let lastClickedFigure = null;
let isMouseDown = false;

    
    addCircle();
    clearCanvas();
    drawFigure();

    let board = new Board(6,7);
    board.buildBoard();
    board.putToken(0);
    board.putToken(0);
    board.putToken(1);
    board.putToken(1);
    board.putToken(2);
    board.putToken(2);
    board.putToken(2);
    board.putToken(3);
    board.putToken(3);
    board.putToken(3);
    board.putToken(3);
    
    board.CheckDiagonal(0,0);
   
    
   
    
    
    board.drawBoard();
   


    function addCircle() {
        let initialY = 50;
    
    
        let supermanImg = new Image();
        supermanImg.src = 'images/fichaSuperman.png';
    
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
    //clearCanvas();
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

    let clickFigure = findClickedFigure(e.offsetX, e.offsetY);
    if (clickFigure != null) {
        clickFigure.setResaltado(true);
        lastClickedFigure = clickFigure;
    }
    drawFigure;

    
}

function onMouseMove(e) {  //movimiento al hacer click en la figura
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.offsetX, e.offsetY);
        
        clearCanvas()
        board.drawBoard();
        drawFigure();
    }
}

function onMouseUp(e) {
    isMouseDown = false;
    if (lastClickedFigure) {
        lastClickedFigure.resetPosition();
        clearCanvas();
        drawFigure();
        board.drawBoard();
    }
}




// contador
const startingMinutes = 5;
let time = startingMinutes * 60

const time_remaining = document.getElementById('time-remaining')

setInterval(updateTimeRemaning, 1000);

function updateTimeRemaning () {
    
    const minutes =  Math.floor(time / 60);
    let seconds = time % 60;

    time_remaining.innerHTML = `${minutes}: ${seconds}`;

    time--;

}



//cambiar de tablero

let btn_5_in_line = document.getElementById("btn-5-in-line");
let btn_6_in_line = document.getElementById("btn-6-in-line")
let btn_7_in_line = document.getElementById("btn-7-in-line")

function switchColumnsAndRows() {
    switch (mode) {
        case 7:
            col = 10;
            fil = 9;
            break;
        case 6:
            col = 9;
            fil = 8;
            break;
        case 5:
            col = 8;
            fil = 7;
            break;
        default:
            col = 7;
            fil = 6;
            break;
    }

    // Vuelve a construir el tablero con las nuevas columnas y filas
    board = new Board(col, fil);
    board.buildBoard();
    clearCanvas();
    drawFigure();
    board.drawBoard();
}

btn_5_in_line.addEventListener("click", function () {
    mode = 5;
    switchColumnsAndRows();
});

btn_6_in_line.addEventListener("click", function () {
    mode = 6;
    switchColumnsAndRows();
});

btn_7_in_line.addEventListener("click", function () {
    mode = 7;
    switchColumnsAndRows();
});