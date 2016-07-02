import React, { PropTypes, Component } from 'react';

// -- utils

// -- constants
import RoutingEnum from 'constants/RoutingEnum';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import Link from 'components/Link';

export default class BookmarkItemCompact extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired
  };

  render() {
    const bookmark:Bookmark = this.props.bookmark;

    return (
      <div className="bookmarks__item bookmarks__item_list_type_compact bookmark col-xs-12">

        <div className="text-left">
          <h3 className="bookmarks__item_title">
            <Link to={RoutingEnum.BOOKMARK} params={ {bookmarkId: bookmark.id} }>
              {bookmark.getDefaultName()}
            </Link>
          </h3>
        </div>

      </div>
    );
  }
}
