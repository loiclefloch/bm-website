import React, { PropTypes, Component } from 'react';

// -- constants
import RoutingEnum from 'constants/RoutingEnum';

// -- actions
import BookmarkAction from 'actions/BookmarkAction';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import Link from 'components/Link';
import BookmarkEstimatedReadingTime from 'components/bookmark/BookmarkEstimatedReadingTime';
import ImageLoader from 'components/ImageLoader';
import BookmarkTagList from 'components/tag/BookmarkTagList';

export default class BookmarkItemSimple extends Component {

  static propTypes = {
    bookmark: PropTypes.any.isRequired
  };

  componentDidUpdate() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  onDeleteTag = (tag) => {
    BookmarkAction.deleteTagsForBookmark([tag], this.props.bookmark);
  };

  render() {
    const bookmark:Bookmark = this.props.bookmark;

    return (
      <div className="bookmarks__item bookmarks__item_list_type_simple bookmark col-xs-12">

        <div className="text-left">
          <h3 className="bookmarks__item_title">
            <Link to={RoutingEnum.BOOKMARK} params={{ bookmarkId: bookmark.id }}>
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
        <div className="bookmarks__item_tags">
          <BookmarkTagList
            bookmark={bookmark}
            deleteTag={this.onDeleteTag}
          />
        </div>
        <div className="bookmarks__item_footer">
          <a href={bookmark.url} target="_blank" className="bookmarks__item_link">
            <div className="bookmarks__item_pretty_url">
              {bookmark.icon &&
                <div className="bookmarks__item_icon">
                  <ImageLoader
                    src={bookmark.icon}
                  />
                </div>
                }
              {!bookmark.icon &&
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
