class Board {
    constructor (x,y) {
        this.MaxFil = x; //x
        this.MaxCol = y; //y
        this.board = []; // crea la matriz del tablero
        this.size = 50; //tamaño de la celda
        
        
    }


    buildBoard () {
        let src = 'images/casillero_vacio_negro.jpg';
        
        for(let fil = 0; fil < this.MaxFil; fil++) {
            
            this.board[fil] = [ ] // en cada pos de la fila crea un arreglo para columna


            for(let col = 0; col < this.MaxCol; col++) {
                if(col >= this.MaxCol / 2) {
                    src = 'images/casillero_vacio_rojo.jpg';
                }else{
                    src = 'images/casillero_vacio_negro.jpg';
                }
                this.board[fil][col] = new box ((fil*this.size ), (col*this.size), this.size, src) // creo celda y le doy tamaño
            }

        }

    }

    drawBoard(){

        for (let fil = 0; fil < this.MaxFil; fil++) {

            for(let col = 0; col < this.MaxCol; col++) {
                this.board[fil][col].draw();
                
            }

        }

    }


    putToken (moveX) {
        console.log(this.MaxFil-2, moveX)
        this.board[moveX][this.MaxCol-1].set();
        console.log(this.MaxFil, moveX)
        

        
        


    }

}


class box {
    constructor (posX, posY, size , src) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.img_empty = document.createElement('img'); // creo en el dom elemento img
        this.img_empty.src = src
        this.img_superman = new Image();
        this.img_superman.src = 'images/fichaSuperman.png';
        this.isSet = false;

        

    }

    set() {
        this.isSet = true;
    }

    getPosX() {
        return this.posX
    }

    getPosY() {
        return this.posY
    }

    draw() {
        let radius = 20;
        ctx.drawImage(this.img_empty,this.posX + 220,this.posY+(this.size*2),this.size,this.size);
        
        if(this.isSet)
        ctx.drawImage(this.img_superman, this.posX + 220 , this.posY+(this.size*2), radius * 2, radius * 2);


      //  console.log(this.img_superman, this.posX - radius, this.posY - radius, radius * 2, radius * 2)
        

    }


}