'use strict';

class Game {
  constructor() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.score = 0;
    this.isStarted = false;
  }

  moveLeft() {
    for (let i = 0; i < 4; i++) {
      const numbers = this.board[i].filter((val) => val !== 0);

      for (let j = 0; j < numbers.length - 1; j++) {
        if (numbers[j] === numbers[j + 1]) {
          numbers[j] *= 2;
          this.score += numbers[j];
          numbers.splice(j + 1, 1);
        }
      }

      while (numbers.length < 4) {
        numbers.push(0);
      }

      this.board[i] = numbers;
    }
  }

  moveRight() {
    for (let i = 0; i < 4; i++) {
      const numbers = this.board[i].filter((val) => val !== 0);

      for (let j = numbers.length - 1; j > 0; j--) {
        if (numbers[j] === numbers[j - 1]) {
          numbers[j] *= 2;
          this.score += numbers[j];
          numbers.splice(j - 1, 1);
          j--;
        }
      }

      while (numbers.length < 4) {
        numbers.unshift(0);
      }

      this.board[i] = numbers;
    }
  }

  moveUp() {
    for (let col = 0; col < 4; col++) {
      let column = [];

      for (let row = 0; row < 4; row++) {
        if (this.board[row][col] !== 0) {
          column.push(this.board[row][col]);
        }
      }

      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] *= 2;
          this.score += column[i];
          column.splice(i + 1, 1);
        }
      }

      while (column.length < 4) {
        column.push(0);
      }

      for (let row = 0; row < 4; row++) {
        this.board[row][col] = column[row];
      }
    }
  }

  moveDown() {
    for (let col = 0; col < 4; col++) {
      let column = [];

      for (let row = 0; row < 4; row++) {
        if (this.board[row][col] !== 0) {
          column.push(this.board[row][col]);
        }
      }

      for (let i = column.length - 1; i > 0; i--) {
        if (column[i] === column[i - 1]) {
          column[i] *= 2;
          this.score += column[i];
          column.splice(i - 1, 1);
          i--;
        }
      }

      while (column.length < 4) {
        column.unshift(0);
      }

      for (let row = 0; row < 4; row++) {
        this.board[row][col] = column[row];
      }
    }
  }

  start() {
    this.score = 0;
    this.isStarted = true;

    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.addNewNumber();
    this.addNewNumber();
  }

  restart() {
    this.start();
  }

  addNewNumber() {
    const emptyCells = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (!emptyCells.length) {
      return;
    }

    const [row, col] =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    this.board[row][col] = Math.random() < 0.1 ? 4 : 2;
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.board;
  }

  getStatus() {
    for (let i = 0; i < 4; i++) {
      if (this.board[i].includes(2048)) {
        return 'win';
      }
    }

    if (this.canMove()) {
      return this.isStarted ? 'playing' : 'idle';
    }

    return 'lose';
  }

  canMove() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] === 0) {
          return true;
        }

        if (j < 3 && this.board[i][j] === this.board[i][j + 1]) {
          return true;
        }

        if (i < 3 && this.board[i][j] === this.board[i + 1][j]) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = Game;
