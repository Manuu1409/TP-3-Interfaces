class Board {
    constructor (x,y) {
        this.MaxFil = y; //x
        this.MaxCol = x; //y
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

        let isSeted = false;

        for(let y = 0; y < this.MaxFil - 1; y++) {
            isSeted = this.board[moveX][y].getisSet();
            console.log(this.MaxFil);

            if(isSeted && y == 0) {  //para que no me pase del limite de columna llena
                return false;

            }

            else if (isSeted) { //para que no se me ponga una arriba del otro
                
                this.board[moveX][y-1].set();

            }

            else if (y ==this.MaxFil-2) {  //pregunta si no hay ficha ficha en la columna
                console.log()
                this.board[moveX][y].set();

            }

        }
        return true;
        //console.log(this.MaxFil-2, moveX)
        //console.log(this.MaxFil, moveX)
        

        
        


    }

    isLine(line) {
        let samePieces = 0;
        console.log(line);
        for (let i = 0; i < line.length; i++) {
            if (line[i].isSet) {
                samePieces++;
                if (samePieces >= 4) {
                    return true;
                }
            } else {
                samePieces = 0;
            }
        }
        console.log('samePieces:', samePieces);
        return false;
    }
    
    
    
    CheckVertical(moveX) {
        console.log("chekeo columna vertical", moveX);
        
        let line = [];
    
        for (let y = 0; y < this.MaxFil; y++) {
            line.push(this.board[moveX][y]);
        }
    
        let isLine = this.isLine(line);
    
        if (isLine) {
            console.log('se hizo linea verticalmente');
        }
    
        return isLine;
    }

    CheckHorizontal(moveY) {
        console.log("chekeo columna horizontal", moveY);
        
        let line = [];
    
        for (let x = 0; x < this.MaxCol ; x++) {
            console.log(this.board[x][moveY])
            line.push(this.board[x][moveY]);
        }
    
        let isLine = this.isLine(line);
    
        if (isLine) {
            console.log('se hizo linea horizontalmente');
        }
    
        return isLine;
    }


    CheckDiagonal(moveX, moveY) {
        console.log("Chequeo diagonal");
    
        let line = [];
        let x = moveX;
        let y = moveY;
    
        while (x >= 0 && y >= 0) {
            line.push(this.board[x][y]);
            x--;
            y--;
        }
    
        x = moveX + 1;
        y = moveY + 1;
    
        while (x < this.MaxCol && y < this.MaxFil) {
            line.push(this.board[x][y]);
            x++;
            y++;
        }
    
        let isLine = this.isLine(line);
    
        if (isLine) {
            console.log('Se hizo una línea diagonal');
        }
    
        return isLine;
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

    getisSet() {
        return this.isSet;
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