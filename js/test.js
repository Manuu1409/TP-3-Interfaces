/*
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = 500;
let height = 500;

let img_batman = new Image ();
img_batman.src = 'images/batmann.png'

img_batman.onload = function() {
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        
        ctx.stroke();
        ctx.drawImage(img_batman, Math.round(Math.random() * width) - 20, Math.round(Math.random() * height) - 20, 40, 40);
    }
};

let img_supermann = new Image ();
img_supermann.src = 'images/supermann.png'

img_supermann.onload = function() {
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        
        ctx.stroke();
        ctx.drawImage(img_supermann, Math.round(Math.random() * width) - 20, Math.round(Math.random() * height) - 20, 40, 40);
    }
};

*/


let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext('2d');
let buttonDrawSuperman = document.getElementById('buttonDrawSuperman');
let buttonDrawBatman = document.getElementById('buttonDrawBatman');

let offsetX = 0;
let offsetY = 0;
let img = new Image();

function getMousePos(canvas, evt){
    let ClientRect = canvas.getBoundingClientRect();

    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

function drawImage(src, m) {
    img.src = src;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.drawImage(img, m.x - 25, m.y - 25, 50, 50);

}

buttonDrawSuperman.addEventListener('click', function(){
    drawImage('images/supermann.png');
});

buttonDrawBatman.addEventListener('click', function(){
    drawImage('images/batmann.png');
});

canvas2.addEventListener('click', function(evt){
    if (img.src) {
        let m = getMousePos(canvas2, evt);
        drawImage(img.src, m);
    }
}, false);

canvas2.addEventListener('mousemove', function(evt) {
    if (evt.buttons === 1) {  // este if es para saber si el boton izquierda esta presionado
        let m = getMousePos(canvas2, evt);
        drawImage(img.src, m);
    }
}, false);

