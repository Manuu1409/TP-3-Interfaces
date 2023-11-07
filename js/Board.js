class Board {
  constructor(x, y, lineMode) {
    this.MaxFil = y; //x
    this.MaxCol = x; //y
    this.board = []; // crea la matriz del tablero
    this.size = 50; //tamaño de la celda
    this.dropboxX = 240;
    this.dropboxY = 100 - this.size;
    this.dropBoxXMax = this.dropboxX + this.size * (x + 1);
    this.dropBoxYMax = this.size + this.dropboxY;
    this.lineMode = lineMode;
  }

  buildBoard() {
    let src = "images/casillero_vacio_negro.jpg";

    for (let fil = 0; fil < this.MaxFil; fil++) {
      this.board[fil] = []; // en cada pos de la fila crea un arreglo para columna

      for (let col = 0; col < this.MaxCol; col++) {
        if (col >= this.MaxCol / 2) {
          src = "images/casillero_vacio_rojo.jpg";
        } else {
          src = "images/casillero_vacio_negro.jpg";
        }
        this.board[fil][col] = new box(
          fil * this.size,
          col * this.size,
          this.size,
          src
        ); // creo celda y le doy tamaño
      }
    }
  }

  drawBoard() {
    for (let fil = 0; fil < this.MaxFil; fil++) {
      for (let col = 0; col < this.MaxCol; col++) {
        this.board[fil][col].draw();
      }
    }
  }

  putToken(moveX, player) {
    let isSeted = false;

    for (let y = 0; y < this.MaxFil - 1; y++) {
      isSeted = this.board[moveX][y].getisSet();
      console.log(this.MaxFil);

      if (isSeted && y == 0) {
        //para que no me pase del limite de columna llena
        return -1;
      } else if (isSeted) {
        //para que no se me ponga una arriba del otro

        this.board[moveX][y - 1].set(player);

        return y - 1;
      } else if (y == this.MaxFil - 2) {
        //pregunta si no hay ficha ficha en la columna
        console.log();
        this.board[moveX][y].set(player);

        return y;
      }
    }
    return true;
    //console.log(this.MaxFil-2, moveX)
    //console.log(this.MaxFil, moveX)
  }

  isIn(x, y) {
    // console.log(x > this.dropboxX, "despues de x", x < this.dropBoxXMax, "antes de x" ,y < this.dropBoxYMax, "antes de y" ,y > this.dropboxY, "despues de y");

    if (
      x > this.dropboxX &&
      x < this.dropBoxXMax &&
      y < this.dropBoxYMax &&
      y > this.dropboxY
    ) {
      return true;
    } else {
      return false;
    }
  }

  dropToken(x, player) {
    let positions = [];
    let ini = x - this.dropboxX;
    let posX = Math.floor(ini / this.size);
    let posY = this.putToken(posX, player);

    if (posY != -1) {
      positions.push(posX, posY);
      return (positions = [posX, posY]);
    } else {
      return -1;
    }
  }

  isLine(line) {
    let samePieces = 0;
    //console.log(line);
    for (let i = 0; i < line.length; i++) {
      console.log(line);
      if (line[i].isSet) {
        samePieces++;
        if (samePieces >= this.lineMode) {
          return true;
        }
      } else {
        samePieces = 0;
      }
    }
    console.log("samePieces:", samePieces);
    return false;
  }

  CheckVertical(moveX) {
    console.log("chekeo columna vertical", moveX);

    let line = [];

    for (let y = 0; y < this.MaxFil - 1; y++) {
      console.log("hola");
      line.push(this.board[moveX][y]);
      console.log(this.board[moveX][y]);
    }

    let isLine = this.isLine(line);

    if (isLine) {
      console.log("se hizo linea verticalmente");
    }

    return isLine;
  }

  CheckHorizontal(moveY) {
    console.log("chekeo columna horizontal", moveY);

    let line = [];

    for (let x = 0; x < this.MaxCol - 1; x++) {
      console.log("entro");
      console.log(this.board[x][moveY]);

      line.push(this.board[x][moveY]);
    }

    let isLine = this.isLine(line);

    if (isLine) {
      console.log("se hizo linea horizontalmente");
    }

    return isLine;
  }

  CheckDiagonal(moveX, moveY) {
    console.log("Chequeo diagonal");

    let line = []; //arreglo vacio que almacena fichas en diagonal
    let x = 0;
    let y = 0;

    if (moveX < moveY) { //detecta coordenada de la ficha
      y = moveY - moveX;

    } else if (moveX > moveY) {
      x = moveX - moveY;
    }
    for (let i = 0; x + i < this.MaxCol -1  && y + i < this.MaxFil -1 ; i++) { //recorre diagonal descendente
      line.push(this.board[x + i][y + i]);
    }
    if (this.isLine(line)) { //verifica si hay diagonal descendente
      return true;
    } else {
      line = [];
    }

    if (moveX + moveY >= this.MaxCol) {
      x = this.MaxCol - 1;
      y = moveX + moveY - (this.MaxCol - 1);
    } else {
      x = moveX + moveY;
      y = 0;
    }

    for (let i = 0; x - i >= 0 && y + i < this.MaxFil -1 ; i++) { //recorre diagonal ascendente
      line.push(this.board[x - i][y + i]);
    }

    if (this.isLine(line)) { //verifica diagonal ascendente
      return true;
    } else {
      return false;
    }

    if (isLine) {
      console.log("Se hizo una línea diagonal");
    }

  }

  checkWinner(moveX, moveY) {
    //this.CheckHorizontal(moveY);
    //this.CheckVertical(moveX);
    this.CheckDiagonal(moveX, moveY);

    if (/*this.CheckVertical(moveX) || this.CheckHorizontal(moveY) ||*/ this.CheckDiagonal(moveX, moveY)) {
      return true;
    } else {
      return false;
    }
  }
}

class box {
  constructor(posX, posY, size, src) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.img_empty = document.createElement("img"); // creo en el dom elemento img
    this.img_empty.src = src;
    this.img_superman = new Image();
    this.img_superman.src = "images/fichaSuperman.png";
    this.img_batman = new Image();
    this.img_batman.src = "images/batmann.png";
    this.isSet = false;
    this.player = 0;
  }

  set(player) {
    this.isSet = true;
    this.player = player;
  }

  getisSet() {
    return this.isSet;
  }

  getPosX() {
    return this.posX;
  }

  getPosY() {
    return this.posY;
  }

  draw() {
    let radius = 20;
    ctx.drawImage(
      this.img_empty,
      this.posX + 240,
      this.posY + this.size * 2,
      this.size,
      this.size
    );

    if (this.isSet && this.player == 1) {
      ctx.drawImage(
        this.img_superman,
        this.posX + 240,
        this.posY + this.size * 2,
        radius * 2.4,
        radius * 2.4
      );
    } else if (this.isSet && this.player == 2) {
      ctx.drawImage(
        this.img_batman,
        this.posX + 240,
        this.posY + this.size * 2,
        radius * 2.4,
        radius * 2.4
      );
    }

    //  console.log(this.img_superman, this.posX - radius, this.posY - radius, radius * 2, radius * 2)
  }
}
