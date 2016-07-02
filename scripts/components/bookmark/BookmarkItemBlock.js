import React, { PropTypes, Component } from 'react';

// -- constants
import ViewConstants from 'constants/ViewConstants';
import RoutingEnum from 'constants/RoutingEnum';

// -- utils

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import Link from 'components/Link';
import BookmarkEstimatedReadingTime from 'components/bookmark/BookmarkEstimatedReadingTime';

/**
 * for ViewConstants.BookmarkListType.BLOCK
 *
 * TODO: add website picture
 */
export default class BookmarkItemBlock extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired
  };

  render() {
    const bookmark:Bookmark = this.props.bookmark;

    return (
      <div className="bookmarks__item bookmarks__item_list_type_block bookmark col-xs-12 col-md-4">

        <div className="text-left">
          <h3 className="bookmarks__item_title">
            <Link to={RoutingEnum.BOOKMARK} params={ {bookmarkId: bookmark.id} }>
              {bookmark.getDefaultName()}
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
              <div className="bookmarks__item_icon"><img src={bookmark.icon} /></div>
              }
              { !bookmark.icon &&
              <div className="bookmarks__item_no_icon"></div>
              }
              {bookmark.getDomainUrl()}
            </div>
          </a>
        </div>

      </div>
    );
  }
}
