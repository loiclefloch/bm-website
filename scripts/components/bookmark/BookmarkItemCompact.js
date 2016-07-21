import React from 'react';

// -- utils

// -- constants
import RoutingEnum from 'constants/RoutingEnum';

// -- entities
// import Bookmark from 'entities/Bookmark';

// -- views
import Link from 'components/Link';

export default function BookmarkItemCompact({ bookmark }) {
  // TODO: cut default name after ~ 150 chars
  return (
    <div className="bookmarks__item bookmarks__item_list_type_compact bookmark col-xs-12">

      <div className="text-left">
        <h3 className="bookmarks__item_title">
          <Link to={RoutingEnum.BOOKMARK} params={{ bookmarkId: bookmark.id }}>
            {bookmark.getDefaultName()}
          </Link>
        </h3>
      </div>

    </div>
  );
}
