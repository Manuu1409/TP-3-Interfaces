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

let width2 = canvas2.width;
let height2 = canvas2.height;

let drawing = false;

function getMousePos(canvas, evt){
    let ClientRect = canvas.getBoundingClientRect();

    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

buttonDrawSuperman.addEventListener('click', function(){
    drawing = !drawing;
    this.innerHTML = (drawing) ? 'Parar' : 'Superman';
    drawImage('images/supermann.png');
});

buttonDrawBatman.addEventListener('click', function(){
    drawing = !drawing;
    this.innerHTML = (drawing) ? 'Parar' : 'Batman';
    drawImage('images/batmann.png');
});

function drawImage(src) {
    ctx2.beginPath();
    canvas2.addEventListener('click', function(evt){
        if(drawing){
            let m = getMousePos(canvas2, evt);
            ctx2.lineWidth = 2;
            ctx2.strokeStyle = '#A1C25E';

            let img = new Image();
            img.src = src;

            img.onload = function() {
                ctx2.drawImage(img, m.x - 25, m.y - 25, 50, 50);
            };
        }
    }, false);
}


