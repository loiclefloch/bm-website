var React = require('react');

var BookmarkItem = require('./BookmarkItem.react.jsx');

var BookmarksTable = React.createClass({

  propTypes: {
    bookmarks: React.PropTypes.array.isRequired
  },

  render: function () {
    // Contains the Page rows.
    var rows = [];

    this.props.bookmarks.forEach(function (bookmark) {
      rows.push(<BookmarkItem bookmark={bookmark} key={bookmark.id}/>);
    }.bind(this));

    return (
      <div className="col-xs-12">
        {rows}
      </div>
    );
  }

});

module.exports = BookmarksTable;