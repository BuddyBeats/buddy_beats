import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

  render: function() {
    return (
      <div>
        <h1> Ehey </h1>
      </div>
    );
  }
});



ReactDOM.render(<App />, document.getElementById('app'));