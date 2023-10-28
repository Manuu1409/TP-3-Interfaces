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

}


class box {
    constructor (posX, posY, size , src) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.img_empty = document.createElement('img'); // creo en el dom elemento img
        this.img_empty.src = src

    }

    getPosX() {
        return this.posX
    }

    getPosY() {
        return this.posY
    }

    draw() {
        ctx.drawImage(this.img_empty,this.posX + 220,this.posY+(this.size*2),this.size,this.size);
        console.log("hola")

    }


}