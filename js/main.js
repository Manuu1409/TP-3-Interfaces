let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let Canvaswidth = canvas.width;
let Canvasheight = canvas.height;
let timer = null;
let figures1 = [];
let figures2 = [];
let lastClickedFigure = null;
let isMouseDown = false;
let player = 1;
let turn = 0;
let ficha1 = new Image();
let ficha2 = new Image();
let btnRestart = document.getElementById("restart");
let btnSuperman = document.getElementById("selectSuperman");
let btnRobin = document.getElementById("selectRobin");
let btnBatman = document.getElementById("selectBatman");
let btnWw = document.getElementById("selectWw");
let lineMode=4



function addFigureSuperman() {
  let initialY = 50;
  figures1=[];
  let supermanImg = new Image();
  supermanImg.src = "images/fichaSuperman.png";

  for (let i = 0; i < 5; i++) {
    let posX = 30;
    let posY = initialY + i * 60;
    let circle = new Circle(posX, posY, 20, supermanImg, ctx, 1);
    figures1.push(circle);
  }
}

function addFigureBatman() {
  let initialY = 50;
  figures2=[];
  let batmanImg = new Image();
  batmanImg.src = "images/batmann.png";

  for (let i = 0; i < 5; i++) {
    let posX = Canvaswidth - 30;
    let posY = initialY + i * 60;
    let circle = new Circle(posX, posY, 20, batmanImg, ctx, 2);
    figures2.push(circle);
}
}

function addFigureRobin() {
  let initialY = 50;
  figures2=[];
  let robinImg = new Image();
  robinImg.src = "images/fichaRobin.png";

  for (let i = 0; i < 5; i++) {
    let posX = Canvaswidth - 30;
    let posY = initialY + i * 60;
    let circle = new Circle(posX, posY, 20, robinImg, ctx, 2);
    figures2.push(circle);
}
}

function addFigureWw() {
  let initialY = 50;
  figures1=[];
  let WWImg = new Image();
  WWImg.src = "images/fichaWw.png";

  for (let i = 0; i < 5; i++) {
    let posX = 30;
    let posY = initialY + i * 60;
    let circle = new Circle(posX, posY, 20, WWImg, ctx, 1);
    figures1.push(circle);
  }
}



function drawFigure() {
  //clearCanvas();
  for (let i = 0; i < figures1.length; i++) {
    figures1[i].draw();
    figures2[i].draw();
  }
}

function clearCanvas() {
  ctx.fillStyle = "#003950";
  ctx.fillRect(0, 0, Canvaswidth, Canvasheight);
}

function findClickedFigure(x, y) {
  let element;
  for (let i = 0; i < figures1.length; i++) {
    //recorro figuras
    switch(player){
      case 1:
        element = figures1[i];
      break;
      case 2:
         element = figures2[i];
        break;
    } //me las traigo
    console.log(x, y);
    if (element.isPointInside(x, y) && element.getPlayer() == player) {
      return element;
    }
  }
}

//eventos

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMouseMove);

function onMouseDown(e) {
  isMouseDown = true;

  if (lastClickedFigure != null) {
    //cuando se clickea afuera deja de resaltar
    lastClickedFigure.setResaltado(false);
    lastClickedFigure = null;
  }

  let clickFigure = findClickedFigure(e.offsetX, e.offsetY);
  if (clickFigure != null) {
    clickFigure.setResaltado(true);
    lastClickedFigure = clickFigure;
  }

  drawFigure;
}

function onMouseMove(e) {
  if (juegoIniciado) { // Verificar si el juego ha iniciado
    //movimiento al hacer click en la figura
    if (isMouseDown && lastClickedFigure != null) {
      lastClickedFigure.setPosition(e.offsetX, e.offsetY);

      clearCanvas();
      board.drawBoard();
      drawFigure();
    }
  }
}



function onMouseUp(e) {
  let positions = [];
  isMouseDown = false;
  if (lastClickedFigure) {
    if (board.isIn(e.offsetX, e.offsetY)) {
      positions = board.dropToken(e.offsetX, player);
      if (positions != -1) {
        if (board.checkWinner(positions[0], positions[1],player)) {
          console.log("ganaste");
          youWin(player);
          return;
        }
        switch (player) {
          case 1:
            player = 2;
            changeTurn()
            break;

          case 2:
            player = 1;
            changeTurn()
            break;
        }
      }
    }
    
    lastClickedFigure.resetPosition();
    clearCanvas();
    drawFigure();
    board.drawBoard();
  }
}

function youWin(player) {
  clearCanvas();
  board.drawBoard();
  canvas.removeEventListener("mousedown", onMouseDown);
  canvas.removeEventListener("mouseup", onMouseUp);
  canvas.removeEventListener("mousemove", onMouseMove);
  clearInterval(timer);
  document.getElementById("info").innerHTML =
    "<h1 class='winner'>GANADOR: JUGADOR " + player + " !!!</h1>";
}

function finish() {
  clearCanvas();
  board.drawBoard();
  document.getElementById("info").innerHTML = "<h1>SE ACABO EL TIEMPO</h1>";
}

let juegoIniciado = false;

function comenzar() {
  juegoIniciado = true; // Se inicia el juego
  contador();
  board = new Board(fil, col, lineMode);
  board.buildBoard();
  btnRestart.addEventListener("click", reloadPage);
  clearCanvas();
  drawFigure();
  board.drawBoard();
  RemoveModeAndTeams();
  btnRestart.classList.remove("hidden");
  document.getElementById("turn").innerHTML= "<h3>Turno: Jugador  " + player + " </h3>";
  
}
function reloadPage() {                  //Reinicia el juego recargando la pagina
  location.reload();
} 


function changeTurn(){                   //Cambia el turno de jugador
  turn++;
  console.log(turn)
  player=(turn%2)+1;
  document.getElementById("turn").innerHTML= "<h3>Turno: Jugador" + player + "</h3>";
}

function RemoveModeAndTeams() {
  btn_4_in_line.removeEventListener("click", mode4);
  btn_5_in_line.removeEventListener("click", mode5);
  btn_6_in_line.removeEventListener("click", mode6);
  btn_7_in_line.removeEventListener("click", mode7);
  btnSuperman.removeEventListener("click", ShowFigureSuperman);
  btnRobin.removeEventListener("click", ShowFigureBatman );
  btnBatman.removeEventListener("click",ShowFigureRobin );
  btnWw.removeEventListener("click",ShowFigureWw );
  btn_comenzar.removeEventListener("click", comenzar);

  // display none a los botones , no me salia bien en un css aparte
  btn_4_in_line.style.display = "none";
  btn_5_in_line.style.display = "none";
  btn_6_in_line.style.display = "none";
  btn_7_in_line.style.display = "none";
  btnSuperman.style.display = "none";
  btnRobin.style.display = "none";
  btnBatman.style.display = "none";
  btnWw.style.display = "none";
  btn_comenzar.style.display = "none";

  
}

const startingMinutes = 5;
let time = startingMinutes * 60;
const time_remaining = document.getElementById("time-remaining");

// contador
function contador() {
  timer = setInterval(updateTimeRemaning, 1000);
}

function updateTimeRemaning() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds == 0 && minutes == 0) {
    clearInterval(timer);
    finish();
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  time_remaining.innerHTML = `${minutes}: ${seconds}`;

  time--;
}

//cambiar de tablero
let btn_comenzar = document.getElementById("id_comenzar");
let btn_4_in_line = document.getElementById("btn-4-in-line");
let btn_5_in_line = document.getElementById("btn-5-in-line");
let btn_6_in_line = document.getElementById("btn-6-in-line");
let btn_7_in_line = document.getElementById("btn-7-in-line");

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
}

btn_4_in_line.addEventListener("click", mode4);

mode4()

function mode4() {
  mode = "default";
  lineMode=4;
  switchColumnsAndRows();
  board = new Board(fil, col, lineMode);
  board.buildBoard();
  clearCanvas();
  board.drawBoard();
  btn_4_in_line.classList.add("selected");
  btn_5_in_line.classList.remove("selected");
  btn_6_in_line.classList.remove("selected");
  btn_7_in_line.classList.remove("selected");
  btn_comenzar.addEventListener("click", comenzar);
}

btn_5_in_line.addEventListener("click", mode5);
function mode5() {
  mode = 5;
  lineMode=5;
  switchColumnsAndRows();
  board = new Board(fil, col, lineMode);
  board.buildBoard();
  clearCanvas();
  board.drawBoard();
  btn_5_in_line.classList.add("selected");
  btn_4_in_line.classList.remove("selected");
  btn_6_in_line.classList.remove("selected");
  btn_7_in_line.classList.remove("selected");
  btn_comenzar.addEventListener("click", comenzar);
}

btn_6_in_line.addEventListener("click", mode6);
function mode6() {
  mode = 6;
  lineMode=6;
  switchColumnsAndRows();
  board = new Board(fil, col, lineMode);
  board.buildBoard();
  clearCanvas();
  board.drawBoard();
  btn_6_in_line.classList.add("selected");
  btn_4_in_line.classList.remove("selected");
  btn_5_in_line.classList.remove("selected");
  btn_7_in_line.classList.remove("selected");
  btn_comenzar.addEventListener("click", comenzar);
}

btn_7_in_line.addEventListener("click", mode7);
function mode7() {
  mode = 7;
  lineMode=7;
  switchColumnsAndRows();
  board = new Board(fil, col, lineMode);
  board.buildBoard();
  clearCanvas();
  board.drawBoard();
  btn_7_in_line.classList.add("selected");
  btn_4_in_line.classList.remove("selected");
  btn_5_in_line.classList.remove("selected");
  btn_6_in_line.classList.remove("selected");
  btn_comenzar.addEventListener("click", comenzar);
}


this.ShowFigureSuperman()
this.ShowFigureBatman()


btnSuperman.addEventListener("click", ShowFigureSuperman)

function ShowFigureSuperman() {
  btnWw.classList.remove("selected");
  btnSuperman.classList.add("selected");
  addFigureSuperman();
  ficha1.src = "images/fichaSuperman.png"
}


btnBatman.addEventListener("click", ShowFigureBatman)

function ShowFigureBatman() {
  btnRobin.classList.remove("selected");
  btnBatman.classList.add("selected");
  addFigureBatman();
  ficha2.src = "images/batmann.png"
}

btnRobin.addEventListener("click", ShowFigureRobin)

function ShowFigureRobin() {
  btnBatman.classList.remove("selected");
  btnRobin.classList.add("selected");
  addFigureRobin();
  ficha2.src = "images/fichaRobin.png"
}

btnWw.addEventListener("click", ShowFigureWw)

function ShowFigureWw() {
  btnSuperman.classList.remove("selected");
  btnWw.classList.add("selected");
  addFigureWw();
  ficha1.src = "images/fichaWw.png "
}


// // Obtén el elemento por su id
// const miElemento = document.getElementById("miElemento");

// // Verifica el valor del atributo id
// if (miElemento) {
//   if (miElemento.id === "miElemento") {
//     console.log("El id del elemento es 'miElemento'.");
//   } else {
//     console.log("El id del elemento no es 'miElemento'.");
//   }
// } else {
//   console.log("El elemento no existe.");
// }



