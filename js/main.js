let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let Canvaswidth = canvas.width;
let Canvasheight = canvas.height;

let figures = [ ];
let lastClickedFigure = null;
let isMouseDown = false;

let player = 1;
    


    function addCircle() {
        let initialY = 50;
    
    
        let supermanImg = new Image();
        supermanImg.src = 'images/fichaSuperman.png';
    
        let batmanImg = new Image();
        batmanImg.src = 'images/batmann.png';
    
        for (let i = 0; i < 5; i++) {
            let posX = 20;
            let posY = initialY + i * 60;
            let circle = new Circle(posX, posY, 20, supermanImg, ctx, 1);
            figures.push(circle);
        }
    
        for (let i = 0; i < 5; i++) {
            let posX = Canvaswidth - 30;
            let posY = initialY + i * 60;
            let circle = new Circle(posX, posY, 20, batmanImg, ctx, 2);
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
        console.log(x,y)
        if(element.isPointInside(x,y) && (element.getPlayer() == player)) {
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
    let positions = [];
    isMouseDown = false;
    if (lastClickedFigure) {
        if(board.isIn(e.offsetX, e.offsetY)) {
            positions = board.dropToken(e.offsetX , player);
            if(positions != -1) {
                if(board.checkWinner(positions[0], positions[1])) {
                    console.log("ganaste")
                    youWin(player);
                    return;
                }
                switch(player) {
                    case 1:
                        player = 2;
                        break;
                    
                    case 2:
                        player = 1;
                }
            }
        }
        lastClickedFigure.resetPosition();
        clearCanvas();
        drawFigure();
        board.drawBoard();
    }
}

function youWin() {
    clearCanvas();
    board.drawBoard();
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mouseup', onMouseUp);
    canvas.removeEventListener('mousemove', onMouseMove);

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
let btn_4_in_line = document.getElementById("btn-4-in-line");
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
    board = new Board(fil, col, 4);
    board.buildBoard();
    addCircle();
    clearCanvas();
    drawFigure();
    board.drawBoard();
}
btn_4_in_line.addEventListener("click", function () {
    mode = 'default';
    switchColumnsAndRows();
});

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