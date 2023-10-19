/*
let canvas = document.getElementById("canvas"); //traje la id
let ctx = canvas.getContext("2d");  // genero contexto 2d
let width = 500;  //ancho
let height = 500;  //largo (mismas dimensiones del canvas en html)
let imageData = ctx.createImageData(width, height); //genera al partir del contexto donde vamos a dibujar

let r = 75;  //rojo
let g = 0;  //verde
let b = 255; //azul
let a = 255; //transparencia


function drawRect (imageData, r, g, b, a) {

    for (let x = 0; x < width; x++) { //itero hasta el width

        let r;
        let g;
        let b
        let a = 255;


        if (x <= width / 2) {

            var coeficiente = 255 / (width / 2); //cuentita para que ocupe todo el ancho y no hasta 255 ( var coeficiente = 255 / width)
            r = coeficiente * x;
            g = coeficiente * x;;
            b = 0;
 
        } else {
            var coeficiente = 255 / (width * 2);
            r = coeficiente * x;
            g = 0;
            b = coeficiente * x;;

        }
        for (let y = 0; y < height; y++) { //itero hasta el height
            setPixel (imageData, x, y, r, g, b, a);
        }
    }
}

function setPixel (imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;


}

drawRect(imageData, r, g, b, a); //dibujamelo
ctx.putImageData(imageData, 0, 0); //x, y

*/



/*
 DIBUJAR CIRCULO
const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(250, 250, 80, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

*/


let canvas = document.getElementById("canvas2");
let ctx = canvas.getContext("2d");
let width = 500;
let height = 500;

for (let i = 0; i < 10 ; i++) {
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(Math.round(Math.random() * width), Math.round(Math.random() * height), 10, 0 ,2 * Math.PI);
    ctx.stroke();
    ctx.fill();

}
