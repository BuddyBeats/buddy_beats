import React, { Component } from 'react';
import { render } from 'react-dom';
import Box from './Box';

class Board extends Component {

  render() {
    let row0 = 0;
    let row1 = 1;
    let row2 = 2;
    let row3 = 3;
    let col0 = 0;
    let col1 = 1;
    let col2 = 2;
    let col3 = 3;
    console.log("toggle:",this.props.toggle);
		return (

			<div>
				<Box boxState = {this.props.boxState} row = {row0} col = {col0} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row0} col = {col1} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row0} col = {col2} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row0} col = {col3} toggle = {this.props.toggle}/>
        <br></br>
        <Box boxState = {this.props.boxState} row = {row1} col = {col0} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row1} col = {col1} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row1} col = {col2} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row1} col = {col3} toggle = {this.props.toggle}/>
        <br></br>
        <Box boxState = {this.props.boxState} row = {row2} col = {col0} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row2} col = {col1} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row2} col = {col2} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row2} col = {col3} toggle = {this.props.toggle}/>
        <br></br>
        <Box boxState = {this.props.boxState} row = {row3} col = {col0} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row3} col = {col1} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row3} col = {col2} toggle = {this.props.toggle}/>
        <Box boxState = {this.props.boxState} row = {row3} col = {col3} toggle = {this.props.toggle}/>
			</div>
		)
  }
}

module.exports = Board;