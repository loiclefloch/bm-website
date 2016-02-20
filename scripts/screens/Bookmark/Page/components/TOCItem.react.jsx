var React = require('react');

var TOCItem = React.createClass({

  propTypes: {
    link: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    level: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <li className={this.props.level}>
        <a href={this.props.link}> {this.props.title} </a>
      </li>
    )
  }
});

module.exports = TOCItem;

