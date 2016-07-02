import ApiObject from 'abstracts/ApiObject';
import _ from 'lodash';

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
}