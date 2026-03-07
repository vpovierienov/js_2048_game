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

  // движения
  moveLeft() { this.slideRows(this.board); }
  moveRight() { this.slideRows(this.board.map(r => [...r].reverse()), true); }
  moveUp() { this.slideColumns(false); }
  moveDown() { this.slideColumns(true); }

  slideRows(rows, reverse = false) {
    for(let i=0;i<4;i++){
      let numbers = rows[i].filter(v=>v!==0);
      for(let j=0;j<numbers.length-1;j++){
        if(numbers[j]===numbers[j+1]){
          numbers[j]*=2;
          this.score+=numbers[j];
          numbers.splice(j+1,1);
        }
      }
      while(numbers.length<4) numbers.push(0);
      if(reverse) numbers.reverse();
      this.board[i]=numbers;
    }
  }

  slideColumns(reverse=false){
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
      if(reverse) column.reverse();
      for(let row=0;row<4;row++) this.board[row][col]=column[row];
    }
  }

  getScore() { return this.score; }
  getState() { return this.board; }

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

  getStatus(){
    for(let i=0;i<4;i++){
      if(this.board[i].includes(2048)) return 'win';
    }
    return this.canMove() ? (this.isStarted ? 'playing' : 'idle') : 'lose';
  }

  start(){
    this.score=0;
    this.isStarted=true;
    this.gameStarted=true;
    this.board = Array(4).fill(0).map(()=>[0,0,0,0]);
    this.addTwoTilesWithTwo();
  }

  restart(){ this.start(); }

  addTwoTilesWithTwo(){
    const emptyCells=[];
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        emptyCells.push([i,j]);
      }
    }

    const idx1=Math.floor(Math.random()*emptyCells.length);
    const [r1,c1]=emptyCells[idx1];
    this.board[r1][c1]=2;
    emptyCells.splice(idx1,1);

    const idx2=Math.floor(Math.random()*emptyCells.length);
    const [r2,c2]=emptyCells[idx2];
    this.board[r2][c2]=2;
  }

  addNewNumber(){
    const emptyCells=[];
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(this.board[i][j]===0) emptyCells.push([i,j]);
      }
    }
    if(!emptyCells.length) return;
    const [row,col]=emptyCells[Math.floor(Math.random()*emptyCells.length)];
    this.board[row][col]=2;
  }
}

module.exports = Game;
