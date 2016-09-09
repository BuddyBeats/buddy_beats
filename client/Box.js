import React, { Component } from 'react';
import { render } from 'react-dom';

class Box extends Component {

  render() {
    var boxStyle = {
      height: "150px",
      width: "150px"
    }
		return (
			<button style = {boxStyle} onClick={this.props.toggle.bind(null,this.props.row, this.props.col)}>
        {this.props.boxState[this.props.row][this.props.col] }
				
				
			</button>
		)
  }
}

module.exports = Box;