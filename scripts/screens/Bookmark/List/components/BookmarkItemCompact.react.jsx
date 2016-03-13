var React = require('react');

var Router = require('react-router');
var Link = Router.Link;;

var BookmarkUtils = require('../../../../utils/BookmarkUtils.js');

var BookmarkItemCompact = React.createClass({

  propTypes: {
      bookmark: React.PropTypes.any.isRequired
  },

  render: function () {
    var bookmark = this.props.bookmark;

    return (
      <div className="bookmarks__item bookmarks__item_list_type_compact bookmark col-xs-12">

        <div className="text-left">
          <h3 className="bookmarks__item_title">
            <Link to="bookmark" params={ {bookmarkId: bookmark.id} }>
              {BookmarkUtils.getDefaultName(bookmark)}
            </Link>
          </h3>
        </div>

      </div>
    );
  }
});

module.exports = BookmarkItemCompact;