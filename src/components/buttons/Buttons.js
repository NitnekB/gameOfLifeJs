import React, { Component } from 'react';
import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';

import './Buttons.css'

class Buttons extends Component {
  handleSelect = (event) => {
    console.log("HANDLE SELECT!!!");
    this.props.boardSize(event);
  }

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-warning" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn btn-warning" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn btn-danger" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-warning" onClick={this.props.slow}>
            Slower
          </button>
          <button className="btn btn-warning" onClick={this.props.fast}>
            Faster
          </button>
          <button className="btn btn-warning" onClick={this.props.seed}>
            Seed
          </button>
          <DropdownButton
            title="Board Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
            <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Buttons;
