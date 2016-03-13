var React = require('react');

var Router = require('react-router');
var Link = Router.Link;;

var BookmarkUtils = require('../../../../utils/BookmarkUtils.js');

/**
 * for ViewConstants.BookmarkListType.BLOCK
 *
 * TODO: add website picture
 */
var BookmarkItemBlock = React.createClass({

  propTypes: {
      bookmark: React.PropTypes.any.isRequired
  },

  render: function () {
    var bookmark = this.props.bookmark;

    return (
      <div className="bookmarks__item bookmarks__item_list_type_block bookmark col-xs-12 col-md-4">

        <div className="text-left">
          <h3 className="bookmarks__item_title">
            <Link to="bookmark" params={ {bookmarkId: bookmark.id} }>
              {BookmarkUtils.getDefaultName(bookmark)}
            </Link>
          </h3>
        </div>
        <div className="bookmarks__item_body">
          <div className="bookmarks__item_description">
            {bookmark.description}
          </div>
        </div>

        <div className="bookmarks__item_footer">
          <a href={bookmark.url} target="_blank" className="bookmarks__item_link">
            <div className="bookmarks__item_pretty_url">
              { bookmark.icon &&
              <div className="bookmarks__item_icon"><img src={bookmark.icon}/></div>
                }
              { !bookmark.icon &&
              <div className="bookmarks__item_no_icon"></div>
                }
              {BookmarkUtils.getDomainUrl(bookmark.url)}
            </div>
          </a>
        </div>

      </div>
    );
  }
});

module.exports = BookmarkItemBlock;