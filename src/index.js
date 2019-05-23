import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Components
import Board from './components/board/Board';
import Buttons from './components/buttons/Buttons';

class Game extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      fullBoard: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let prevBoard = cloneArr(this.state.fullBoard);
    console.log(prevBoard);
    prevBoard[row][col] = !prevBoard[row][col];
    this.setState({
      fullBoard: prevBoard
    })
  }

  seed = () => {
    let prevBoard = cloneArr(this.state.fullBoard);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          prevBoard[i][j] = true;
        }
      }
    }
    this.setState({
      fullBoard: prevBoard
    });
  }

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  slow = () => {
    this.speed = 1000;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear = () => {
    let board = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.pauseButton();
    this.setState({
      fullBoard: board,
      generation: 0
    })
  }

  boardSize = size => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      case "3":
        this.cols = 70;
        this.rows = 50;
        break;
      default:
        this.cols = 20;
        this.rows = 10;
    }
    this.clear();
  }

  play = () => {
    let g = this.state.fullBoard;
    let g2 = cloneArr(this.state.fullBoard);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      fullBoard: g2,
      generation: this.state.generation + 1
    })
  }

  componentDidMount() {
    this.seed();
    // this.playButton();
  }

  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          boardSize={this.boardSize}
        />
        <Board
          fullBoard={this.state.fullBoard}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}

const cloneArr = arr => {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Game />, document.getElementById('root'));
