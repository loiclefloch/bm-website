var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var BookmarkUtils = require('../../../../utils/BookmarkUtils.js');

var BookmarkEstimatedReadingTime = require('../../../Common/Bookmark/BookmarkEstimatedReadingTime.react.jsx')

var BookmarkItemSimple = React.createClass({

  propTypes: {
    bookmark: React.PropTypes.any.isRequired
  },

  componentDidUpdate: function () {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },

  render: function () {
    var bookmark = this.props.bookmark;

    var readingTimeInt = parseInt(bookmark.reading_time);

    return (
      <div className="bookmarks__item bookmarks__item_list_type_simple bookmark col-xs-12">

        <div className="text-left">
          <h3 className="bookmarks__item_title">
            <Link to="bookmark" params={ {bookmarkId: bookmark.id} }>
              {BookmarkUtils.getDefaultName(bookmark)}
            </Link>
          </h3>
        </div>
        <div className="bookmarks__item_meta">
          <BookmarkEstimatedReadingTime readingTime={bookmark.reading_time} />
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

module.exports = BookmarkItemSimple;