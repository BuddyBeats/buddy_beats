import React, { Component } from 'react';
import { render } from 'react-dom';
import Box from './Box';

class Board extends Component {

  render() {
    //numcols (# of columns) * 150px width = boardWidth
    //150px column width is set on Box.js
    let boxes = [];
    let numrows = 4;
    let numcols = 4;
    let boardWidth = (numcols * 150).toString();
    
    let boardStyle = {
      width: boardWidth + 'px'
    };

    for (var r = 0; r < numrows; r++){
      for (var c = 0; c < numcols; c++){
        boxes.push(<Box boxState = {this.props.boxState} row = {r} col = {c} toggle = {this.props.toggle}/>); 
      }   
    }
		return (
			<div style = {boardStyle}>
        {boxes}
			</div>
		)
  }
}

module.exports = Board;