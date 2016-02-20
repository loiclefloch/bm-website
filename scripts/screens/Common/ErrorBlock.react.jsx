var React = require('react');

var ErrorNotice = require('./ErrorNotice.react.jsx');

/**
 * Take errors
 */
var ErrorBlock = React.createClass({

  render : function () {
    var errors = (this.props.errors && this.props.errors.length > 0) ? <ErrorNotice errors={this.props.errors}/> : <div></div>;
    return (errors);
  }

});

module.exports = ErrorBlock;