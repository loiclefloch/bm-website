import ApiObject from 'abstracts/ApiObject';
import _ from 'lodash';

import ArrayUtils from 'utils/ArrayUtils';

import Bookmark from 'entities/Bookmark';
import Paging from 'entities/paging/Paging';

export default class BookmarksList extends ApiObject {

  bookmarks:Array<Bookmark> = [];

  paging:Paging;

  postJsonAssignation(data:JSON) {
    this.bookmarks = [];
    _.each(data.bookmarks, (bookmarkData:JSON) => {
      const bookmark:Bookmark = new Bookmark();
      bookmark.fromJson(bookmarkData);
      this.bookmarks.push(bookmark);
    });

    this.paging = new Paging();
    this.paging.fromJson(data.paging);
  }

  unshift(bookmark:Bookmark) {
    this.bookmarks.unshift(bookmark);
  }

  update(bookmark:Bookmark) {
    this.bookmarks = ArrayUtils.updateObjectIfExists(this.bookmarks, bookmark, (b:Bookmark) => {
      return b !== bookmark.id;
    });
  }

  mergeWithBookmarksList(newList:BookmarksList) {
    this.bookmarks = _.unionWith(this.bookmarks, newList.bookmarks, (a, b) => {
      return a.id === b.id;
    });
  }

  remove(bookmark:Bookmark) {
    this.bookmarks = _.remove(this.bookmarks, (n) => {
      return n.id === bookmark.id;
    });
  }
}
