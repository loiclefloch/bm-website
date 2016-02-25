var React = require('react');

var HtmlBlock = require('../../../Common/HtmlBlock.react.jsx');

/**
 * Display the bookmark html content.
 */
var BookmarkContent = React.createClass({

  propTypes: {
    content: React.PropTypes.string
  },

  render: function () {

    if (_.isEmpty(this.props.content)) {
      return (
        <div className="bookmark__content_empty"></div>
      )
    }

    return (
      <div className="bookmark__content">
        <HtmlBlock content={this.props.content} id="bookmark__content_html"/>
      </div>
    )
  }
});

module.exports = BookmarkContent;