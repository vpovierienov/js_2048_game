'use strict';

class Game {
  constructor() {
    this.board = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];

    this.score = 0;
    this.isStarted = false;
    this.gameStarted = false;
  }

  // Движения
  moveLeft() {
    for (let i=0;i<4;i++){
      const numbers = this.board[i].filter(v => v!==0);
      for(let j=0;j<numbers.length-1;j++){
        if(numbers[j]===numbers[j+1]){
          numbers[j]*=2;
          this.score+=numbers[j];
          numbers.splice(j+1,1);
        }
      }
      while(numbers.length<4) numbers.push(0);
      this.board[i]=numbers;
    }
  }

  moveRight() {
    for (let i=0;i<4;i++){
      const numbers = this.board[i].filter(v => v!==0);
      for(let j=numbers.length-1;j>0;j--){
        if(numbers[j]===numbers[j-1]){
          numbers[j]*=2;
          this.score+=numbers[j];
          numbers.splice(j-1,1);
          j--;
        }
      }
      while(numbers.length<4) numbers.unshift(0);
      this.board[i]=numbers;
    }
  }

  moveUp() {
    for(let col=0;col<4;col++){
      let column=[];
      for(let row=0;row<4;row++){
        if(this.board[row][col]!==0) column.push(this.board[row][col]);
      }
      for(let i=0;i<column.length-1;i++){
        if(column[i]===column[i+1]){
          column[i]*=2;
          this.score+=column[i];
          column.splice(i+1,1);
        }
      }
      while(column.length<4) column.push(0);
      for(let row=0;row<4;row++) this.board[row][col]=column[row];
    }
  }

  moveDown() {
    for(let col=0;col<4;col++){
      let column=[];
      for(let row=0;row<4;row++){
        if(this.board[row][col]!==0) column.push(this.board[row][col]);
      }
      for(let i=column.length-1;i>0;i--){
        if(column[i]===column[i-1]){
          column[i]*=2;
          this.score+=column[i];
          column.splice(i-1,1);
          i--;
        }
      }
      while(column.length<4) column.unshift(0);
      for(let row=0;row<4;row++) this.board[row][col]=column[row];
    }
  }

  getScore(){
    return this.score;
  }

  getState(){
    return this.board;
  }

  getStatus(){
    for(let i=0;i<4;i++){
      if(this.board[i].includes(2048)) return 'win';
    }
    if(this.canMove()) return this.isStarted ? 'playing' : 'idle';
    return 'lose';
  }

  canMove(){
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(this.board[i][j]===0) return true;
        if(j<3 && this.board[i][j]===this.board[i][j+1]) return true;
        if(i<3 && this.board[i][j]===this.board[i+1][j]) return true;
      }
    }
    return false;
  }

  // старт игры с 2 плитками "2" на разных клетках
  start(){
    this.score=0;
    this.isStarted=true;
    this.gameStarted=true;

    // очистка поля
    this.board = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];

    this.addTwoTilesWithTwo();
  }

  restart(){
    this.start();
  }

  // добавляем две плитки 2 на случайные разные клетки
  addTwoTilesWithTwo(){
    const emptyCells = [];
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        emptyCells.push([i,j]);
      }
    }

    // выбираем первую плитку
    const idx1 = Math.floor(Math.random()*emptyCells.length);
    const [row1,col1] = emptyCells[idx1];
    this.board[row1][col1]=2;

    // удаляем выбранную клетку
    emptyCells.splice(idx1,1);

    // выбираем вторую плитку
    const idx2 = Math.floor(Math.random()*emptyCells.length);
    const [row2,col2] = emptyCells[idx2];
    this.board[row2][col2]=2;
  }

  // после хода добавляем 1 плитку (по правилам игры)
  addNewNumber(){
    const emptyCells=[];
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(this.board[i][j]===0) emptyCells.push([i,j]);
      }
    }

    if(!emptyCells.length) return;

    const [row,col] = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    this.board[row][col]=2; // добавляем только "2"
  }
}

module.exports = Game;
