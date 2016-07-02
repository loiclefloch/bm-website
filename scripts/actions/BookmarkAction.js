import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import Api from 'utils/Api';

import ActionTypes from 'constants/ActionTypes';

export default class BookmarkAction {
  
  static loadBookmarks(page) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARKS,
      page
    });
    Api.loadBookmarks(page);
  }

  static loadBookmark(bookmarkId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARK,
      bookmarkId: bookmarkId
    });
    Api.loadBookmark(bookmarkId);
  }

  static createBookmark(name, url, tags, notes) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_BOOKMARK,
      name: name,
      url: url,
      tags: tags,
      notes: notes
    });
    Api.createBookmark(name, url, tags, notes);
  }

  static searchBookmarks(search, page = 0) {
    console.error('To implement');
  }

  static deleteBookmark(bookmark) {
    console.error('To implement');
  }

}
