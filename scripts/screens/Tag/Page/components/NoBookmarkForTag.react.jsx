var React = require('react');

var NoBookmarkForTag = React.createClass({

  render: function () {

    return (
      <div className="tag__bookmarks_empty text-center">
        <h3>There is no bookmarks yet</h3>
      </div>
    );

  }

});


module.exports = NoBookmarkForTag;