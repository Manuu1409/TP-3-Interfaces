class Circle extends Figure {
    constructor(posX, posY, radius, img, context) {
        super(posX, posY, null, context);
        this.radius = radius;
        this.img = img;
        this.initialPosX = posX;
        this.initialPosY = posY;
    }

    // Resto del código...

    resetPosition() {
        this.setPosition(this.initialPosX, this.initialPosY);
    }

    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();

        if (this.img) {
            this.ctx.save(); // Guarda el contexto actual
            this.ctx.clip(); // Crea una máscara de recorte
            this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
            this.ctx.restore(); // Restaura el contexto original
        }

        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }


    getRadius() {
        return this.radius;
    }

    isPointInside(x,y) {  //no me funciona al hacer click se redondee de un color
        let _x = this.posX - x;
        let _y = this.posY -y;

        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    


    


}
