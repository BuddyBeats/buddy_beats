import React, { Component } from 'react';
import { render } from 'react-dom';

class Selector extends Component {
	constructor(props) {
		super(props)
	}
	render() {
    var theOptions = [];
    if (this.props.boards) {
      theOptions = this.props.boards.map((board, i) => {
          return <option key={i} value={i}>{board.name}</option>
        })
    }
    console.log("boards in selector", this.props.boards)
		return (
			<select defaultValue={"test"} onChange={this.props.changeBoard}>
        <option value={"test"}>default</option>
				{theOptions}
			</select>

			)
	}
}

module.exports = Selector;