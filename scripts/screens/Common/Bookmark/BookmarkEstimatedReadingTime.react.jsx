var React = require('react');

var BookmarkEstimatedTime = React.createClass({

  propTypes: {
    readingTime: React.PropTypes.any.isRequired
  },

  componentDidUpdate: function () {

    $('[data-toggle="tooltip-reading-time"]').tooltip();

  },

  render: function () {

    var readingTimeInt = parseInt(this.props.readingTime);

    return (
      <em>
            <span data-toggle="tooltip-reading-time" data-placement="left" title="Estimated reading time">
              <i className="fa fa-clock-o"/>
            </span>
        &nbsp;
        { readingTimeInt == 1
          ? this.props.readingTime + " minute"
          : this.props.readingTime + " minutes"
          }
        &nbsp;</em>
    );
  }

});

module.exports = BookmarkEstimatedTime;