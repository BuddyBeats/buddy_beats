import React, { Component } from 'react';
import { render } from 'react-dom';

class Box extends Component {

  render() {
    var boxStyle = {
      height: "150px",
      width: "150px"
    }
		return (
			<button style = {boxStyle}>
        {this.props.boxState[this.props.row][this.props.col]}
				
				
			</button>
		)
  }
}

module.exports = Box;