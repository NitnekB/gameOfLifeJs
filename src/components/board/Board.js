import React, { Component } from 'react';
import './Board.css'

// Components
import Box from '../box/Box';

class Board extends Component {
  render() {
    const width = (this.props.cols * 16); //+ 1;
    let rowsArray = [];
    let boxClass = "";

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = this.props.fullBoard[i][j] ? "box on" : "box off";
        rowsArray.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        )
      }
    }

    return(
      <div className="board" style={{width: width}}>
        {rowsArray}
      </div>
    );
  }
}

export default Board;
