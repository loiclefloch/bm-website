var React = require('react');

var Constants = require('../../../../constants/Constants');

var BookmarkItemSimple = require('./BookmarkItemSimple.react.jsx');
var BookmarkItemBlock = require('./BookmarkItemBlock.react.jsx');
var BookmarkItemCompact = require('./BookmarkItemCompact.react.jsx');

var BookmarksTable = React.createClass({

  propTypes: {
    bookmarks: React.PropTypes.array.isRequired,
    bookmarkListType: React.PropTypes.number.isRequired
  },

  render: function () {
    // Contains the Page rows.
    var rows = [];

    this.props.bookmarks.forEach(function (bookmark) {
      switch (this.props.bookmarkListType) {
        case Constants.View.BookmarkListType.NORMAL:
          rows.push(<BookmarkItemSimple bookmark={bookmark} key={bookmark.id}/>);
          break;
        case Constants.View.BookmarkListType.BLOCK:
          rows.push(<BookmarkItemBlock bookmark={bookmark} key={bookmark.id}/>);
          break;
        case Constants.View.BookmarkListType.COMPACT:
          rows.push(<BookmarkItemCompact bookmark={bookmark} key={bookmark.id}/>);
          break;
          break;
      }

    }.bind(this));

    return (
      <div className="col-xs-12">
        {rows}
      </div>
    );
  }

});

module.exports = BookmarksTable;