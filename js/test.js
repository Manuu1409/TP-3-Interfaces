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