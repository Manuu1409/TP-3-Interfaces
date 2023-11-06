class Circle extends Figure {
    constructor(posX, posY, radius, img, context, player) {
        super(posX, posY, null, context);
        this.radius = radius;
        this.img = img;
        this.initialPosX = posX;
        this.initialPosY = posY;
        this.player = player;
    }

    resetPosition() { //me vuelve a la pos  inicial
        this.setPosition(this.initialPosX, this.initialPosY);
    }

    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI); //me dibuja el circulo
        this.ctx.closePath();

        if (this.img) {
            
            this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
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

    getPlayer() {
        return this.player;
    }

    isPointInside(x,y) {
        let _x = this.posX - x;
        let _y = this.posY -y;

        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    


    


}
