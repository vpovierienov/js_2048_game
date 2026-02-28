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
    this.gameStarted = false;
  }

  moveLeft() {
    for (let i = 0; i < 4; i++) {
      const numbers = this.board[i].filter((val) => val !== 0);

      for (let j = 0; j < numbers.length; j++) {
        if (numbers[j] === numbers[j + 1]) {
          numbers[j] *= 2;
          this.score += numbers[j];
          numbers[j + 1] = 0;
          j++;
        }
      }

      const result = numbers.filter((num) => num !== 0);

      while (result.length < 4) {
        result.push(0);
      }

      this.board[i] = result;
    }
  }

  moveRight() {
    for (let i = 0; i < 4; i++) {
      const numbers = this.board[i].filter((val) => val !== 0);

      for (let j = numbers.length - 1; j >= 0; j--) {
        if (numbers[j] === numbers[j - 1]) {
          numbers[j] *= 2;
          this.score += numbers[j];
          numbers[j - 1] = 0;
          j--;
        }
      }

      const result = numbers.filter((num) => num !== 0);

      while (result.length < 4) {
        result.unshift(0);
      }

      this.board[i] = result;
    }
  }

  moveUp() {
    for (let i = 0; i < 4; i++) {
      const columns = [];

      for (let j = 0; j < 4; j++) {
        columns.push(this.board[j][i]);
      }

      const numbers = columns.filter((val) => val !== 0);

      for (let j = 0; j < numbers.length; j++) {
        if (numbers[j] === numbers[j + 1]) {
          numbers[j] *= 2;
          this.score += numbers[j];
          numbers[j + 1] = 0;
          j++;
        }
      }

      const result = numbers.filter((num) => num !== 0);

      while (result.length < 4) {
        result.push(0);
      }

      for (let j = 0; j < 4; j++) {
        this.board[j][i] = result[j];
      }
    }
  }

  moveDown() {
    for (let i = 0; i < 4; i++) {
      const columns = [];

      for (let j = 0; j < 4; j++) {
        columns.push(this.board[j][i]);
      }

      const numbers = columns.filter((val) => val !== 0);

      for (let j = numbers.length - 1; j >= 0; j--) {
        if (numbers[j] === numbers[j - 1]) {
          numbers[j] *= 2;
          this.score += numbers[j];
          numbers[j - 1] = 0;
          j--;
        }
      }

      const result = numbers.filter((num) => num !== 0);

      while (result.length < 4) {
        result.unshift(0);
      }

      for (let j = 0; j < 4; j++) {
        this.board[j][i] = result[j];
      }
    }
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

  // Старт игры — теперь две плитки
  start() {
    this.score = 0;
    this.isStarted = true;
    this.gameStarted = true;

    this.addNewNumber();
    this.addNewNumber();
  }

  // Рестарт игры — теперь две плитки
  restart() {
    this.score = 0;

    // очищаем поле
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.board[i][j] = 0;
      }
    }

    this.isStarted = true;
    this.gameStarted = true;

    this.addNewNumber();
    this.addNewNumber();
  }

  addNewNumber() {
    if (this.gameStarted) {
      let emptyCells = [];

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.board[i][j] === 0) {
            emptyCells.push([i, j]);
          }
        }
      }

      if (emptyCells.length === 0) return;

      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const chanceNumber = Math.floor(Math.random() * 101);
      this.board[row][col] = chanceNumber < 10 ? 4 : 2;
    }
  }

  canMove() {
    const state = this.board;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (state[i][j] === 0) return true;
        if (j < 3 && state[i][j] === state[i][j + 1]) return true;
        if (i < 3 && state[i][j] === state[i + 1][j]) return true;
      }
    }

    return false;
  }
}

module.exports = Game;
        

