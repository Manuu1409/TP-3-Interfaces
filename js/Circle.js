class Circle extends Figure {

    constructor(posX, PosY, radius, fill, context) {

        super(posX, PosY, fill, context);

        this.radius = radius;
    }

    draw () {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill()

        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }

        this.ctx.closePath();
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