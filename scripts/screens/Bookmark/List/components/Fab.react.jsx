var React = require('react');

var Fab = React.createClass({

  render: function () {
    return (
      <button className="btn btn-primary btn-fab" id="fab-plus-button">
        <i className="fa fa-plus"/>
      </button>
    )
  }
});

module.exports = Fab;