import React, { PropTypes, Component } from 'react';

// -- constants
import ViewConstants from 'constants/ViewConstants';

// -- entities
import Bookmark from 'entities/Bookmark';
import TagsList from 'entities/TagsList';

// -- views
import BookmarkItemSimple from './BookmarkItemSimple';
import BookmarkItemBlock from './BookmarkItemBlock';
import BookmarkItemCompact from './BookmarkItemCompact';

export default class BookmarksTable extends Component {

  static propTypes = {
    bookmarks: PropTypes.arrayOf(Bookmark).isRequired,

    bookmarkListType: PropTypes.number.isRequired,

    tagsList: PropTypes.objectOf(TagsList).isRequired
  };

  componentDidUpdate() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  render() {
    // Contains the Page rows.
    const rows = [];

    this.props.bookmarks.forEach((bookmark) => {
      switch (this.props.bookmarkListType) {
        case ViewConstants.BookmarkListType.SIMPLE:
          rows.push(
            <BookmarkItemSimple
              bookmark={bookmark}
              key={bookmark.id}
              tagsList={this.props.tagsList}
            />
          );
          break;
        case ViewConstants.BookmarkListType.BLOCK:
          rows.push(
            <BookmarkItemBlock bookmark={bookmark} key={bookmark.id} />
          );
          break;
        case ViewConstants.BookmarkListType.COMPACT:
          rows.push(
            <BookmarkItemCompact bookmark={bookmark} key={bookmark.id} />
          );
          break;
        default:
      }
    });

    return (
      <div className="col-xs-12">
        {rows}
      </div>
    );
  }

}
