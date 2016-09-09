import React, { Component } from 'react';
import { render } from 'react-dom';


class FormSave extends Component {

  render() {
    return(
      <form className = "saveform" >
        <input type="text" placeholder="name of board" />
        
        <input type="submit" value="Save Board" required = {true}/>
        
      </form>
    )

    
  }
}

module.exports = FormSave;